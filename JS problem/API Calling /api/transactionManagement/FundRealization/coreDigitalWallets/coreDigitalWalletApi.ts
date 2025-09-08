import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest, { downloadHttpRequest } from "app/api/apiWrapper"
import { AxiosResponse } from "axios"
import {
  TCreateRealizationRequest,
  TCreateRealizationResponse,
  TListRealizationPendingDataResponse,
  TListRealizationPendingDataRequest,
  TListRealizationHistoryDataRequest,
  TListRealizationHistoryDataResponse,
  TListDigitalCoreWalletRequest,
  TListDigitalCoreWalletResponse,
  TListDigitalCoreWalletCategoryRequest,
  TListDigitalCoreWalletCategoryResponse,
  TListSubControlRequest,
  TListSubControlResponse,
  TListTCSABankRequest,
  TListTCSABankResponse,
  TListTCSABankAccountRequest,
  TListTCSABankAccountResponse,
  TDownloadPendingRealizationDataRequest,
  TDownloadPendingRealizationDataResponse,
  TDownloadRealizationHistoryDataRequest,
  TDownloadRealizationHistoryDataResponse,
  TListOpexBankAccountRequest,
  TListOpexBankAccountResponse,
} from "./payloadAndResponseTypes"

// Dummy Data
// export function fetchWalletWisePendingData(
//   payload: TListRealizationPendingDataRequest,
// ): Promise<TListRealizationPendingDataResponse> {
//   return new Promise((res) => {
//     setTimeout(() => {
//       const response = getCoreDigitalWalletDummyData(
//         "walletWiseWalletPendingData",
//         payload,
//       )
//       res(response as TListRealizationPendingDataResponse)
//     }, 2000)
//   })
// }
export function fetchWalletWisePendingData(
  payload: TListRealizationPendingDataRequest,
): Promise<TListRealizationPendingDataResponse> {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fund-Realization/list-realization-pending-data",
    payload,
  )
}

// Dummy Data
// export function fetchCategoryWisePendingData(
//   payload: TListRealizationPendingDataRequest,
// ): Promise<TListRealizationPendingDataResponse> {
//   return new Promise((res) => {
//     setTimeout(() => {
//       const response = getCoreDigitalWalletDummyData(
//         "categoryWiseWalletPendingData",
//         payload,
//       )
//       res(response as TListRealizationPendingDataResponse)
//     }, 2000)
//   })
// }
export function fetchCategoryWisePendingData(
  payload: TListRealizationPendingDataRequest,
): Promise<TListRealizationPendingDataResponse> {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fund-Realization/list-realization-pending-data",
    payload,
  )
}

// Dummy Data
// export function fetchWalletWiseHistoryData(
//   payload: TListRealizationHistoryDataRequest,
// ): Promise<TListRealizationHistoryDataResponse> {
//   return new Promise((res) => {
//     setTimeout(() => {
//       const response = getCoreDigitalWalletDummyData(
//         "walletWiseHistoryData",
//         payload,
//       )
//       res(response as TListRealizationHistoryDataResponse)
//     }, 2000)
//   })
// }
export function fetchWalletWiseHistoryData(
  payload: TListRealizationHistoryDataRequest,
): Promise<TListRealizationHistoryDataResponse> {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fund-Realization/list-realization-request-history-data",
    payload,
  )
}

// Dummy Data
// export function fetchCategoryWiseHistoryData(
//   payload: TListRealizationPendingDataRequest,
// ): Promise<TListRealizationPendingDataResponse> {
//   return new Promise((res) => {
//     setTimeout(() => {
//       const response = getCoreDigitalWalletDummyData(
//         "categorytWiseHistoryData",
//         payload,
//       )
//       res(response as TListRealizationPendingDataResponse)
//     }, 2000)
//   })
// }
export function fetchCategoryWiseHistoryData(
  payload: TListRealizationHistoryDataRequest,
): Promise<TListRealizationHistoryDataResponse> {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fund-Realization/list-realization-request-history-data",
    payload,
  )
}

// Dummy Data
// export function createRealization(
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   payload: TCreateRealizationRequest,
// ): Promise<TCreateRealizationResponse> {
//   return new Promise((res) => {
//     setTimeout(() => {
//       const response: TCreateRealizationResponse = {
//         message: "Realization created successfully!",
//         responseCode: 20000,
//         status: "success",
//       }
//       res(response)
//     }, 2000)
//   })
// }
export function createRealization(
  payload: TCreateRealizationRequest,
): Promise<TCreateRealizationResponse> {
  return httpRequest(authContext()).post(
    "/api/payment/v1/fund-Realization/create-realization",
    payload,
  )
}

