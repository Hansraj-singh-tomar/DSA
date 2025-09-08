import authContext from "app/api/services/Protected/ProtectedContext"
import httpRequest from "../../apiWrapper"

function getAmsSlabList(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/ams-slabs/view-byType",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getAmsSlabById(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/ams-slabs/get",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function updateAmsSlab(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/ams-slabs/ams-slab-create-update",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

function createOrUpdateExistingAmsSlabs(data: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/ams-slabs/bulk-save-slabs",
    { ...data },
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getAmsSlabList,
  getAmsSlabById,
  updateAmsSlab,
  createOrUpdateExistingAmsSlabs,
}
