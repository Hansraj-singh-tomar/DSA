import authContext, {
  authContextAgent,
  authContextCustomer,
} from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function customerSingleRegFormSubmitApi(formData: any) {
  return httpRequest(authContextCustomer()).post(
    // "/api/onboarding/v1/customers/single-onboarding",
    "/api/onboarding/v1/applicant-detail/save-applicant",
    // "/api/onboarding/v1/applicant-detail/get-applicant",
    // "/api/onboarding//v1/customer-onboarding/create-account",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

export default customerSingleRegFormSubmitApi

function agentSingleRegFormSubmitApi(formData: any) {
  return httpRequest(authContextAgent()).post(
    "/api/onboarding/v1/applicant-detail/save-applicant",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
export { agentSingleRegFormSubmitApi }

function merchantSingleRegFormSubmitApi(formData: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/applicant-detail/save-applicant",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
export { merchantSingleRegFormSubmitApi }

// export function customerSingleRegFormSaveApi(formData: any) {
//   return httpRequest(authContext()).post(
//     "/api/onboarding/v1/applicant-detail/save-applicant",
//     {
//       ...formData,
//     },
//     {
//       headers: { channel: "WEB" },
//     },
//   )
// }
