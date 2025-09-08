import authContext from "app/api/services/Protected/ProtectedContext"
import { IBulkHistoryDetails, IBulkBatchIdDetails } from "app/models/user"
import httpRequest from "../../apiWrapper"

function getBulkUploadHistory(body: IBulkHistoryDetails) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/common/bulk-upload-history",
    {
      type: body.type,
      order: body.order,
      query: body.query,
      pageSize: body.pageSize,
      pageNo: body.pageNo,
      dateFrom: body.dateFrom,
      dateTo: body.dateTo,
      fileStatus: body.fileStatus,
    },
  )
}

function getSingleBatchDetails(body: IBulkBatchIdDetails) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/common/bulk-batch-detail-list",
    {
      batchId: body.batchId,
      order: body.order,
      query: body.query,
      pageSize: body.pageSize,
      pageNo: body.pageNo,
      kycStatus: body.kycStatus,
      uploadStatus: body.uploadStatus,
      userTypeName: body.userTypeName,
      userCode: body.userCode,
    },
  )
}

function getBulkBatchReport(selectedBatchId: string | null) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/common/bulk-batch-report",
    { batchId: selectedBatchId },
  )
}

export { getBulkUploadHistory, getBulkBatchReport, getSingleBatchDetails }
