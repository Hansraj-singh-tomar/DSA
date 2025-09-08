import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function createSingleLedger(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/ledger/save-debit-credit-party",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getLedgerList(reqObj: any) {
  return httpRequest(authContext()).post(
    "/api/payment/ledger/get-details-pagination",
    {
      ...reqObj,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getLedgerById(reqObj: any) {
  return httpRequest(authContext()).post(
    "/api/payment/ledger/find-by-id",
    {
      ...reqObj,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getWalletBalance(reqObj: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/transaction/fetch-wallet-balance",
    {
      ...reqObj,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getUserCode(reqObj: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/common/get-user-code-or-mobile-list",
    {
      ...reqObj,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getWalletAndEntity(reqObj: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/system-commons/properties",
    {
      ...reqObj,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getLedgerAmsList(reqObj: any) {
  return httpRequest(authContext()).post(
    "/api/payment/ledger/ams-details",
    {
      ...reqObj,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  createSingleLedger,
  getLedgerList,
  getLedgerById,
  getWalletBalance,
  getUserCode,
  getWalletAndEntity,
  getLedgerAmsList,
}
