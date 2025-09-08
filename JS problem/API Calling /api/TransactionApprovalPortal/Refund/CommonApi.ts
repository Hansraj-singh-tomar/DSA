import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function getTCSABanksList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-management/list-refund-primary-subsidiary-details",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

// eslint-disable-next-line import/prefer-default-export
export { getTCSABanksList }
