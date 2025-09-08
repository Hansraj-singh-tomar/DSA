import authContext from "../services/Protected/ProtectedContext"
import httpRequest, { downloadHttpRequest } from "../apiWrapper"
import getHeader from "../getProtectedHeader"

const baseRechargePath = "api/utility-management/mobile-recharge/v1"

function fetchRechargeData(body: any) {
  return httpRequest(authContext()).post(
    `${baseRechargePath}/list-bulk-batchsummary`,
    body,
  )
}
function createRechargeBatch(body: any) {
  return httpRequest(authContext()).post(
    `${baseRechargePath}/bulk-mobilerechange`,
    body,
  )
}
function fetchBatchRecordList(body: any) {
  return httpRequest(authContext()).post(
    `${baseRechargePath}/list-bulk-batchdetails`,
    body,
  )
}
function getPackageDetailsList(body: any) {
  return httpRequest(authContext()).post(
    `${baseRechargePath}/package-details`,
    body,
  )
}
function downloadMobileRechargeTemplate(body: any) {
  const url = `/${baseRechargePath}/export-merchant-tagging-temp`
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}
function downloadMobileRechargeVerificationReport(body: any) {
  const url = `/${baseRechargePath}/download-bulkrecharge-verificationreport`
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}
function downloadMobileRechargeSourceReport(body: any) {
  const url = `/${baseRechargePath}/download-mobilerecharge-file`
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}

function performRechargeMerchantAction(type: string, body: any) {
  let apiUrl = ""
  switch (type) {
    case "DISCARD":
      apiUrl = `${baseRechargePath}/discard-draft-batch`
      break
    case "REVALIDATE":
      apiUrl = `${baseRechargePath}/revalidation-batch`
      break
    case "RESCHDEULE":
      apiUrl = `${baseRechargePath}/reschedule-recharge`
      break
    case "APPROVED":
      apiUrl =
        "api/sysportal/approval-management/v1/update-batch-approval-status"
      break
    case "REJECTED":
      apiUrl =
        "api/sysportal/approval-management/v1/update-batch-approval-status"
      break
    default:
      apiUrl = ""
  }
  return httpRequest(authContext()).post(apiUrl, body)
}

export default null
export {
  fetchRechargeData,
  createRechargeBatch,
  fetchBatchRecordList,
  getPackageDetailsList,
  downloadMobileRechargeTemplate,
  downloadMobileRechargeVerificationReport,
  downloadMobileRechargeSourceReport,
  performRechargeMerchantAction,
}
