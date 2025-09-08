import httpRequest from "../../apiWrapper"
import authContext from "../../services/Protected/ProtectedContext"

function getControlList() {
  return httpRequest(authContext()).post(
    "api/payment/GL-Management-API/list-control-mapping",
    {},
  )
}

function getSubControlList() {
  return httpRequest(authContext()).post(
    "api/payment/GL-Management-API/list-subcontrol-mapping",
    {},
  )
}

function getSubControlOfControlList(data: any) {
  return httpRequest(authContext()).post(
    "api/payment/GL-Management-API/subcontrol-by-control",
    {
      ...data,
    },
  )
}
function getClassList() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/system-commons/glClassList",
    {},
  )
}

function createGL(data: any) {
  return httpRequest(authContext()).post(
    "api/payment/GL-Management-API/create-gl-mapping",
    {
      ...data,
    },
  )
}

function fetchGLList(data: any) {
  return httpRequest(authContext()).post(
    "api/payment/GL-Management-API/list-gl-mapping",
    {
      ...data,
    },
  )
}
export default null
export {
  getControlList,
  getSubControlList,
  getSubControlOfControlList,
  getClassList,
  createGL,
  fetchGLList,
}
