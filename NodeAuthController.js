// Node.js Auth Controller
import jwt from "jsonwebtoken";

const ACCESS_SECRET = "access_secret";
const REFRESH_SECRET = "refresh_secret";

let refreshTokens = new Set();

export const login = (req, res) => {

  const user = { id: 1, email: req.body.email };

  const accessToken = jwt.sign(user, ACCESS_SECRET, {
    expiresIn: "15m"
  });

  const refreshToken = jwt.sign(user, REFRESH_SECRET, {
    expiresIn: "7d"
  });

  refreshTokens.add(refreshToken);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict"
  });

  res.json({ accessToken });
};


// Refresh Token Rotation

export const refresh = (req, res) => {

    const token = req.cookies.refreshToken;
  
    if (!token || !refreshTokens.has(token)) {
      return res.sendStatus(403);
    }
  
    jwt.verify(token, REFRESH_SECRET, (err, user) => {
  
      if (err) return res.sendStatus(403);
  
      refreshTokens.delete(token);
  
      const newAccessToken = jwt.sign(
        { id: user.id },
        ACCESS_SECRET,
        { expiresIn: "15m" }
      );
  
      const newRefreshToken = jwt.sign(
        { id: user.id },
        REFRESH_SECRET,
        { expiresIn: "7d" }
      );
  
      refreshTokens.add(newRefreshToken);
  
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict"
      });
  
      res.json({ accessToken: newAccessToken });
  
    });
  };

//   Protected Route Middleware
export const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;
  
    if (!authHeader) return res.sendStatus(401);
  
    const token = authHeader.split(" ")[1];
  
    jwt.verify(token, ACCESS_SECRET, (err, user) => {
  
      if (err) return res.sendStatus(401);
  
      req.user = user;
  
      next();
  
    });
  };



//   User Login
//   │
//   │ access token → memory
//   │ refresh token → httpOnly cookie
//   ▼

// API Request
//   │
//   │ access token expired
//   ▼

// 401 response
//   │
//   │ refresh queue
//   ▼

// /auth/refresh
//   │
//   │ new tokens issued
//   ▼

// Queued requests retry  