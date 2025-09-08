import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../apiWrapper"

function getAdditionalPriceCodeList(data: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/pricecode/v1/additional-pricecode",
    { ...data },
  )
}

function getDefaultPriceCodeList(data: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/pricecode/v1/default-pricecode",
    { ...data },
  )
}

function deleteAdditionalPriceCode(data: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/pricecode/v1/rem-additional-price-code",
    { ...data },
  )
}

function scheduleDefaultPriceCode(data: any) {
  return httpRequest(authContext()).put(
    "api/sysportal/pricecode/v1/schedule-default-pc",
    { ...data },
  )
}

function scheduleAdditionalPriceCode(data: any) {
  return httpRequest(authContext()).put(
    "api/sysportal/pricecode/v1/schedule-additional-pc",
    { ...data },
  )
}

function updatePriority(data: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/pricecode/v1/update-priority",
    { ...data },
  )
}
function createDefaultPriceCode(data: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/pricecode/v1/new-default-pricecode",
    { ...data },
  )
}
function defaultSaveandSchedule(data: any) {
  return httpRequest(authContext()).put(
    "/api/sysportal/pricecode/v1/save-and-schedule-default-pc",
    { ...data },
  )
}
function additionalSaveAndSchedule(data: any) {
  return httpRequest(authContext()).put(
    "/api/sysportal/pricecode/v1/save-and-schedule-additional-pc",
    { ...data },
  )
}
function createAdditionalPriceCode(data: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/pricecode/v1/new-additional-pricecode",
    { ...data },
  )
}

function getPriceCodeDetailsByID(body: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/pricecode/v1/price-code-by-id",
    body,
    { headers: { channel: "WEB" } },
  )
}

function getTransactionList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/money-transfer/fetchTransactionType",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getAdditionalPriceCodeList,
  getDefaultPriceCodeList,
  deleteAdditionalPriceCode,
  scheduleDefaultPriceCode,
  scheduleAdditionalPriceCode,
  updatePriority,
  createDefaultPriceCode,
  createAdditionalPriceCode,
  defaultSaveandSchedule,
  additionalSaveAndSchedule,
  getPriceCodeDetailsByID,
  getTransactionList,
}
