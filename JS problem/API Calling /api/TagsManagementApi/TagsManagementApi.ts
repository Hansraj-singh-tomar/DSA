import httpRequest, { downloadHttpRequest } from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"
import getHeader from "../getProtectedHeader"

function getAllSingleAssignmentList(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/tag-management/single-assignment-history",
    {
      ...data,
    },
    controller ? { signal: controller?.signal } : {},
  )
}
function getAllBulkAssignmentList(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/tag-management/get-bulk-history",
    {
      ...data,
    },
    controller ? { signal: controller?.signal } : {},
  )
}
function getAllTagsList(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/tag-management/all-tag-list",
    {
      ...data,
    },
    controller ? { signal: controller?.signal } : {},
  )
}
function getDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/tag-management/current-and-proposed-tag",
    {
      ...data,
    },
  )
}
function getBulkDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/tag-management/get-batch-assignment-details",
    {
      ...data,
    },
  )
}
function getagRejectDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/tag-management/get-tag-details",
    {
      ...data,
    },
  )
}
function validationReportDownloadApi(payload: any) {
  const url = "/api/sysportal/v1/tag-management/export-validation-report"
  return downloadHttpRequest(authContext()).post(url, payload, {
    responseType: "blob",
    headers: getHeader(),
  })
}
function SourceDownloadApi(payload: any) {
  const url = "/api/sysportal/v1/tag-management/download-source-file"
  return downloadHttpRequest(authContext()).post(url, payload, {
    responseType: "blob",
    headers: getHeader(),
  })
}
function AssignDownloadApi(payload: any) {
  const url = "/api/sysportal/v1/tag-management/export-assignment-report"
  return downloadHttpRequest(authContext()).post(url, payload, {
    responseType: "blob",
    headers: getHeader(),
  })
}
export {
  getAllSingleAssignmentList,
  getAllTagsList,
  getAllBulkAssignmentList,
  getDetails,
  getBulkDetails,
  getagRejectDetails,
  validationReportDownloadApi,
  AssignDownloadApi,
  SourceDownloadApi,
}
