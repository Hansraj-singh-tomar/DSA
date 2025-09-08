import httpRequest, { downloadHttpRequest } from "app/api/apiWrapper"
import getHeader from "app/api/getHeaders"
import getProtectedHeader from "app/api/getProtectedHeader"
import authContext from "app/api/services/Protected/ProtectedContext"
import axios from "axios"
import moment from "moment"

export function fetchTerminalList(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/merchant/list-store-terminal",
    {
      ...body,
    },
  )
}

export function updateActiveStoreTerminalCount(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/merchant/update-active-store-terminal",
    {
      ...body,
    },
  )
}

export function updateTerminalStatus(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/merchant/update-store-terminal-status",
    {
      ...body,
    },
  )
}

export function deleteTerminal(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/merchant/delete-store-terminal",
    {
      ...body,
    },
  )
}

export function generateTerminalId(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/merchant/generate-terminal-id",
    {
      ...body,
    },
  )
}

export function newTerminalSignUp(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/merchant/store-terminal-signup",
    {
      ...body,
    },
  )
}

export function fetchStoreTerminalProfile(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/merchant/get-store-terminal",
    {
      ...body,
    },
  )
}

export function updateStoreTerminalProfile(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/merchant/update-store-terminal",
    {
      ...body,
    },
  )
}

export function createBulkOnboard(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/merchant/upload-store-terminal",
    body,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

export function fetchBatchInfo(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/merchant/get-store-terminal-batch-info",
    {
      ...body,
    },
  )
}

export function fetchBatchTerminalList(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/merchant/get-store-terminal-batch-detail",
    {
      ...body,
    },
  )
}

export function updateBatchTerminalStatus(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/merchant/change-batch-status",
    {
      ...body,
    },
  )
}

export function fetchInfoFile(url: string, body: any) {
  const token: string = sessionStorage.getItem("token") ?? ""
  return downloadHttpRequest(authContext()).post(
    url,
    { ...body },
    {
      responseType: "blob",
      headers: {
        ...getHeader(),
        Authorization: `Bearer ${token}`,
      },
    },
  )
}

export function fetchBulkOnboard(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/merchant/get-store-terminal-batch-history",
    {
      ...body,
    },
  )
}

export function verifyPin(body: any) {
  return axios.post(
    `${import.meta.env.VITE_URL}/api/onboarding/v1/common/verify-pin`,
    { ...body },
    {
      headers: {
        ...getHeader(),
        channel: "APP",
      },
    },
  )
}

export function verifyPassword(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/common/verify-password",
    {
      ...body,
    },
  )
}

export function resetPin(body: any) {
  return httpRequest(authContext()).post("api/onboarding/v1/common/set-pin", {
    ...body,
  })
  // const token: string = sessionStorage.getItem("token") ?? ""
  // return axios.post(
  //   `${import.meta.env.VITE_URL}/api/onboarding/v1/common/set-pin`,
  //   { ...body },
  //   {
  //     headers: {
  //       ...getHeader(),
  //       channel: "APP",
  //       Authorization: `Bearer ${token}`,
  //       appLanguage: "en",
  //     },
  //   },
  // )
}

export function resetPassword(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/common/update-password",
    {
      ...body,
    },
  )
}

export function fetchBulkQrCodes({
  body,
  fileName,
  onSuccess,
}: {
  body: any
  fileName: string
  onSuccess: Function
}) {
  downloadHttpRequest(authContext())
    .post(
      "/api/onboarding/v1/qr-order/get-store-terminal-qr-multiple",
      { ...body },
      {
        responseType: "arraybuffer",
        headers: {
          ...getProtectedHeader(),
          "Content-Type": "application/json",
        },
      },
    )
    .then((response) => {
      // if (response?.headers?.["content-type"] === "application/zip") {
      const responseUrl = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/octet-stream",
        }),
      )
      const link = document.createElement("a")
      link.href = responseUrl
      link.setAttribute(
        "download",
        `${fileName}_${moment().format("DDMMyy_HHmmss")}.zip`,
      )
      document.body.appendChild(link)
      link.click()
      link?.parentNode?.removeChild(link)
      onSuccess()
      // } else {
      //   throw new Error("Something went wrong with file received!")
      // }
    })
    .catch((e) => {
      throw new Error(e)
    })
}
