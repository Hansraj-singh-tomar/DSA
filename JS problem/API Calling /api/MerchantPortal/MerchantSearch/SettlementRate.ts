import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest, { downloadHttpRequest } from "../../apiWrapper"

function getSettlementReportType(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/system-commons/merchant-settlement-rate-history-drop-down",
    body,
  )
}

function getSettlementReport(body: any) {
  return downloadHttpRequest(authContext()).post(
    "api/onboarding/v1/common-lite/merchant-settlement-rate-history",
    body,
    { responseType: "blob" },
  )
}

export { getSettlementReportType, getSettlementReport }
