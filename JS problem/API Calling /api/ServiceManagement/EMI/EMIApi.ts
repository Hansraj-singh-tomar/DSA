import authContext from "app/api/services/Protected/ProtectedContext"
import getHeader from "app/api/getProtectedHeader"
import httpRequest, { downloadHttpRequest } from "../../apiWrapper"

function getSearchBillerInfoApi(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/emi-pay-management/v1/search-emi-list",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getBillerDetailsApi(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/emi-pay-management/v1/get-emi-details",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getVerificationTypeListApi() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/list-verificationType",
    {
      headers: { channel: "WEB" },
    },
  )
}

function getListVerificationApi() {
  return httpRequest(authContext()).post(
    "/api/utility-management/emi-pay-management/v1/list-verification-api",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}

function getListVerificationSdk() {
  return httpRequest(authContext()).post(
    "/api/utility-management/emi-pay-management/v1/list-verification-sdk",
    {
      headers: { channel: "WEB" },
    },
  )
}

function checkServiceAvailabilityApi(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/emi-pay-management/v1/check-service-availability",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

// ------------------ MERCHANT TAGGING --------------------------------------------------
function getMerchantList(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/emi-pay-management/v1/list-merchant",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function uploadBulkMerchant(payload: object) {
  return httpRequest(authContext()).post(
    "/api/utility-management/emi-pay-management/v1/bulk-merchant-tagging",
    payload,
  )
}

function getMerchantListByBatchId(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/emi-pay-management/v1/merchant-by-batchId",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getMerchantListTagsByBatchId(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/emi-pay-management/v1/list-merchant-Tags-by-batchId",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function removeInvalidMerchantFromList(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/emi-pay-management/v1/remove-invalid-user",
    { ...payload },
    {
      headers: { channel: "WEB" },
    },
  )
}

function downloadMerchantTaggingTempApi() {
  const url =
    "/api/utility-management/emi-pay-management/v1/export-merchant-tagging-temp"
  return downloadHttpRequest(authContext()).post(
    url,
    {},
    { responseType: "blob", headers: getHeader() },
  )
}

function downloadBulkInvalidMerchantTags(payload: any) {
  const url =
    "/api/utility-management/emi-pay-management/v1/bulk-invalid-merchant-tags"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...payload },
    { responseType: "blob", headers: getHeader() },
  )
}

// ------------------------ NOTIFICATION TEMPLATE LIST -------------------------

function getNotificationTemplateList(payload: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/notification-master/v1/template-list",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

// --------------------- SERVICE CATEGORY ---------------------------------------
function updateBillerStatusApi(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/emi-pay-management/v1/update-emi-status",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getCategoryList(payload: any) {
  return httpRequest(authContext()).post(
    "api/utility-management/emi-pay-management/v1/emi-categories",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function addBiller(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/emi-pay-management/v1/emi-Registration",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getServiceFeeAndCommissionCodeList(payload: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/get-service-fee-configuration",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function downloadCurrentListApi(body: any) {
  const url =
    "/api/utility-management/emi-pay-management/v1/downloadCurrentList"
  return downloadHttpRequest(authContext()).post(url, body, {
    responseType: "blob",

    headers: { ...getHeader(), "Content-Type": "application/json" },
  })
}

function listVerificationAttributesApi(payload: object) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/list-displayType",
    payload,
  )
}

function updateCategoryOrderApi(payload: object) {
  return httpRequest(authContext()).post(
    "/api/utility-management/emi-pay-management/v1/update-category-order",
    payload,
  )
}

function updateBillerOrderApi(payload: object) {
  return httpRequest(authContext()).post(
    "/api/utility-management/emi-pay-management/v1/update-biller-order",
    payload,
  )
}

function billerEditApi(payload: object) {
  return httpRequest(authContext()).post(
    "/api/utility-management/emi-pay-management/v1/biller-edit",
    payload,
  )
}

// ----------------SERVICE CATEGORY-----------------------------------------------
function addCategoryRegistration(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/emi-pay-management/v1/emi-category-registration",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}
function listBillPayEMIMerchant(payload: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/merchant/list-billpay-emi-merchant",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function deleteCategoryApi(payload: object) {
  return httpRequest(authContext()).post(
    "/api/utility-management/emi-pay-management/v1/category-delete",
    payload,
  )
}

function autoMetaListApi(payload: object) {
  return httpRequest(authContext()).post(
    "/api/utility-management/emi-pay-management/v1/category-emi",
    payload,
  )
}

function categoryEdit(payload: object) {
  return httpRequest(authContext()).post(
    "/api/utility-management/emi-pay-management/v1/category-edit",
    payload,
  )
}

export {
  getSearchBillerInfoApi,
  getBillerDetailsApi,
  getVerificationTypeListApi,
  getListVerificationApi,
  getListVerificationSdk,
  checkServiceAvailabilityApi,
  downloadMerchantTaggingTempApi,
  updateBillerStatusApi,
  getCategoryList,
  addCategoryRegistration,
  getMerchantList,
  uploadBulkMerchant,
  getMerchantListByBatchId,
  downloadBulkInvalidMerchantTags,
  downloadCurrentListApi,
  getNotificationTemplateList,
  deleteCategoryApi,
  autoMetaListApi,
  categoryEdit,
  addBiller,
  removeInvalidMerchantFromList,
  getServiceFeeAndCommissionCodeList,
  listVerificationAttributesApi,
  getMerchantListTagsByBatchId,
  updateCategoryOrderApi,
  updateBillerOrderApi,
  billerEditApi,
  listBillPayEMIMerchant,
}
