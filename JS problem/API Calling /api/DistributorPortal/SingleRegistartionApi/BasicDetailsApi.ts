import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function verifyPhoneNumber(value: string) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/common/verify-phone-number",
    {
      mobile: value,
    },
  )
}

function getDistributorCategories(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/distributor-details/v1/categories",
    { ...body },
  )
}

async function divisionList() {
  const response = await httpRequest(authContext()).post(
    "api/sysportal/v1/geoaddresses/division-list",
    {},
  )
  if (response?.data?.result) {
    response.data.result = response.data.result.map((el: any) => el?.valueEn)
  }
  return response
}

async function districtList(division: string) {
  const response = await httpRequest(authContext()).post(
    "api/sysportal/v1/geoaddresses/district-list",
    {
      division,
    },
  )
  if (response?.data?.result) {
    response.data.result = response.data.result.map((el: any) => el?.valueEn)
  }
  return response
}

async function thanaList(district: string) {
  const response = await httpRequest(authContext()).post(
    "api/sysportal/v1/geoaddresses/thana-list",
    {
      district,
    },
  )
  if (response?.data?.result) {
    response.data.result = response.data.result.map((el: any) => el?.valueEn)
  }
  return response
}

export {
  verifyPhoneNumber,
  getDistributorCategories,
  divisionList,
  districtList,
  thanaList,
}
export default null
