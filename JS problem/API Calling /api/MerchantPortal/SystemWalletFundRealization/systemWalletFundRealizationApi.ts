import authContext from "app/api/services/Protected/ProtectedContext"
import getHeader from "app/api/getProtectedHeader"
import httpRequest, { downloadHttpRequest } from "../../apiWrapper"

function getSystemWalletByAmount(data?: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fund-Realization/listSystemWalletFundRealizationbyAmount",
    { ...data },
  )
}

function getSystemWalletByTransactionId(data?: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fund-Realization/listSystemWalletFundRealizationbyTransactionId",
    { ...data },
  )
}
function getSystemWalletByDateRange(data?: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fund-Realization/listSystemWalletRealiazationbyDateRange",
    { ...data },
  )
}

function getFundRealizationView(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fund-Realization/list-digital-core-wallet",
    { ...data },
  )
}

function getFundRealizationHistory(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fund-Realization/list-realization-request-history-data",
    { ...data },
  )
}
function getPendingFundRealization(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fund-Realization/list-realization-pending-data",
    { ...data },
  )
}

function createRealization(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fund-Realization/create-realization",
    { ...data },
  )
}
function getFundRealizationByExcel(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fund-Realization/searchBySystemWalletRealiazationPendingDatabyTxnId",
    body,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

function getOperationBank(body?: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fetch-opex-bank-list",
    body,
  )
}

function executeRetry(body?: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fund-Realization/execute-retry",
    body,
  )
}

function executeDestroy(body?: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fund-Realization/execute-destroy-money",
    body,
  )
}

function downloadTransactionReportTemplateFile() {
  const url = "/api/payment/v1/fund-Realization/download-transactionId-template"
  return downloadHttpRequest(authContext()).post(
    url,
    {},
    {
      responseType: "blob",
      headers: getHeader(),
    },
  )
}

function fetchClawbackTransactions(data: any) {
  return httpRequest(authContext()).post(
    "/api/otherpayment/v1/fetch-clawback-transactions",
    { ...data },
  )
}

function searchByClawbackWalletRealiazationPendingDatabyTxnId(data: any) {
  return httpRequest(authContext()).post(
    "/api/otherpayment/v1/searchByClawbackWalletRealiazationPendingDatabyTxnId",
    data,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

function getListTcsaDetailsForFundRealization(body?: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fund-Realization/list-tcsa-details-for-fund-realization",
    body,
  )
}

export {
  getSystemWalletByAmount,
  getSystemWalletByTransactionId,
  getSystemWalletByDateRange,
  getFundRealizationView,
  getFundRealizationHistory,
  getPendingFundRealization,
  createRealization,
  getFundRealizationByExcel,
  getOperationBank,
  executeRetry,
  executeDestroy,
  downloadTransactionReportTemplateFile,
  fetchClawbackTransactions,
  searchByClawbackWalletRealiazationPendingDatabyTxnId,
  getListTcsaDetailsForFundRealization,
}
