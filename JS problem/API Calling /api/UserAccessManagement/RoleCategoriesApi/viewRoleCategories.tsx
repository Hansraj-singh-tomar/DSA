import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function getAllRoleCategories(data: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-category-list",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getRoleCategoryDetails(reqObj: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-category-details",
    {
      ...reqObj,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function createRoleCategory(formData: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/add-category",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function editRoleCategory(formData: any) {
  return httpRequest(authContext()).put(
    "/api/rolematrix/update-category",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getCategoryRoles(reqObj: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-category-roles",
    {
      ...reqObj,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getAllRoleCategories,
  getRoleCategoryDetails,
  createRoleCategory,
  editRoleCategory,
  getCategoryRoles,
}
