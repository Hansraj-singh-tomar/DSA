import httpRequest from "app/api/apiWrapper"
import authContext, {
  authContextAgent,
  authContextCustomer,
} from "app/api/services/Protected/ProtectedContext"
import publicContext from "../services/Public/PublicContext"

function listMerchantTypeApi(reqObject: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/merchant-type",
    { ...reqObject },
  )
}

function getLimitHeadsApi(userTypeName: string, transactionCodes: string[]) {
  return httpRequest(authContext()).post(
    "api/sysportal/merchanttype/v1/user-transaction-limits",
    {
      userType: userTypeName,
      transactionCodes,
    },
  )
}

function copyMerchantTypeApi(requestObject: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/merchant-type-copy",
    { ...requestObject },
  )
}

function getNotificationKeywordListAPI(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/notification-master/v1/get-notification-keyword-list",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getDefaultFunctionalitiesApi(requestObject: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/default-functionalities",
    { ...requestObject },
  )
}

function getBankList() {
  return httpRequest(authContext()).post("/api/common/v1/getBanksList", {})
}

function getMerchantTypeByIdApi(requestObject: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/merchant-type-view",
    { ...requestObject },
  )
}

function getMerchantTypeList(requestObject: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/list-user-type-versions",
    { ...requestObject },
  )
}
function getAgentTypeList(requestObject: any) {
  return httpRequest(authContextAgent()).post(
    "/api/sysportal/merchanttype/v1/list-user-type-versions",
    { ...requestObject },
  )
}
function getCustTypeList(requestObject: any) {
  return httpRequest(authContextCustomer()).post(
    "/api/sysportal/merchanttype/v1/list-user-type-versions",
    { ...requestObject },
  )
}
function getCustomerDefaultTypeList() {
  return httpRequest(authContextCustomer()).get(
    "api/onboarding/onboarding-rules/all",
    {
      headers: { "Content-Type": "application/json" },
    },
  )
}
function getAgentDefaultTypeList() {
  return httpRequest(authContextAgent()).get(
    "api/onboarding/onboarding-rules/all",
    {
      headers: { "Content-Type": "application/json" },
    },
  )
}
function getMerchantDefaultTypeList() {
  return httpRequest(authContext()).get("api/onboarding/onboarding-rules/all", {
    headers: { "Content-Type": "application/json" },
  })
}
function getMerchantTypeCategory(requestObject: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/user-management-portal/change_merchant_category",
    { ...requestObject },
  )
}
function getUserCodeMobileList(requestObject: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/common/get-user-code-or-mobile-list",
    { ...requestObject },
  )
}

function fetchTypeAssign(requestObject: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/common-lite/find-type-assign-list",
    { ...requestObject },
  )
}

function copyUserType(typeId: string, version: string) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/copy-user-type",
    { typeId, version },
  )
}

function getTypeList(userType: string) {
  return httpRequest(authContext()).post(
    "api/sysportal/merchanttype/v1/merchant-type",
    {
      userType,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getMerchantTypeVersionList(requestObject: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/list-user-type-versions",
    {
      ...requestObject,
    },
  )
}

function getDsoTypeVersionList(typeCode: string) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/list-user-type-versions",
    {
      typeCode,
      userType: "DSO",
    },
  )
}

function getSettlementPolicyApi(body: { userType: string }) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/settlement-policies",
    body,
  )
}
function saveMerchantTypeData(body: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/save-merchant",
    body,
  )
}

function getTCSALiftingBankList(reqObj: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-management/fetch-tcsa-lifting-banks",
    reqObj,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getAggregatorListAPI(data: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/payment-service-config-controller/payment-service-list",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function toggleCategoryList(data: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/merchanttype/v1/enable-disable-merchant-category",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getReportNameList() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/report/fetch-wallet-type",
    {
      headers: { "Content-Type": "application/json" },
    },
  )
}

function getDateTypeList() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/report/fetch-date-type",
    {
      headers: { "Content-Type": "application/json" },
    },
  )
}

function generateReport(data: any) {
  return httpRequest(publicContext()).post(
    "api/report/v1/report/generate-report",
    {
      ...data,
    },
  )
}

function getReportHistory(data: any) {
  return httpRequest(publicContext()).post(
    "/api/report/v1/report/fetch-history",
    {
      ...data,
    },
  )
}

function getRefreshReport(data: any) {
  return httpRequest(publicContext()).post("/api/report/v1/report/refresh", {
    ...data,
  })
}

export {
  listMerchantTypeApi,
  getSettlementPolicyApi,
  copyMerchantTypeApi,
  getDefaultFunctionalitiesApi,
  getMerchantTypeByIdApi,
  saveMerchantTypeData,
  getBankList,
  getAgentTypeList,
  getMerchantTypeList,
  getLimitHeadsApi,
  getTypeList,
  getCustTypeList,
  copyUserType,
  getDsoTypeVersionList,
  getMerchantTypeVersionList,
  fetchTypeAssign,
  getTCSALiftingBankList,
  getNotificationKeywordListAPI,
  getAggregatorListAPI,
  getMerchantTypeCategory,
  toggleCategoryList,
  getCustomerDefaultTypeList,
  getAgentDefaultTypeList,
  getReportNameList,
  getDateTypeList,
  generateReport,
  getReportHistory,
  getRefreshReport,
  getUserCodeMobileList,
  getMerchantDefaultTypeList,
}
