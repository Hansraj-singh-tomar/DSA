import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function getProductType(body?: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/transaction/fetch-transaction-category-details",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getTransactionType(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/transaction/fetch-transaction-type",
    { ...body },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getTransactionType2(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/money-transfer/fetch-transaction-type",
    { ...body },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getTransactionStatus(body?: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/transaction/fetch-transaction-status-details",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getWalletTransaction(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/transaction/fetchWalletTransaction",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getDetails(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/transaction/fetch-transaction-details",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getResendNotification(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/transaction/resendTransactionNotification",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getInitiateSmtapReverse(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/smtapDetails/initiateSmtapReverse",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getProductType,
  getTransactionType,
  getTransactionStatus,
  getWalletTransaction,
  getDetails,
  getResendNotification,
  getInitiateSmtapReverse,
  getTransactionType2,
}
