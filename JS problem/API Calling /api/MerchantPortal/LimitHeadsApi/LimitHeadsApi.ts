import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function getTransactionList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/money-transfer/fetch-transaction-type",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getLimitHeadList(userType: string) {
  return httpRequest(authContext()).post(
    "/api/sysportal/limithead/v1/parent-list",
    { userType },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getLimitHeadParentListMaster(userType: string) {
  return httpRequest(authContext()).post(
    "/api/sysportal/limithead/v1/parent-list-master",
    { userType },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getLimitHeadById(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/limithead/v1/limit-head-by-id",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function addLimitHead(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/limithead/v1/new-parent",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function updateLimitHead(data: any) {
  return httpRequest(authContext()).put(
    "/api/sysportal/limithead/v1/mod-parent",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function deleteLimitHead(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/limithead/v1/rem-limit-head",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getLimitHeadApprovedList(userType: string) {
  return httpRequest(authContext()).post(
    "api/sysportal/limithead/v1/parent-list-master",
    { userType },
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getTransactionList,
  getLimitHeadList,
  getLimitHeadParentListMaster,
  getLimitHeadById,
  addLimitHead,
  updateLimitHead,
  deleteLimitHead,
  getLimitHeadApprovedList,
}
