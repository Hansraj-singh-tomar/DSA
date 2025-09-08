import getHeader, {
  getClaimHeader,
  getHeaderAgent,
  getHeaderAgentAMS,
  getHeaderCust,
  getHeaderDynamic,
  getStoreHeader,
  // getStoreMerchantHeader,
} from "app/api/getProtectedHeader"
import axios, { AxiosInstance } from "axios"

// write here jwt token etc required for authentication
function authContext(): AxiosInstance {
  return axios.create({
    baseURL: import.meta.env.VITE_URL,
    headers: getHeader(),
  })
}

function storeContext(): AxiosInstance {
  return axios.create({
    baseURL: import.meta.env.VITE_URL,
    headers: getStoreHeader(),
  })
}
function claimContext(): AxiosInstance {
  return axios.create({
    baseURL: import.meta.env.VITE_URL,
    headers: getClaimHeader(),
  })
}

function authContextCustomer(): AxiosInstance {
  return axios.create({
    baseURL: import.meta.env.VITE_URL,
    headers: getHeaderCust(),
  })
}
function authContextAgent(): AxiosInstance {
  return axios.create({
    baseURL: import.meta.env.VITE_URL,
    headers: getHeaderAgent(),
  })
}
function authContextAgentAMS(): AxiosInstance {
  return axios.create({
    baseURL: import.meta.env.VITE_URL,
    headers: getHeaderAgentAMS(),
  })
}

function authContextDynamic(userType?: string): AxiosInstance {
  return axios.create({
    baseURL: import.meta.env.VITE_URL,
    headers: getHeaderDynamic(userType),
  })
}
export function authContext1(): AxiosInstance {
  return axios.create({
    baseURL: "https://mobilemoney-stg.nagad.com.bd:8443",
    headers: getHeader(),
  })
}

export function authContext3(): AxiosInstance {
  return axios.create({
    baseURL: import.meta.env.VITE_PAYMENT_BASE_URL,
    headers: getHeader(),
  })
}

export default authContext

export {
  authContextCustomer,
  authContextAgent,
  authContextAgentAMS,
  authContextDynamic,
  storeContext,
  claimContext,
}
