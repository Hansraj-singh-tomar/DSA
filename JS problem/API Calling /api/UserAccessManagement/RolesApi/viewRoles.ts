import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function getAllRoles(data: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-role-list",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getRoleDetails(reqObj: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-role-details",
    {
      ...reqObj,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function createRole(formData: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/create-role",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function cloneRole(formData: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/clone-role",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function editRole(formData: any) {
  return httpRequest(authContext()).put(
    "/api/rolematrix/update-role-details",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getRoleCapabilities(formData: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-role-capability",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getRolePortals(formData: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-role-portal-list",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getRolePortalCapabilities(formData: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-role-portal-capability",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function configurePortal(formData: any) {
  return httpRequest(authContext()).put(
    "/api/rolematrix/update-role-capability",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getPortalsList(reqObj: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-portal-list",
    {
      ...reqObj,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getAllRoles,
  getRoleDetails,
  createRole,
  editRole,
  cloneRole,
  getRoleCapabilities,
  getRolePortals,
  getRolePortalCapabilities,
  configurePortal,
  getPortalsList,
}
