import axios from "axios";
import { LB_TO_KG_CONST } from "../global/constants";
import moment from "moment";

export const getHeaders = () => {
  const metaInfo = JSON.parse(sessionStorage.getItem("metaInfo"));
  const loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"));

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    appid: metaInfo?.APP_ID,
    deviceId: metaInfo?.DEVICE_ID,
    operator: metaInfo?.OPERATOR,
    channel: metaInfo?.CHANNEL,
    msisdn: loginInfo?.msisdn,
    access_token: loginInfo?.access_token,
  };
  return headers;
};

export const callPostApi = (url, headers, requestBody) => {
  return axios
    .post(url, requestBody, {
      headers: {
        ...headers,
      },
    })
    .then((response) => {
      if (response.status === 200 && response.data) {
        return response.data;
      } else {
        throw new Error("Unexpected API response");
      }
    })
    .catch((err) => {
      throw new Error("Unexpected API response");
    });
};

export const callGetApi = (url, headers, params) => {
  let updatedUrl = url;
  return axios
    .get(updatedUrl, {
      headers: {
        ...headers,
      },
      params
    })
    .then((response) => {
      if (response.status === 200 && response.data) {
        return response.data;
      } else {
        throw new Error("Unexpected API response");
      }
    })
    .catch((err) => {
      throw new Error("Unexpected API response");
    });
};

export const getDate = (daysBefore) => {
  if (daysBefore) {
    return new Date(new Date().getTime() - daysBefore * 24 * 60 * 60 * 1000)
      .toLocaleDateString()
      .split("/")
      .join("-");
  } else {
    return new Date().toLocaleDateString().split("/").join("-");
  }
};

export const getDateFormat = (daysBefore) => {
  if (daysBefore) {
    return moment(new Date(new Date().getTime() - daysBefore * 24 * 60 * 60 * 1000)).format("DD-MM-YYYY");
  } else {
    return moment().format("DD-MM-YYYY");
  }
};

export function getFormattedDate() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, '0'); // Add leading zero if day is less than 10
  const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth() returns month 0-11, so add 1
  const year = today.getFullYear(); // getFullYear() gives the 4-digit year

  return `${day}-${month}-${year}`;
}

export const getWeightOnUnit = (weight, unit) => {
  if (unit === "kg") {
    return Number(weight.toFixed(2));
  } else {
    return parseInt(weight * LB_TO_KG_CONST);
  }
};



