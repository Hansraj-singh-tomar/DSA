import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function updateMerchantDetails(body: any) {
  // console.log(body)
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/common/edit-temporary-merchant-profiles",
    body,
  )
}

export default updateMerchantDetails
