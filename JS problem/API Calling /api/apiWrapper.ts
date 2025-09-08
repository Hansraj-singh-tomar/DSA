/* eslint-disable no-alert */
/* eslint-disable no-restricted-syntax */
import { IDefaultValueObject } from "app/models/form"
import {
  decryptRequestData,
  decryptSymmetricKey,
  encryptRequestData,
  encryptSymmetricKey,
} from "app/utils/encryption1"
import { Axios, AxiosError, AxiosResponse } from "axios"
import crypto from "crypto"
import _ from "lodash"
import store from "store"
import { logout } from "store/slices/user/authSlice"
import { logoutApi } from "./authentication/auth"
import getChecksum from "./generateCheckSum"

const responseBody = (response: AxiosResponse) => response.data

const controllerWiseKeysToBeEncryptedDecrypted = (controller: string) => {
  console.log(controller)
  // if (controller === "rolematrix") {
  //   return {
  //     password: true,
  //     userCode: true,
  //     userId: true,
  //     employeeId: true,
  //     emailId: true,
  //     phoneNo: true,
  //   }
  // }
  return {
    // nameEn: true,
    // password: true,
    // nameBn: true,
    // displayName: true,
    // applicantName: true,
    // mobile: true,
    // applicantContactNumber: true,
    // emergencyContactNo: true,
    // accountNumber: true,
    // holderName: true,
    // spouseName: true,
    // applicantIdNumber: true,
    // mobileNumber: true,
    // residentId: true,
    // nomineeNo: true,
    // name: true,
    // tagId: true,
    // kycSerialNumber: true,
    // MSISDN: true,
    // userId: true,
    // walletId: true,
    // merchantName: true,
    // userCodeOrMobile: true,
    // amount: true,
    // token: true,
    // phoneNumber: true,
    // terminalId: true,
    // userMobile: true,
    // // msisdn: true,
    // receiverMobileNumber: true,
    // payerWalletId: true,
    // payeeWalletId: true,
    // receiverName: true,
    // actualAmount: true,
    // senderPriceCode: true,
    // receiverPriceCode: true,
    // commissionCode: true,
    // userIdentifierCode: true,
    // refundAmount: true,
    // payerBankAccountLinkId: true,
    // // liftingAmount: true,
    // receiverId: true,
    // senderid: true,
    // dealerMobile: true,
    // merchantMobileNumber: true,
    // mobileNo: true,
    // maxAmount: true,
    // minAmount: true,
    // refundTcsaBankAccount: true,
    // msissdn: true,
    // msisdin: true,
    // // msisidn: true,
    // otp: true,
    // transactionId: true,
    // txnReceiverMobileNo: true,
    // txnId: true,
    // txnAmount: true,
    // customerMobileNo: true,
    // merchantNotificationMobileNo: true,
    // msisdns: true,
    // customerOpeningBalance: true,
    // customerClosingBalance: true,
    // clbMsisdn: true,
    // clbAmount: true,
    // clbPendingAmount: true,
    // clbPulledAmount: true,
    // clawbackAmount: true,
    // totalPulledClawbackAmount: true,
    // totalClawbackAmount: true,
    // minPendingAmount: true,
    // maxPendingAmount: true,
    // minClawbackAmount: true,
    // maxClawbackAmount: true,
    // clbTransactionAmount: true,
    // clbRemainingAmount: true,
    // initiatorMsisdn: true,
    // rechargeMsisdn: true,
    // rechargerMobile: true,
    // rechargeMobileNumber: true,
    // receiverNumber: true,
    // senderNumber: true,
    // senderUserCode: true,
    // receiverUserCode: true,
    // merchantMSISDN: true,
    // // targetModuleName: true,
    // // newly added
    // typeAssignBy: true,
    // msisidn: true,
    // pin: true,
    // // password: true,
    // // userCode: true,
    // // userId: true,
    // merchantCode: true,
    // employeeId: true,
    // emailId: true,
    // phoneNo: true,
    // mode: true,
    // oldPassword: true,
    // msisdn: true,
    // virtualToken: false,
  }
}

const allowedControllers = [
  "onboarding",
  "payment",
  "sysportal",
  "rolematrix",
  "storefront",
  "utility-management",
  "disbursement",
  "common",
  "otherpayment",
  "communication",
  "notification",
  "outbound-proxy",
  "audit",
  "staff-management",
]

