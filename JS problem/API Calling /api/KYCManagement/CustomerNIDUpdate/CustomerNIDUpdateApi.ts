import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

const KYC_MANAGEMENT_URL = "api/onboarding/v1/kyc-management"

export function nidBulkUpload(data: any) {
  return httpRequest(authContext()).post(
    `${KYC_MANAGEMENT_URL}/upload-bulk-nid-insertion`,
    data,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

export function fetchNIDHistory(data: any) {
  return httpRequest(authContext()).post(
    `${KYC_MANAGEMENT_URL}/get-bulk-nid-batch-history`,
    data,
  )
}

export function fetchNIDBatchDetailsInfo(data: any) {
  return httpRequest(authContext()).post(
    `${KYC_MANAGEMENT_URL}/get-bulk-nid-batch-info`,
    data,
  )
}

export function fetchNIDBatchDetailsList(data: any) {
  return httpRequest(authContext()).post(
    `${KYC_MANAGEMENT_URL}/get-bulk-nid-batch-detail`,
    data,
  )
}

export function changeNIDBatchStatus(data: any) {
  return httpRequest(authContext()).post(
    `${KYC_MANAGEMENT_URL}/change-batch-status`,
    data,
  )
}
