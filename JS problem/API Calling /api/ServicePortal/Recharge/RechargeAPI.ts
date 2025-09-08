import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function getOperatorsList(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/operators",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function ReorderOperatorsAPI(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/reorder-operators",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getOperatorDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/operator-details",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function addUpdateRechargeConfiguration(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/add-update-recharge-configuration",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function changeStatePublishAPI(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/publish-unpublish",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function updateOperatorDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/update-operator",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getRechargeConfiguration(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/fetch-recharge-configuration",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getRegisteredSimList(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/registered-sim-list",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function updatesRegisteredSim(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/update-registered-sim",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getConfigList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/service-commission-config/get-config-list",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function updateServiceCommissionCode(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/update-service-commission-code",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function fetchRevenueConfiguration(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/fetch-revenue-configuration",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function fetchLatestRevenueConfiguration(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/fetch-latest-revenue-configuration",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function updateRevenueConfiguration(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/update-revenue-configuration",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function fetchPackageList(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/fetch-package-list",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function fetchPackage(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/fetch-package",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function packageActionAPI(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/package-action",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function ribbonColorAPI() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/ribbon-color",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}
function leadingIconAPI() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/leading-icon",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}
function validityPeriodUnitAPI() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/validity-period-unit",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}
function dataUnitAPI() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/data-unit",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}
function createPackageAPI(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/create-package",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function updatePackageAPI(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/update-package",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getAdditionalFunctionalities(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/get-additional-functionlities",
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}

function editAdditionalFunctionalities(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/edit-additional-functionlities",
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}
function reorderPackageAPI(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/reorder-package",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function fetchServiceCommissionCode(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/fetch-service-commission-code",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function fetchRechargeSelectTab() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/rechange-select-tab",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}
function listRechargeAMSRecords(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/list-ams-records",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getProposedCurrentMobileRechargeOperatorDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/get-Proposed-Current-Mobile-Recharge-Operator-Details",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getProposedCurrentRechargeConfigurationDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/get-Proposed-Current-Recharge-Configuration-Details",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getProposedCurrentAdditionalFuncationalitiesDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/get-Proposed-Current-additional-functionalities-Details",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getProposedCurrentRevenueConfigurationDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/get-Proposed-Current-Revenue-Configuration-Details",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getProposedCurrentSimControlDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/get-Proposed-Current-Sim-Control-Details",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getProposedCurrentPackageDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/get-Proposed-Current-Package-Details",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getProposedCurrentServiceCommissionDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/mobile-recharge-management/v1/get-Proposed-Current-service-commission-Details",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getMerchantList(payload: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/list-merchant",
    payload,
    {
      headers: { channel: "WEB" },
    },
  )
}
export {
  getMerchantList,
  fetchRechargeSelectTab,
  fetchServiceCommissionCode,
  getOperatorsList,
  ReorderOperatorsAPI,
  getOperatorDetails,
  updateOperatorDetails,
  getRechargeConfiguration,
  getRegisteredSimList,
  updatesRegisteredSim,
  changeStatePublishAPI,
  getConfigList,
  updateServiceCommissionCode,
  addUpdateRechargeConfiguration,
  fetchRevenueConfiguration,
  updateRevenueConfiguration,
  fetchLatestRevenueConfiguration,
  fetchPackageList,
  fetchPackage,
  packageActionAPI,
  createPackageAPI,
  updatePackageAPI,
  ribbonColorAPI,
  dataUnitAPI,
  validityPeriodUnitAPI,
  leadingIconAPI,
  reorderPackageAPI,
  getAdditionalFunctionalities,
  editAdditionalFunctionalities,
  listRechargeAMSRecords,
  getProposedCurrentMobileRechargeOperatorDetails,
  getProposedCurrentAdditionalFuncationalitiesDetails,
  getProposedCurrentPackageDetails,
  getProposedCurrentRechargeConfigurationDetails,
  getProposedCurrentRevenueConfigurationDetails,
  getProposedCurrentServiceCommissionDetails,
  getProposedCurrentSimControlDetails,
}
