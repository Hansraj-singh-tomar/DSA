import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../apiWrapper"

function dsoSingleRegFormSubmitApi(formData: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/dsos/signup",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

export default dsoSingleRegFormSubmitApi
