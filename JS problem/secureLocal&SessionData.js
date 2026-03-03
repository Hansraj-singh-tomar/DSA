import SecureStorage from "secure-web-storage";
import CryptoJS from "crypto-js";

export const secureLocalStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
        key = CryptoJS.SHA256(key, process.env.REACT_APP_API_KEY);
        return key.toString();
    },
    encrypt: function encrypt(data) {
        data = CryptoJS.AES.encrypt(data, process.env.REACT_APP_API_KEY);
        data = data.toString();
        return data;
    },
    decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(data, process.env.REACT_APP_API_KEY);
        data = data.toString(CryptoJS.enc.Utf8);
        return data;
    },
});

export const secureSessionStorage = new SecureStorage(sessionStorage, {
    hash: function hash(key) {
        key = CryptoJS.SHA256(key, process.env.REACT_APP_API_KEY);
        return key.toString();
    },
    encrypt: function encrypt(data) {
        data = CryptoJS.AES.encrypt(data, process.env.REACT_APP_API_KEY);
        data = data.toString();
        return data;
    },
    decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(data, process.env.REACT_APP_API_KEY);
        data = data.toString(CryptoJS.enc.Utf8);
        return data;
    },
});

export const saveTokenInLocalStorage = (token) => {
    // localStorage.setItem("Access_Token", token);
    secureLocalStorage.setItem('Access_Token', token);
};

export const saveRefreshTokenInLocalStorage = (token) => {
    // localStorage.setItem("Refresh_Token", token);
    secureLocalStorage.setItem('Access_Token', token);
};

export const getRefreshTokenFromLocalStorage = (token) => {
    return localStorage.getItem("Refresh_Token");  // secureLocalStorage.setItem('Access_Token', token);
};


export const getTokenFromLocalStorage = () => {
    // return localStorage.getItem("Access_Token");
    return secureLocalStorage.getItem('Access_Token');
};

export const getCompanyIdFromLocalStorage = () => {
    return localStorage.getItem("companyId");
    // return secureLocalStorage.getItem('Access_Token');
};

export const clearLocalStorage = () => {
    localStorage.clear();
    // secureLocalStorage.clear();
};

// --------------------------------------------------------------

// Visual: Plain vs Secure Storage

// ┌─────────────────────────────────────────────────────────────────┐
// │              WITHOUT SECURE STORAGE (Current)                   │
// ├─────────────────────────────────────────────────────────────────┤
// │                                                                 │
// │   DevTools → Application → Local Storage:                      │
// │                                                                 │
// │   ┌──────────────────┬─────────────────────────────────────┐   │
// │   │ Key              │ Value                                │   │
// │   ├──────────────────┼─────────────────────────────────────┤   │
// │   │ Access_Token     │ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC │   │
// │   │ Refresh_Token    │ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC │   │
// │   │ companyId        │ 12345                                │   │
// │   └──────────────────┴─────────────────────────────────────┘   │
// │                                                                 │
// │   ⚠️ Anyone can read these in DevTools!                        │
// │                                                                 │
// └─────────────────────────────────────────────────────────────────┘

// ┌─────────────────────────────────────────────────────────────────┐
// │              WITH SECURE STORAGE (If enabled)                   │
// ├─────────────────────────────────────────────────────────────────┤
// │                                                                 │
// │   DevTools → Application → Local Storage:                      │
// │                                                                 │
// │   ┌───────────────────────────┬────────────────────────────┐   │
// │   │ Key                       │ Value                       │   │
// │   ├───────────────────────────┼────────────────────────────┤   │
// │   │ 9f86d081884c7d659a2f...   │ U2FsdGVkX1+rT3kL9Qz7Y... │   │
// │   │ a7b9c3d2e1f0789abc12...   │ U2FsdGVkX1+mN4pK8Rx6W... │   │
// │   │ 2c624232cdd221771294...   │ U2FsdGVkX1+xY2zP7Wv5... │   │
// │   └───────────────────────────┴────────────────────────────┘   │
// │                                                                 │
// │   ✅ Keys and values are unreadable without secret key         │
// │                                                                 │
// └─────────────────────────────────────────────────────────────────┘

// --------------------------------------------------------------

// Complete Flow Example

// // When you call:
// secureLocalStorage.setItem("Access_Token", "mySecretJWT123");

// // Internally:
// // Step 1: Hash the key
// hashedKey = SHA256("Access_Token") → "9f86d081884c7d659a2f..."

// // Step 2: Encrypt the value
// encryptedValue = AES.encrypt("mySecretJWT123", SECRET_KEY) → "U2FsdGVkX1+rT3kL9Qz7Y..."

// // Step 3: Store in localStorage
// localStorage.setItem("9f86d081884c7d659a2f...", "U2FsdGVkX1+rT3kL9Qz7Y...");

// // When you call:
// secureLocalStorage.getItem("Access_Token");

// // Internally:
// // Step 1: Hash the key to find it
// hashedKey = SHA256("Access_Token") → "9f86d081884c7d659a2f..."

// // Step 2: Get encrypted value
// encryptedValue = localStorage.getItem("9f86d081884c7d659a2f...");

// // Step 3: Decrypt the value
// originalValue = AES.decrypt(encryptedValue, SECRET_KEY) → "mySecretJWT123"

// // Returns: "mySecretJWT123"

// --------------------------------------------------------------

// How the Package Works Internally

// Simplified version of what secure-web-storage does:
class SecureStorage {
    constructor(storage, options) {
      this.storage = storage;      // localStorage or sessionStorage
      this.hash = options.hash;     // Your hash function
      this.encrypt = options.encrypt;
      this.decrypt = options.decrypt;
    }
  
    setItem(key, value) {
      const hashedKey = this.hash(key);           // Hash the key
      const encryptedValue = this.encrypt(        // Encrypt the value
        JSON.stringify(value)
      );
      this.storage.setItem(hashedKey, encryptedValue);
    }
  
    getItem(key) {
      const hashedKey = this.hash(key);           // Hash to find key
      const encryptedValue = this.storage.getItem(hashedKey);
      if (!encryptedValue) return null;
      return JSON.parse(this.decrypt(encryptedValue));  // Decrypt
    }
  
    removeItem(key) {
      const hashedKey = this.hash(key);
      this.storage.removeItem(hashedKey);
    }
  
    clear() {
      this.storage.clear();
    }
  }

  // --------------------------------------------------------------

// Build Your Own (Without the Package)
// If you want to avoid the dependency:

import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_API_KEY;

export const secureStorage = {
  setItem(key, value) {
    const hashedKey = CryptoJS.SHA256(key).toString();
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(value), 
      SECRET_KEY
    ).toString();
    localStorage.setItem(hashedKey, encrypted);
  },

  getItem(key) {
    const hashedKey = CryptoJS.SHA256(key).toString();
    const encrypted = localStorage.getItem(hashedKey);
    if (!encrypted) return null;
    
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  },

  removeItem(key) {
    const hashedKey = CryptoJS.SHA256(key).toString();
    localStorage.removeItem(hashedKey);
  },

  clear() {
    localStorage.clear();
  }
};

// Usage:
secureStorage.setItem('token', 'myJWT123');
secureStorage.getItem('token');  // Returns: 'myJWT123'