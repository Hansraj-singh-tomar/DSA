import authContext from "app/api/services/Protected/ProtectedContext"
import getHeader from "app/api/getProtectedHeader"
import httpRequest, { downloadHttpRequest } from "../../apiWrapper"

function getPriorityList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/viewPriorityList",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function downloadPriorityList(data: any) {
  const url = "/api/payment/v1/downloadPriorityList"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...data },
    { responseType: "blob", headers: getHeader() },
  )
}

function deletePriorityUsers(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/deletePriorityList",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function downloadPriorityFileTemplate(data: any) {
  const url = `/api/payment/v1/downloadPriorityFileTemplate?requestedUserType=${data.userType}`
  return downloadHttpRequest(authContext()).post(
    url,
    {},
    { responseType: "blob", headers: getHeader() },
  )
}

function uploadPriorityList(data: any, userType: string) {
  const url = `/api/payment/v1/uploadPriorityList?requestedUserType=${userType}`
  return httpRequest(authContext()).post(url, data, {
    headers: { "Content-type": "multipart/form-data" },
  })
}

export {
  getPriorityList,
  downloadPriorityList,
  uploadPriorityList,
  downloadPriorityFileTemplate,
  deletePriorityUsers,
}
