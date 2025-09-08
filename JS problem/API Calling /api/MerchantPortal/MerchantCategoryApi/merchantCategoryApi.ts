import authContext, {
  authContextAgent,
  authContextCustomer,
} from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function getMerchantCategoryList(data: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/merchant-category/v1/merchant-category-list",
    { ...data },
  )
}

function toggleCategoryList(data: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/merchant-category/v1/set-toggle-data",
    { ...data },
  )
}

function getMerchantBulkMigList(data: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/customer-management/list-bulk-migration",
    { ...data },
  )
}

function getBulkBatchInfo(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/customer-management/get-batch-info",
    body,
  )
}
function getAgentBulkBatchInfo(body: any) {
  return httpRequest(authContextAgent()).post(
    "api/onboarding/v1/customer-management/get-batch-info",
    body,
  )
}
function getCustomerBulkBatchInfo(body: any) {
  return httpRequest(authContextCustomer()).post(
    "api/onboarding/v1/customer-management/get-batch-info",
    body,
  )
}

function getMerchantBulkMigMSISDNList(data: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/customer-management/get-batch-details",
    { ...data },
  )
}

function getCustBulkMigMSISDNList(data: any) {
  return httpRequest(authContextCustomer()).post(
    "api/onboarding/v1/customer-management/get-batch-details",
    { ...data },
  )
}

function getAgentBulkMigMSISDNList(data: any) {
  return httpRequest(authContextAgent()).post(
    "api/onboarding/v1/customer-management/get-batch-details",
    { ...data },
  )
}

function getMerchantBulkMigMSISDNListById(data: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/customer-management/get-batch-details-msisdn",
    { ...data },
  )
}

function bulkMigrationCreateBatch(data: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/customer-management/create-batch",
    data,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

function approvalDiscardCancelRequest(data: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/customer-management/action-on-batch",
    { ...data },
  )
}

function getMerchantCategoryListByName(name: string) {
  return httpRequest(authContext()).post(
    "api/sysportal/merchant-category/v1/merchant-category-list/by-name",
    {
      merchantCategoryName: name,
    },
  )
}

function getMerchantTypeList() {
  return httpRequest(authContext()).post(
    "api/sysportal/merchant-category/v1/merchant-type-list",
    {},
  )
}

export function fetchUnmappedTypeData(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchant-category/v1/unmapped-merchant-type",
    { ...data },
  )
}

function getMerchantCategoryView(data: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/merchant-category/v1/merchant-category-view",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getMerchantCategorySection() {
  return httpRequest(authContext()).post(
    "api/sysportal/merchant-category/v1/param-section",
    {},
  )
}

function getMerchantCategoryParamList(data: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/merchant-category/v1/new-param-list",
    { ...data },
  )
}
function createMerchantCategory(data: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/merchant-category/v1/new-category/",
    { ...data },
  )
}

function updateMerchantCategory(data: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/merchant-category/v1/merchant-category-update/",
    { ...data },
  )
}

export {
  getMerchantCategoryList,
  toggleCategoryList,
  getMerchantBulkMigList,
  getBulkBatchInfo,
  getMerchantBulkMigMSISDNList,
  getMerchantBulkMigMSISDNListById,
  approvalDiscardCancelRequest,
  bulkMigrationCreateBatch,
  getAgentBulkMigMSISDNList,
  getMerchantCategoryListByName,
  getMerchantCategoryView,
  getMerchantTypeList,
  getMerchantCategorySection,
  getMerchantCategoryParamList,
  createMerchantCategory,
  getCustBulkMigMSISDNList,
  updateMerchantCategory,
  getAgentBulkBatchInfo,
  getCustomerBulkBatchInfo,
}
