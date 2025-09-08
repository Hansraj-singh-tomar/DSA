import authContext, {
  authContextAgent,
  authContextAgentAMS,
  authContextCustomer,
} from "app/api/services/Protected/ProtectedContext"
import httpRequest from "app/api/apiWrapper"

const ONBOARDING_AMS_MANAGEMENT_URL = "/api/onboarding/v1/onboardingAms"

export function fetchOnboardingAMSList(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/user-onboarding-ams-list",
    data,
    controller ? { signal: controller?.signal } : {},
  )
}
export function fetchOnboardingAMSListCust(data: any, controller?: any) {
  return httpRequest(authContextCustomer()).post(
    "/api/sysportal/merchanttype/v1/user-onboarding-ams-list",
    data,
    controller ? { signal: controller?.signal } : {},
  )
}
export function fetchOnboardingAMSListAgent(data: any, controller?: any) {
  return httpRequest(authContextAgent()).post(
    "/api/sysportal/merchanttype/v1/user-onboarding-ams-list",
    data,
    controller ? { signal: controller?.signal } : {},
  )
}

export function fetchOnboardingAMSRejectedApplications(data: any) {
  return httpRequest(authContext()).post(
    "/api/audit/v1/deleted-user/get-list",
    data,
  )
}

export function fetchApprovalcodeListAms(data: any) {
  return httpRequest(authContext()).post(
    `${ONBOARDING_AMS_MANAGEMENT_URL}/get-approvalcode-list-ams`,
    data,
  )
}
export function fetchApprovalcodeListAmsCust(data: any) {
  return httpRequest(authContextCustomer()).post(
    `${ONBOARDING_AMS_MANAGEMENT_URL}/get-approvalcode-list-ams`,
    data,
  )
}
export function fetchApprovalcodeListAmsAgent(data: any) {
  return httpRequest(authContextAgent()).post(
    `${ONBOARDING_AMS_MANAGEMENT_URL}/get-approvalcode-list-ams`,
    data,
  )
}

export function fetchMerchantOnboardingAMSHistoryList(data: any) {
  return httpRequest(authContext()).post(
    `${ONBOARDING_AMS_MANAGEMENT_URL}/get-history-ams`,
    data,
  )
}

export function fetchAMSInfo(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/applicant-detail/get-applicant",
    data,
  )
}
export function fetchAMSAgentInfo(data: any) {
  return httpRequest(authContextAgentAMS()).post(
    "/api/onboarding/v1/applicant-detail/get-applicant",
    data,
  )
}
export function fetchAMSCustInfo(data: any) {
  return httpRequest(authContextAgent()).post(
    "/api/onboarding/v1/applicant-detail/get-applicant",
    data,
  )
}

export function fetchRiskData(data: any) {
  return httpRequest(authContext()).post(
    `${ONBOARDING_AMS_MANAGEMENT_URL}/get-risk-master-drop-down-data`,
    data,
  )
}

export function fetchAssignParent(data: any) {
  return httpRequest(authContext()).post(
    `${ONBOARDING_AMS_MANAGEMENT_URL}/get-assign-parent`,
    data,
  )
}

export function fetchAPIData(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/common-lite/kyc-match-details",
    data,
  )
}

export function editUserDetails(data: any) {
  return httpRequest(authContext()).post(
    `${ONBOARDING_AMS_MANAGEMENT_URL}/edit-user-details`,
    data,
  )
}

export const fetchPendingAtBO = (data: any) => {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/fetch-level-wise-approval-details",
    data,
  )
}

export const fetchAssignParentModalFilter = (data: any) => {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/merchant-type",
    data,
  )
}

export const fetchDownloadQR = (data: any) => {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/common/get-static-qr",
    data,
  )
}

export function updateAprroveRejectStatus(body: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/update-batch-approval-status",
    body,
    {
      headers: { "Content-type": "application/json" },
    },
  )
}

export async function fetchThanaList(body: any) {
  const response = await httpRequest(authContext()).post(
    "/api/sysportal/v1/geoaddresses/thana-list",
    body,
  )
  if (response?.data?.result) {
    response.data.result = response.data.result.map((el: any) => el?.valueEn)
  }
  return response
}

export function updateApprovalStatus(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/approval-management/v1/update-batch-approval-status",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
export function updateApprovalStatusCust(data: any) {
  return httpRequest(authContextCustomer()).post(
    "/api/sysportal/approval-management/v1/update-batch-approval-status",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}
export function updateApprovalStatusAgent(data: any) {
  return httpRequest(authContextAgent()).post(
    "/api/sysportal/approval-management/v1/update-batch-approval-status",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

export function updateAprroveRejectStatusCust(body: any) {
  return httpRequest(authContextCustomer()).post(
    "/api/sysportal/approval-management/v1/update-batch-approval-status",
    body,
    {
      headers: { "Content-type": "application/json" },
    },
  )
}

export function fetchRejectReasons(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/kycManagementPortal/v1/list-kyc-management-reject-reason",
    {
      ...data,
    },
  )
}

export const getDocumentImages = (data: any) => {
  return httpRequest(authContext()).post("/api/onboarding/v1/image/get-image", {
    ...data,
  })
}

export function bulkRiskScoreUpdate(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/common/bulk-risk-score-update",
    data,
  )
}
