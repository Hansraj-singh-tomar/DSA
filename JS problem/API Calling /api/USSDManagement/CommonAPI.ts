import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../apiWrapper"

function getUserType() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/ussd-management/user-type-drop-down",
    {},
  )
}

function getProfileData() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/ussd-management/user-sub-type-drop-down",
    {},
  )
}

export { getUserType, getProfileData }
