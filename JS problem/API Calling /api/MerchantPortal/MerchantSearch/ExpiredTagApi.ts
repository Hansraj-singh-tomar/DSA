import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function getTagExpired(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/list-expired-tags",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

export default getTagExpired
