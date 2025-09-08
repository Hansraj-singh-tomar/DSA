import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function getLiftingAdjustment(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/lifting-adjustment/list-lifting-adjustments",
    { ...data },
  )
}

function getTransactionType() {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/transactions/list-transaction-types",
    {},
  )
}

function getRefundAdjustment(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/refund-adjustment/list-refund-adjustments",
    { ...data },
  )
}

function getTcsaAdjustment(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/tcsa-adjustment/list-tcsa-adjustment",
    { ...data },
  )
}

export {
  getLiftingAdjustment,
  getTransactionType,
  getRefundAdjustment,
  getTcsaAdjustment,
}
