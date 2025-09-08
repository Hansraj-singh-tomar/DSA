/* eslint-disable import/prefer-default-export */

import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function smtapDmtapList(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/smtapDetails/listSmtapData",
    body,
  )
}

function initiatesmtapCancelRequest(body: any) {
  return httpRequest(authContext()).post(
    "/api/payment/v1/smtapDetails/initiateSmtapCancel",
    body,
  )
}

export { smtapDmtapList, initiatesmtapCancelRequest }
