/* eslint-disable prettier/prettier */
import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../apiWrapper"

export default function getUssdHistoryData(payload: any) {
    return httpRequest(authContext()).post(
        "api/sysportal/v1/ussd-management/ussd-pending-approval-list",
        payload,
        {
            headers: { channel: "WEB" },
        },
    )
}

// export { getUssdHistoryData, }

