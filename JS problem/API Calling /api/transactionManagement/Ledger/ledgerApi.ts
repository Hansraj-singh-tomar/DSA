import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "app/api/apiWrapper"

const bulkLedgerUploadAPI = async (body: FormData) => {
  return httpRequest(authContext()).post(
    "/api/payment/ledger/create-bulk-batch",
    body,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  )
}
const bulkLedgerHistoryAPI = async (body: any) => {
  return httpRequest(authContext()).post(
    "/api/payment/ledger/list-bulk-ledger",
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}
const bulkLedgerDownloadHistoryAPI = async (body: any) => {
  try {
    const response = await httpRequest(authContext()).post(
      "/api/payment/ledger/download-report",
      body,
      { responseType: "blob" },
    )

    // ✅ Extract filename
    let filename = `download_${Date.now()}.xlsx`
    const disposition = response.headers["content-disposition"]
    if (disposition && disposition.includes("filename=")) {
      filename = disposition
        .split("filename=")[1]
        .split(";")[0]
        .replace(/['"]/g, "")
        .trim()
    }

    // ✅ Create blob and trigger download (simplified approach like reference)
    const blob = new Blob([response.data])
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()

    // ✅ Clean up properly like the reference
    link?.parentNode?.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Download failed:", error)
  }
}

const updateBatchApprovalStatusAPI = async (body: any) => {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/update-batch-approval-status",
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}

const bulkLedgerApprovalRequestAPI = async (body: any) => {
  return httpRequest(authContext()).post(
    "/api/payment/ledger/approval-request",
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}

const bulkLedgerDownlodSampleAPI = async (url: string, fileName: string) => {
  try {
    const response = await httpRequest(authContext()).post(url, {
      responseType: "blob",
      headers: {
        "excel-type": "USER_BO",
        Accept:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Type": "application/json",
      },
    })

    const blob = new Blob([response.data])
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = downloadUrl
    link.setAttribute("download", `${fileName}_${Date.now()}.xlsx`)
    document.body.appendChild(link)
    link.click()

    // ✅ Clean up properly like the reference
    link?.parentNode?.removeChild(link)
    window.URL.revokeObjectURL(downloadUrl)
  } catch (error) {
    console.error("Download failed:", error)
    throw error
  }
}

const fileDownload = async (url: string, body: any, fileName: string) => {
  try {
    const response = await httpRequest(authContext()).post(url, body, {
      responseType: "blob",
      headers: {
        Accept:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Type": "application/json",
      },
    })

    const blob = new Blob([response.data])
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = downloadUrl
    link.setAttribute("download", fileName)
    document.body.appendChild(link)
    link.click()

    // ✅ Clean up properly like the reference
    link?.parentNode?.removeChild(link)
    window.URL.revokeObjectURL(downloadUrl)
  } catch (error) {
    console.error("Download failed:", error)
    throw error
  }
}

const getBulkLedgerApprovalAMSAPI = async (body: any) => {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/update-batch-approval-status",
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}

export {
  bulkLedgerUploadAPI,
  bulkLedgerHistoryAPI,
  bulkLedgerDownloadHistoryAPI,
  bulkLedgerDownlodSampleAPI,
  updateBatchApprovalStatusAPI,
  bulkLedgerApprovalRequestAPI,
  fileDownload,
  getBulkLedgerApprovalAMSAPI,
}
