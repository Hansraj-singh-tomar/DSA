import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function getOnboardingFlags(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchant-category/v1/onboarding-rule",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function updateOnboardingFlags(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchant-category/v1/save-onboarding-rules",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getParameterDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchant-category/v1/new-param-list",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function updateParamList(body: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchant-category/v1/new-dynamic-param-update/",
    { ...body },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getInputTypeList() {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchant-category/v1/input-type-list",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}

function updateOnboardingRuleOtherDetails(data: any) {
  return httpRequest(authContext()).put(
    "/api/sysportal/merchant-category/v1/mod-param",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getParameterDetails,
  updateOnboardingFlags,
  getInputTypeList,
  getOnboardingFlags,
  updateOnboardingRuleOtherDetails,
  updateParamList,
}
