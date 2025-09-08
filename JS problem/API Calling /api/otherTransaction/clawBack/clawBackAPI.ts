import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function clawbackList(body: any) {
  return httpRequest(authContext()).post(
    "api/otherpayment/v1/listNewClawbackRequest",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}
function clawbackBatchRecords(body: any) {
  return httpRequest(authContext()).post(
    "api/otherpayment/v1/listClawbackBatchRecords ",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}
function clawbackTracker(body: any) {
  return httpRequest(authContext()).post(
    "api/otherpayment/v1/clawbackTracker",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function clawbackMatrix(body: any) {
  return httpRequest(authContext()).post(
    "api/otherpayment/v1/clawBackMatrix",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function cancelDI(body: any) {
  return httpRequest(authContext()).post("api/otherpayment/v1/cancelDI", body, {
    headers: { channel: "WEB" },
  })
}

function approvalCancelRequest(body: any) {
  return httpRequest(authContext()).post(
    "/api/otherpayment/v1/sendBatchForBOApproval",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function discardCancelRequest(body: any) {
  return httpRequest(authContext()).post(
    "/api/otherpayment/v1/discardBatch",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function clawbackLimit(body: any) {
  return httpRequest(authContext()).post(
    "api/otherpayment/v1/isLimitAvailableForNewClawbackRequest",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function createNewClawback(body: any) {
  return httpRequest(authContext()).post(
    "api/otherpayment/v1/createNewClawBack",
    body,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

function fetchTemplateList(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/notification-master/v1/template-list",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function viewCommunicationConfigurationSchemeCode(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/notification-master/v1/template-by-id",
    body,
  )
}

export {
  clawbackList,
  clawbackMatrix,
  clawbackTracker,
  clawbackBatchRecords,
  approvalCancelRequest,
  discardCancelRequest,
  createNewClawback,
  cancelDI,
  clawbackLimit,
  fetchTemplateList,
  viewCommunicationConfigurationSchemeCode,
}
