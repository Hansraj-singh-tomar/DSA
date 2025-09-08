import authContext from "app/api/services/Protected/ProtectedContext"
import getHeader from "app/api/getProtectedHeader"
import httpRequest, { downloadHttpRequest } from "../../apiWrapper"

function getRefundHistoryList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/approvalManagement/fetchRefundActivityHistoryByFilter",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function viewRefundHistoryDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/approvalManagement/fetchRefundAmsDetails",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function viewRefundHistoryHierarchyLevels(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/fetch-level-wise-approval-details",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function downloadEFTReport(body: any) {
  const url = "/api/payment/v1/approvalManagement/downloadRefundAmsHistoryView"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}

function downloadRefundHistoryReport(body: any) {
  const url = "/api/payment/v1/approvalManagement/downloadRefundAmsHistoryView"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}

export {
  downloadEFTReport,
  getRefundHistoryList,
  downloadRefundHistoryReport,
  viewRefundHistoryDetails,
  viewRefundHistoryHierarchyLevels,
}
