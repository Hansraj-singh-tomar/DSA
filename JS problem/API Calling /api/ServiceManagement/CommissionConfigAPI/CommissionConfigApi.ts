import authContext from "../../services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function updatePriority(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/service-commission-config/update-acc-priority",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function getAdditionalCCList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/service-commission-config/get-additional-commission-code",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function getDefaultCCList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/service-commission-config/get-default-commission-code",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function deActivateCommissionCode(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/service-commission-config/deactive-commission-code",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function removeACCDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/commissioncode/v1/rem-additional-commission-code",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function createDefaultCommissionCode(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/service-commission-config/create-default-commission-code",
    { ...data },
  )
}

function createAdditionalCommissionCode(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/service-commission-config/create-additional-commission-code",
    { ...data },
  )
}

function getCommissionCodePlayer() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/system-commons/properties",
    {
      type: "COMMISSION_PLAYER_LIST",
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getDisbursementPolicy() {
  return httpRequest(authContext()).post(
    "api/sysportal/commissioncode/v1/disbursement-policy-dropdown",
    {
      headers: { channel: "WEB" },
    },
  )
}

function getDisbursementApproval() {
  return httpRequest(authContext()).post(
    "api/sysportal/commissioncode/v1/disbursement-approval-dropdown",
    {
      headers: { channel: "WEB" },
    },
  )
}

function getTransactionList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/money-transfer/fetchTransactionType",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}
function scheduleCC(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/service-commission-config/schedule-default-cc",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function scheduleACC(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/service-commission-config/schedule-additional-cc",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function createAndScheduleDefaultCC(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/service-commission-config/save-schedule-default-cc",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function createAndScheduleAdditionalCC(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/service-commission-config/save-schedule-additional-cc",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}
function copyDefaultCommissionConfig(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/service-commission-config/copy-default-commission-code",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}
function copyAdditionalCCConfig(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/service-commission-config/copy-additional-commission-code",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function viewDefaultCommissionCode(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/service-commission-config/view-default-commission-code",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function viewAdditionalCommissionCode(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/service-commission-config/view-additional-commission-code",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

export {
  getAdditionalCCList,
  getDefaultCCList,
  removeACCDetails,
  getTransactionList,
  getDisbursementPolicy,
  getDisbursementApproval,
  scheduleCC,
  scheduleACC,
  createDefaultCommissionCode,
  getCommissionCodePlayer,
  createAdditionalCommissionCode,
  createAndScheduleDefaultCC,
  createAndScheduleAdditionalCC,
  updatePriority,
  deActivateCommissionCode,
  copyDefaultCommissionConfig,
  copyAdditionalCCConfig,
  viewDefaultCommissionCode,
  viewAdditionalCommissionCode,
}
