import httpRequest, { downloadHttpRequest } from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"
import getHeader from "app/api/getProtectedHeader"

function createNewTcsaTransactionApi(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/transactions/create-tcsa-transaction",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function listTransactionTypeApi() {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/transactions/list-transaction-types",
    {},
    { headers: { channel: "WEB" } },
  )
}

function listTCSATransactionsApi(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/transactions/list-tcsa-transactions",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function viewTransactionDetailsApi(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/transactions/view-transaction-details",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function createBulkTransaction(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/transactions/upload/create-bulk-transaction",
    body,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

function listBulkTransactionsDetailsApi(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/transactions/list-bulk-transactions-details",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function getAmountInWordsApi(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/conversion/getAmountInWords",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function initiateReversalApi(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/transactions/initiate-reversal",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function initiateBulkReversalApi(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/transactions/initiate-bulk-trxn-reversal",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function sendForApproval(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/transactions/send-for-approval-bulk-trxn",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function getBankList(reqObj: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-management/list-all-tcsa-banks",
    reqObj,
    {
      headers: { channel: "WEB" },
    },
  )
}

function fetchBranchNames(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-management/list-tcsa",
    body,
  )
}

function downloadSourceFile(body: any) {
  return downloadHttpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/transactions/downloadSourceFile",
    body,
    {
      responseType: "blob",
      headers: getHeader(),
    },
  )
}

function downloadVerificationReport(body: any) {
  return downloadHttpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/transactions/downloadVerificationReport",
    body,
    {
      responseType: "blob",
      headers: getHeader(),
    },
  )
}

export {
  createNewTcsaTransactionApi,
  listTransactionTypeApi,
  listTCSATransactionsApi,
  viewTransactionDetailsApi,
  createBulkTransaction,
  listBulkTransactionsDetailsApi,
  getAmountInWordsApi,
  initiateReversalApi,
  initiateBulkReversalApi,
  sendForApproval,
  getBankList,
  fetchBranchNames,
  downloadSourceFile,
  downloadVerificationReport,
}
