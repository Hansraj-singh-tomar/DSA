/* eslint-disable import/prefer-default-export */
import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function getTransferMoneyServiceConfig(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/payment-service-config-controller/payment-service-list",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getCurrentProposedConfig(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/payment-service-config-controller/view-current-proposed-config",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getTransferMoneyServiceConfigDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/payment-service-config-controller/view-payment-service",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function createNewTransferMoneyService(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/payment-service-config-controller/create-new-payment-service",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function editNewTransferMoneyService(data: any) {
  return httpRequest(authContext()).put(
    "/api/payment/v1/payment-service-config-controller/edit-payment-service",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function integrationModalityDropdown(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/add-money-service-config-controller/integration-modality-drop-down-tm",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function attributeDisplayDropdown(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/add-money-service-config-controller/display-type-dropdown",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function integrationDropDownDropdown(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/payment-service-config-controller/service-integration-list",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function checkServiceCodeAvailability(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/payment-service-config-controller/check-service-code-availability",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function visibilityTypeDropDown(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/add-money-service-config-controller/visibility-type-drop-down",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function viaDropDown(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/add-money-service-config-controller/via-drop-down",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function templatelistDropDown(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/notification-master/v1/template-list",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function sdkDropDown(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/add-money-service-config-controller/sdk-drop-down",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function serviceFeeConfigurationDropDown(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/get-service-fee-configuration",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function serviceCommissionCodeDropDown(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/get-service-fee-configuration",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function selectorTypeDropDown(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/add-money-service-config-controller/selector-type-dropdown",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function selectMerchantDropDown(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/user-management-portal/search-wallet-users",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function monthListDropDown(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/add-money-service-config-controller/default-month-list",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function financialInstitutionDropDown(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/user-management-portal/search-wallet-users",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function aggregatorDropDown(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/user-management-portal/search-wallet-users",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
export {
  getTransferMoneyServiceConfig,
  getTransferMoneyServiceConfigDetails,
  createNewTransferMoneyService,
  editNewTransferMoneyService,
  integrationModalityDropdown,
  attributeDisplayDropdown,
  integrationDropDownDropdown,
  checkServiceCodeAvailability,
  visibilityTypeDropDown,
  viaDropDown,
  templatelistDropDown,
  sdkDropDown,
  serviceFeeConfigurationDropDown,
  serviceCommissionCodeDropDown,
  selectorTypeDropDown,
  selectMerchantDropDown,
  monthListDropDown,
  aggregatorDropDown,
  financialInstitutionDropDown,
  getCurrentProposedConfig,
}
