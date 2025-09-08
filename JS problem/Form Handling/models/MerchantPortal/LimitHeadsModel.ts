export interface ITransactionsTypeOptions {
  isActive: boolean
  transactionTypeId: number
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
  category: string
  style?: any
  errorVisibility?: boolean
}
