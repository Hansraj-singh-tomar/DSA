import getHeader from "app/api/getHeaders"
import axios from "axios"

function publicContext() {
  return axios.create({
    // baseURL: "https://mobilemoney-stg.nagad.com.bd:8443",
    baseURL: import.meta.env.VITE_URL,
    headers: getHeader(),
  })
}

export default publicContext