// Dummy Data
// export function fetchDigitalCoreWallets(
//   payload: TListDigitalCoreWalletRequest,
// ): Promise<TListDigitalCoreWalletResponse> {
//   return new Promise((res) => {
//     setTimeout(() => {
//       const response = getCoreDigitalWalletDummyData(
//         "walletWiseWallets",
//         payload,
//       )
//       res(response as TListDigitalCoreWalletResponse)
//     }, 2000)
//   })
// }
export function fetchDigitalCoreWallets(): Promise<TListDigitalCoreWalletResponse> {
  const requestPayload: TListDigitalCoreWalletRequest = {}
  return httpRequest(authContext()).post(
    "/api/payment/v1/fund-Realization/list-digital-core-wallet",
    requestPayload,
  )
}

// Dummy Data
// export function fetchDigitalCoreWalletCategories(
//   payload: TListDigitalCoreWalletCategoryRequest,
// ): Promise<TListDigitalCoreWalletCategoryResponse> {
//   return new Promise((res) => {
//     setTimeout(() => {
//       const response = getCoreDigitalWalletDummyData(
//         "categoryWiseWallets",
//         payload,
//       )
//       res(response as TListDigitalCoreWalletCategoryResponse)
//     }, 2000)
//   })
// }
export function fetchDigitalCoreWalletCategories(): Promise<TListDigitalCoreWalletCategoryResponse> {
  const requestPayload: TListDigitalCoreWalletCategoryRequest = {}
  return httpRequest(authContext()).post(
    "/api/payment/v1/fund-Realization/list-digital-core-wallet-category",
    requestPayload,
  )
}

export function fetchSubControls(): Promise<TListSubControlResponse> {
  const requestPayload: TListSubControlRequest = {
    approvalStatus: ["APPROVED"],
    createdOn: {},
    level: "Sub-Control",
    pageNo: 0,
    pageSize: 9999,
    searchBy: "TCSA",
  }
  return httpRequest(authContext()).post(
    "api/payment/v1/tcsa-management/list-tcsa",
    requestPayload,
  )
}

export function fetchTCSABanks(payload: {
  tcsaSubControl: string
  accountType: string
}): Promise<TListTCSABankResponse> {
  const requestPayload: TListTCSABankRequest = {
    approvalStatus: ["APPROVED"],
    createdOn: {},
    level: "Subsidiary",
    pageNo: 0,
    pageSize: 9999,
    searchBy: "TCSA",
    subControl: payload.tcsaSubControl,
    accountType: payload.accountType,
  }
  return httpRequest(authContext()).post(
    "api/payment/v1/tcsa-management/list-tcsa",
    requestPayload,
  )
}

export function fetchTCSABankAccounts(payload: {
  bankName: string
  tcsaSubControl: string
  accountType: string
}): Promise<TListTCSABankAccountResponse> {
  const requestPayload: TListTCSABankAccountRequest = {
    approvalStatus: ["APPROVED"],
    createdOn: {},
    level: "Subsidiary",
    pageNo: 0,
    pageSize: 9999,
    searchBy: "TCSA",
    bankName: payload.bankName,
    subControl: payload.tcsaSubControl,
    accountType: payload.accountType,
  }
  return httpRequest(authContext()).post(
    "api/payment/v1/tcsa-management/list-tcsa",
    requestPayload,
  )
}

export function fetchOpexBankAccounts(): Promise<TListOpexBankAccountResponse> {
  const requestPayload: TListOpexBankAccountRequest = {}
  return httpRequest(authContext()).post(
    "api/payment/v1/fetch-opex-bank-list",
    requestPayload,
  )
}

export function downloadPendingRealization(
  payload: TDownloadPendingRealizationDataRequest,
): Promise<AxiosResponse<TDownloadPendingRealizationDataResponse>> {
  return downloadHttpRequest(authContext()).post(
    "/api/payment/v1/fund-Realization/download-realization-data-by-walletcode",
    payload,
    {
      responseType: "blob",
    },
  )
}

export function downloadgRealizationHistory(
  payload: TDownloadRealizationHistoryDataRequest,
): Promise<AxiosResponse<TDownloadRealizationHistoryDataResponse>> {
  return downloadHttpRequest(authContext()).post(
    "/api/payment/v1/fund-Realization/download-realization-request-history-data",
    payload,
    {
      responseType: "blob",
    },
  )
}
