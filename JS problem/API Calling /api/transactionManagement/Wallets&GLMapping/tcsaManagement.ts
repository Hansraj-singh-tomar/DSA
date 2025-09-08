import httpRequest from "../../apiWrapper"
import authContext from "../../services/Protected/ProtectedContext"

function fetchTCSAList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-management/list-tcsa",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function toggleTcsaLifting(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-management/toggle-tcsa-lifting",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function toggleTcsaRefund(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-management/toggle-tcsa-refund",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function getControlList() {
  return httpRequest(authContext()).post(
    "api/payment/v1/tcsa-management/list-tcsa-control",
    {},
  )
}

function getSubControlList() {
  return httpRequest(authContext()).post(
    "api/payment/v1/tcsa-management/list-sub-control",
    {},
  )
}
function getClassList() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/system-commons/glClassList",
    {},
  )
}

export {
  fetchTCSAList,
  toggleTcsaLifting,
  toggleTcsaRefund,
  getControlList,
  getSubControlList,
  getClassList,
}
