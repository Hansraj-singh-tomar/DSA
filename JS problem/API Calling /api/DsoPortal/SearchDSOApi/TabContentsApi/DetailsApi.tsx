import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

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
    "api/sysportal/kycManagementPortal/v1/list-kyc-management-status-dh",
    {
      headers: { channel: "WEB" },
    },
  )
}

function listChangeStatus() {
  return httpRequest(authContext()).post(
    "api/sysportal/customerManagementPortal/v1/list-change-status",
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
  listOnboardingPartnerInfo,
}
