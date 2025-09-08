import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function getPriceTcsaInvestmentList(data: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/tcsa-portal/investments/list-tcsa-investment",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function createNewInvestmentApi(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/investments/create-tcsa-investment",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function getTcsaBankList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-management/list-tcsa",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function encashInvestmentApi(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/encashments/initiate",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

function encashmentHistoryListApi(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-portal/encashments/list-encashment",
    { ...data },
    { headers: { channel: "WEB" } },
  )
}

export {
  getPriceTcsaInvestmentList,
  createNewInvestmentApi,
  getTcsaBankList,
  encashInvestmentApi,
  encashmentHistoryListApi,
}
