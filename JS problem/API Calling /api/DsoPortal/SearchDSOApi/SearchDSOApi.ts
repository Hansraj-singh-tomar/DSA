import httpRequest from "../../apiWrapper"
import authContext from "../../services/Protected/ProtectedContext"

function searchWalletUserApi(payload: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/user-management-portal/search-wallet-users",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getUserInformationApi(payload: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/user-management-portal/get-user-information",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getAuditDataApi(payload: any) {
  return httpRequest(authContext()).post(
    "/api/audit/v1/audit-user-management-portal/get-audit-data",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getTagTableApi(payload: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/tag-management/customer-profile-by-code",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}
function updateProfileModeApi(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/common/update-profile-mode",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function listChangeStatusApi(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/customerManagementPortal/v1/list-change-status",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}
function updateAccountStatusApi(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/update-account-status",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function removeCustomerTagApi(reqObj: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/tag-management/deassign-customer-tag",
    {
      ...reqObj,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function expiredTagsApi(body: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/user-management-portal/list-expired-tags",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}
function listAMSRecords(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/list-ams-records",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function changeDSOTypeCode(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/change_type_detail",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  searchWalletUserApi,
  getUserInformationApi,
  getAuditDataApi,
  getTagTableApi,
  updateProfileModeApi,
  listChangeStatusApi,
  updateAccountStatusApi,
  removeCustomerTagApi,
  expiredTagsApi,
  listAMSRecords,
  changeDSOTypeCode,
}
