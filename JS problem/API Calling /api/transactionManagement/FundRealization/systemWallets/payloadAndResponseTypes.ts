import {
  TSubControl,
  TTCSABankAccount,
  TTCSABank,
} from "app/models/FundRealization/SystemWallets"

export type TListSubControlRequest = {
  approvalStatus: Array<string>
  createdOn: {}
  level: string
  pageNo: number
  pageSize: number
  searchBy: string
}
export type TListSubControlResponse = {
  status: string
  message: string
  responseCode: number
  data: {
    last: boolean
    pageNo: number
    pageSize: number
    tooltipMessage?: string
    totalPage: number
    totalElement: number
    results: Array<TSubControl>
  }
}

export type TListTCSABankRequest = {
  approvalStatus: Array<string>
  createdOn: {}
  level: string
  pageNo: number
  pageSize: number
  searchBy: string
  subControl: string
  accountType: string
}
export type TListTCSABankResponse = {
  status: string
  message: string
  responseCode: number
  data: {
    last: boolean
    pageNo: number
    pageSize: number
    tooltipMessage?: string
    totalPage: number
    totalElement: number
    results: Array<TTCSABank>
  }
}

export type TListTCSABankAccountRequest = {
  approvalStatus: Array<string>
  createdOn: {}
  level: string
  pageNo: number
  pageSize: number
  searchBy: string
  bankName: string
  accountType: string
}
export type TListTCSABankAccountResponse = {
  status: string
  message: string
  responseCode: number
  data: {
    last: boolean
    pageNo: number
    pageSize: number
    tooltipMessage?: string
    totalPage: number
    totalElement: number
    results: Array<TTCSABankAccount>
  }
}
