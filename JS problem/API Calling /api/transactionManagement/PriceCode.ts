import axios, { AxiosInstance } from "axios"
import httpRequest from "../apiWrapper"

// write here jwt token etc required for authentication
function authContext(): AxiosInstance {
  return axios.create({
    baseURL: "https://",
  })
}

function getPriceCodeTable() {
  return httpRequest(authContext()).get(
    "api.jsonbin.io/v3/b/631ae0cde13e6063dca11879",
  )
}

export default getPriceCodeTable
