import httpRequest from "../apiWrapper"
import authContext from "../services/Protected/ProtectedContext"

function listServicePriceCode(body: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/service-price-code-ams-list",
    body,
    controller ? { signal: controller?.signal } : {},
  )
}
function listServiceCommisionCode(body: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/service-commission-config/service-commission-code-ams-list",
    body,
    controller ? { signal: controller?.signal } : {},
  )
}
export { listServicePriceCode, listServiceCommisionCode }
