import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../apiWrapper"

function fetchModuleList() {
  return httpRequest(authContext()).post(
    "api/sysportal/notification-master/v1/get-module-name-list",
    {},
  )
}

function fetchModuleTransactionList(data: { moduleName: string }) {
  return httpRequest(authContext()).post(
    "api/sysportal/notification-master/v1/notification-module-transaction-list",
    {
      ...data,
    },
  )
}

function fetchNotificationList(data: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/notification-master/v1/notification-filter-list",
    {
      ...data,
    },
  )
}

function fetchNotificationById(data: { id: number }) {
  return httpRequest(authContext()).post(
    "api/sysportal/notification-master/v1/notification-by-id",
    {
      ...data,
    },
  )
}

function fetchNotificationPreviousConfigurationById(data: {
  id: number
  pageNo: number
  pageSize: number
}) {
  return httpRequest(authContext()).post(
    "api/sysportal/notification-master/v1/previous-configuration",
    {
      ...data,
    },
  )
}

function fetchKeyWordList(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/notification-master/v1/get-notification-keyword-list",
    {
      ...body,
    },
  )
}

// export function getNotificationChecksumHash(data: any) {
//   return httpRequest(authContext()).post(
//     "/api/sysportal/v1/checksumHash/get-ChecksumHash",
//     data,
//   )
// }

function updateNotification(data: any) {
  return httpRequest(authContext()).put(
    "api/sysportal/notification-master/v1/update-notification",
    {
      ...data,
    },
  )
}

function reuseNotification(id: number) {
  return httpRequest(authContext()).post(
    "api/sysportal/notification-master/v1/restore-notification",
    {
      id,
    },
  )
}

function fetchCommunicationConfigurationList(data: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/notification-master/v1/template-list",
    {
      ...data,
    },
  )
}

function deleteCommunicationConfiguration(data: {
  configCode: string
  version: number
}) {
  return httpRequest(authContext()).put(
    "api/sysportal/notification-master/v1/delete-template",
    {
      ...data,
    },
  )
}

function viewCommunicationConfiguration(data: {
  configCode: string
  version: number
}) {
  return httpRequest(authContext()).post(
    "api/sysportal/notification-master/v1/template-by-id",
    {
      ...data,
    },
  )
}

function viewCommunicationConfigurationServiceList(data: {
  configCode: string
  pageNo: number
  pageSize: number
}) {
  return httpRequest(authContext()).post(
    "api/sysportal/notification-master/v1/temp-service-list",
    {
      ...data,
    },
  )
}

function createCommunicationConfiguration(data: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/notification-master/v1/create-template",
    data,
  )
}

function updateCommunicationConfiguration(data: any) {
  return httpRequest(authContext()).put(
    "api/sysportal/notification-master/v1/update-template",
    data,
  )
}

export default null
export {
  fetchModuleList,
  fetchModuleTransactionList,
  fetchNotificationList,
  fetchNotificationById,
  fetchNotificationPreviousConfigurationById,
  fetchKeyWordList,
  updateNotification,
  reuseNotification,
  fetchCommunicationConfigurationList,
  deleteCommunicationConfiguration,
  viewCommunicationConfiguration,
  viewCommunicationConfigurationServiceList,
  createCommunicationConfiguration,
  updateCommunicationConfiguration,
}
