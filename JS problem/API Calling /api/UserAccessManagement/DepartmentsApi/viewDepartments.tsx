import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function getAllDepartments(data: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-department-list",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getDepartmentDetails(reqObj: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-department-details",
    {
      ...reqObj,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function createDepartment(formData: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/add-department",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function editDepartment(formData: any) {
  return httpRequest(authContext()).put(
    "/api/rolematrix/update-department",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getUsersInDepartment(data: any) {
  return httpRequest(authContext()).post(
    "/api/rolematrix/get-department-users",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getAllDepartments,
  getDepartmentDetails,
  createDepartment,
  editDepartment,
  getUsersInDepartment,
}
