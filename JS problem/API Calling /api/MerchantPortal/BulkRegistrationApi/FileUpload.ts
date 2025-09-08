import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function bulkUpload(body: {
  excel_file: File
  zip_file?: File
  userCode: string
}) {
  // const formData = new FormData()
  // formData.append("excel_file", body.excel_file)
  // if (body.zip_file) formData.append("zip_file", body.zip_file)
  // else formData.append("zip_file", "")

  return httpRequest(authContext()).post(
    "api/onboarding/v1/merchant/upload-bulk-merchant",
    body,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

export default bulkUpload
