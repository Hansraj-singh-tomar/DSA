import authContext from "app/api/services/Protected/ProtectedContext"
import getHeader from "app/api/getProtectedHeader"
import httpRequest, { downloadHttpRequest } from "../../apiWrapper"

function getProductType() {
  return httpRequest(authContext()).post(
    "api/payment/v1/transaction/fetch-transaction-category-details",
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

function getTransactionStatus() {
  return httpRequest(authContext()).post(
    "api/payment/v1/transaction/fetch-transaction-status-details",
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

function downloadTransactionReportReceipt(body: any) {
  return downloadHttpRequest(authContext()).post(
    "/api/payment/v1/generate/pdf/receipt",
    { ...body },
    { headers: getHeader() },
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
  downloadTransactionReportReceipt,
}
