import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "app/api/apiWrapper"

const ONBOARDING_AMS_MANAGEMENT_URL = "api/sysportal/onboarding-ams/v1"

export function fetchDSOOnboardingAMSList(data: any) {
  return httpRequest(authContext()).post(
    `${ONBOARDING_AMS_MANAGEMENT_URL}/get-dso-ams-list`,
    data,
  )
}

export function fetchDSOOnboardingAMSDetails(data: any) {
  return httpRequest(authContext()).post(
    `${ONBOARDING_AMS_MANAGEMENT_URL}/get-dso-ams-details`,
    data,
  )
}

type TFetchDSOTypesPaylaodDTO = {
  userType: string
}
export function fetchDSOTypes(data: TFetchDSOTypesPaylaodDTO) {
  const endpoint = "/api/sysportal/dsotype/v1/dso-type"
  return httpRequest(authContext()).post(endpoint, data)
}

export function fetchTOTMTypes(data: TFetchDSOTypesPaylaodDTO) {
  const endpoint = "/api/sysportal/dsotype/v1/dso-type"
  return httpRequest(authContext()).post(endpoint, data)
}

type TFetchUserProfilePayloadDTO = {
  dsoCode: string
}
export function fetchDSOUserProfile(data: TFetchUserProfilePayloadDTO) {
  const endpoint = "/api/onboarding/v1/common/get-user-profiles"
  return httpRequest(authContext()).post(endpoint, data)
}
