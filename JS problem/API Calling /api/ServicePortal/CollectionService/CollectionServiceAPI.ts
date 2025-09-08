import httpRequest, { downloadHttpRequest } from "app/api/apiWrapper"
import getHeader from "app/api/getProtectedHeader"
import authContext from "app/api/services/Protected/ProtectedContext"

function getCollectionServicesList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/getCollectionServicesList",
    {
      ...data,
    },
    {
      headers: getHeader(),
    },
  )
}
function viewServiceFeeConfigurations(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fee-config-controller/view-service-fee-configurations",
    {
      ...data,
    },
    {
      headers: getHeader(),
    },
  )
}

function getCollectionServiceDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/getCollectionServiceDetails",
    {
      ...data,
    },
    {
      headers: getHeader(),
    },
  )
}

function suspendCollectionService(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/suspendCollectionService",
    {
      ...data,
    },
    {
      headers: getHeader(),
    },
  )
}

function activateCollectionService(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/activateCollectionService",
    {
      ...data,
    },
    {
      headers: getHeader(),
    },
  )
}

function downloadVerificationReport(body: any) {
  const url = "/api/payment/v1/downloadVerificationReport"
  return downloadHttpRequest(authContext()).post(url, body, {
    responseType: "blob",
    headers: getHeader(),
  })
}
function downloadSourceFile(body: any) {
  const url = "/api/payment/v1/downloadSourceFile"
  return downloadHttpRequest(authContext()).post(url, body, {
    responseType: "blob",
    headers: getHeader(),
  })
}
function getExistingWhitelistedUsers(body: any) {
  const url = "/api/payment/v1/getExistingWhitelistedUsers"
  return downloadHttpRequest(authContext()).post(url, body, {
    responseType: "blob",
    headers: getHeader(),
  })
}
function getUsersBatchList(body: any) {
  const url = "/api/payment/v1/getUsersBatchList"
  return downloadHttpRequest(authContext()).post(url, body, {
    responseType: "blob",
    headers: getHeader(),
  })
}
function getRemoveUsersList(body: any) {
  const url = "/api/payment/v1/getRemoveUsersList"
  return downloadHttpRequest(authContext()).post(url, body, {
    responseType: "blob",
    headers: getHeader(),
  })
}

function discardWhitelistBatch(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/discardWhitelistBatch",
    { ...data },
    {
      headers: getHeader(),
    },
  )
}

function cancelWhitelistBatchRequest(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/cancelWhitelistBatchRequest",
    {
      ...data,
    },
    {
      headers: getHeader(),
    },
  )
}
function sendForBOApprovalWhitelistBatch(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/sendForBOApprovalWhitelistBatch",
    {
      ...data,
    },
    {
      headers: getHeader(),
    },
  )
}
function getWhitelistBatchHistory(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/getWhitelistBatchHistory",
    {
      ...data,
    },
    {
      headers: getHeader(),
    },
  )
}
function createCollectionService(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/createCollectionService",
    {
      ...data,
    },
    {
      headers: getHeader(),
    },
  )
}
function editCollectionService(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/editCollectionService",
    {
      ...data,
    },
    {
      headers: getHeader(),
    },
  )
}
function checkCollectionServiceAvailability(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/checkCollectionServiceAvailability",
    {
      ...data,
    },
    {
      headers: getHeader(),
    },
  )
}
function getFilteredCollectionServices(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/getFilteredCollectionServices",
    {
      ...data,
    },
    {
      headers: getHeader(),
    },
  )
}
function getWhitelistBatchDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/getWhitelistBatchDetails",
    {
      ...data,
    },
    {
      headers: getHeader(),
    },
  )
}
function listWhitelistBatchHistory(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/listWhitelistBatchHistory",
    {
      ...data,
    },
    {
      headers: getHeader(),
    },
  )
}
function getWhitelistBatchDetailsForServiceCode(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/getWhitelistBatchDetailsForServiceCode",
    {
      ...data,
    },
    {
      headers: getHeader(),
    },
  )
}

function downloadWhitelistTemplate() {
  const url = "/api/payment/v1/downloadWhitelistTemplate"
  return downloadHttpRequest(authContext()).post(
    url,
    {},
    { responseType: "blob", headers: getHeader() },
  )
}

function collectionServiceCreateBatch(data: any, params: any) {
  return httpRequest(authContext()).post(
    `/api/payment/v1/whitelistDsoUsers?serviceCode=${params?.serviceCode}&createdByUserCode=${params?.userCode}&createdByUserName=${params?.userName}`,
    data,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

function whiteListData(data: any) {
  // return httpRequest(authContext()).post(
  //   "/api/payment/v1/downloadWhitelistDsoUsers",
  //   { ...data },
  //   {
  //     responseType: "blob",
  //     headers: getHeader(),
  //   },
  // )

  const url = "/api/payment/v1/downloadWhitelistDsoUsers"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...data },
    { responseType: "blob", headers: getHeader() },
  )
}
function deleteWhitelistBatchRecord(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/deleteWhitelistBatchRecord",
    { ...data },
    {
      headers: getHeader(),
    },
  )
}
function deleteWhitelistBatchRecords(data: any, code: Number) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/deleteWhitelistBatchRecords",
    data,
    {
      headers: { ...getHeader(), serviceCode: code },
    },
  )
}
function sendForBOApprovalCollectionService(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/sendForBOApprovalCollectionService",
    { ...data },
    {
      headers: getHeader(),
    },
  )
}
function getCollectionRequestedBy(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/getCollectionRequestedBy",
    { ...data },
    {
      headers: getHeader(),
    },
  )
}
function getProposedCurrentCollectionServiceDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/getProposedCurrentCollectionServiceDetails",
    {
      ...data,
    },
    {
      headers: getHeader(),
    },
  )
}
export {
  getProposedCurrentCollectionServiceDetails,
  getCollectionRequestedBy,
  getCollectionServicesList,
  getCollectionServiceDetails,
  suspendCollectionService,
  activateCollectionService,
  downloadVerificationReport,
  downloadSourceFile,
  cancelWhitelistBatchRequest,
  getWhitelistBatchHistory,
  downloadWhitelistTemplate,
  createCollectionService,
  editCollectionService,
  checkCollectionServiceAvailability,
  discardWhitelistBatch,
  sendForBOApprovalWhitelistBatch,
  getFilteredCollectionServices,
  getWhitelistBatchDetails,
  collectionServiceCreateBatch,
  listWhitelistBatchHistory,
  deleteWhitelistBatchRecord,
  deleteWhitelistBatchRecords,
  getWhitelistBatchDetailsForServiceCode,
  sendForBOApprovalCollectionService,
  viewServiceFeeConfigurations,
  getExistingWhitelistedUsers,
  getRemoveUsersList,
  getUsersBatchList,
  whiteListData,
}
