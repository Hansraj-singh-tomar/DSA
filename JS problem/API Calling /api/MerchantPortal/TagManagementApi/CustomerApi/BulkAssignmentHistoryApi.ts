import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../../apiWrapper"

function BulkAssignmentHistoryApi(body: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/tag-management/get-bulk-history",
    { ...body },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getBatchAssignmentDetailsApi(batchId: string, userType: string) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/tag-management/get-batch-assignment-details",
    {
      batchId,
      userType,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

export { BulkAssignmentHistoryApi, getBatchAssignmentDetailsApi }
