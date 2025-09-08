import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../../../apiWrapper"

function BulkAssignmentTemplateApi() {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/tag-management/export/bulk-assignment-template",
    {
      headers: { channel: "WEB" },
    },
  )
}

export default BulkAssignmentTemplateApi
