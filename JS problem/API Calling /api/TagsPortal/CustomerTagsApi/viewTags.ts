import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function getAllTags(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/tag-management/all-tag-list",
    {
      ...data,
    },

    {
      headers: { channel: "WEB" },
      signal: controller?.signal,
    },
  )
}

function getTagDetails(reqObj: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/tag-management/get-tag-details",
    {
      ...reqObj,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function merchantType(reqObj: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/merchanttype/v1/merchant-type",
    {
      ...reqObj,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTagCustomers(reqObj: any, _controller?: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/tag-management/customer-by-tag",
    {
      ...reqObj,
    },
    {
      headers: { channel: "WEB" },
      // signal: controller ? controller?.signal : {},
    },
  )
}

function getProfileByCode(reqObj: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/tag-management/customer-profile-by-code",
    reqObj,
    {
      headers: { channel: "WEB" },
    },
  )
}

function removeCustomerTag(reqObj: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/tag-management/deassign-customer-tag",
    {
      ...reqObj,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function getExportCustomerTag(tagCode: string) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/tag-management/export-customer-tag",
    {
      tagCode,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function customerCreateTag(formData: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/tag-management/new-tag",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function editCustomerTag(formData: any) {
  return httpRequest(authContext()).put(
    "/api/sysportal/v1/tag-management/modify-tag",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function updateAssignedTag(formData: any) {
  return httpRequest(authContext()).put(
    "/api/onboarding/v1/tag-management/assigned-customer-tag/update",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

function assignCustomerTag(formData: any) {
  return httpRequest(authContext()).post(
    "/api/onboarding/v1/tag-management/assign-customer-tag",
    {
      ...formData,
    },
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getAllTags,
  getTagDetails,
  getExportCustomerTag,
  customerCreateTag,
  editCustomerTag,
  getProfileByCode,
  removeCustomerTag,
  getTagCustomers,
  updateAssignedTag,
  assignCustomerTag,
  merchantType,
}
