import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function getTransactionCategoryList(data?: any) {
  return httpRequest(authContext()).post(
    "api/payment/TMS-API/tmsCategoryList",
    { ...data },
  )
}

function transactionList(data: any) {
  return httpRequest(authContext()).post(
    "api/payment/TMS-API/transactionsList",
    { ...data },
  )
}
function transactionDetailsByCode(data: any) {
  return httpRequest(authContext()).post(
    "api/payment/TMS-API/transactionsDetailsByCode",
    { ...data },
  )
}

function editTransactionsDetails(data: any) {
  return httpRequest(authContext()).post(
    "api/payment/TMS-API/editTransactionsDetails",
    { ...data },
  )
}

export {
  getTransactionCategoryList,
  transactionList,
  transactionDetailsByCode,
  editTransactionsDetails,
}
