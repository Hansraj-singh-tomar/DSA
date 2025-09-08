import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function getNewBetaBatchDetailApi(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/get-beta-batch-details",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

export default getNewBetaBatchDetailApi
