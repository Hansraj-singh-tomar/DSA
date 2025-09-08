import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function listLevelFunctionalityApi(reqObject: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/level-functionality-list/",
    { ...reqObject },
  )
}

function listUsersTypeApi(reqObject: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/level-functionality-list/",
    { ...reqObject },
  )
}

export { listLevelFunctionalityApi, listUsersTypeApi }
