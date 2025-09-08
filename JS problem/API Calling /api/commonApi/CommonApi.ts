import { IDefaultValueObject } from "app/models/form"
import httpRequest from "../apiWrapper"
import authContext, {
  authContextAgent,
  authContextCustomer,
  authContextDynamic,
} from "../services/Protected/ProtectedContext"
import publicContext from "../services/Public/PublicContext"

interface IParentDetails {
  name: string
  type: string
  pagesize: number
  pageNo: number
}
const getBusinessHierarchyList = (requestBody: IDefaultValueObject) => {
  return httpRequest(authContext()).post(
    "api/sysportal/business-hierarchy/v1/market-operation-list",
    {
      ...requestBody,
    },
  )
}

function getAapplicant(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/applicant-detail/get-applicant",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getAapplicantCust(data: any) {
  return httpRequest(authContextCustomer()).post(
    "/api/onboarding/v1/applicant-detail/get-applicant",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function getAapplicantAgent(data: any) {
  return httpRequest(authContextAgent()).post(
    "/api/onboarding/v1/applicant-detail/get-applicant",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
function saveApplicant(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/applicant-detail/save-applicant",
    {
      ...data,
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

function imageUploadAPI(
  body: {
    file: File
    image_type: string
    file_type: string
  },
  userType?: string,
) {
  return httpRequest(authContextDynamic(userType)).post(
    "/api/onboarding/v1/image/upload",
    body,
    // {
    //   headers: { channel: "WEB" },
    // },
  )
}

function staticImageUploadAPI(body: { file: File }) {
  return httpRequest(authContext()).post(
    "/api/common/v1/static-content/upload",
    body,
  )
}

function staticImageUpdateAPI(body: { file: File; oldFileName: string }) {
  return httpRequest(authContext()).post(
    "/api/common/v1/static-content/update",
    body,
  )
}

function staticImageDeleteAPI(body: { fileName: string }) {
  return httpRequest(authContext()).post(
    "/api/common/v1/static-content/delete",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}

function commonImageUploadAPI(body: {
  file: File
  image_type: string
  file_type: string
}) {
  return httpRequest(authContext()).post(
    "/api/common/v1/static-content/upload",
    body,
    // {
    //   headers: { channel: "WEB" },
    // },
  )
}

function systemLiftingImageUploadAPI(body: FormData) {
  return httpRequest(authContext()).post("/api/payment/v1/uploadImage", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

function imageUploadAPICust(body: FormData) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/image/upload",
    body,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        userType: "CUSTOMER",
      },
    },
  )
}

function uploadImg(body: FormData) {
  return httpRequest(authContext()).post(
    "api/sysportal/upload/v1/upload-file",
    body,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        userType: "CUSTOMER",
      },
    },
  )
}

function getImageApi(imageId: number) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/image/get-image",
    {
      imageId,
    },
    // {
    //   headers: { channel: "WEB" },
    // },
  )
}

function getImageApiAgent(imageId: number) {
  return httpRequest(authContextAgent()).post(
    "/api/onboarding/v1/image/get-image",
    {
      imageId,
    },
    // {
    //   headers: { channel: "WEB" },
    // },
  )
}
function getImageApiCust(imageId: number) {
  return httpRequest(authContextCustomer()).post(
    "/api/onboarding/v1/image/get-image",
    {
      imageId,
    },
    // {
    //   headers: { channel: "WEB" },
    // },
  )
}

function deleteImageApi(imageId: number) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/image/delete-image",
    {
      imageId,
    },
  )
}

function verifyPhoneNumber(mobileNumber: string) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/common/verify-phone-number",
    {
      mobileNumber,
    },
    // {
    //   headers: { channel: "WEB" },
    // },
  )
}

function getClusterList() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/geoaddress-details/cluster-list",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}

function getRegionList(cluster: string) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/geoaddress-details/region-list",
    { cluster },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getAreaList(region: string) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/geoaddress-details/area-lists",
    { region },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getTerritoryList(area: string) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/geoaddress-details/territory-list",
    { area },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getMnoList() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/mobile-network-operators/mno-list",
    {},
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

function getDivisionList() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/geoaddresses/division-list",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}

function getDistrictList(division: string) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/geoaddresses/district-list",
    {
      division,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getThanaList(district: string) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/geoaddresses/thana-list",
    {
      district,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getSubThanaList(thana: string) {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/geoaddresses/sub-thana-list",
    {
      thana,
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

function getIdUploadList() {
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

function getParentList(body: IParentDetails) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/common/parents",
    {
      ...body,
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

function getBusinessType() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/properties",
    {
      type: "BUSSINESS_TYPE",
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getParentDetails(parentUserId: string) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/common/get-parent-details-from-user-profile",
    {
      parentUserId,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getBankList(reqObj: any) {
  return httpRequest(authContext()).post(
    "/api/common/v1/getBanksList",
    reqObj,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getBranchList(reqObj: any) {
  return httpRequest(authContext()).post(
    "/api/common/v1/getBankBranchList",
    reqObj,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getUserProfile(merchantCode: string) {
  return httpRequest(publicContext()).post(
    "api/onboarding/v1/common/get-user-profiles",
    { merchantCode },
  )
}

function getUserProfileRoleMatrix(data: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-user-portal",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getTemporaryImageApi(imageId: number) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/image/get-temporary-image",
    {
      imageId,
    },
    // {
    //   headers: { channel: "WEB" },
    // },
  )
}

function getBatchStatusList() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/properties",
    { type: "Batch Status" },
  )
}

function getExecutionStatusList() {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-commons/properties",
    { type: "Execution Status" },
  )
}

function getAmountInWordsApi(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/conversion/getAmountInWords",
    data,
    { headers: { channel: "WEB" } },
  )
}

function getBusinessWalletBalance(data: { businessWalletId: string }) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/business-wallet-balance",
    data,
  )
}

function testApi() {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/list-verification-api",
    {},
    {
      headers: { channel: "WEB" },
    },
  )
}

function listMerchantTypeApi(reqObject: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/merchant-type",
    { ...reqObject },
  )
}

function getTcsaWalletBalance(data: { walletCode: string }) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-management/fetchWalletBalance",
    data,
  )
}

export {
  imageUploadAPI,
  commonImageUploadAPI,
  getImageApi,
  verifyPhoneNumber,
  getBusinessType,
  getOccupationList,
  getParentList,
  getMnoList,
  getOrganizationType,
  getDivisionList,
  getDistrictList,
  getAapplicantAgent,
  getThanaList,
  getSubThanaList,
  getNationalityList,
  getGenderList,
  getClusterList,
  getRegionList,
  getAreaList,
  getTerritoryList,
  getParentDetails,
  getBankList,
  getAapplicantCust,
  getImageApiCust,
  getBranchList,
  getUserProfile,
  getTemporaryImageApi,
  staticImageUploadAPI,
  staticImageUpdateAPI,
  staticImageDeleteAPI,
  getBatchStatusList,
  getExecutionStatusList,
  getUserProfileRoleMatrix,
  getAmountInWordsApi,
  getBusinessWalletBalance,
  deleteImageApi,
  getIdUploadList,
  getIdTypeList,
  getBusinessHierarchyList,
  getAapplicant,
  getImageApiAgent,
  saveApplicant,
  testApi,
  listMerchantTypeApi,
  systemLiftingImageUploadAPI,
  getTcsaWalletBalance,
  imageUploadAPICust,
  uploadImg,
}
