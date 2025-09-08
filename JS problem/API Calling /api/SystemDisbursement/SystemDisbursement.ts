import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest, { downloadHttpRequest } from "../apiWrapper"
import getHeader from "../getProtectedHeader"

const baseSDAPIPath = "api/disbursement/api"

function updateDMTAP(body: object) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/updateDMTAP",
    body,
  )
}
function fetchListDisbursementType(body: object) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/listSystemDisbursementType",
    body,
  )
}
function updateSystemDisbursementType(body: object) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/updateSystemDisbursementType",
    body,
  )
}
function addSystemDisbursementType(body: object) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/addSystemDisbursementType",
    body,
  )
}
function fetchTypeListData(body: object) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/disbursementSummary",
    body,
  )
}
function fetchBatchRecords(body: object) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/getSysDisBatchRecords",
    body,
  )
}
function performBatchAction(body: object) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/performBatchAction",
    body,
  )
}
function rescheduleSystemDisbursement(body: object) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/rescheduleSystemDisbursement",
    body,
  )
}
function downloadSDTransactionReport(body: any) {
  const url = `${baseSDAPIPath}/downloadSysDisTransactionReport`
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}

function downloadSDVerificationReport(body: any) {
  const url = `/${baseSDAPIPath}/downloadSysDisVerficationReport`
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}

function downloadSDSourceReport(body: any) {
  const url = `/${baseSDAPIPath}/downloadSysDisSourceFile`
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}
function downloadSDTemplate(body: any) {
  const url = `/${baseSDAPIPath}/downloadSystemDisbursementTemplate`
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}
function createNewSD(body: object) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/initiateSystemDisbursement",
    body,
  )
}
function fetchMerchantWalletandFees(body: object) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/isAllowedForDisbursement",
    body,
  )
}
function checkAllowedSDBatch(body: object) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/checkAllowedForBatchUpload",
    body,
  )
}
function amsBatchApproval(body: object) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/update-batch-approval-status",
    body,
  )
}
function getSmsTemplateData(body: object) {
  return httpRequest(authContext()).post(
    "/api/sysportal/notification-master/v1/template-list",
    body,
  )
}

export default null
export {
  fetchListDisbursementType,
  updateSystemDisbursementType,
  addSystemDisbursementType,
  fetchTypeListData,
  fetchBatchRecords,
  performBatchAction,
  rescheduleSystemDisbursement,
  downloadSDTransactionReport,
  downloadSDVerificationReport,
  downloadSDSourceReport,
  downloadSDTemplate,
  createNewSD,
  fetchMerchantWalletandFees,
  checkAllowedSDBatch,
  amsBatchApproval,
  updateDMTAP,
  getSmsTemplateData,
}
