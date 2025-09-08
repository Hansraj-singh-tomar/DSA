import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "app/api/apiWrapper"
// import publicContext from "app/api/services/Public/PublicContext"

function changeAccProfitPreference(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/change-account-profit-preference",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}
function changeProfileType(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/change-account-profile-type",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function customerSearch(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/search-wallet-users",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getIntroducerData(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/get-introducer-data",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getUserWalletBalance(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/fetch-wallet-balance",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function listKycCategory() {
  return httpRequest(authContext()).post(
    "api/sysportal/customerManagementPortal/v1/list-kyc-category",
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

function searchWalletUsers(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/search-wallet-users",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getAuditData(body: any) {
  return httpRequest(authContext()).post(
    "api/audit/v1/audit-user-management-portal/get-audit-data",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function listExpiredTags(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/list-expired-tags",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function fetchWalletTransaction(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/transaction/fetchWalletTransaction",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function fetchTransactionDetails(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/transaction/fetch-transaction-details",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getUserInformation(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/get-user-information",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function listOnboardingPartnerInfo(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/list-onboarding-partner-info",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function updateAccountStatus(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/update-account-status",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function updateProfileMode(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/common/update-profile-mode",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function listKycStatus() {
  return httpRequest(authContext()).post(
    "api/sysportal/customerManagementPortal/v1/list-kyc-status",
    {
      headers: { channel: "WEB" },
    },
  )
}

function listChangeStatus(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/customerManagementPortal/v1/list-change-status",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function listWalletUserTypes() {
  return httpRequest(authContext()).post(
    "api/sysportal/customerManagementPortal/v1/list-wallet-user-types",
    {
      headers: { channel: "WEB" },
    },
  )
}

function onboardingRoleType() {
  return httpRequest(authContext()).post(
    "api/sysportal/customerManagementPortal/v1/onboarding-role-type",
    {
      headers: { channel: "WEB" },
    },
  )
}

function listEcomToken(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/ecom/list-ecom-token-cmp",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function ecomTokenDetails(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/ecom/ecom-token-details",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function deleteEcomToken(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/ecom/delete-ecom-token",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function tokenType() {
  return httpRequest(authContext()).post(
    "api/sysportal/customerManagementPortal/v1/token-type",
    {
      headers: { channel: "WEB" },
    },
  )
}

function tokenStatus() {
  return httpRequest(authContext()).post(
    "api/sysportal/customerManagementPortal/v1/token-status",
    {
      headers: { channel: "WEB" },
    },
  )
}

function getBlockAuditData(body: any) {
  return httpRequest(authContext()).post(
    "api/audit/v1/audit-block-management/get-block-audit-data",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getBlockDetailsById(body: any) {
  return httpRequest(authContext()).post(
    "api/audit/v1/audit-block-management/get-block-audit-data-by-id",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function transactionTypeList() {
  return httpRequest(authContext()).post(
    "api/sysportal/block-management/v1/transaction-type-list",
    {
      headers: { channel: "WEB" },
    },
  )
}

function deviceUnblock(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/BlockManagement/device-unblock",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function deviceBlock(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/BlockManagement/device-block",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function channelUnblock(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/BlockManagement/channel-unblock",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function channelBlock(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/BlockManagement/channel-block",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function transactionUnblock(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/block-management-controller/transaction-unblock",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function transactionBlock(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/block-management-controller/block-management-controller",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getTransactionList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/moneyMovement/fetchTransactionTypeList",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getProfileProfitAuditData(body: any) {
  return httpRequest(authContext()).post(
    "api/audit/v1/audit-user-management-portal/get-profile-profit-audit-data",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function downloadKycData(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/kyc/show-kyc",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  changeProfileType,
  changeAccProfitPreference,
  getUserWalletBalance,
  customerSearch,
  listKycCategory,
  listKycStatus,
  listKycInfo,
  getUserInformation,
  getAuditData,
  searchWalletUsers,
  fetchWalletTransaction,
  fetchTransactionDetails,
  listChangeStatus,
  updateAccountStatus,
  getIntroducerData,
  updateProfileMode,
  listWalletUserTypes,
  onboardingRoleType,
  listOnboardingPartnerInfo,
  listExpiredTags,
  listEcomToken,
  ecomTokenDetails,
  deleteEcomToken,
  tokenType,
  tokenStatus,
  getBlockAuditData,
  getBlockDetailsById,
  transactionTypeList,
  deviceUnblock,
  channelUnblock,
  channelBlock,
  deviceBlock,
  transactionUnblock,
  transactionBlock,
  getTransactionList,
  getProfileProfitAuditData,
  downloadKycData,
}
