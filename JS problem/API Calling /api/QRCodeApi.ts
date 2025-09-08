import axios, { AxiosInstance } from "axios"
import httpRequest from "./apiWrapper"

function authContext(): AxiosInstance {
  return axios.create({
    baseURL: "https://",
  })
}

export default function getQRCode() {
  return httpRequest(authContext()).get(
    "api.jsonbin.io/v3/b/63932a56962da34f538b773d",
  )
}

// function getQRHistoryCode() {
//   return httpRequest(authContext()).get("")
// }
