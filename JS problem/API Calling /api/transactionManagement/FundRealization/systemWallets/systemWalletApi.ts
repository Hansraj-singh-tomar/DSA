import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "app/api/apiWrapper"
import {
  TListSubControlRequest,
  TListSubControlResponse,
  TListTCSABankRequest,
  TListTCSABankResponse,
  TListTCSABankAccountRequest,
  TListTCSABankAccountResponse,
} from "./payloadAndResponseTypes"

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
    accountType: payload.accountType,
  }
  return httpRequest(authContext()).post(
    "api/payment/v1/tcsa-management/list-tcsa",
    requestPayload,
  )
}
