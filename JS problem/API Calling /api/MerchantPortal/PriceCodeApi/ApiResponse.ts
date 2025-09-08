import axios, { AxiosInstance } from "axios"
import httpRequest from "../../apiWrapper"

// write here jwt token etc required for authentication
function authContext(): AxiosInstance {
  return axios.create({
    baseURL: "https://",
  })
}

function getPriceCode() {
  return httpRequest(authContext()).get(
    "api.jsonbin.io/v3/b/631af19be13e6063dca12ac7",
  )
}

export default getPriceCode
