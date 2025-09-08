import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function getAllUserTypeRequestsList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/moneyMovement/fetchListLiftingHistory",
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

function viewActionDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/moneyMovement/fetchLiftingHistoryById",
    {
      ...data,
    },
  )
}

export {
  getAllUserTypeRequestsList,
  getDetails,
  updateUserTypeRequest,
  viewActionDetails,
}
