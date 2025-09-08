import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function distributorSingleRegFormSubmitApi(formData: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/distributors/single-onboarding",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

export default distributorSingleRegFormSubmitApi
