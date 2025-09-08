import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function fetchRealizationRequestData(body: object) {
  return httpRequest(authContext()).post(
    "api/payment/v1/fund-Realization/list-digital-core-wallet-by-process-category",
    body,
  )
}

function fetchOperationalBankAccData() {
  return httpRequest(authContext()).post(
    "api/payment/v1/fetch-opex-bank-list",
    {},
  )
}

function getRealizationTxnDetails(body: object) {
  return httpRequest(authContext()).post(
    "api/payment/v1/fund-Realization/list-digital-core-wallet-details-by-process-category",
    { ...body },
  )
}

export default null
export {
  fetchRealizationRequestData,
  fetchOperationalBankAccData,
  getRealizationTxnDetails,
}
