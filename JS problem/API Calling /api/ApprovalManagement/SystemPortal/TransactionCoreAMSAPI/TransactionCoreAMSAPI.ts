import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "app/api/apiWrapper"

function getTransactionList(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/TMS-API/get-transaction-list",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getCurrentProposedTransaction(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/TMS-API/get-current-proposed-txn",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

export { getTransactionList, getCurrentProposedTransaction }
