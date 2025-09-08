import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../../apiWrapper"

function HistoryDownloadApi(batchId: string) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/tag-management/export-tag-assignment-report",
    { batchId },
    {
      headers: { channel: "WEB" },
    },
  )
}

export default HistoryDownloadApi
