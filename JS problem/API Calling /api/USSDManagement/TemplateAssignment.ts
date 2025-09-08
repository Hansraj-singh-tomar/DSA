import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../apiWrapper"

function getTemplateAssignmentList(userType: string, userProfileType: string) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/ussd-management/list-templates",
    {
      userType,
      userProfileType,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getAccountStatusList() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/ussd-management/account-status-drop-down",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}

function getUserTypesList(payload: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/merchant-type",
    { ...payload },
    {
      headers: { channel: "WEB" },
    },
  )
}

function saveTemplateAssignments(body: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/ussd-management/template-assignment",
    { ...body },
    {
      headers: { channel: "WEB" },
    },
  )
}

function validateTemplateAssignment(body: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/ussd-management/validate-template",
    { ...body },
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getTemplateAssignmentList,
  getAccountStatusList,
  getUserTypesList,
  saveTemplateAssignments,
  validateTemplateAssignment,
}
