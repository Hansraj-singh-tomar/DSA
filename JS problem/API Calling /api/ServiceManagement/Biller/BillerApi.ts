import authContext from "app/api/services/Protected/ProtectedContext"
import getHeader from "app/api/getProtectedHeader"
import httpRequest, { downloadHttpRequest } from "../../apiWrapper"

function getSearchBillerInfoApi(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/search-biller-list",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getBillerDetailsApi(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/get-biller-details",
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
    "/api/utility-management/bill-pay-management/v1/list-verification-api",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}

function getListVerificationSdk() {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/list-verification-sdk",
    {
      headers: { channel: "WEB" },
    },
  )
}

function checkServiceAvailabilityApi(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/check-service-availability",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function addCategoryRegistration(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/category-registration",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

// ------------------ MERCHANT TAGGING --------------------------------------------------
function getMerchantList(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/list-merchant",
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

function uploadBulkMerchant(payload: object) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/bulk-merchant-tagging",
    payload,
  )
}

function getMerchantListByBatchId(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/merchant-by-batchId",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getMerchantListTagsByBatchId(payload: any) {
  return httpRequest(authContext()).post(
    "api/utility-management/bill-pay-management/v1/list-merchant-Tags-by-batchId",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function removeInvalidMerchantFromList(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/remove-invalid-user",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function downloadMerchantTaggingTempApi() {
  const url =
    "/api/utility-management/bill-pay-management/v1/export-merchant-tagging-temp"
  return downloadHttpRequest(authContext()).post(
    url,
    {},
    { responseType: "blob", headers: getHeader() },
  )
}

function downloadBulkInvalidMerchantTags(payload: any) {
  const url =
    "/api/utility-management/bill-pay-management/v1/bulk-invalid-merchant-tags"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...payload },
    {
      responseType: "blob",
      headers: getHeader(),
    },
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

function updateBillerStatusApi(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/update-biller-status",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getCategoryList(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/categories",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function addBiller(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/biller-Registration",
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

function getListBatchHistoryApi(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/list-batch-history",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getWhiteListedUserApi(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/list-whitelisted-users",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}

function verificationReportDownloadApi(payload: any) {
  const url =
    "/api/utility-management/bill-pay-management/v1/download-verification-report"
  return downloadHttpRequest(authContext()).post(url, payload, {
    responseType: "blob",
    headers: getHeader(),
  })
}

function sourceFiletDownloadApi(payload: any) {
  const url =
    "/api/utility-management/bill-pay-management/v1/download-source-file"
  return downloadHttpRequest(authContext()).post(url, payload, {
    responseType: "blob",
    headers: getHeader(),
  })
}

function exportWhitelistUserDownloadApi(payload: any) {
  const url =
    "/api/utility-management/bill-pay-management/v1/export-whitelist-user"
  return downloadHttpRequest(authContext()).post(url, payload, {
    responseType: "blob",
    headers: getHeader(),
  })
}

function downloadTemplateApi() {
  const url =
    "/api/utility-management/bill-pay-management/v1/export-beta-user-temp"
  return downloadHttpRequest(authContext()).post(
    url,
    {},
    {
      responseType: "blob",
      headers: getHeader(),
    },
  )
}

function getBetaBatchDetailsApi(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/beta-batch-details",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}
function uploadBulkQRCodeListApi(payload: object) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/bulk-beta-upload",
    payload,
  )
}

function removeBetaUserApi(payload: object) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/remove-beta-user",
    payload,
  )
}

function deleteCategoryApi(payload: object) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/category-delete",
    payload,
  )
}

function autoMetaListApi(payload: object) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/category-biller",
    payload,
  )
}

function categoryEdit(payload: object) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/category-edit",
    payload,
  )
}

function listVerificationAttributesApi(payload: object) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/list-displayType",
    payload,
  )
}

function updateCategoryOrderApi(payload: object) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/update-category-order",
    payload,
  )
}

function updateBillerOrderApi(payload: object) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/update-biller-order",
    payload,
  )
}

function billerEditApi(payload: object) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/biller-edit",
    payload,
  )
}

function sendForApproval(payload: object) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/sendForApproval",
    payload,
  )
}

function discardApi(payload: object) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/discard-batch",
    payload,
  )
}

function downloadCurrentListApi(body: any) {
  const url =
    "/api/utility-management/bill-pay-management/v1/downloadCurrentList"
  return downloadHttpRequest(authContext()).post(url, body, {
    responseType: "blob",

    headers: { ...getHeader(), "Content-Type": "application/json" },
  })
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
  getListBatchHistoryApi,
  getWhiteListedUserApi,
  verificationReportDownloadApi,
  sourceFiletDownloadApi,
  downloadTemplateApi,
  getBetaBatchDetailsApi,
  uploadBulkQRCodeListApi,
  removeBetaUserApi,
  getMerchantList,
  uploadBulkMerchant,
  getMerchantListByBatchId,
  downloadBulkInvalidMerchantTags,
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
  discardApi,
  downloadCurrentListApi,
  sendForApproval,
  exportWhitelistUserDownloadApi,
  listBillPayEMIMerchant,
}
