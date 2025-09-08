import authContext from "app/api/services/Protected/ProtectedContext"
import getHeader from "app/api/getProtectedHeader"
import httpRequest, { downloadHttpRequest } from "../../apiWrapper"

function getHistoryList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/approvalManagement/fetchApproverHistory",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getActivityLogList(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/approvalManagement/liftingActivityLog",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function ViewHistoryDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/approvalManagement/fetchLiftingSummaryAmsView",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function viewLiftingHistoryHierarchyLevels(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/fetch-level-wise-approval-details",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function viewLiftingHierarchyLevels(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/fetch-level-wise-approval-details",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function downloadHistoryList(body: any) {
  const url = "/api/payment/v1/approvalManagement/download-approver-history"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}

function downloadLiftingDetailsPdf(body: any) {
  const url = "/api/payment/v1/approvalManagement/download-lifting-ams-view"
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    { responseType: "blob", headers: getHeader() },
  )
}

interface IProps {
  fileUrl: string
  fileType: string
}

const fetchUploadedFile = async ({ fileUrl, fileType }: IProps) => {
  try {
    // const response = await axios({
    //   method: "POST",
    //   url: `${import.meta.env.VITE_URL}/api/payment/v1/downloadImage`,
    //   responseType: "blob",
    //   data: {
    //     imageUrl: fileUrl,
    //   },
    //   headers: getHeader(),
    // })
    const response = await downloadHttpRequest(authContext()).post(
      "/api/payment/v1/downloadImage",
      { imageUrl: fileUrl },
      { responseType: "blob", headers: getHeader() },
    )
    if (response.status === 200) {
      let file: any
      switch (fileType) {
        case "png":
        case "jpg":
        case "jpeg":
          file = new Blob([response.data])
          break
        case "pdf":
          file = new Blob([response.data], { type: "application/pdf" })
          break
        case "docx":
          file = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          })
          break
        case "doc":
          file = new Blob([response.data], {
            type: "application/msword",
          })
          break
        default:
          file = "Unsupported File"
          break
      }
      const responseUrl = window.URL.createObjectURL(file)
      return responseUrl
    }
    return response.data
  } catch (e: any) {
    return null
  }
}

export {
  getHistoryList,
  getActivityLogList,
  ViewHistoryDetails,
  downloadHistoryList,
  downloadLiftingDetailsPdf,
  fetchUploadedFile,
  viewLiftingHierarchyLevels,
  viewLiftingHistoryHierarchyLevels,
}
