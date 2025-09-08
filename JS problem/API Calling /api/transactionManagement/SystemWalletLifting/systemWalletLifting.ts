import httpRequest from "app/api/apiWrapper"
import getHeader, { getHeaderWithApiKey } from "app/api/getProtectedHeader"
import authContext from "app/api/services/Protected/ProtectedContext"
import publicContext from "app/api/services/Public/PublicContext"
import axios from "axios"
import moment from "moment"

const SYSTEM_LIFTING_URL = "api/payment/v1/systemLifting"

export function fetchSystemLiftingHstory(data: any) {
  return httpRequest(authContext()).post(
    `${SYSTEM_LIFTING_URL}/fetchSystemLiftingHstory`,
    data,
  )
}

export function imageUploadAPI(body: { file: File; userCode: string }) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/image/upload",
    body,
  )
}

export function getAmountInWords(amount: string) {
  return httpRequest(authContext()).post(
    "api/payment/v1/conversion/getAmountInWords",
    {
      amount,
    },
  )
}
export function systemLiftingUploadAPI(body: { file: File; userCode: string }) {
  return httpRequest(authContext()).post("api/payment/v1/uploadImage", body)
}

export function fetchBankNames(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-management/list-all-tcsa-banks",
    body,
  )
}

export function fetchBranchNames(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-management/list-tcsa",
    body,
  )
}

export function fetchWalletDetails(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/tcsa-management/list-tcsa",
    body,
  )
}

export function fetchSystemLiftingSummary(data: any) {
  return httpRequest(authContext()).post(
    `${SYSTEM_LIFTING_URL}/fetchSystemLiftingSummary`,
    data,
  )
}

export function downloadSystemLiftingSummary(data: any) {
  return httpRequest(authContext()).post(
    `${SYSTEM_LIFTING_URL}/downloadSystemLiftingSummary`,
    data,
  )
}

export const downloadTransactionDocument = async (
  url: string,
  fileName: string,
  format: string,
  body: any,
) => {
  axios({
    method: "POST",
    url: import.meta.env.VITE_URL + url,
    responseType: "blob",
    data: { ...body },
    headers: { ...getHeaderWithApiKey(body) },
  }).then((response) => {
    if (response.data.type !== "application/json") {
      const responseUrl = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = responseUrl
      link.setAttribute("download", `${fileName}_${Date.now()}.${format}`)
      document.body.appendChild(link)
      link.click()
      link?.parentNode?.removeChild(link)
    }
  })
}

export const transactionStatusTable = (data: any) => {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/fetch-level-wise-approval-details",
    data,
  )
}

export function initiateSystemLifting(data: any) {
  return httpRequest(authContext()).post(
    `${SYSTEM_LIFTING_URL}/initiateSystemLifting`,
    data,
  )
}
export function validateSystemLifting(data: any) {
  return httpRequest(authContext()).post(
    `${SYSTEM_LIFTING_URL}/validateSystemLifting`,
    { ...data },
  )
}

export function downloadLiftingRecord(data?: any) {
  return httpRequest(publicContext()).post(
    "/api/payment/v1/moneyMovement/download-list-lifting-history-by-id",
    {
      ...data,
    },
    {
      responseType: "blob",
    },
  )
}

// export function getChecksumHash(data: any) {
//   return httpRequest(authContext()).post(
//     "/api/payment/v1/checksumHash/get-ChecksumHash",
//     data,
//   )
// }

export const downloadPdfFileWithRequestBody = async (
  url: string,
  fileName: string,
  payload?: any,
) => {
  httpRequest(authContext())
    .post(url, payload, { responseType: "blob", headers: getHeader() })
    .then((response: any) => {
      const responseUrl = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = responseUrl
      link.setAttribute(
        "download",
        `${fileName}_${moment().format("DDMMyy_HHmmss")}.pdf`,
      )
      document.body.appendChild(link)
      link.click()
      // Clean up and remove the link
      link?.parentNode?.removeChild(link)
    })
}

export const fetchUploadedFile = async ({
  fileUrl,
  fileType,
  fileName,
  userCode,
}: any) => {
  try {
    const response = await axios({
      baseURL: `${import.meta.env.VITE_URL}`,
      method: "POST",
      url: "/api/payment/v1/downloadImage",
      responseType: "blob",
      data: {
        imageUrl: fileUrl,
        fileName,
        userCode,
      },
      headers: {
        ...getHeaderWithApiKey({
          imageUrl: fileUrl || "",
          fileName: fileName || "",
          userCode: userCode || "",
        }),
      },
    })
    if (response.status === 200) {
      let file: any
      switch (fileType.toLowerCase()) {
        case "png":
        case "jpg":
        case "jpeg":
          file = new Blob([response.data], { type: `image/${fileType}` })
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

export function fetchWalletNames(body: any) {
  return httpRequest(authContext()).post(
    "api/payment/v1/lifting-wallet/get-business-wallet",
    body,
  )
}
