import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function zipFileUpload(body: { file: File; batchId: string | null }) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/common/upload-zip-file",
    body,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

export default zipFileUpload
