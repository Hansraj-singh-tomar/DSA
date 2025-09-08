import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function locationBulkUpload(body: {
  excel_file: File
  userCode: string
  uploadedBy: string
}) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/common/bulk-update-user-location",
    body,
    {
      headers: {
        "Content-type": "multipart/form-data",
      },
    },
  )
}
function locationHistoryApi(body: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/common/bulk-location-update-history",
    body,
  )
}

export { locationBulkUpload, locationHistoryApi }
