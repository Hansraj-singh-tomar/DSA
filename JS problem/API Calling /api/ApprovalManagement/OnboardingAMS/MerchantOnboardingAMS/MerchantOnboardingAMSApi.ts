import authContext, {
  authContextAgent,
  authContextCustomer,
} from "app/api/services/Protected/ProtectedContext"
import httpRequest from "app/api/apiWrapper"

const ONBOARDING_AMS_MANAGEMENT_URL = "/api/onboarding/v1/onboardingAms"

export function fetchMerchantOnboardingAMSHistoryList(data: any) {
  return httpRequest(authContext()).post(
    `${ONBOARDING_AMS_MANAGEMENT_URL}/get-history-ams`,
    { ...data, userType: "MERCHANT" },
  )
}

export function fetchMerchantOnboardingAMSDropDown(data: any) {
  return httpRequest(authContext()).post(
    `${ONBOARDING_AMS_MANAGEMENT_URL}/get-drop-down-data`,
    data,
  )
}
export function fetchCustomerOnboardingAMSDropDown(data: any) {
  return httpRequest(authContextCustomer()).post(
    `${ONBOARDING_AMS_MANAGEMENT_URL}/get-drop-down-data`,
    data,
  )
}
export function fetchAgentOnboardingAMSDropDown(data: any) {
  return httpRequest(authContextAgent()).post(
    `${ONBOARDING_AMS_MANAGEMENT_URL}/get-drop-down-data`,
    data,
  )
}

export function fetchMerchantOnboardingAMSDetails(data: any) {
  return httpRequest(authContext()).post(
    `${ONBOARDING_AMS_MANAGEMENT_URL}/get-merchant-ams-details`,
    data,
  )
}

type TFetchMerchantTypesPaylaodDTO = {
  userType: string
}
export function fetchMerchantTypes(data: TFetchMerchantTypesPaylaodDTO) {
  const endpoint = "/api/sysportal/merchanttype/v1/merchant-type"
  return httpRequest(authContext()).post(endpoint, data)
}

type TFetchUserProfilePayloadDTO = {
  merchantCode: string
}
export function fetchMerchantUserProfile(data: TFetchUserProfilePayloadDTO) {
  const endpoint = "/api/onboarding/v1/common/get-user-profiles"
  return httpRequest(authContext()).post(endpoint, data)
}
