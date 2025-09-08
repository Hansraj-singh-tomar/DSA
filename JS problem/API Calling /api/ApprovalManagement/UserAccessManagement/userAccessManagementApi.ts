import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function getAllOtherConfigurations(data: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-ams-list",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getOtherConfigurationDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-ams-detail",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function updateOtherConfigRequests(data: any) {
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

function getAllRoleAndCapabilitiesRequests(data: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-ams-role-list",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getRolesAndCapsRequestDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-ams-role-detail",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getRolesAndCapsConfigDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-ams-role-portal-list",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function updateRoleRequests(data: any) {
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

function fetchRemarkDetails(formData: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/fetch-approval-details",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function fetchProfileLimitDataValue(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/user-profile-limit",
    body,
  )
}

export {
  getAllOtherConfigurations,
  getAllRoleAndCapabilitiesRequests,
  updateOtherConfigRequests,
  updateRoleRequests,
  getRolesAndCapsRequestDetails,
  getOtherConfigurationDetails,
  fetchRemarkDetails,
  getRolesAndCapsConfigDetails,
  fetchProfileLimitDataValue,
}
