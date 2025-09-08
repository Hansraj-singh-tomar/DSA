import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

export function listTransactionTypeApi() {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/transactions/list-transaction-types",
    {},
    { headers: { channel: "WEB" } },
  )
}

export function listTCSATransactionsApi(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/transactions/list-tcsa-transactions",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

export function viewTransactionDetailsApi(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/transactions/view-transaction-details",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

export function listBulkTransactionsDetailsApi(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/transactions/list-bulk-transactions-details",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}
