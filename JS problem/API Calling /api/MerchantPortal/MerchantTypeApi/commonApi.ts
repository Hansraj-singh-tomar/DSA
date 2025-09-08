import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function listMerchantTypeApi(reqObject: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/merchant-type",
    { ...reqObject },
  )
}

function getLimitHeadsApi(
  userTypeName: string,
  transactionCodes: string[],
  specialType?: string,
) {
  return httpRequest(authContext()).post(
    "api/sysportal/merchanttype/v1/user-transaction-limits",
    specialType && specialType !== ""
      ? {
          userType: userTypeName,
          transactionCodes,
          specialType,
        }
      : {
          userType: userTypeName,
          transactionCodes,
        },
  )
}

function getDefaultNotificationForDisbursement(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/notification-master/v1/get-notification-by-mode",
    body,
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

export {
  listMerchantTypeApi,
  getSettlementPolicyApi,
  copyMerchantTypeApi,
  getDefaultFunctionalitiesApi,
  getMerchantTypeByIdApi,
  saveMerchantTypeData,
  getBankList,
  getMerchantTypeList,
  getLimitHeadsApi,
  getTypeList,
  copyUserType,
  getDsoTypeVersionList,
  getMerchantTypeVersionList,
  fetchTypeAssign,
  getTCSALiftingBankList,
  getNotificationKeywordListAPI,
  getAggregatorListAPI,
  getDefaultNotificationForDisbursement,
}
