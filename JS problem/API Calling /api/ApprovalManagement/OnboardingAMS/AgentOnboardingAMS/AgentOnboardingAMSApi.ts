import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "app/api/apiWrapper"

const ONBOARDING_AMS_MANAGEMENT_URL = "api/sysportal/onboarding-ams/v1"

export function fetchAgentOnboardingAMSList(data: any) {
  return httpRequest(authContext()).post(
    `${ONBOARDING_AMS_MANAGEMENT_URL}/get-agent-ams-list`,
    data,
  )
}

export function fetchAgentOnboardingAMSDetails(data: any) {
  return httpRequest(authContext()).post(
    `${ONBOARDING_AMS_MANAGEMENT_URL}/get-agent-ams-details`,
    data,
  )
}

type TFetchAgentTypesPaylaodDTO = {
  userType: string
}
export function fetchAgentTypes(data: TFetchAgentTypesPaylaodDTO) {
  const endpoint = "/api/sysportal/agenttype/v1/agent-type"
  return httpRequest(authContext()).post(endpoint, data)
}

export function fetchTMTypes(data: TFetchAgentTypesPaylaodDTO) {
  const endpoint = "/api/sysportal/agenttype/v1/agent-type"
  return httpRequest(authContext()).post(endpoint, data)
}

type TFetchUserProfilePayloadDTO = {
  agentCode: string
}
export function fetchAgentUserProfile(data: TFetchUserProfilePayloadDTO) {
  const endpoint = "/api/onboarding/v1/common/get-user-profiles"
  return httpRequest(authContext()).post(endpoint, data)
}

export function getAgentonboardingAMSHistory(data: any) {
  const endpoint = "api/sysportal/merchanttype/v1/user-onboarding-ams-list"
  return httpRequest(authContext()).post(endpoint, data)
}
