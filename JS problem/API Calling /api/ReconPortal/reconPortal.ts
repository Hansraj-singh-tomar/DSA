import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest, { downloadHttpRequest } from "../apiWrapper"
import getHeader from "../getProtectedHeader"
// download Bulk Recon & Recon fxns
function downloadOnlinePaymentReconBatchSourceFile(body: any) {
  const url = "/api/payment/v1/recon/download-recon-batch-source-file"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}
function downloadOnlinePaymentReconBatchVerificationReportFile(body: any) {
  const url =
    "/api/payment/v1/recon/download-recon-batch-verification-report-file"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}
function downloadOnlinePaymentReconTransactionReportFile(body: any) {
  const url =
    "/api/payment/v1/recon/download-recon-batch-transactions-report-file"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}
function downloadOnlinePaymentReconTransactions(body: any) {
  const url = "/api/payment/recon/v1/download-online-payment-recon-transactions"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}
function downloadOnlinePaymentReconReport(body: any) {
  const url = "/api/payment/recon/v1/download-online-payment-recon-report"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}
function downloadOnlinePaymentReconTemplate(body: any) {
  const url = "/api/payment/recon/v1/downloadOnlinePaymentReconTemplate"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}
// Recon fxns
function retryOnlinePaymentReconTransactions(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/recon/v1/retry-online-payment-recon-transactions",
    body,
  )
}
function manualUnfreezeOnlinePaymentReconTransactions(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/recon/v1/manual-unfreeze-online-payment-recon-transactions",
    body,
  )
}
function manualSuccessOnlinePaymentReconTransactions(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/recon/v1/manual-success-online-payment-recon-transactions",
    body,
  )
}
function listOnlinePaymentReconTransactions(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/recon/v1/list-online-payment-recon-transactions",
    body,
  )
}
function listAllOnlinePaymentReconAction(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/recon/v1/list-all-online-payment-recon-action",
    body,
  )
}
// Bulk Recon fxns
function listOnlinePaymentReconBulkRecon(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/recon/v1/list-online-payment-recon-bulk-recon",
    body,
  )
}
function listBulkOnlinePaymentReconRecords(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/recon/v1/list-bulk-online-payment-recon-records",
    body,
  )
}
function createBulkOnlinePaymentReconRequest(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/recon/v1/create-bulk-online-payment-recon-request",
    body,
  )
}
function discardDraftOnlinePaymentBulkBatch(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/recon/v1/discard-draft-online-payment-bulk-batch",
    body,
  )
}
function sendForApprovalOnlinePaymentReconBatch(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/recon/v1/send-for-approval-online-payment-recon-batch",
    body,
  )
}
function listAllReconTransaction(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/recon/list-transactions",
    body,
  )
}

function manualSuccessReconTransactions(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/recon/manual-sucess-recon-transactions",
    body,
  )
}

function manualUnfreezReconTransactions(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/recon/manual-unfreeze-recon-transactions",
    body,
  )
}

function retryReconTransactions(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/recon/retry-recon-list-transactions",
    body,
  )
}

function getAllMobileRechargeDetailList(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/recon/list-all-recon-trasactionaction",
    body,
  )
}

function createReconBatch(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/recon/create-bulk-recon-request",
    body,
  )
}
function downloadBulkReconTemplate(body: any) {
  const url = "/api/payment/v1/recon/download-source-recon-template"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}
function fetchBulkRecon(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/recon/list-bulk-recon",
    body,
  )
}
function fetchReconTransaction(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/recon/list-all-recon-trasactionaction",
    body,
  )
}
function listAllBulkReconTransaction(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/recon/list-bulk-recon",
    body,
  )
}
function discardReconBatch(body: any) {
  // const url = `/api/payment/v1/recon/discard-draft-bulk-batch`
  // return downloadHttpRequest(authContext()).post(url, body, {
  //   headers: {
  //     "Content-Type": "application/json; charset=UTF-8",
  //     ...getHeader(),
  //   },
  // })
  return httpRequest(authContext()).post(
    "api/payment/v1/recon/discard-draft-bulk-batch",
    body,
  )
}
function downloadReconTransactions(body: any) {
  const url = "/api/payment/v1/recon/download-transaction-file"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}

function downloadReconTransactionsMaster(body: any) {
  const url = "/api/payment/v1/recon/download-transaction-master-file"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}

function getReconBulkBatchRecord(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/recon/list-bulk-recon-records",
    body,
  )
}
function approveBulkBatch(type: any, body: any) {
  let url = "api/payment/v1/recon/send-for-approval-recon-bank-transfer-batch"
  if (type === "BANK") {
    url = "api/payment/v1/recon/send-for-approval-recon-bank-transfer-batch"
  } else if (type === "CARD") {
    url = "api/payment/v1/recon/send-for-approval-recon-card-transfer-batch"
  } else if (type === "BILL") {
    url = "api/payment/v1/recon/send-for-approval-recon-bill-payment-batch"
  } else if (type === "ECOM") {
    url = "api/payment/v1/recon/send-for-approval-recon-ecom-payment-batch"
  } else if (type === "MR") {
    url = "api/payment/v1/recon/send-for-approval-recon-mobile-recharge-batch"
  } else if (type === "EMI") {
    url = "api/payment/v1/recon/send-for-approval-recon-emi-payment-batch"
  }
  return httpRequest(authContext()).post(url, body)
}
function getTransactionMaster(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/recon/list-transactions-master",
    body,
  )
}

function batchApproval(body: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/update-batch-approval-status",
    body,
  )
}

export {
  listOnlinePaymentReconTransactions,
  downloadOnlinePaymentReconTransactions,
  retryOnlinePaymentReconTransactions,
  manualUnfreezeOnlinePaymentReconTransactions,
  manualSuccessOnlinePaymentReconTransactions,
  listAllOnlinePaymentReconAction,
  downloadOnlinePaymentReconReport,
  downloadOnlinePaymentReconTemplate,
  listOnlinePaymentReconBulkRecon,
  sendForApprovalOnlinePaymentReconBatch,
  listBulkOnlinePaymentReconRecords,
  downloadOnlinePaymentReconBatchSourceFile,
  downloadOnlinePaymentReconBatchVerificationReportFile,
  downloadOnlinePaymentReconTransactionReportFile,
  discardDraftOnlinePaymentBulkBatch,
  createBulkOnlinePaymentReconRequest,
  listAllReconTransaction,
  createReconBatch,
  downloadBulkReconTemplate,
  fetchBulkRecon,
  fetchReconTransaction,
  listAllBulkReconTransaction,
  discardReconBatch,
  manualSuccessReconTransactions,
  manualUnfreezReconTransactions,
  retryReconTransactions,
  getAllMobileRechargeDetailList,
  downloadReconTransactions,
  getReconBulkBatchRecord,
  approveBulkBatch,
  getTransactionMaster,
  downloadReconTransactionsMaster,
  batchApproval,
}
