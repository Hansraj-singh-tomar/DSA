import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function getAllDesignations(data: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-designation-list",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getDesignationDetails(reqObj: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-designation-details",
    {
      ...reqObj,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function createDesignation(formData: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/add-designation",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function editDesignation(formData: any) {
  return httpRequest(authContext()).put(
    "/api/rolematrix/update-designation",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getDesignatedUsers(data: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-designation-users",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getAllDesignations,
  getDesignationDetails,
  createDesignation,
  editDesignation,
  getDesignatedUsers,
}
