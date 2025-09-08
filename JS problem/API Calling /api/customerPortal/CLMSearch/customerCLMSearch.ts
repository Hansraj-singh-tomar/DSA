import axios, { AxiosInstance } from "axios"
import getHeader from "app/api/getHeaders"
import httpRequest from "../../apiWrapper"

function authContext(): AxiosInstance {
  return axios.create({
    baseURL: import.meta.env.VITE_CLM_URL,
    headers: getHeader(),
  })
}

function getCustomerDetails(body: any) {
  return httpRequest(authContext()).post(
    "/content-fetcher/fetchContentForCustomerCare/",
    body,
    {},
  )
}

export default getCustomerDetails
