import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function getTransactionDetails(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/reversal/get-Transaction-Details",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function initiateSingleReversal(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/reversal/initiate-Single-Reversal",
    body,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

function listReversalHistory(body: any, controller?: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/reversal/list-Reversal-History",
    body,
    controller ? { signal: controller?.signal } : {},
  )
}

export { getTransactionDetails, initiateSingleReversal, listReversalHistory }
