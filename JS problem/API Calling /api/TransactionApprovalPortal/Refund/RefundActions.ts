import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function approveRejectParkUnparkRefund(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/approvalManagement/refundRequestAmsAction",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getValidateRefundTcsaBalance(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/approvalManagement/fetchValidateRefundTcsaBalance",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getPreApprovalRefundDetails(data: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/approvalManagement/fetchPreApprovalRefundDetails",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  approveRejectParkUnparkRefund,
  getValidateRefundTcsaBalance,
  getPreApprovalRefundDetails,
}
