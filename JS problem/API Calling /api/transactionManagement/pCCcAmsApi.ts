import httpRequest from "../apiWrapper"
import authContext from "../services/Protected/ProtectedContext"

function getPriceCodeRequests(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/pricecode/v1/price-code-ams-list",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function getCommissionCodeRequests(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/commissioncode/v1/commission-code-ams-list",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function approveOrRejectPcCcRequest(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/update-batch-approval-status",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function getPriceCodeDetailsByID(body: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/pricecode/v1/price-code-by-id",
    body,
    { headers: { channel: "WEB" } },
  )
}

function getCommissionCodeDetailsByID(body: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/commissioncode/v1/commission-code-by-id",
    body,
    { headers: { channel: "WEB" } },
  )
}

function getCommisionCodeRequests(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/commissioncode/v1/commission-code-ams-list",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

export {
  getPriceCodeRequests,
  getCommissionCodeRequests,
  approveOrRejectPcCcRequest,
  getPriceCodeDetailsByID,
  getCommissionCodeDetailsByID,
  getCommisionCodeRequests,
}
