import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function getUserInformation(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/get-user-information",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

export default getUserInformation
