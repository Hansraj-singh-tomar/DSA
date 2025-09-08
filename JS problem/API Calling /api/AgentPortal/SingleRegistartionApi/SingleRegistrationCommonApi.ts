import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function agentSingleRegFormSubmitApi(formData: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/agents/signup",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

export default agentSingleRegFormSubmitApi
