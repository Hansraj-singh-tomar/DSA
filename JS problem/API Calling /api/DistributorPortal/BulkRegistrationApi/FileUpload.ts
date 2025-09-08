import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function bulkUpload(body: {
  excel_file: File
  zip_file?: File
  userCode: string
}) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/distributors/upload-bulk-distributor",
    body,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

export default bulkUpload
