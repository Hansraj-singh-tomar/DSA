export interface MnoList {
  id: number
  mnoName: string
}
export interface MerchantCategoryType {
  merchantType: string
  merchantTypeDefaultFlag: boolean
}

export interface AsyncOptionType {
  title: string
  year: number
}

export interface ParentDataList {
  applicantName: string
  userId: number
  usertype: string
  walletId: string
}

export interface ApiPaginationObject {
  pageNumber?: number
  pageSize?: number
  totalPages: number
  totalElements: number
}

export interface CategoryList {
  categoryId: number
  categoryName: string
}

export interface DepartmentList {
  departmentId: number
  departmentName: string
}

export interface DesignationList {
  designationId: number
  designationName: string
}

export type TransactionDetailsType = {
  isActive: boolean
  transactionTypeName: string
  transactionTypeDisplayName: string
  transactionTypeNotificationName: string
  sourceWalletType: string
  sourceUserType: string
  sourceUserSubType: string
  destinationWalletType: string
  destinationUserType: string
  destinationUserSubType: string
  channel: string
  transactionCode: string
  userType: string
  category: string
  senderTitle?: string
  playersReceivingCommission?: string
}

export type AlertModalType = {
  alertType: string
  message: string
  header: string
  buttonText1?: string
  buttonText2?: string
  toggleAction: () => void
  submitHandler?: () => void
} | null
