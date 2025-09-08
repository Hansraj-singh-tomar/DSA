import httpRequest from "../apiWrapper"
import authContext, {
  authContextAgent,
  authContextCustomer,
  claimContext,
} from "../services/Protected/ProtectedContext"

function getCustomerInformation(data: any) {
  return httpRequest(authContextCustomer()).post(
    "api/onboarding/v1/user-management-portal/get-user-information",
    {
      ...data,
    },
  )
}
function getMerchantInformation(data: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/get-user-information",
    {
      ...data,
    },
  )
}
function getFetchQuestionInformation(data: any) {
  return httpRequest(authContextCustomer()).post(
    "api/onboarding/v1/claim/fetch-questions",
    {
      ...data,
    },
  )
}
function getMerchantFetchQuestionInformation(data: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/claim/fetch-questions",
    {
      ...data,
    },
  )
}
function getAgentFetchQuestionInformation(data: any) {
  return httpRequest(authContextAgent()).post(
    "api/onboarding/v1/claim/fetch-questions",
    {
      ...data,
    },
  )
}

function getValidateClaimAnswer(data: any) {
  return httpRequest(authContextCustomer()).post(
    "api/onboarding/v1/claim/validate-claim-answers",
    {
      ...data,
    },
  )
}
function getAgentValidateClaimAnswer(data: any) {
  return httpRequest(authContextAgent()).post(
    "api/onboarding/v1/claim/validate-claim-answers",
    {
      ...data,
    },
  )
}
function getMerchantValidateClaimAnswer(data: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/claim/validate-claim-answers",
    {
      ...data,
    },
  )
}

function getClaimRequestConfirmation(data: any) {
  return httpRequest(authContextCustomer()).post(
    "api/communication/v1/send-otp",
    {
      ...data,
    },
  )
}

function getAgentClaimRequestConfirmation(data: any) {
  return httpRequest(authContextAgent()).post("api/communication/v1/send-otp", {
    ...data,
  })
}

function verifyOTP(data: any) {
  return httpRequest(authContextCustomer()).post(
    "api/onboarding/v1/claim/claim-request-to-ams",
    {
      ...data,
    },
  )
}
function verifyMerchantOTP(data: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/claim/claim-request-to-ams",
    {
      ...data,
    },
  )
}

function getAgentInformation(data: any) {
  return httpRequest(authContextAgent()).post(
    "api/onboarding/v1/user-management-portal/get-user-information",
    {
      ...data,
    },
  )
}

function getImages(data: any) {
  console.log("payload data", data)

  return httpRequest(claimContext()).post("api/onboarding/v1/image/get-image", {
    ...data,
  })
}

export {
  getCustomerInformation,
  getMerchantInformation,
  verifyMerchantOTP,
  getMerchantFetchQuestionInformation,
  getMerchantValidateClaimAnswer,
  getAgentInformation,
  getAgentValidateClaimAnswer,
  getAgentClaimRequestConfirmation,
  getAgentFetchQuestionInformation,
  getFetchQuestionInformation,
  getValidateClaimAnswer,
  getClaimRequestConfirmation,
  verifyOTP,
  getImages,
}
