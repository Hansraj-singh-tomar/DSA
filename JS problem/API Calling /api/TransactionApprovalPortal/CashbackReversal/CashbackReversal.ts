import getHeader from "app/api/getProtectedHeader"
import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest, { downloadHttpRequest } from "../../apiWrapper"

function downloadCashbackReversalFileTemplate() {
  const url = "/api/payment/v1/cbk-reversal/download-cbk-reversal-template"
  return downloadHttpRequest(authContext()).post(
    url,
    {},
    { responseType: "blob", headers: getHeader() },
  )
}
function downloadReversalReport(data: any) {
  const url = "/api/payment/v1/cbk-reversal/downloadReport"
  return downloadHttpRequest(authContext()).post(url, data, {
    responseType: "blob",
    headers: getHeader(),
  })
}
function downloadValidationReport(data: any) {
  const url = "/api/payment/v1/cbk-reversal/downloadReport"
  return downloadHttpRequest(authContext()).post(url, data, {
    responseType: "blob",
    headers: getHeader(),
  })
}
function downloadSourceFile(data: any) {
  const url = "/api/payment/v1/cbk-reversal/downloadReport"
  return downloadHttpRequest(authContext()).post(url, data, {
    responseType: "blob",
    headers: getHeader(),
  })
}

function downloadReversalHistory(data: any) {
  const url = "/api/payment/v1/cbk-reversal/download-cbk-history"
  return downloadHttpRequest(authContext()).post(url, data, {
    responseType: "blob",
    headers: getHeader(),
  })
}

function uploadCashbackReversal(data: any) {
  const url = "/api/payment/v1/cbk-reversal/upload-cbk-reversal"
  return httpRequest(authContext()).post(url, data, {
    headers: { "Content-type": "multipart/form-data" },
  })
}

export {
  downloadCashbackReversalFileTemplate,
  uploadCashbackReversal,
  downloadReversalReport,
  downloadValidationReport,
  downloadSourceFile,
  downloadReversalHistory,
}
