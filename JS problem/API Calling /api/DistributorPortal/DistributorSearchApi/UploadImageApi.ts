import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function imageUploadAPI(body: {
  file: File
  image_type: string
  file_type: string
}) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/image/upload",
    body,
    // {
    //   headers: { channel: "WEB" },
    // },
  )
}

export default imageUploadAPI
