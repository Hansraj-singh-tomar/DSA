import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

export function fetchSectionModuleDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/ams-section-module-details",
    { ...data },
  )
}

export function fetchTypeData(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/merchant-type",
    { ...data },
  )
}

export function fetchTypeWithAMSFilterData(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/user-type-approval-enabled",
    { ...data },
  )
}

export function fetchAMSList(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/fetch-ams-list",
    { ...data },
  )
}

export function fetchAmsSlabList(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/fetch-ams-slabs-list",
    { ...data },
  )
}

export function getUserType(data: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-designation-list",
    { ...data },
  )
}

export function getLevelFunctionalityList(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/ams-functionalities",
    { ...data },
  )
}

export function createAMSConfig(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/config-ams",
    { ...data },
  )
}

export function createAmsSlabConfig(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/config-ams-slabs",
    { ...data },
  )
}

export function updateAmsSlabConfig(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/update-ams-slabs-config",
    { ...data },
  )
}
