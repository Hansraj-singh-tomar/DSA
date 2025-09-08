import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function CSbasicSearch(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/search-wallet-users",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

export default CSbasicSearch
