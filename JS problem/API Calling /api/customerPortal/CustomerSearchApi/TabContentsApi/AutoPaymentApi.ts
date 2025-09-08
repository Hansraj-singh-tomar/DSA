import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function getAutoPaymentInfo1(body: any) {
  return httpRequest(authContext()).post(
    "/api/otherpayment/v1/recharge/fetchAutomaticPaymentInfo",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}
function getAutoPaymentInfo2(body: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/fetchAutomaticPaymentInfo",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}
function getAutoPaymentUsageRecharge(body: any) {
  return httpRequest(authContext()).post(
    "/api/otherpayment/v1/recharge/fetchAutomaticPaymentUsageInfo",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}
function getAutoPaymentUsageEMI(body: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/fetchAutomaticPaymentUsageInfo",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}
function getAutoPaymentDeleteRecharge(body: any) {
  return httpRequest(authContext()).post(
    "/api/otherpayment/v1/recharge/deleteAutomaticPayment",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}
function getAutoPaymentDeleteEmi(body: any) {
  return httpRequest(authContext()).post(
    "/api/utility-management/bill-pay-management/v1/deleteAutomaticPayment",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}
function getFilters(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/system-commons/properties",
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}
export {
  getAutoPaymentInfo1,
  getAutoPaymentInfo2,
  getAutoPaymentUsageRecharge,
  getAutoPaymentUsageEMI,
  getAutoPaymentDeleteRecharge,
  getAutoPaymentDeleteEmi,
  getFilters,
}
