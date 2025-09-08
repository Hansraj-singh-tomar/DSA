import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "app/api/apiWrapper"

export const getAllOnboardingRules = () =>
  httpRequest(authContext()).get("api/onboarding/onboarding-rules/all", {
    headers: { "Content-Type": "application/json" },
  })

export const getUserTypeVersions = (userType: string) =>
  httpRequest(authContext()).post(
    "api/sysportal/merchanttype/v1/list-user-type-versions",
    {
      pageNo: 0,
      pageSize: 999,
      userType,
      searchBy: "",
      distinctVersions: true,
    },
    {
      headers: { "Content-Type": "application/json" },
    },
  )

export const updateOnboardingRules = (ruleUpdateRequests: any[]) =>
  httpRequest(authContext()).post(
    "api/onboarding/onboarding-rules/batch-update",
    { ruleUpdateRequests },
    {
      headers: { "Content-Type": "application/json" },
    },
  )
