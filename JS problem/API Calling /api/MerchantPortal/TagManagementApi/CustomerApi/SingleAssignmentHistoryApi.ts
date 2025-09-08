import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../../apiWrapper"

function SingleAssignmentHistoryApi(body: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/tag-management/single-assignment-history",
    {
      ...body,
    },
    {
      headers: { channel: "WEB" },
      signal: controller?.signal,
    },
  )
}

export default SingleAssignmentHistoryApi
