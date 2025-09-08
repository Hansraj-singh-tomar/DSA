import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function getMnoList() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/mobile-network-operators/mno-list",
    {},
  )
}

function getCategory(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/merchant-category/v1/merchant-category-list",
    {
      ...body,
    },
  )
}

function getMerchantType(userTypeName: string) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/list-user-type-versions",
    {
      userType: userTypeName,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getMerchantTypeDetails(merchantTypeCode: string) {
  return httpRequest(authContext()).post(
    "api/sysportal/merchanttype/v1/list-user-type-versions",
    {
      typeCode: merchantTypeCode,
      userType: "MERCHANT",
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getBusinessCategory() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/system-commons/properties",
    {
      type: "BUSSINESS_CATAGORY",
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getBusinessType() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/system-commons/properties",
    {
      type: "BUSSINESS_TYPE",
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getOrganizationType() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/system-commons/properties",
    {
      type: "ORGANIZATION_TYPE",
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getClusterList() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/geoaddress-details/cluster-list",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}

function getRegionList(cluster: string) {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/geoaddress-details/region-list",
    { cluster },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getAreaList(region: string) {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/geoaddress-details/area-lists",
    { region },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getTerritoryList(area: string) {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/geoaddress-details/territory-list",
    { area },
    {
      headers: { channel: "WEB" },
    },
  )
}

async function getDivisionList() {
  const response = await httpRequest(authContext()).post(
    "/api/sysportal/v1/geoaddresses/division-list",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
  if (response?.data?.result) {
    response.data.result = response.data.result.map((el: any) => el?.valueEn)
  }
  return response
}

async function getDistrictList(division: string) {
  const response = await httpRequest(authContext()).post(
    "/api/sysportal/v1/geoaddresses/district-list",
    {
      division,
    },
    {
      headers: { channel: "WEB" },
    },
  )
  if (response?.data?.result) {
    response.data.result = response.data.result.map((el: any) => el?.valueEn)
  }
  return response
}

async function getThanaList(district: string) {
  const response = await httpRequest(authContext()).post(
    "/api/sysportal/v1/geoaddresses/thana-list",
    {
      district,
    },
    {
      headers: { channel: "WEB" },
    },
  )
  if (response?.data?.result) {
    response.data.result = response.data.result.map((el: any) => el?.valueEn)
  }
  return response
}

async function getSubThanaList(thana: string) {
  const response = await httpRequest(authContext()).post(
    "api/sysportal/v1/geoaddresses/sub-thana-list",
    {
      thana,
    },
    {
      headers: { channel: "WEB" },
    },
  )
  if (response?.data?.result) {
    response.data.result = response.data.result.map((el: any) => el?.valueEn)
  }
  return response
}

function getMerchantRelationshipList() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/properties",
    {
      type: "MERCHANT_RELATIONSHIP",
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getNationalityList() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/properties",
    {
      type: "NATIONALITY",
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getProvinceList() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/properties",
    {
      type: "PROVINCE",
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getGenderList() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/properties",
    {
      type: "GENDER",
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getOccupationList() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/properties",
    {
      type: "OCCUPATION_LIST",
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getIncomeSourceList() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/properties",
    {
      type: "SOURCE_OF_FUND",
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getTinNumberList() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/properties",
    {
      type: "TIN_NUMBER",
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getIdTypeList() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/properties",
    {
      type: "IMAGE_ID",
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getDynamicFields(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/merchant-category/v1/dynamic-param-by-category",
    {
      ...body,
    },
  )
}

function validateAggregatorIdApi(body: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/merchant/validate-merchant-aggregator-id",
    {
      ...body,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
export {
  getMnoList,
  getCategory,
  getMerchantType,
  getBusinessCategory,
  getBusinessType,
  getOrganizationType,
  getClusterList,
  getRegionList,
  getAreaList,
  getTerritoryList,
  getDivisionList,
  getDistrictList,
  getThanaList,
  getSubThanaList,
  getMerchantRelationshipList,
  getNationalityList,
  getGenderList,
  getOccupationList,
  getIncomeSourceList,
  getTinNumberList,
  getIdTypeList,
  getProvinceList,
  getDynamicFields,
  getMerchantTypeDetails,
  validateAggregatorIdApi,
}
