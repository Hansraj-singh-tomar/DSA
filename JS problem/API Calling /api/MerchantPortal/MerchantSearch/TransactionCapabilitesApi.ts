import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function fetchTypeFunctionalitiesAPI(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/fetch_type_capabilities",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function editTypeCapabilitiesAPI(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/edit_type_capabilities",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function fetchTCSATransitList(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/tcsa-management/list-tcsa",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  fetchTypeFunctionalitiesAPI,
  editTypeCapabilitiesAPI,
  fetchTCSATransitList,
}
