import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function getBanksList(data: any) {
  return httpRequest(authContext()).post(
    "/api/common/v1/getBanksList",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function updateBatchApprovalStatus(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/update-batch-approval-status",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getLiftingApiRequests(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/autoApprovalManagement/fetchBankAutoApprovalList",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

export { getBanksList, updateBatchApprovalStatus, getLiftingApiRequests }
