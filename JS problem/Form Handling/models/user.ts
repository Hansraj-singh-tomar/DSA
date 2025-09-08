export interface IUser {
  firstName: string
  lastName: string
}

export interface IUserLogin {
  username: string
  password: string
}

export interface IBaiscDetails {
  username: number
}

export interface IPhoneNumber {
  phoneNumber: number
}

export interface IParentDetails {
  name?: string
  type: string
  pagesize: number
  pageNo: number
}

export interface IBulkHistoryDetails {
  type: string
  order: string
  query: string
  pageSize: number
  pageNo: number
  dateFrom: number | null
  dateTo: number | null
  fileStatus: string | null
}

export interface IBulkBatchIdDetails {
  batchId: string | null
  order: string
  query: string
  pageSize: number
  pageNo: number
  kycStatus: string
  uploadStatus: string
  userTypeName: string
  userCode: string
}
