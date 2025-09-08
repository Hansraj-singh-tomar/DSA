import httpRequest from "../apiWrapper"
import authContext from "../services/Protected/ProtectedContext"

function getPendingApprovalList(payload: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/ussd-management/ussd-pending-approval-list",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getUssdAmsPendingList(requestCode: string) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/ussd-management/ussd-ams-pending-approval-list",
    {
      requestCode,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function approveOrRejectionApi(payload: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/ussd-management/ussd-update-approval-management",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

export { getPendingApprovalList, approveOrRejectionApi, getUssdAmsPendingList }
