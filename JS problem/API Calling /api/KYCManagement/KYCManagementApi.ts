import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../apiWrapper"

const KYC_MANAGEMENT_URL = "api/onboarding/v1/kyc-management"

export function getKYCCategoryOrStatusList(data: any) {
  return httpRequest(authContext()).post(
    `${KYC_MANAGEMENT_URL}/get-kyc-category-by-display-type`,
    data,
  )
}

export function getKYCSearchDetailsList(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    `${KYC_MANAGEMENT_URL}/get-kyc-search-details`,
    data,
    controller ? { signal: controller?.signal } : {},
  )
}

export function getUserKYCDetails(data: any) {
  return httpRequest(authContext()).post(
    `${KYC_MANAGEMENT_URL}/get-kyc-search-by-kyc-serial-number`,
    data,
  )
}

export function updateKYCStatus(data: any) {
  return httpRequest(authContext()).post(
    `${KYC_MANAGEMENT_URL}/update-kyc-status`,
    data,
  )
}

export function getRejectionReasonList() {
  return httpRequest(authContext()).post(
    "api/sysportal/kycManagementPortal/v1/list-kyc-management-reject-reason",
    {},
  )
}

export function editKYCDetails(data: any) {
  return httpRequest(authContext()).post(
    `${KYC_MANAGEMENT_URL}/edit-kyc-search-details`,
    data,
  )
}

export function editAndApproveKYCDetails(data: any) {
  return httpRequest(authContext()).post(
    `${KYC_MANAGEMENT_URL}/edit-and-approve-kyc-search-details`,
    data,
  )
}

export function generateKYC(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/kyc/generate-kyc-pdf",
    data,
  )
}
