import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest, { downloadHttpRequest } from "../apiWrapper"
import getHeader from "../getProtectedHeader"

function cancelDMTAP(body: object) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/cancel-dmtap",
    body,
  )
}
function getGeneralBatchRecords(body: object) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/getBatchRecords",
    body,
  )
}

function getDisbursementTypeList(body: object) {
  return httpRequest(authContext()).post(
    "/api/sysportal/disbursement/v1/disbursement-type-list",
    body,
  )
}

function downloadVerificationReport(body: any) {
  const url = "/api/disbursement/api/downloadVerficationReport"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}

function downloadSourceFile(body: any) {
  const url = "/api/disbursement/api/downloadSourceFile"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}

export function getDownloadVerificationReport(body: object) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/downloadVerficationReport",
    body,
  )
}

function getPriceCodeDetais(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/common-lite/get-pricecode-data",

    { ...body },
  )
}

function getDisbursementSummary(body: any) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/disbursementSummary",
    { ...body },
  )
}

export function getDownloadSourceFile(body: object) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/downloadSourceFile",
    body,
  )
}

function perFormMerchantAction(body: object) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/performMerchantAction",
    body,
  )
}

function createAMS(body: object) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/create-ams-request",
    body,
  )
}

function updateApprovalRequest(body: object) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/update-batch-approval-status",
    body,
  )
}
function listGovtDisbursement(body: any) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/listDisbursement",
    body,
  )
}
function batchAction(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/approval-management/v1/update-batch-approval-status",
    body,
  )
}
function getBatchRecord(body: any) {
  return httpRequest(authContext()).post(
    "api/disbursement/api/batchRecord",
    body,
  )
}
function downloadGovtTransactionReport(body: any) {
  const url = "/api/disbursement/api/downloadGovDisTransactionReport"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}
function downloadGovtSourceFile(body: any) {
  const url = "/api/disbursement/api/downloadGovernmentSourceFile"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}
function downloadGovtVerificationReport(body: any) {
  const url = "/api/disbursement/api/downloadGovDisVerificationReport"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}
function iBasDetails(body: any) {
  return httpRequest(authContext()).post(
    "api/disbursement/api/getIbasDetails",
    body,
  )
}

function getSchemeCodeDetails(body: any) {
  return httpRequest(authContext()).post(
    "api/disbursement/api/schemeCodeDetails",
    body,
  )
}
function getSchemeCodeDetailsWithoutVersion(body: any) {
  return httpRequest(authContext()).post(
    "api/disbursement/api/schemeCodeDetails-latestVersion",
    body,
  )
}

function pauseRestartBatch(body: any) {
  return httpRequest(authContext()).post(
    "api/disbursement/api/pauseRestartBatch",
    body,
  )
}

function perFormGovtMerchantAction(body: object) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/performGovernmentMerchantAction",
    body,
  )
}
function getGovernmentDisbursmentConfig(body: any = {}) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/getGovernmentDisbursmentConfig",
    body,
  )
}
function fetchPriceCode(body: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/disbursement/v1/fetch-disb-price-code-details",
    { ...body },
  )
}
function getMerchantRelatedData(body: any) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/getMerchantRelatedDetails",
    body,
  )
}
function newGovernmentDisbursement(body: object) {
  return httpRequest(authContext()).post(
    "api/disbursement/api/newGovernmentDisbursement",
    body,
  )
}
function downloadGovtDisbursementTemplate(body: any) {
  const url = `${
    import.meta.env.VITE_URL
  }/api/disbursement/api/governmentDisbursementTemplate`
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body, userType: "MERCHANT" },
    { responseType: "blob", headers: getHeader() },
  )
}
function getMerchantAPI(body: any) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/merchantDisbursementData",
    body,
  )
}
function viewCommunicationConfigurationSchemeCode(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/notification-master/v1/template-by-id",
    body,
  )
}
function fetchNotificationMessage(body: object) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/fetch-notification-message",
    body,
  )
}

export {
  cancelDMTAP,
  createAMS,
  getGeneralBatchRecords,
  downloadVerificationReport,
  downloadSourceFile,
  getPriceCodeDetais,
  perFormMerchantAction,
  getDisbursementSummary,
  getDisbursementTypeList,
  updateApprovalRequest,
  listGovtDisbursement,
  batchAction,
  getBatchRecord,
  downloadGovtTransactionReport,
  downloadGovtSourceFile,
  downloadGovtVerificationReport,
  getSchemeCodeDetails,
  iBasDetails,
  perFormGovtMerchantAction,
  pauseRestartBatch,
  getGovernmentDisbursmentConfig,
  getSchemeCodeDetailsWithoutVersion,
  fetchPriceCode,
  getMerchantRelatedData,
  newGovernmentDisbursement,
  downloadGovtDisbursementTemplate,
  getMerchantAPI,
  viewCommunicationConfigurationSchemeCode,
  fetchNotificationMessage,
}
