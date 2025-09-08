import httpRequest, { downloadHttpRequest } from "app/api/apiWrapper"
import getHeader from "app/api/getProtectedHeader"
import authContext from "app/api/services/Protected/ProtectedContext"

function listBulkBatchReversalDetails(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/reversal/list-Bulk-Batch-Reversal",
    { ...data },
    controller ? { signal: controller?.signal } : {},
  )
}

function getBulkDetails(data: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/reversal/get-Bulk-Details",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function downloadSupportingDocument(data: any) {
  const url = "/api/payment/v1/reversal/download-Reversal-Supporting-Doc"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...data },
    { responseType: "blob", headers: getHeader() },
  )
}

function searchBulkReversal(data: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/reversal/bulk-reversal",
    data,
    { headers: { channel: "WEB" } },
  )
}

function createBatchReversal(data: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/reversal/create-batch-reversal",
    data,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

function searchBatch(data: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/reversal/fetch-Batch-Details",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function discardRequest(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/reversal/discard-Batch",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function approveBatchRequest(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/reversal/initiate-Bulk-Ams-Request",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function approveBulkRequest(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/reversal/initiate-Bulk-Reversal",
    body,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

export {
  listBulkBatchReversalDetails,
  getBulkDetails,
  searchBulkReversal,
  discardRequest,
  approveBulkRequest,
  approveBatchRequest,
  createBatchReversal,
  searchBatch,
  downloadSupportingDocument,
}
