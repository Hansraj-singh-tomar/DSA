import authContext from "app/api/services/Protected/ProtectedContext"
import getHeader from "app/api/getProtectedHeader"
import httpRequest, { downloadHttpRequest } from "../../apiWrapper"

function getLiftingAndParkedList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/approvalManagement/fetchLiftingHistoryByFilter",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getParkedByList() {
  return httpRequest(authContext()).post(
    "/api/payment/v1/approvalManagement/fetchLiftingParkedByList",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}

function getLiftingAMSCount(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/approvalManagement/fetchLiftingAmsCount",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function approveRejectParkLifting(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/approvalManagement/approveLifting",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function downloadLiftingAndParkedList(body: any) {
  const url =
    "/api/payment/v1/approvalManagement/download-lifting-history-filter"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}

export {
  getLiftingAndParkedList,
  getParkedByList,
  getLiftingAMSCount,
  approveRejectParkLifting,
  downloadLiftingAndParkedList,
}
