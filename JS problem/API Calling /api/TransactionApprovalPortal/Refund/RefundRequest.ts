import authContext from "app/api/services/Protected/ProtectedContext"
import getHeader from "app/api/getProtectedHeader"
import httpRequest, { downloadHttpRequest } from "../../apiWrapper"

function getRefundRequestList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/approvalManagement/refundAmsView",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function refundReportDownload(body: any) {
  const url = "/api/payment/v1/transaction/download-refund-transaction-history"
  return downloadHttpRequest(authContext()).post(url, body, {
    responseType: "blob",
    headers: getHeader(),
  })
}

function refundRequestDownload(body: any) {
  const url = "/api/payment/v1/approvalManagement/downloadRefundAmsView"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}

function getRefundAMSCount(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/approvalManagement/fetchRefundAmsCount",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getRefundRequestList,
  getRefundAMSCount,
  refundRequestDownload,
  refundReportDownload,
}
