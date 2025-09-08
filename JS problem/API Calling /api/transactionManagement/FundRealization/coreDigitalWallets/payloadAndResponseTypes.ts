import {
  TCoreDigitalWalletTransaction,
  TDigitalCoreWallet,
  TDigitalCoreWalletCategory,
  TPendingRealizationData,
  TRealizationHistoryData,
  TSubControl,
  TTCSABankAccount,
  TTCSABank,
  TOpexBankAccount,
  EProcessCategory,
} from "app/models/FundRealization/CoreDigitalWallets"

export type TListDigitalCoreWalletRequest = {}
export type TListDigitalCoreWalletResponse = {
  message: string
  status: string
  responseCode: number
  data: Array<TDigitalCoreWallet>
}

export type TListDigitalCoreWalletCategoryRequest = {}
export type TListDigitalCoreWalletCategoryResponse = {
  message: string
  status: string
  responseCode: number
  data: Array<TDigitalCoreWalletCategory>
}

export type TListRealizationPendingDataRequest = {
  filter: {
    from: number | null
    to: number | null
  }
  pagination: {
    pageNo: number
    pageSize: number
  }
  categoryCode?: string
  status: Array<string>
  walletCode?: string
  processCategory: EProcessCategory
}
export type TListRealizationPendingDataResponse = {
  message: string
  pagination: {
    page: number
    perPage: number
    totalRecords: number
    totalPages: number
  }
  records: Array<TPendingRealizationData>
  status: string
  responseCode: number
  totalAmount: number
  totalPendingRealization: number
}

export type TListRealizationHistoryDataRequest = {
  realizationDateFrom: number | null
  realizationDateTo: number | null
  transactionDateFrom: number | null
  transactionDateTo: number | null
  status: Array<string>
  walletCode?: string
  categoryCode: string
  realizationTransactionId: string
  walletCodeORcategoryNameORTCSABankName: string
  operationalBankAccount?: string
  createdBy: string
  createdDateFrom: number | null
  createdDateTo: number | null
  pagination: {
    pageNo: number
    pageSize: number
  }
  processCategory: EProcessCategory
}
export type TListRealizationHistoryDataResponse = {
  totalAmount: number
  totalNoOfDaysWithCompletedRealization: number
  records: Array<TRealizationHistoryData>
  status: string
  responseCode: number
  message: string
  pagination: {
    page: number
    perPage: number
    totalRecords: number
    totalPages: number
  }
}

export type TCreateRealizationRequest = {
  categoryCode: string
  pendingData: Array<TCoreDigitalWalletTransaction>
  tcsaSubControl: string
  tcsaBank: string
  tcsaBankAccount: string
  operationalBank: string
  operationalBankAccount: string
  requesterRemarks: string
  requesterUserCode: string
  requesterName: string
  processCategory: EProcessCategory
  tcsaWalletCode: string
  tcsaAccountType: string
}
export type TCreateRealizationResponse = {
  status: string
  responseCode: number
  message: string
}

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
  subControl: string
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

export type TListOpexBankAccountRequest = {}
export type TListOpexBankAccountResponse = {
  responseCode: number
  data: Array<TOpexBankAccount>
}

export type TDownloadPendingRealizationDataRequest = {
  filter: {
    from: number | null
    to: number | null
  }
  status: string[]
  walletCategory?: string
  walletCode?: string
  processCategory: EProcessCategory
}
export type TDownloadPendingRealizationDataResponse = Blob

export type TDownloadRealizationHistoryDataRequest = {
  categoryCode?: string
  createdDateFrom: number | null
  createdDateTo: number | null
  realizationDateFrom: number | null
  realizationDateTo?: number | null
  transactionDateFrom: number | null
  transactionDateTo: number | null
  status: string[]
  walletCode?: string
  processCategory: EProcessCategory
}
export type TDownloadRealizationHistoryDataResponse = Blob
