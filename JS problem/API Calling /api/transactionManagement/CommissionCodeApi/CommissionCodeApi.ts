import authContext from "../../services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function getAdditionalCCList(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/commissioncode/v1/additional-cc",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function getDefaultCCList(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/commissioncode/v1/default-cc",
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

function updatePriority(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/commissioncode/v1/update-priority",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function createDefaultCommissionCode(data: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/commissioncode/v1/default-cc-add",
    { ...data },
  )
}
function defaultSaveAndSchedule(data: any) {
  return httpRequest(authContext()).put(
    "api/sysportal/commissioncode/v1/save-and-schedule-default-cc",
    { ...data },
  )
}
function createAdditionalCommissionCode(data: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/commissioncode/v1/additional-cc-add",
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
  return httpRequest(authContext()).put(
    "api/sysportal/commissioncode/v1/schedule-default-cc",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function scheduleACC(data: any) {
  return httpRequest(authContext()).put(
    "api/sysportal/commissioncode/v1/schedule-additional-cc",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function ccDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/commissioncode/v1/commission-code-by-id",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}
export {
  getAdditionalCCList,
  getDefaultCCList,
  removeACCDetails,
  updatePriority,
  getTransactionList,
  getDisbursementPolicy,
  getDisbursementApproval,
  scheduleCC,
  scheduleACC,
  createDefaultCommissionCode,
  getCommissionCodePlayer,
  defaultSaveAndSchedule,
  createAdditionalCommissionCode,
  ccDetails,
}
