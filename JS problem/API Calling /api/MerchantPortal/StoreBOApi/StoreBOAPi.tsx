import httpRequest from "app/api/apiWrapper"
import { storeContext } from "app/api/services/Protected/ProtectedContext"

function getStoreOnboardingRequestAndHistoryList(data: any) {
  return httpRequest(storeContext()).post(
    "api/onboarding/v1/store-onboarding/get-store-history-list",
    {
      ...data,
    },
  )
}

function UpdateBatchApprovalStatus(data: any) {
  console.log("payload while making api call---------------->", data)

  return httpRequest(storeContext()).post(
    "api/sysportal/approval-management/v1/update-batch-approval-status",
    {
      ...data,
    },
  )
}
function DeleteAction(data: any) {
  console.log("payload while making api call---------------->", data)
  return httpRequest(storeContext()).post(
    "api/onboarding/v1/store-onboarding/delete-store",
    {
      ...data,
    },
  )
}
function UpdateAction(data: any) {
  console.log("payload while making api call---------------->", data)
  return httpRequest(storeContext()).post(
    "api/onboarding/v1/store-onboarding/update-store",
    {
      ...data,
    },
  )
}

function ParentMarchantList(data: any) {
  return httpRequest(storeContext()).post(
    "api/onboarding/v1/common/get-user-code-or-mobile-list",
    {
      ...data,
    },
  )
}

function verifyMSISDN(data: any) {
  return httpRequest(storeContext()).post(
    "api/onboarding/v1/common/verify-phone-number-or-email",
    {
      ...data,
    },
  )
}

function createStore(data: any) {
  return httpRequest(storeContext()).post(
    "api/onboarding/v1/store-onboarding/create-store",
    {
      ...data,
    },
  )
}

export {
  getStoreOnboardingRequestAndHistoryList,
  UpdateBatchApprovalStatus,
  DeleteAction,
  UpdateAction,
  ParentMarchantList,
  verifyMSISDN,
  createStore,
}
