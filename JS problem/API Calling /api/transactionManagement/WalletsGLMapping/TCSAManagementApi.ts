import httpRequest from "../../apiWrapper"
import authContext from "../../services/Protected/ProtectedContext"

function subControlDropdownList(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/tcsa-management/list-sub-control",
    body,
    { headers: { channel: "WEB" } },
  )
}

function tcsaControlDrodownList() {
  return httpRequest(authContext()).post(
    "api/payment/v1/tcsa-management/list-tcsa-control",
    { headers: { channel: "WEB" } },
  )
}

function createNewSubControl(data: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/tcsa-management/new-sub-control",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

// function bankDropdownList(data: any) {
//   return httpRequest(authContext()).post(
//     "api/payment/v1/tcsa-management/new-sub-control",
//     { ...data },
//     { headers: { channel: "WEB" } },
//   )
// }

// function branchDropdownList(data: any) {
//   return httpRequest(authContext()).post(
//     "api/payment/v1/tcsa-management/new-sub-control",
//     { ...data },
//     { headers: { channel: "WEB" } },
//   )
// }

function createNewSubsidiary(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-management/create-tcsa-mapping",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function validateBankAccount(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-management/validate-account-number",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function glCodesList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/GL-Management-API/list-gl-mapping",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

export {
  subControlDropdownList,
  tcsaControlDrodownList,
  createNewSubControl,
  createNewSubsidiary,
  glCodesList,
  validateBankAccount,
}
