import { encryptRequestData, getEncryptedKey } from "app/utils/encryption1"
import { AxiosRequestHeaders } from "axios"
import { resolvePortalForDomain } from "app/pages/login/domains"
import getChecksum from "./generateCheckSum"

function getHeader(): AxiosRequestHeaders {
  const token = window.localStorage.getItem("token")
  return {
    channel: "SYSTEM_PORTAL",
    client_id: "client",
    Authorization: `Bearer ${token}`,
    userType: "MERCHANT",
    portalname: resolvePortalForDomain(),
    deviceId: "5165sadfasd8f2",
    deviceType: "asfafsafasf",
    countryCode: "ZM",
  }
}

function getStoreHeader(): AxiosRequestHeaders {
  const token = window.localStorage.getItem("token")
  return {
    // channel: "SYSTEM_PORTAL",
    channel: "WEB",
    client_id: "client",
    Authorization: `Bearer ${token}`,
    userType: "STORE",
    portalname: resolvePortalForDomain() || "system-portal",
    deviceId: "5165sadfasd8f2",
    deviceType: "asfafsafasf",
  }
}
function getClaimHeader(): AxiosRequestHeaders {
  const token = window.localStorage.getItem("token")
  return {
    // channel: "SYSTEM_PORTAL",
    channel: "WEB",
    client_id: "client",
    Authorization: `Bearer ${token}`,
    userType: "",
    portalname: resolvePortalForDomain() || "system-portal",
    deviceId: "5165sadfasd8f2",
    deviceType: "asfafsafasf",
  }
}
// function getStoreMerchantHeader(): AxiosRequestHeaders {
//   const token = window.localStorage.getItem("token")
//   return {
//     channel: "SYSTEM_PORTAL",
//     client_id: "client",
//     Authorization: `Bearer ${token}`,
//     userType: "STORE",
//     portalname: resolvePortalForDomain() || "merchant-portal",
//     deviceId: "5165sadfasd8f2",
//     deviceType: "asfafsafasf",
//   }
// }

function getHeaderCust(): AxiosRequestHeaders {
  const token = window.localStorage.getItem("token")
  return {
    channel: "SYSTEM_PORTAL",
    client_id: "client",
    Authorization: `Bearer ${token}`,
    userType: "CUSTOMER",
    portalname: resolvePortalForDomain(),
    deviceId: "5165sadfasd8f2",
    deviceType: "asfafsafasf",
  }
}
function getHeaderAgent(): AxiosRequestHeaders {
  const token = window.localStorage.getItem("token")
  return {
    channel: "SYSTEM_PORTAL",
    client_id: "client",
    Authorization: `Bearer ${token}`,
    userType: "AGENT",
    portalname: resolvePortalForDomain(),
    deviceId: "5165sadfasd8f2",
    deviceType: "asfafsafasf",
  }
}
function getHeaderAgentAMS(): AxiosRequestHeaders {
  const token = window.localStorage.getItem("token")
  return {
    channel: "WEB",
    client_id: "client",
    Authorization: `Bearer ${token}`,
    userType: "AGENT",
    portalname: resolvePortalForDomain(),
    deviceId: "5165sadfasd8f2",
    deviceType: "asfafsafasf",
  }
}

function getHeaderDynamic(userType?: string): AxiosRequestHeaders {
  const token = window.localStorage.getItem("token")
  return {
    channel: "SYSTEM_PORTAL",
    client_id: "client",
    Authorization: `Bearer ${token}`,
    userType: userType || "MERCHANT",
    portalname: resolvePortalForDomain(),
    deviceId: "5165sadfasd8f2",
    deviceType: "asfafsafasf",
  }
}

export function getHeaderWithApiKey(
  body?: object,
  additionalHeaderDetails: any = {},
) {
  const { passKey, encryptedKey }: any = getEncryptedKey(false)
  const capabilityIdentifierEncrypted = encryptRequestData(
    localStorage.getItem("capability") || "allow-customer-management",
    passKey,
  )

  return {
    ...getHeader(),
    "Api-key": encryptedKey,
    checksum: getChecksum(body, passKey, false) || "",
    "API-X-KEY-FORWRDER": capabilityIdentifierEncrypted,
    ...additionalHeaderDetails,
  }
}

export default getHeader

export {
  getHeaderCust,
  getHeaderAgent,
  getHeaderAgentAMS,
  getHeaderDynamic,
  getStoreHeader,
  getClaimHeader,
}
