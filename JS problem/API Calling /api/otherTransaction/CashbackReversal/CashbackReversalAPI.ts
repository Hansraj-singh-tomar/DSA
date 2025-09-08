import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function getSelectedBatchListDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/cbk-reversal/list-cbk-batch-reversal-details",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getBatchListSummary(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/cbk-reversal/list-cbk-batch-reversal-summary",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getBatchHistorySummary(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/cbk-reversal/list-cbk-batch-reversal-summary",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getCashbackRequestHistory(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/cbk-reversal/get-cbk-history",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getViewCashbackHistoryData(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/cbk-reversal/view-cbk-history",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getBatchHistoryDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/cbk-reversal/list-cbk-batch-reversal-details",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function retryBatchReversal(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/cbk-reversal/retry-cbk-reversal",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function batchAction(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/cbk-reversal/batchAction",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getSelectedBatchListDetails,
  getBatchListSummary,
  retryBatchReversal,
  getBatchHistorySummary,
  getBatchHistoryDetails,
  batchAction,
  getCashbackRequestHistory,
  getViewCashbackHistoryData,
}
