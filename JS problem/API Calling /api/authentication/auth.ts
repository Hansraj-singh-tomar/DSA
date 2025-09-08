// import { IBaiscDetails, IPhoneNumber } from "app/models/user"
import httpRequest from "app/api/apiWrapper"
// import { resolvePortalForDomain } from "app/pages/login/domains"
import { encryptSymmetricKey } from "app/utils/encryption1"
import crypto from "crypto"
import authContext from "../services/Public/PublicContext"
import protectedAuthContext from "../services/Protected/ProtectedContext"

function loginApi(requestBody: any, encryptedKey: any) {
  const header: any = {
    "Content-Type": "application/x-www-form-urlencoded",
  }

  if (import.meta.env.VITE_RBAC === "true") {
    header.headers = {
      channel: "SYSTEM_PORTAL",
      // portalname: resolvePortalForDomain(),
    }
  }
  header.headers["api-key"] = encryptedKey

  return httpRequest(authContext()).post(
    "/api/auth/v1/retrieve-token",
    requestBody,
    header,
  )
}

function verifyEmailApi(verifyToken: any) {
  return httpRequest(authContext()).get(
    `api/onboarding/v1/verify/validate-change-email-request/${verifyToken}`,
  )
}

function verifyEmailApiOtherUser(verifyToken: any) {
  return httpRequest(authContext()).get(
    `api/onboarding/v1/verify/updateEmail/${verifyToken}`,
  )
}

function refreshTokenApi() {
  return httpRequest(protectedAuthContext()).post(
    "/api/auth/v1/refresh-token",
    {},
  )
}
export function forgotPassword(body: any) {
  console.log("-------------------", body)

  return httpRequest(authContext()).post(
    // "api/onboarding/v1/common/verify-password",
    // "api/onboarding/v1/user-portal/login",
    "/api/onboarding/v1/user-portal/generate-password-setup-link",
    {
      ...body,
    },
  )
}

function logoutApi() {
  const passKey = crypto.randomBytes(16).toString("base64")
  const encryptedKey = encryptSymmetricKey(passKey)
  return httpRequest(protectedAuthContext()).post(
    "/api/auth/v1/logout",
    {},
    {
      headers: { "Api-key": encryptedKey },
    },
  )
}

const abc = 10
export {
  loginApi,
  abc,
  verifyEmailApi,
  verifyEmailApiOtherUser,
  refreshTokenApi,
  logoutApi,
}