function walkThrough(
  object: any,
  keysToBeEncrypted: IDefaultValueObject,
  passKey?: any,
) {
  if (Array.isArray(object)) {
    for (const element of object) {
      walkThrough(element, keysToBeEncrypted, passKey)
    }
  } else if (typeof object === "object") {
    for (const key in object) {
      if (keysToBeEncrypted[key]) {
        // eslint-disable-next-line no-empty
        if (Array.isArray(object[key])) {
        } else if (typeof object[key] === "object" && object[key] != null) {
          try {
            object[key] = encryptRequestData(object[key], passKey)
          } catch (error: any) {
            console.log(
              "Failed to process object or array encryption",
              error?.message,
            )
          }
        } else if (object[key]) {
          try {
            object[key] = encryptRequestData(object[key] || "", passKey)
          } catch (error: any) {
            console.error("Failed to process string encryption", error?.message)
          }
        }
      } else if (
        typeof object[key] === "object" ||
        Array.isArray(object[key])
      ) {
        walkThrough(object[key], keysToBeEncrypted, passKey)
      }
    }
  }
}

function decryptObject(
  object: any,
  keysToBeDecrypted: IDefaultValueObject,
  decryptedKey?: any,
) {
  if (Array.isArray(object)) {
    for (const element of object) {
      decryptObject(element, keysToBeDecrypted, decryptedKey)
    }
  } else if (typeof object === "object") {
    for (const key in object) {
      if (keysToBeDecrypted[key]) {
        if (typeof object[key] === "object" || Array.isArray(object[key])) {
          try {
            object[key] = decryptRequestData(object[key], decryptedKey)
          } catch (error: any) {
            console.error(
              "Failed to process object or array encryption",
              error?.message,
            )
          }
        } else if (object[key]) {
          try {
            object[key] = decryptRequestData(object[key] || "", decryptedKey)
          } catch (error: any) {
            console.error("Failed to process string encryption", error?.message)
          }
        }
      } else if (
        typeof object[key] === "object" ||
        Array.isArray(object[key])
      ) {
        decryptObject(object[key], keysToBeDecrypted, decryptedKey)
      }
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function httpRequest(axiosInstance: Axios, _p0?: string) {
  axiosInstance.interceptors.response.use(
    async function handleSuccess(response) {
      // const dispatch = useDispatch()

      if (
        response?.data?.responseCode === 5099 ||
        response?.data?.responseCode === 5100
      ) {
        const token = localStorage.getItem("token")
        if (
          !window.location.pathname.includes("/auth/") &&
          window.location.pathname !== "/" &&
          token
        ) {
          localStorage.removeItem("token")
          localStorage.removeItem("login")
          // alert("Your session has expired, please login again")
          try {
            await logoutApi()
          } finally {
            store.dispatch(logout())
            localStorage.clear()
            window.location.href = "/"
          }
        }
      }
      if (import.meta.env.VITE_SECURITY_ENABLED === "true") {
        for (const controller of allowedControllers) {
          if (response?.request?.responseURL?.includes(`/${controller}/`)) {
            if (
              response?.data?.checksum &&
              response?.data["api-key"] &&
              response?.data?.checksum !==
                getChecksum(
                  response?.data,
                  decryptSymmetricKey(response?.data["api-key"]),
                  true,
                )
            ) {
              console.error("Response checksum validation failed ")
              //  return Promise.reject(new Error("Checksum validation failed"))
            }
            const passKey = response?.data["api-key"]
            try {
              const data = response?.data?.data
              const decryptedKey = decryptSymmetricKey(passKey)
              if (data && (typeof data === "object" || Array.isArray(data))) {
                decryptObject(
                  data,
                  controllerWiseKeysToBeEncryptedDecrypted(controller) || {},
                  decryptedKey,
                )
              }
            } catch (error: any) {
              console.error("failed to intercept response ", error?.message)
              return error
            }
          }
        }
      }
      return response
    },
    async function handleError(error: AxiosError<any>) {
      if (error.name === "AxiosError" && error.code === "ERR_NETWORK") {
        error.message =
          "It seems our servers are not reachable at the moment, please try again later !"
        return Promise.reject(error)
      }
      if (error.name === "AxiosError" && error.code === "ERR_BAD_RESPONSE") {
        return Promise.reject(error.message)
      }
      if (
        error.name === "AxiosError" &&
        (error?.response?.data?.responseCode === 5099 ||
          error?.response?.data?.responseCode === 5100)
      ) {
        localStorage.removeItem("token")
        localStorage.removeItem("login")
        // alert("Your session has expired, please login again")
        try {
          await logoutApi()
        } finally {
          localStorage.clear()
          window.location.href = "/"
        }
      }
      return Promise.reject(error?.response?.data)
    },
  )

  axiosInstance.interceptors.request.use(function intercept(request: any) {
    if (import.meta.env.VITE_SECURITY_ENABLED === "true") {
      for (const controller of allowedControllers) {
        if (request.url?.includes(`/${controller}/`)) {
          try {
            let data = null
            if (request.data instanceof FormData) {
              data = request?.data
            } else {
              data = _.cloneDeep(request?.data)
            }
            const passKey = crypto.randomBytes(16).toString("base64")
            const encryptedKey = encryptSymmetricKey(passKey)

            if (data && (typeof data === "object" || Array.isArray(data))) {
              walkThrough(
                data,
                controllerWiseKeysToBeEncryptedDecrypted(controller) || {},
                passKey,
              )
            }
            request.data = data
            if (!request.headers.checksum) {
              request.headers.checksum = getChecksum(data, passKey)
            }
            if (localStorage.getItem("capability")) {
              const capabilityIdentifierEncrypted = encryptRequestData(
                localStorage.getItem("capability"),
                passKey,
              )
              request.headers["API-X-KEY-FORWRDER"] =
                capabilityIdentifierEncrypted
            }
            request.headers["Api-key"] = encryptedKey
          } catch (error: any) {
            console.error("failed to intercept request ", error?.message)
          }
          break
        }
      }
    }
    return request
  })

  return {
    get: (url: string, header?: {}) =>
      axiosInstance.get(url, header).then(responseBody),
    post: (url: string, body: {}, header?: {}) =>
      axiosInstance.post(url, body, header).then(responseBody),
    put: (url: string, body: {}, header?: {}) =>
      axiosInstance.put(url, body, header).then(responseBody),
    del: (url: string, header?: {}) =>
      axiosInstance.delete(url, header).then(responseBody),
    postForm: (url: string, file: Blob) => {
      const formData = new FormData()
      formData.append("File", file)
      return axiosInstance
        .post(url, formData, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .then(responseBody)
    },
  }
}

export function downloadHttpRequest(axiosInstance: Axios) {
  axiosInstance.interceptors.response.use(
    async function handleSuccess(response) {
      if (
        response?.data?.responseCode === 5099 ||
        response?.data?.responseCode === 5100
      ) {
        const token = localStorage.getItem("token")
        if (
          !window.location.pathname.includes("/auth/") &&
          window.location.pathname !== "/" &&
          token
        ) {
          localStorage.clear()
          store.dispatch(logout())
          // alert("Your session has expired, please login again")
          try {
            await logoutApi()
          } finally {
            localStorage.clear()
            window.location.href = "/"
          }
        }
      }

      return response
    },
    async function handleError(error: AxiosError<any>) {
      if (error.name === "AxiosError" && error.code === "ERR_NETWORK") {
        error.message =
          "It seems our servers are not reachable at the moment, please try again later !"
        return Promise.reject(error)
      }
      if (
        error.name === "AxiosError" &&
        (error?.response?.data?.responseCode === 5099 ||
          error?.response?.data?.responseCode === 5100)
      ) {
        localStorage.clear()
        store.dispatch(logout())
        // alert("Your session has expired, please login again")
        try {
          await logoutApi()
        } finally {
          localStorage.clear()
          window.location.href = "/"
        }
      }
      return Promise.reject(error?.response?.data)
    },
  )

  axiosInstance.interceptors.request.use(async function intercept(
    request: any,
  ) {
    if (import.meta.env.VITE_SECURITY_ENABLED === "true") {
      for (const controller of allowedControllers) {
        if (request.url?.includes(`/${controller}/`)) {
          try {
            let data = null
            const checksumDataForFormData: any = {}
            if (request.data instanceof FormData) {
              data = request?.data
              for (const pair of request.data.entries()) {
                if (!(pair[1] instanceof File)) {
                  // eslint-disable-next-line prefer-destructuring
                  checksumDataForFormData[pair[0]] = pair[1]
                }
              }
            } else {
              data = _.cloneDeep(request?.data)
            }
            if (data && (typeof data === "object" || Array.isArray(data))) {
              walkThrough(
                data,
                controllerWiseKeysToBeEncryptedDecrypted(controller) || {},
              )
            }
            const passKey = crypto.randomBytes(16).toString("base64")
            const encryptedKey = encryptSymmetricKey(passKey)
            request.data = data
            const capabilityIdentifierEncrypted = encryptRequestData(
              localStorage.getItem("capability") || "allow-customer-management",
              passKey,
            )
            request.headers["Api-key"] = encryptedKey
            request.headers["API-X-KEY-FORWRDER"] =
              capabilityIdentifierEncrypted
            if (request.data instanceof FormData) {
              request.headers.checksum = getChecksum(checksumDataForFormData)
            } else {
              request.headers.checksum = getChecksum(data)
            }
          } catch (error: any) {
            console.error("failed to intercept request ", error?.message)
          }
          break
        }
      }
    }
    return request
  })

  return {
    get: (url: string, header?: {}) => axiosInstance.get(url, header),
    post: (url: string, body: {}, header?: {}) =>
      axiosInstance.post(url, body, header),
    put: (url: string, body: {}, header?: {}) =>
      axiosInstance.put(url, body, header),
    del: (url: string, header?: {}) => axiosInstance.delete(url, header),
    postForm: (url: string, file: Blob) => {
      const formData = new FormData()
      formData.append("File", file)
      return axiosInstance.post(url, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
    },
  }
}

export default httpRequest
