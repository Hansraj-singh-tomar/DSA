import authContext from "app/api/services/Protected/ProtectedContext"
import { IParentDetails } from "app/models/user"
import httpRequest from "../../apiWrapper"

function getMnoList() {
  return httpRequest(authContext()).post(
    "api/sysportal/v1/mobile-network-operators/mno-list",
    {},
  )
}

function getParentList(body: IParentDetails) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/common/parents",
    {
      type: body.type,
      name: body.name,
      pagesize: body.pagesize,
      pageNo: body.pageNo,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

export { getMnoList, getParentList }
