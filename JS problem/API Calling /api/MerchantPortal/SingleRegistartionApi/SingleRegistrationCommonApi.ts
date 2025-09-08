import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function merchantSingleRegFormSubmitApi(formData: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/merchant/signup",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

export default merchantSingleRegFormSubmitApi
