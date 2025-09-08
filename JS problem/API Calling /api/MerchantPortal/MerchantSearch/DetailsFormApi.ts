import { getImageApi } from "app/api/commonApi/CommonApi"
import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function getEditUserDetails(body: any) {
  return httpRequest(authContext()).post(
    "api/onboarding/v1/common/edit-user-profile-details",
    body,
  )
}

export function editUserDetails(data: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/onboardingAms/edit-user-details",
    data,
  )
}

export const getImage = async (_name: any, fileId: number) => {
  try {
    const response: any = await getImageApi(fileId)
    if (
      response?.status?.toLowerCase() === "success" &&
      (response.responseCode === 200 || response.responseCode === 20000)
    ) {
      return { status: true, data: response.data }
    }
    return { status: false, data: null }
  } catch (error) {
    return { status: false, data: null }
  }
}

export default getEditUserDetails
