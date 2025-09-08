import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"
import publicContext from "app/api/services/Public/PublicContext"

function getReconTransactionList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/recon/list-transactions",
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

function getReconListByReconId(data: any) {
  return httpRequest(authContext()).get(
    `api/payment/v1/recon/recon-detail-by-id?reconId=${data.reconId}`,
    {
      ...data,
    },
  )
}

function getReconSummary(data: any) {
  return httpRequest(authContext()).post("/api/payment/v1/recon/summary", {
    ...data,
  })
}

function downloadReconTransactionRecon(data?: any) {
  return httpRequest(publicContext()).post(
    "/api/payment/v1/recon/download-transaction-file",
    {
      ...data,
    },
    {
      responseType: "blob",
    },
  )
}

export {
  getReconTransactionList,
  getDetails,
  updateUserTypeRequest,
  getReconListByReconId,
  getReconSummary,
  downloadReconTransactionRecon,
}
