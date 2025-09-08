import httpRequest from "../apiWrapper"
import authContext from "../services/Protected/ProtectedContext"

function serviceIntegrationList(payload: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/payment-service-config-controller/service-integration-list",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function serviceAttributeList(payload: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/payment-service-config-controller/service-attribute-list",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function setServiceAttributePriority(payload: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/payment-service-config-controller/set-service-attribute-priority",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function editServiceAttributes(payload: any) {
  return httpRequest(authContext()).put(
    "/api/payment/v1/payment-service-config-controller/edit-service-attributes",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function fetchDisplayTypeList() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/add-money-service-config-controller/display-type-dropdown",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  serviceIntegrationList,
  serviceAttributeList,
  setServiceAttributePriority,
  editServiceAttributes,
  fetchDisplayTypeList,
}
