import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../apiWrapper"

function getTemplateActionList() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/ussd-management/profile-action-drop-down",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}

function saveTemplateConfig(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/ussd-management/template-configuration",
    { ...body },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getTemplateslist(userProfileType: string, userType: string) {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/ussd-management/list-templates",
    { userProfileType, userType },
    {
      headers: { channel: "WEB" },
    },
  )
}

function templateAssignmentHistory(templateCode: string) {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/ussd-management/template-history",
    {
      templateCode,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getTemplateHistory(requestId: string) {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/ussd-management/template-approval-hist",
    {
      requestId,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function templateRequestById(payload: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/ussd-management/template-request-by-id",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getTemplateActionList,
  saveTemplateConfig,
  templateRequestById,
  templateAssignmentHistory,
  getTemplateslist,
  getTemplateHistory,
}
