import httpRequest from "app/api/apiWrapper"
import authContext, {
  authContextAgent,
  authContextCustomer,
} from "app/api/services/Protected/ProtectedContext"

interface CustomerHistoryRequest {
  pageNo: number
  pageSize: number
  mobile?: string
  searchTerm?: string
  approvalStatus?: string
  userType?: string
}
const getCustomerHistory = (data: CustomerHistoryRequest) => {
  return httpRequest(authContextCustomer()).post(
    "/api/onboarding/v1/applicant-detail/get-user-onboarding-history-list",
    data,
    {
      headers: {
        channel: "WEB",
        "Content-Type": "application/json",
      },
    },
  )
}
const getAgentHistory = (data: CustomerHistoryRequest) => {
  return httpRequest(authContextAgent()).post(
    "/api/onboarding/v1/applicant-detail/get-user-onboarding-history-list",
    data,
    {
      headers: {
        channel: "WEB",
        "Content-Type": "application/json",
      },
    },
  )
}
const getMerchantHistory = (data: CustomerHistoryRequest) => {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/applicant-detail/get-user-onboarding-history-list",
    data,
    {
      headers: {
        channel: "WEB",
        "Content-Type": "application/json",
      },
    },
  )
}

export default getCustomerHistory
export { getMerchantHistory, getAgentHistory }
