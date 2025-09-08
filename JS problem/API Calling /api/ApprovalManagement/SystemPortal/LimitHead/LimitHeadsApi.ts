import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function getLimitHeadsAMSList(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/limithead/v1/limit-head-ams-list",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getLimitHeadsAMSDataById(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/limithead/v1/limit-head-by-id",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getLimitHeadsAMSConfigurationDataById(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/limithead/v1/limit-head-configuration",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getLimitHeadsAMSList,
  getLimitHeadsAMSDataById,
  getLimitHeadsAMSConfigurationDataById,
}
