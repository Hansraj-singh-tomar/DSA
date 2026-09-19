# JWT, Access Token & Refresh Token — Interview Notes

## 1. What does "JWT is stateless" mean?

JWT-based **access-token authentication can be stateless**.

Suppose the client sends:

```http
GET /api/orders
Authorization: Bearer <accessToken>
```

The server can verify the token directly:

```js
jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
```

The server does not need to query the database just to know whether the access token is cryptographically valid.

### Flow

```text
Request
   ↓
JWT verification
   ↓
Valid?
   ↓
Controller
```

That is the **stateless** part.

---

## 2. Then why store the Refresh Token in DB?

Because we often want **server-side control over a long-lived credential**.

Example:

```text
Access Token  → 15 minutes
Refresh Token → 7 days
```

The access token is short-lived, while the refresh token can remain valid for several days.

Suppose:

```text
User logs in
      ↓
Refresh Token = RT123
      ↓
Store its hash in DB
```

Example DB record:

```json
{
  "userId": "123",
  "tokenHash": "abcxyz",
  "expiresAt": "..."
}
```

Now, when the user logs out, the server can revoke/delete that refresh-token record.

```text
RT123
  ↓
/refresh
  ↓
❌ rejected
```

Without server-side refresh-token state, a still-valid refresh JWT could potentially continue generating access tokens until it expires.

---

## 3. Is the system stateful or stateless?

The most accurate answer is:

> **Access-token authentication is stateless, while refresh-token management is stateful.**

Architecture:

```text
                 Authentication
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
       Access Token        Refresh Token
        Stateless             Stateful
             │                   │
             │                   ▼
             │                  DB
             │
             ▼
       Verify JWT
       No DB lookup
```

So this is commonly a **hybrid authentication architecture**.

---

## 4. Why not store the Access Token in DB too?

You could, but then you lose one of the major benefits of stateless JWT authentication.

### Without DB lookup

```text
Request
   ↓
JWT verification
   ↓
Allow
```

### With DB lookup

```text
Request
   ↓
JWT verification
   ↓
DB lookup
   ↓
Check token
   ↓
Allow
```

If every API request requires a DB lookup to validate the JWT, you have introduced server-side state and additional database overhead.

---

## 5. How can we logout if the Access Token is still valid?

Suppose:

```text
Access Token expires → 15 min
Refresh Token expires → 7 days
```

The user logs out after 5 minutes.

The access token may technically still be valid for another 10 minutes.

Therefore logout usually does:

```text
Logout
   ↓
Revoke Refresh Token
   ↓
Clear refresh-token cookie
```

This means:

> The user cannot obtain a **new** access token.

The existing access token will naturally expire soon.

This is one reason access tokens should be **short-lived**.

---

## 6. Why hash the Refresh Token in DB?

Don't ideally store the raw refresh token:

```text
refreshTokens: [
   "eyJhbGciOiJIUzI1Ni..."
]
```

Instead store a hash:

```text
refreshTokens: [
   {
      tokenHash: "a8f91c...",
      expiresAt: "..."
   }
]
```

When the client sends the refresh token:

```js
const hash = hashToken(refreshToken);
```

Then check whether that hash exists in the DB.

```text
Refresh Token
      ↓
Hash it
      ↓
DB lookup
      ↓
Exists?
 ┌────┴────┐
Yes        No
 ↓          ↓
Valid      Rejected
```

This avoids unnecessarily storing the raw long-lived credential.

---

## 7. Refresh Token Rotation

Refresh-token storage becomes even more useful when implementing **refresh-token rotation**.

Suppose:

```text
RT1
```

is currently valid.

Client calls:

```text
POST /auth/refresh
```

Server does:

```text
RT1
 ↓
Validate
 ↓
Revoke RT1
 ↓
Create RT2
 ↓
Create new Access Token
```

DB becomes:

```text
RT1 ❌
RT2 ✅
```

Next refresh:

```text
RT2 → RT3
RT3 → RT4
```

So:

```text
RT1 → RT2 → RT3 → RT4
```

If an attacker tries to reuse `RT1`:

```text
Attacker
   ↓
RT1
   ↓
DB lookup
   ↓
❌ Already revoked
```

This helps protect against **refresh-token replay attacks**.

A production system can also detect reuse of an already-rotated token and revoke the associated token family/session.

---

## 8. Strong Interview Answer

If the interviewer asks:

### "JWT is stateless, so why do you store refresh tokens in the database?"

Answer:

> **"JWT-based access-token authentication can be stateless because the server can validate the access token without maintaining a session. However, refresh tokens are often stored as hashes in a database or another server-side store because they are long-lived credentials and we need server-side control over them. This allows us to implement logout, revocation, refresh-token rotation, device/session management, and detection of refresh-token reuse."**

This is a strong interview answer.

---

# Quick Revision

```text
ACCESS TOKEN
────────────
"I am already authenticated."

• Short-lived
• Usually 10–15 minutes
• No DB lookup for normal API authentication
• Stateless
• Sent to protected APIs


REFRESH TOKEN
─────────────
"Give me a new access token."

• Long-lived
• Usually several days
• Used only at /auth/refresh
• Often stored as a hash server-side
• Revocable
• Rotated
• Commonly stored in an HttpOnly cookie
```

## Key Concept

> **We don't store the refresh token in the DB because JWT requires it. We store it because we want server-side control over a long-lived credential.**

### One-line interview takeaway

**"Stateless JWT refers primarily to how we validate access tokens; refresh-token management can intentionally be stateful."**
