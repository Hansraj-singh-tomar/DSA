import httpRequest, { downloadHttpRequest } from "../apiWrapper"
import getHeader from "../getProtectedHeader"
import authContext from "../services/Protected/ProtectedContext"

function getTaggedDhList(payload: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/common/parents",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getTaggedDSOList(payload: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/common/parents",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getAgentTypeList(payload: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/merchant-type",
    { ...payload },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getUserTypeList(payload: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/list-user-type-versions",
    { ...payload },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getAllGQRCodeData(payload: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/qr-order/get-tagged-users-qr-system-portal",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getBatchDetails(payload: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/qr-order/get-batch-details",
    { ...payload },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getBatchHistory(payload: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/qr-order/get-batch-history",
    { ...payload },
    { headers: { channel: "WEB" } },
  )
}
function getBatchRecords(payload: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/qr-order/get-batch-records",
    { ...payload },
    { headers: { channel: "WEB" } },
  )
}

function uploadBulkQRCodeList(payload: object) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/qr-order/bulk-qr-order",
    payload,
  )
}

function approveDiscardApi(payload: object) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/qr-order/send-batch-approval-or-discard",
    payload,
  )
}

function downloadVerificationReportQR(body: any) {
  return downloadHttpRequest(authContext()).post(
    "/api/onboarding/v1/qr-order/get-validation-report",
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}

function downloadQRGenerationReport(body: any) {
  const url = "/api/onboarding/v1/qr-order/get-qr-generation-report"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}

function downloadSourceFileQR(body: any) {
  const url = "/api/onboarding/v1/qr-order/get-source-file"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}

function downloadDHTaggedUsersReport(body: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/qr-order/get-qr-report",
    body,
    { responseType: "blob", headers: getHeader() },
  )
}

function downloadHistoryReport(body: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/qr-order/get-self-dh-qr-generation-report",
    body,
    { responseType: "blob", headers: getHeader() },
  )
}

function downloadBulkBasicAndFixed(body: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/qr-order/generate-qr-fixed-static-position",
    body,
    {
      responseType: "blob",
    },
  )
}

function batchApprovedOrRejected(payload: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/update-batch-approval-status",
    { ...payload },
    { headers: { channel: "WEB" } },
  )
}
export {
  getTaggedDhList,
  getTaggedDSOList,
  getAgentTypeList,
  getAllGQRCodeData,
  getBatchDetails,
  getBatchHistory,
  getBatchRecords,
  uploadBulkQRCodeList,
  approveDiscardApi,
  downloadVerificationReportQR,
  downloadQRGenerationReport,
  downloadSourceFileQR,
  downloadDHTaggedUsersReport,
  downloadHistoryReport,
  downloadBulkBasicAndFixed,
  batchApprovedOrRejected,
  getUserTypeList,
}
