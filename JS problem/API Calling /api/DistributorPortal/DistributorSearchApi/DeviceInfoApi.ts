import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function getDeviceInfo(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/list-device-info",
    body,
    {
      headers: { channel: "WEB", userType: body.userType },
    },
  )
}

function getDewhitelist(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/device-dewhitelist",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

export { getDeviceInfo, getDewhitelist }
