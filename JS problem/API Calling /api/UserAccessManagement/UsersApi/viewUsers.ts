import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function getAllUsers(data: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-user-list",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getUserDetails(reqObj: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-user-detail",
    {
      ...reqObj,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function createUser(formData: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/create-user",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function updateUser(formData: any) {
  return httpRequest(authContext()).put(
    "/api/rolematrix/update-user",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getUserRoles(formData: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-user-role-list",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function updatePassword(formData: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/reset-password",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function resetPin(formData: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/common/set-pin",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function resetPinViaLink(formData: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/common/set-pin-via-link",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function checkLinkExpiry(formData: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/common/link-expiry",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function resetStaffPin(formData: any) {
  return httpRequest(authContext()).post(
    "/api/staff-management/v1/staff-mgmt/accept-staff-member-request-link",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getAllUsers,
  getUserDetails,
  createUser,
  getUserRoles,
  updateUser,
  updatePassword,
  resetPin,
  checkLinkExpiry,
  resetPinViaLink,
  resetStaffPin,
}
