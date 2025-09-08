import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function DistributorSearch(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/search-wallet-users",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function fetchApprovalHistory(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/approval-management/v1/list-ams-records",
    body,
  )
}

function fetchApprovalDetail(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/get-details-by-request-type",
    body,
  )
}

function fetchApprovalLevel(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/approval-management/v1/fetch-level-wise-approval-details",
    body,
  )
}

export default DistributorSearch
export { fetchApprovalHistory, fetchApprovalDetail, fetchApprovalLevel }
