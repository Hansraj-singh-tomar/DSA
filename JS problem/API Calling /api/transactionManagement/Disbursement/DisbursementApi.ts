import authContext from "../../services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

interface AddDisbursementConfig {
  isEnabledGovDisbursement: boolean
  isEFTDuplicacyChecking: boolean
  ibasDataCheckingAfterPerHour: string
  approvalConfig: string
  tpsConfiguration: {
    startTime: string
    endTime: string
    hourType: string
    transactionTPS: string
    smsTPS: string
    pushNotificationTPS: string
  }[]
}

function getdisbursementList() {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/getGovernmentDisbursmentConfig",
    {},
  )
}

function addDisbursementConfig(data: AddDisbursementConfig) {
  return httpRequest(authContext()).post(
    "/api/disbursement/api/updateGovernmentDisbursmentConfig",
    { ...data },
  )
}

export { getdisbursementList, addDisbursementConfig }
