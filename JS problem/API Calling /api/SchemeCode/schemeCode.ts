import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../apiWrapper"

function scanIbasData(body: any) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/scanIBasData",
    body,
  )
}
function listAllSchemeCode(body: any) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/listAllSchemeCode",
    body,
  )
}
function toggleSchemeCode(body: any) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/toggleSchemeCode",
    body,
  )
}
function listNonConfiguredSchemeCode(body: any) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/listNonConfiguredSchemeCode",
    body,
  )
}
function schemeCodeDetails(body: any) {
  return httpRequest(authContext()).post(
    "api/disbursement/api/schemeCodeDetails",
    body,
  )
}
function listSchemeCodeApplications(body: any) {
  return httpRequest(authContext()).post(
    "api/disbursement/api/listSchemeCodeApplications",
    body,
  )
}
function listSchemeCodeVersions(body: any) {
  return httpRequest(authContext()).post(
    "api/disbursement/api/listSchemeCodeVersions",
    body,
  )
}
function configureSchemeCode(body: any) {
  return httpRequest(authContext()).post(
    "api/disbursement/api/configureSchemeCode",
    body,
  )
}
function listCustomerTag(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/tag-management/all-tag-list",
    body,
  )
}
function listCustomerType() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/system-commons/properties",
    {
      type: "CUSTOMER_TYPE",
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function listAllTags() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/tag-management/all-tag-list",
    {
      userType: "CUSTOMER",
      name: "",
      pageNo: 0,
      pageSize: 10,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function batchApproval(body: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/update-batch-approval-status",
    body,
  )
}

function listCommunicationCodeData(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/notification-master/v1/template-list",
    body,
  )
}
export {
  scanIbasData,
  listAllSchemeCode,
  toggleSchemeCode,
  listNonConfiguredSchemeCode,
  schemeCodeDetails,
  listSchemeCodeApplications,
  listSchemeCodeVersions,
  configureSchemeCode,
  listCustomerTag,
  listCustomerType,
  listAllTags,
  batchApproval,
  listCommunicationCodeData,
}
