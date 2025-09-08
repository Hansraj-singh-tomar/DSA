import httpRequest from "app/api/apiWrapper"
import {
  claimContext,
  storeContext,
} from "app/api/services/Protected/ProtectedContext"

function getClaimOnboardingRequestAndHistoryList(data: any) {
  return httpRequest(claimContext()).post(
    "/api/onboarding/v1/claim/fetch-claim-history",
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

export { getClaimOnboardingRequestAndHistoryList, UpdateBatchApprovalStatus }
