/* eslint-disable prettier/prettier */
import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../apiWrapper"

function getTemplateListDropdown(payload: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/ussd-management/list-templates",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getJourneyDetailsBytemplateCode(templateCode: string) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/ussd-management/get-journey-by-code",
    {
      journeyCode: "",
      templateCode,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getJourneyDetailsByJourneyCode(journeyCode: string) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/ussd-management/get-journey-by-code",
    {
      journeyCode,
      templateCode: "",
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getJourneyHistory(requestId: string) {
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

function saveJourneyDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/ussd-management/save-journey",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getTemplateListDropdown,
  getJourneyDetailsBytemplateCode,
  saveJourneyDetails,
  getJourneyDetailsByJourneyCode,
  getJourneyHistory,
}
