import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function bulkUpload(body: FormData, config: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/agent-bulk/create-agent-bulk-batch",
    body,
    config,
  )
}

function bulkEditUpload(body: {
  excel_file: File
  zip_file?: File
  userType: string
  userCode: string
  onboardedBy: string
}) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/profile/upload-bulk-edit",
    body,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

function getBulkUploadHistory(body: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/agent-bulk/list-bulk-ledger",
    body,
  )
}

function getSingleBatchDetails(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/common/bulk-batch-detail-list",
    body,
  )
}

function getBulkEditUploadHistory(body: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/profile/bulk-edit-history",
    body,
  )
}

function getBulkEditSingleBatchDetails(body: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/profile/bulk-batch-edit-detail-list",
    body,
  )
}

function getBulkBatchInfo(body: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/profile/get-batch-info",
    body,
  )
}

function batchApproval(body: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/profile/update-batch-approval-status",
    body,
  )
}

export default bulkUpload

export {
  bulkEditUpload,
  getBulkUploadHistory,
  getSingleBatchDetails,
  getBulkEditUploadHistory,
  getBulkEditSingleBatchDetails,
  getBulkBatchInfo,
  batchApproval,
}
