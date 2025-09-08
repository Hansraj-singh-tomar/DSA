import authContext from "app/api/services/Protected/ProtectedContext"
import { IBaiscDetails } from "app/models/user"
import httpRequest from "../../apiWrapper"

function getNomineeRelationship() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/system-commons/properties",
    {
      type: "RELATIONSHIP_WITH_NOMINEE",
    },
  )
}

function getAutoLifting() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/system-commons/properties",
    {
      type: "AUTO_LIFTING",
    },
  )
}

function getSettlementPolicy() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/system-commons/properties",
    {
      type: "SETTLEMENT_POLICY",
    },
  )
}

function validatPhotoId(body: IBaiscDetails) {
  return httpRequest(authContext()).post(
    "/api/onboarding/verifyphonenumber",
    body,
  )
}
function listUserTypeVersions(body: any) {
  return httpRequest(authContext()).post(
    "api/sysportal/merchanttype/v1/list-user-type-versions",
    body,
  )
}

export {
  validatPhotoId,
  getNomineeRelationship,
  getAutoLifting,
  getSettlementPolicy,
  listUserTypeVersions,
}
