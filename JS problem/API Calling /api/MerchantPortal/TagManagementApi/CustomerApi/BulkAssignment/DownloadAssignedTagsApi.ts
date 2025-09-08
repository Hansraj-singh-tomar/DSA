import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../../../apiWrapper"

function DownloadAssignedTagsApi() {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/tag-management/export/assigned-tag",
    {
      headers: { channel: "WEB" },
    },
  )
}

export default DownloadAssignedTagsApi
