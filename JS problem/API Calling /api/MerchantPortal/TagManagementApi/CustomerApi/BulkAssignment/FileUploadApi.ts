import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../../../apiWrapper"

function FileUploadApi(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/tag-management/upload/assign-bulk-tag",
    body,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

export default FileUploadApi
