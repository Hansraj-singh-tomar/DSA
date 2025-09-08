import httpRequest, { downloadHttpRequest } from "../apiWrapper"
import authContext from "../services/Protected/ProtectedContext"
import getHeader from "../getProtectedHeader"

function listReplenishmentHistory(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/replenishment/list-replenishment-history",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function getAllTCSABank(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-management/list-all-tcsa-banks",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function createReplenishment(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/replenishment/create-replenishment",
    data,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

function downloadSupportingDocument(data: any) {
  const url =
    "/api/payment/v1/replenishment/download-replenishment-supporting-doc"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...data },
    { responseType: "blob", headers: getHeader() },
  )
}

function cancelRequest(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/replenishment/cancel-replenishment-request",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function reverseRequest(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/replenishment/reverse-replenishment",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function fetchBackLogsData(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/EOD/get-backlog-trxns-list",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function getTCSAWalletBalance(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-management/fetchWalletBalance",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function getTCSATransitBalance(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/business-wallet-balance",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function netOffDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-management/netoff-details",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function fetchOpexBankData(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fetch-opex-bank-list",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function fetchNetOffDetailsList() {
  return httpRequest(authContext()).post(
    "/api/payment/v1/replenishment/netoff-detail-list",
    {},
    { headers: { channel: "WEB" } },
  )
}

export {
  listReplenishmentHistory,
  getAllTCSABank,
  createReplenishment,
  downloadSupportingDocument,
  cancelRequest,
  reverseRequest,
  fetchBackLogsData,
  getTCSAWalletBalance,
  getTCSATransitBalance,
  netOffDetails,
  fetchOpexBankData,
  fetchNetOffDetailsList,
}
