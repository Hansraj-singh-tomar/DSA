import httpRequest from "../apiWrapper"
import authContext from "../services/Protected/ProtectedContext"

const getSystemConfigurationApi = async (body: any) => {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-configuration/get-all-configuration",
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}
const getConfigurationByIdApi = async (body: any) => {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-configuration/get-configuration",
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}

const editSystemConfigurationAPI = async (body: any, userDetails: any) => {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/system-configuration/edit-configuration",
    { ...body },
    {
      headers: {
        "Content-Type": "application/json",
        updatedBy: userDetails.userName,
      },
    },
  )
}
const getTransactionTypeListAPI = async (body: any) => {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-configuration/get-wallet-type-list",
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}

const getSystemConfigurationHistoryApi = async (body: any) => {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-configuration/get-history-list",
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}
const getConfigurationByIdHistoryApi = async (body: any) => {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-configuration/get-history-details",
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}

const getConfigAMSList = async (body: any) => {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-configuration/fetch-ams-list",
    body,
  )
}

const getConfigAMSByIdApi = async (body: any) => {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-configuration/fetch-ams-details",
    body,
  )
}

const getConfigAMSHistoryList = async (body: any) => {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/system-configuration/get-history-list",
    body,
  )
}

const getConfigApprovalAMSAPI = async (body: any) => {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/update-batch-approval-status",
    body,
  )
}

export {
  getSystemConfigurationApi,
  getConfigurationByIdApi,
  editSystemConfigurationAPI,
  getTransactionTypeListAPI,
  getSystemConfigurationHistoryApi,
  getConfigurationByIdHistoryApi,
  getConfigAMSList,
  getConfigAMSByIdApi,
  getConfigAMSHistoryList,
  getConfigApprovalAMSAPI,
}
