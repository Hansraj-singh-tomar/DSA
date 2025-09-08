export const WalletFilterValues = ["CATEGORY", "WALLET"] as const

export type TDigitalCoreWallet = {
  id: number
  balance?: number
  lastDayBalance?: number
  lastDayBalanceDateTime?: Date
  lastMonthBalance?: number
  lastMonthBalanceDateTime?: Date
  updatedTime?: Date
  creationTime?: Date
  businessWalletId: string
  lastArchivedBalance?: number
  lastArchivedDate?: Date
  businessWalletName: string
  businessWalletType: string
  customerId?: string
  lockVersion?: number
  categoryCode: string
  totalAmount?: number
  subControl?: string
  linkedGlCode?: string
  walletName?: string
  linkedGlName?: string
  accountType?: string
}

export type TDigitalCoreWalletCategory = any

export type TWalletFilter = (typeof WalletFilterValues)[number] | ""

export type TCoreDigitalWalletTransaction = {
  walletCode: string
  walletType: string
  transactionDate: number
  transactionCount: number
  amount: number
}

export type TPendingRealizationData = {
  walletTxnSummaryId: number
  walletId: string
  walletType: string
  walletName: string
  transactionDate: string
  transactionCount: number
  amount: number
  creditAmount: number
  debitAmount: number
  operationType?: string
  createdBy?: string
  closingBalance?: number
  createdTimeStamp?: Date
  openingBalance?: number
  updateTimeStamp?: Date
  fundRealizationStatus: string
  status: string
  categoryCode?: null
}

export type TRealizationHistoryData = {
  realizationTxnId: string
  walletTrxnSummaryId?: number
  walletId: string
  transactionCount: number
  totalAmount: number
  nextApproverUserLevel: string
  categoryCode?: string
  walletType?: string
  creationDate?: Date
  realizationDate?: Date
  transactionDate?: Date
  tcsaSubControl?: string
  tcsaBank?: string
  tcsaBankAccount?: string
  operationalBank?: string
  operationalBankAccount?: string
  requestedBy?: string
  requestedUserCode?: string
  requestedUserRemarks?: string
  approvalStatus?: string
  approvedBy?: string
  amsConfigCode?: string
  requestCategory?: string
  moduleName?: string
  approvalCode?: string
  requestCode?: string
  lastUpdationDate?: Date
  currentApproverUserType?: string
  currentApproverUserLevel?: string
  currentApproverName?: string
  currentApproverUserCode?: string
  nextApproverUserType?: string
  nextApproverLevel?: string
  rejectedBy?: string
  approverRemarks?: string
}

export type TWalletFilterRadioButtonValues = {
  label: string
  value: TWalletFilter
}

export type TSelectWallet = {
  walletFilter: TWalletFilter
  wallet: TDigitalCoreWallet | TDigitalCoreWalletCategory | null
}

export type TDateRange = {
  from: number | null
  to: number | null
}

export type TSubControl = {
  id: number
  className?: string
  tcsaLevel: string
  control?: string
  subControl: string
  subsidiary?: string
  tcsaType: string
  accountName?: string
  accountType?: string
  description?: string
  walletName: string
  walletType: string
  walletCode: string
  createdBy?: string
  approvedBy?: string
  approvedOn?: Date
  createdTimestamp?: Date
  updatedBy?: string
  updatedTimestamp?: Date
  parkedByLevel?: string
  parkedByUserCode?: string
  nextApproverLevel?: string
  nextApproverUserType?: string
  status?: string
  rejectedBy?: string
  remarks?: string
  isEnabled?: boolean
  lastApprovedUserCode?: string
  lastApprovedUserType?: string
  lastApproverLevel?: string
  approvalCode?: string
}

export type TTCSABank = {
  id: number
  className?: string
  tcsaLevel: string
  control?: string
  subControl?: string
  subsidiary?: string
  tcsaType: string
  accountName?: string
  accountType?: string
  isSubsidiaryRefundPrimaryAccount?: boolean
  description?: string
  walletName: string
  walletType: string
  walletCode: string
  createdBy?: string
  approvedBy?: string
  approvedOn?: Date
  createdTimestamp?: Date
  updatedBy?: string
  updatedTimestamp?: Date
  parkedByLevel?: string
  parkedByUserCode?: string
  nextApproverLevel?: string
  nextApproverUserType?: string
  status?: string
  rejectedBy?: string
  remarks?: string
  createdByUserCode?: string
  isEnabled?: boolean
  lastApprovedUserCode?: string
  lastApprovedUserType?: string
  lastApproverLevel?: string
  approvalCode?: string
  bankName: string
  branchName?: string
  routingNumber?: number
  bankAccountName: string
  bankAccountNumber: string
  balance?: number
  taggedGl?: string
  taggedGlName?: string
  isRefundAllowed?: boolean
  isLiftingAllowed?: boolean
  refundAccountType?: string
  categoryCode?: string
}

export type TTCSABankAccount = {
  id: number
  className?: string
  tcsaLevel: string
  control?: string
  subControl?: string
  subsidiary?: string
  tcsaType: string
  accountName?: string
  accountType?: string
  isSubsidiaryRefundPrimaryAccount?: boolean
  description?: string
  walletName: string
  walletType: string
  walletCode: string
  createdBy?: string
  approvedBy?: string
  approvedOn?: Date
  createdTimestamp?: Date
  updatedBy?: string
  updatedTimestamp?: Date
  parkedByLevel?: string
  parkedByUserCode?: string
  nextApproverLevel?: string
  nextApproverUserType?: string
  status?: string
  rejectedBy?: string
  remarks?: string
  createdByUserCode?: string
  isEnabled?: boolean
  lastApprovedUserCode?: string
  lastApprovedUserType?: string
  lastApproverLevel?: string
  approvalCode?: string
  bankName?: string
  branchName?: string
  routingNumber?: number
  bankAccountName: string
  bankAccountNumber: string
  balance?: number
  taggedGl?: string
  taggedGlName?: string
  isRefundAllowed?: boolean
  isLiftingAllowed?: boolean
  refundAccountType?: string
  categoryCode?: string
}

export type TOpexBankAccount = {
  opexBankId: number
  bankName: string
  branchName: string
  bankAccountNumber: string
  creationDate: Date
  updationDate: Date
  routingNo?: string
}

export enum EProcessCategory {
  VIA_WALLET = "via_wallet_name",
  VIA_CATEGORY = "via_category_name",
}
