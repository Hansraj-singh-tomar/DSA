/* eslint-disable import/prefer-default-export */
import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function getAddMoneyServiceConfig(data: any) {
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

function getAddMoneyServiceConfigDetails(data: any) {
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

function createNewAddMoneyService(data: any) {
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

function editAddMoneyService(data: any) {
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

function suspendAddMoneyService(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/payment-service-config-controller/suspend-add-money-service",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function reactiveAddMoneyService(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/payment-service-config-controller/reactive-add-money-service",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getServiceFeeConfiguration(data: any) {
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

function getTemplateListAPI(data: any) {
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

function getVisibilityListAPI() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/add-money-service-config-controller/visibility-type-drop-down",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}

function getViaListAPI() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/add-money-service-config-controller/via-drop-down",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}
function getIntegrationModalityListAPI() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/add-money-service-config-controller/integration-modality-drop-down",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}
function getTargetTypeListAPI() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/add-money-service-config-controller/target-type-drop-down",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}
function getOpenInListAPI() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/add-money-service-config-controller/open-in-drop-down",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}
function getIntegrationListAPI(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/payment-service-config-controller/service-integration-list",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getSDKListAPI() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/add-money-service-config-controller/sdk-drop-down",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}
function getSearchWalletUsersAPI(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/user-management-portal/search-wallet-users",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getTCSAListAPI(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-management/list-tcsa",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getAddMoneyServiceConfig,
  getAddMoneyServiceConfigDetails,
  createNewAddMoneyService,
  editAddMoneyService,
  checkServiceCodeAvailability,
  reactiveAddMoneyService,
  suspendAddMoneyService,
  getServiceFeeConfiguration,
  getTemplateListAPI,
  getVisibilityListAPI,
  getViaListAPI,
  getIntegrationModalityListAPI,
  getTargetTypeListAPI,
  getOpenInListAPI,
  getIntegrationListAPI,
  getSDKListAPI,
  getSearchWalletUsersAPI,
  getTCSAListAPI,
}
