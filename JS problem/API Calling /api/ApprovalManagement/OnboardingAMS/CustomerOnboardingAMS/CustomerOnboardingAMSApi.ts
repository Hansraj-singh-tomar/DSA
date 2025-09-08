import authContext, {
  authContextAgent,
} from "app/api/services/Protected/ProtectedContext"
import httpRequest from "app/api/apiWrapper"

const ONBOARDING_AMS_MANAGEMENT_URL = "api/sysportal/onboarding-ams/v1"

export function fetchCustomerOnboardingAMSList(data: any) {
  return httpRequest(authContext()).post(
    `${ONBOARDING_AMS_MANAGEMENT_URL}/get-customer-ams-list`,
    data,
  )
}

export function fetchCustomerOnboardingAMSDetails(data: any) {
  return httpRequest(authContext()).post(
    `${ONBOARDING_AMS_MANAGEMENT_URL}/get-customer-ams-details`,
    data,
  )
}

type TFetchCustomerTypesPaylaodDTO = {
  userType: string
}
export function fetchCustomerTypes(data: TFetchCustomerTypesPaylaodDTO) {
  const endpoint = "/api/sysportal/customertype/v1/customer-type"
  return httpRequest(authContext()).post(endpoint, data)
}

type TFetchUserProfilePayloadDTO = {
  customerCode: string
}
export function fetchCustomerUserProfile(data: TFetchUserProfilePayloadDTO) {
  const endpoint = "/api/onboarding/v1/common/get-user-profiles"
  return httpRequest(authContext()).post(endpoint, data)
}

export function getCustomeronboardingAMSHistory(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/list-ams-records",
    data,
  )
}
export function getAgentonboardingAMSHistory(data: any) {
  return httpRequest(authContextAgent()).post(
    "/api/sysportal/approval-management/v1/list-ams-records",
    data,
  )
}

export function getApplicantDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/applicant-detail/get-applicant",
    data,
  )
}
