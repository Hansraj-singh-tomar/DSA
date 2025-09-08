import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../apiWrapper"

function getOperatorConfigList(data: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/nidConfig/get-operator-config-list",
    { ...data },
  )
}

function getOperator(data: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/nidConfig/get-operator",
    { ...data },
  )
}

function updateOperatorStatus(data: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/nidConfig/update-operator-status",
    { ...data },
  )
}

function updateOperatorConfig(data: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/nidConfig/update-operator-config",
    { ...data },
  )
}

export {
  getOperatorConfigList,
  getOperator,
  updateOperatorStatus,
  updateOperatorConfig,
}
