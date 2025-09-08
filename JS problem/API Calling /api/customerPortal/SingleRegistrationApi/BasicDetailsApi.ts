import authContext, {
  authContextCustomer,
} from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function getCustomerType() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/system-commons/properties",
    {
      type: "CUSTOMER_TYPE",
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getAccountType() {
  return httpRequest(authContextCustomer()).post(
    "api/sysportal/v1/system-commons/properties",
    {
      type: "ACCOUNT_TYPE",
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getMonthlyIncomeSlabs() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/system-commons/properties",
    {
      type: "MONTHY_INCOME_SLABS",
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getCustomerProfit() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/system-commons/properties",
    {
      type: "PROFIT",
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getCustomerType,
  getAccountType,
  getMonthlyIncomeSlabs,
  getCustomerProfit,
}
