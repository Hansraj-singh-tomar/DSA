import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function getMerchantDetails(body: { userId: string }) {
  // console.log(body)
  return httpRequest(authContext()).post(
    "api/onboarding/v1/common/get-temporary-merchant-profiles",
    body,
  )
}

export default getMerchantDetails
