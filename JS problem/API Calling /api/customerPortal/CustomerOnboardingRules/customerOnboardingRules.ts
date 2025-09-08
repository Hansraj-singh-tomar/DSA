import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function getCustomerOnboardingDetails(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/merchant-category/v1/onboarding-rule",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function updateCustomerOnboardingDetails(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/merchant-category/v1/save-onboarding-rules",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

export { getCustomerOnboardingDetails, updateCustomerOnboardingDetails }
