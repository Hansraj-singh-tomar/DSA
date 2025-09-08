import authContext from "app/api/services/Protected/ProtectedContext"
import getHeader from "app/api/getProtectedHeader"
import httpRequest, { downloadHttpRequest } from "../../apiWrapper"

function getRefundListData(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/approvalManagement/fetchRefundAmsGroupView",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function refundListDownload(body: any) {
  const url = "/api/payment/v1/approvalManagement/downloadRefundAmsGroupView"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}

export { getRefundListData, refundListDownload }
