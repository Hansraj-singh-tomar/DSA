import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function getServiceFeeCommissionCategoryList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/get-service-fee-commission-category",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function addServiceFeeCommissionCategory(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/add-new-service-category",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getServiceFeeConfigurationList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/get-service-fee-configuration",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function viewServiceFeeConfiguration(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/view-service-fee-configurations",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getDefaultPCList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/get-default-price-code",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function getAdditionalPCList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/get-additional-price-code",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}
function scheduleDefaultPC(data: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/fee-config-controller/schedule-default-price-code",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}
function createDefaultPriceCode(data: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/fee-config-controller/create-default-price-code",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}
function createAndScheduleDefaultPriceCode(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/save-schedule-default-pc",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}
function createAdditionalPriceCode(data: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/fee-config-controller/create-additional-price-code",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}
function createAndScheduleAdditionalPriceCode(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/save-schedule-additional-pc",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}
function deActivatePriceCode(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/deactive-pc",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function cloneServiceFeesConfig(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/clone-service-fee-configurations",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function addServiceFee(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/add-service-fee",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function updateServiceFee(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/edit-basic-info",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function listTaggingServices(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/list-tagging-services",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function listMerchantServices(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/list-merchant-services",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function scheduleAdditionalPC(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/schedule-additional-price-code",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function copyDefaultPC(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/copy-default-price-code",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function copyAdditionalPC(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/copy-additional-price-code",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function serviceList() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/service-type-fee-commission",
    {},
    { headers: { channel: "WEB" } },
  )
}

function updateServiceFeePCPriority(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/update-priority",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function viewDefaultPriceCode(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/view-default-price-code",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function viewAdditionalPriceCode(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/view-additional-price-code",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function fetchCategoryOptions(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/get-service-fee-commission-category",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function serviceTypeFeeCommisssionOptions(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/service-type-fee-commission",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

export {
  getServiceFeeCommissionCategoryList,
  addServiceFeeCommissionCategory,
  getServiceFeeConfigurationList,
  viewServiceFeeConfiguration,
  getDefaultPCList,
  getAdditionalPCList,
  deActivatePriceCode,
  scheduleDefaultPC,
  createDefaultPriceCode,
  createAdditionalPriceCode,
  cloneServiceFeesConfig,
  addServiceFee,
  listTaggingServices,
  listMerchantServices,
  scheduleAdditionalPC,
  copyDefaultPC,
  copyAdditionalPC,
  serviceList,
  updateServiceFeePCPriority,
  createAndScheduleDefaultPriceCode,
  createAndScheduleAdditionalPriceCode,
  updateServiceFee,
  viewDefaultPriceCode,
  viewAdditionalPriceCode,
  fetchCategoryOptions,
  serviceTypeFeeCommisssionOptions,
}
