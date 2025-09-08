import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

export function listAdjustmentTypes(payload: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/adjustments/list-adjustment-types",
    payload,
  )
}

export function fetchTCSAWalletDetails(payload: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-management/list-tcsa",
    payload,
  )
}

export function fetchLiftingTransactionDetails(payload: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/lifting-adjustment/fetch-trxn-details",
    payload,
  )
}

export function listLiftingAdjustments(payload: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/lifting-adjustment/list-lifting-adjustments",
    payload,
  )
}

export function createNewLiftingAdjustment(payload: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/lifting-adjustment/create-lifting-adjustment",
    payload,
  )
}

export function fetchRefundTransactionDetails(payload: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/refund-adjustment/fetch-trxn-details",
    payload,
  )
}

export function listRefundAdjustments(payload: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/refund-adjustment/list-refund-adjustments",
    payload,
  )
}

export function createNewRefundAdjustment(payload: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/refund-adjustment/create-refund-adjustment",
    payload,
  )
}

export function retryFundTransfer(payload: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/refund-adjustment/retry-fund-transfer",
    payload,
  )
}

export function reversalEMoney(payload: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/refund-adjustment/reversal-emoney",
    payload,
  )
}

export function listRefundUserBanks(payload: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/moneyMovement/fetchRefundUsersLinkedBanks",
    payload,
  )
}

export function fetchInvestmentTransactionDetails(payload: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/tcsa-portal/investments/list-tcsa-investment",
    {
      approvalStatus: [],
      investmentDate: {},
      maturityDate: {},
      pageNo: 0,
      pageSize: 1,
      searchBy: payload.trxnId ?? "NA",
    },
  )
}

export function listTCSAAdjustments(payload: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/tcsa-adjustment/list-tcsa-adjustment",
    payload,
  )
}

export function getMerchantProfile(payload: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/common/get-user-profiles",
    payload,
    {
      headers: {
        userType: "MERCHANT",
      },
    },
  )
}

export function getDistributorProfile(payload: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/common/get-user-profiles",
    payload,
    {
      headers: {
        userType: "DISTRIBUTOR",
      },
    },
  )
}

export function createNewTCSAAdjustment(payload: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/tcsa-adjustment/create-tcsa-adjustment",
    payload,
  )
}

export function fetchTCSATransactionDetails(payload: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/transactions/view-transaction-details",
    payload,
  )
}

export function fetchTCSAAccounts() {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-management/list-tcsa-account",
    {},
  )
}

export function fetchRealizationTransactionDetails(payload: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fund-Realization/fetch-trxn-details",
    {
      realizationId: payload.trxnId ?? "",
    },
  )
}

export function fetchReplenishmentTransactionDetails(payload: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/replenishment/list-replenishment-history",
    {
      pageNo: 0,
      pageSize: 1,
      transactionId: payload.trxnId ?? "",
    },
  )
}
