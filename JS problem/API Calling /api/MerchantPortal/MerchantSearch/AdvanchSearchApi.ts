import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function getMerchantCategory(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/merchant-category/v1/merchant-category-list",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getMerchantType(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/merchanttype/v1/merchant-type",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function tagUser(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/common/tag-user",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function listKycCategory() {
  return httpRequest(authContext()).post(
    "api/sysportal/kycManagementPortal/v1/list-kyc-management-category-dh",
    {
      headers: { channel: "WEB" },
    },
  )
}

function listKycInfo(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/list-kyc-info",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function listKycStatus() {
  return httpRequest(authContext()).post(
    "api/sysportal/kycManagementPortal/v1/list-kyc-management-status-dh",
    {
      headers: { channel: "WEB" },
    },
  )
}

function getTaggingList(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/common/tagging-list",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function changeDisbursementStatus(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/customerManagementPortal/v1/change-status-disbursement",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function fetchDisbursementTypeList(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/customerManagementPortal/v1/list-merchant-disbursement",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function changeTypeCode(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/change_type_code",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function changeMerchantType(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/change_merchant_category",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function changeMerchantCategory(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/change_merchant_category",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getTaggedUser(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/common/get-tagged-user",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function unTagUser(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/common/untag-user",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function createDisbursementType(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/customerManagementPortal/v1/create-disbursement-type",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function merchantListM2M(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/m2mwhitelist/list-m2m-whitelist",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function listBulkSummary(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/list-whitelist-summary",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getBasicSearcResult(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/search-wallet-users",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function whitelistSummary(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/whitelist-summary-detail",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function listWhitelistDetails(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/list-whitelist-details",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function merchantListAddM2M(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/common/merchant-list-m2m",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function whitelistBatchApproval(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/whitelist-batch-approval",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function whitelistBatchDiscard(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/whitelist-batch-discard",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function addMerchantWhitelist(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/m2mwhitelist/m2m-whitelist",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function deleteMerchantWhitelist(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/m2mwhitelist/delete-m2m-whitelist",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function bulkWhitelistApi(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/bulk-whitelist-createbatch",
    body,
    {
      headers: {
        Accept: "application/json",
        "Content-type": "multipart/form-data",
      },
    },
  )
}

function fetchTCSAList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-management/list-tcsa",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function listAMSRecords(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/list-ams-records",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function getDetailsByRequestType(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/user-management-portal/get-details-by-request-type",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function getM2MDetailsByRequestType(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/m2mwhitelist/get-M2M-whitelist-request-type-details",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function getApprovalPanelDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/fetch-level-wise-approval-details",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function updateApprovalStatus(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/update-batch-approval-status",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function getUserInfo(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/user-management-portal/get-user-information",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function addAuditProfileData(data: any) {
  return httpRequest(authContext()).post(
    "/api/audit/v1/audit-user-management-portal/add-audit-profile-data",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

export {
  getMerchantCategory,
  getMerchantType,
  getTaggingList,
  tagUser,
  getTaggedUser,
  unTagUser,
  createDisbursementType,
  fetchDisbursementTypeList,
  changeDisbursementStatus,
  merchantListM2M,
  listBulkSummary,
  whitelistSummary,
  listWhitelistDetails,
  merchantListAddM2M,
  whitelistBatchApproval,
  whitelistBatchDiscard,
  addMerchantWhitelist,
  changeTypeCode,
  changeMerchantCategory,
  bulkWhitelistApi,
  deleteMerchantWhitelist,
  fetchTCSAList,
  listKycStatus,
  listKycCategory,
  listKycInfo,
  listAMSRecords,
  getDetailsByRequestType,
  getApprovalPanelDetails,
  updateApprovalStatus,
  getUserInfo,
  getM2MDetailsByRequestType,
  addAuditProfileData,
  getBasicSearcResult,
  changeMerchantType,
}
