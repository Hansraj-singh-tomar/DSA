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

export const secureSessionStorage = new SecureStorage(localStorage, {
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
    localStorage.setItem("Access_Token", token);
    // secureLocalStorage.setItem('Access_Token', token);
};

export const saveRefreshTokenTokenInLocalStorage = (token) => {
    localStorage.setItem("Refresh_Token", token);
    // secureLocalStorage.setItem('Access_Token', token);
};

export const getRefreshTokenTokenInLocalStorage = (token) => {
    return localStorage.getItem("Refresh_Token");  // secureLocalStorage.setItem('Access_Token', token);
};


export const getTokenFromLocalStorage = () => {
    return localStorage.getItem("Access_Token");
    // return secureLocalStorage.getItem('Access_Token');
};

export const getCompanyIdFromLocalStorage = () => {
    return localStorage.getItem("companyId");
    // return secureLocalStorage.getItem('Access_Token');
};

export const clearLocalStorage = () => {
    localStorage.clear();
    // secureLocalStorage.clear();
};