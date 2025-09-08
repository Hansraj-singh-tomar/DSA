import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../apiWrapper"

function getServicesListMaster(userType: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/ussd-management/get-ussd-management-service/",
    {
      ...userType,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getServices(userType: string) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/ussd-management/get-service-dropdown/",
    { userType },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getServiceAttributesData(serviceCode: string) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/ussd-management/get-service-by-code",
    { serviceCode },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getServicesType() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/ussd-management/ussd-service-type-drop-down",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}
function addUpdateService(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/ussd-management/add-ussd-management-service/",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getServicesListMaster,
  getServices,
  getServiceAttributesData,
  getServicesType,
  addUpdateService,
}
