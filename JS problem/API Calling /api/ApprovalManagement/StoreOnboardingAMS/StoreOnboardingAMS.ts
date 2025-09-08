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

export { getStoreOnboardingRequestAndHistoryList, UpdateBatchApprovalStatus }
