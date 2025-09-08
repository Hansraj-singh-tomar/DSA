import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function getAMSRecords(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/list-ams-records",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getRequestName() {
  return httpRequest(authContext()).post(
    "api/sysportal/customerManagementPortal/v1/dropdown-for-request-name",
    {
      headers: { channel: "WEB" },
    },
  )
}
function getRequestType() {
  return httpRequest(authContext()).post(
    "api/sysportal/customerManagementPortal/v1/dropdown-for-request-type",
    {
      headers: { channel: "WEB" },
    },
  )
}

function getMerchantDisbursementDetails(data: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/customerManagementPortal/v1/disbursement-type-details-by-request-code",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getUserDetailsProposedAndPrevious(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/user-management-portal/get-user-details",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getTransactionBlockStatusDetails(data: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/block-management-controller/get-transaction-block-detail",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getDeviceChannelBlockStatusDetails(data: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/BlockManagement/get-block-details",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getSystemInitiatedBlockStatusDetails(data: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/block-management/v1/get-block-management-data",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getBulkEditDetailsList(data: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/common/bulk-batch-detail-list",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getUpdatedEmail(data: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/user-management-portal/change_email_details",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
export {
  getUserDetailsProposedAndPrevious,
  getAMSRecords,
  getRequestName,
  getRequestType,
  getMerchantDisbursementDetails,
  getBulkEditDetailsList,
  getTransactionBlockStatusDetails,
  getDeviceChannelBlockStatusDetails,
  getSystemInitiatedBlockStatusDetails,
  getUpdatedEmail,
}
