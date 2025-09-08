import { AxiosRequestHeaders } from "axios"

function getHeader(): AxiosRequestHeaders {
  return {
    channel: "WEB",
    client_id: "client",
    // Authorization: "Basic Y2xpZW50OnBhc3N3b3Jk",
    userType: "MERCHANT",
    deviceId: "5165sadfasd8f2",
    deviceType: "asfafsafasf",
  }
}

export default getHeader
