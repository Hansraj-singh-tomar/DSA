import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

export function fetchTCSAInvestmentsList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/investments/list-tcsa-investment",
    data,
    { headers: { channel: "WEB" } },
  )
}

export function fetchTCSAEncashmentsList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/encashments/list-encashment",
    data,
    { headers: { channel: "WEB" } },
  )
}
