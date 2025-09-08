import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../../apiWrapper"

function getProfileProfitHistory(body: any) {
  return httpRequest(authContext()).post(
    "api/audit/v1/audit-user-management-portal/get-audit-data",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

export default getProfileProfitHistory
