import authContext, {
  authContextAgent,
  authContextCustomer,
} from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function validateMerchant(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/merchant/validate-merchant-kyc",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function merchantKyc(userType: string) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/merchant/merchant-kyc-via-bo",
    { userType },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getMerchantList(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/merchant/get-merchant-details-via-bo",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getMerchantProfiles(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/merchant/get-merchant-profiles",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function checkOtpPinSetupStatus(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/merchant/check-status",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function generateOtpPinLink(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/merchant/send-otp-pin-link-via-bo",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function setOtpPin(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/merchant/sign-up-and-set-pin-bo",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function verifyNumber(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/common/verify-phone-number-or-email",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function verifyNumberCust(data: any) {
  return httpRequest(authContextCustomer()).post(
    "/api/onboarding/v1/common/verify-phone-number-or-email",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}
function verifyNumberAgent(data: any) {
  return httpRequest(authContextAgent()).post(
    "/api/onboarding/v1/common/verify-phone-number-or-email",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getIdTypeList(body: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/properties",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function submitBusinessDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/merchant/business-details/submit-business-details",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function submitKycDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/merchant/merchant-kyc-via-bo",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function docImageUploadAPI(body: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/image/upload-and-link-image",
    body,
    // {
    //   headers: { channel: "WEB" },
    // },
  )
}

function bulkBatchDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/common/bulk-batch-detail-list",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function bulkBatchList(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/merchant/get-merchant-bulk-files",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function discardBatch(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/merchant/discard-merchant-bulk-file",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function validateMerchantId(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/common/validate-merchant-id",
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}

function uploadBulkMerchant(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/merchant/upload-merchant-onboarding-file",
    data,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

function getMerchantStatus(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/merchant/get-merchant-details",
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  validateMerchant,
  merchantKyc,
  getMerchantList,
  getMerchantProfiles,
  checkOtpPinSetupStatus,
  generateOtpPinLink,
  verifyNumber,
  verifyNumberCust,
  getIdTypeList,
  verifyNumberAgent,
  submitBusinessDetails,
  submitKycDetails,
  docImageUploadAPI,
  bulkBatchDetails,
  bulkBatchList,
  discardBatch,
  validateMerchantId,
  setOtpPin,
  uploadBulkMerchant,
  getMerchantStatus,
}
