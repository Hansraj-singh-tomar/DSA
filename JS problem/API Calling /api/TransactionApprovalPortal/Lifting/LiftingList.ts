import authContext from "app/api/services/Protected/ProtectedContext"
import getHeader from "app/api/getProtectedHeader"
import httpRequest, { downloadHttpRequest } from "../../apiWrapper"

function getLiftingListgroup(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/approvalManagement/fetchLiftingRequestGroup",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getLiftingListOfTheGroup(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/approvalManagement/fetchLiftingApproverViewList",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function downloadLiftingListGroup(body: any) {
  const url =
    "/api/payment/v1/approvalManagement/download-lifting-request-group"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}

function downloadLiftingListOfTheGroup(body: any) {
  const url =
    "/api/payment/v1/approvalManagement/download-lifting-approver-view-list"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}

export {
  getLiftingListgroup,
  getLiftingListOfTheGroup,
  downloadLiftingListGroup,
  downloadLiftingListOfTheGroup,
}
