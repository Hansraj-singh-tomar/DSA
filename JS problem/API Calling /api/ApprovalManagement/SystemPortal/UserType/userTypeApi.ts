import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function getAllUserTypeRequestsList(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/fetch-user-type-details",
    {
      ...data,
    },
  )
}

function getDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/get-user-details",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
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

function manualSuccessTransactionRecon(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/recon/manual-success-recon-transactions",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function unfreeezeTranscation(data: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/recon/manual-unfreeze-recon-transactions",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function manulRetryTranscation(data: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/recon/retry-recon-transactions",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getAllUserTypeRequestsList,
  getDetails,
  unfreeezeTranscation,
  updateUserTypeRequest,
  manulRetryTranscation,
  manualSuccessTransactionRecon,
}
