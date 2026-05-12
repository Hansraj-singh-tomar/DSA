// apiClient.js

let accessToken = null;
let isRefreshing = false;
let requestQueue = [];

export const setAccessToken = (token) => {
  accessToken = token;
};

function processQueue(token) {
  requestQueue.forEach(resolve => resolve(token));
  requestQueue = [];
}

async function refreshAccessToken() {
  const res = await fetch("/auth/refresh", {
    method: "POST",
    credentials: "include"
  });

  const data = await res.json();

  setAccessToken(data.accessToken);

  return data.accessToken;
}

export async function apiRequest(url, options = {}) {

  let response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...options.headers
    },
    credentials: "include"
  });

  if (response.status !== 401) {
    return response.json();
  }

  // Access token expired

  if (!isRefreshing) {

    isRefreshing = true;

    const newToken = await refreshAccessToken();

    isRefreshing = false;

    processQueue(newToken);

  } else {

    // Wait for refresh
    const token = await new Promise(resolve => {
      requestQueue.push(resolve);
    });

    accessToken = token;
  }

  // Retry request

  response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...options.headers
    },
    credentials: "include"
  });

  return response.json();
}


async function login(email, password) {
    const res = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });
  
    const data = await res.json();
  
    setAccessToken(data.accessToken);
}