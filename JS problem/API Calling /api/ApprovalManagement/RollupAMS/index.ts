import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function getRollupRequestsList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/money-transfer/fetch-rollup-history",
    {
      ...data,
    },
  )
}

function updateUserTypeRequest(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/update-batch-approval-status",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function updateAmountRequest(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/money-transfer/update-rollup-amount",
    {
      ...data,
    },
  )
}

function downloadRollupHistory(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/money-transfer/download-rollup-history",
    {
      ...data,
    },
    {
      responseType: "blob",
    },
  )
}

// eslint-disable-next-line import/prefer-default-export
export {
  getRollupRequestsList,
  updateUserTypeRequest,
  updateAmountRequest,
  downloadRollupHistory,
}
