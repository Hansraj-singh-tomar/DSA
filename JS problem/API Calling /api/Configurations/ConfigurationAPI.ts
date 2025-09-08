import httpRequest from "app/api/apiWrapper"
import authContext from "app/api/services/Protected/ProtectedContext"

function listPlans(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/plan-management/v1/list-plans",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
      signal: controller?.signal,
    },
  )
}

function addEditPlan(data: any, auditHeader: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/plan-management/v1/add-edit-plan",
    {
      ...data,
    },
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
      signal: controller?.signal,
    },
  )
}

function listPaymentMethods(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/v1/payment-methods/get-payment-methods",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
      signal: controller?.signal,
    },
  )
}

function listPaymentDueConciliation(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/payment-due-conciliation-alert/list-payment-due-alert",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
      signal: controller?.signal,
    },
  )
}

function listOutageAlert(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/outage-alert-controller/v1/list-alert",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
      signal: controller?.signal,
    },
  )
}

function listPaymentDueAlert(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/autopay-failed-alert/list-alert",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
      signal: controller?.signal,
    },
  )
}

function listBillNotGeneratedAlert(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/bill-not-generated-alert/list-bill-alert",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
      signal: controller?.signal,
    },
  )
}

function autoPayDiscountToggle(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/plan-management/v1/autoPay-discount-toggle",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
      signal: controller?.signal,
    },
  )
}

function editPaymentMethod(data: any, auditHeader: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/v1/payment-methods/create-payment-methods",
    {
      ...data,
    },
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
      signal: controller?.signal,
    },
  )
}

function editPaymentDueAlert(data: any, auditHeader: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/payment-due-conciliation-alert/edit-payment-due-alert",
    {
      ...data,
    },
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
      signal: controller?.signal,
    },
  )
}

function editOutageAlert(data: any, auditHeader: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/outage-alert-controller/v1/edit-alert",
    {
      ...data,
    },
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
      signal: controller?.signal,
    },
  )
}

function editAutopayFailedAlert(data: any, auditHeader: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/autopay-failed-alert/edit-alert",
    {
      ...data,
    },
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
      signal: controller?.signal,
    },
  )
}

function editBillNotGeneratedAlert(
  data: any,
  auditHeader: any,
  controller?: any,
) {
  return httpRequest(authContext()).post(
    "/api/cms/bill-not-generated-alert/edit-bill-alert",
    {
      ...data,
    },
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
      signal: controller?.signal,
    },
  )
}

function bulkUpload(body: {
  file?: File
  uploadedBy: string
  type: string
  countryCode: string
}) {
  return httpRequest(authContext(), "/upload").post(
    "/api/cms/plan-management/v1/upload-plans",
    body,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

function bulkUploadPlanComponent(body: {
  file?: File
  uploadedBy: string
  type: string
  countryCode: string
}) {
  return httpRequest(authContext(), "/upload").post(
    "/api/cms/plan-management/v1/upload-plan-component",
    body,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

function updateVisibilityAndDefault(
  data: any,
  auditHeader: any,
  controller?: any,
) {
  return httpRequest(authContext()).post(
    "/api/cms/v1/payment-methods/update-visibility-and-default",
    {
      ...data,
    },
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
      signal: controller?.signal,
    },
  )
}

function listConfig(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/config/get-config-list",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
      signal: controller?.signal,
    },
  )
}

function editConfig(data: any, auditHeader: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/config/edit-config",
    {
      ...data,
    },
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
      signal: controller?.signal,
    },
  )
}

function listMaintenanceMode(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/maintenance-mode/list-maintenance-mode",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
      signal: controller?.signal,
    },
  )
}

function listChatbot(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/chatbot-config/v1/list-chatbot-content",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
      signal: controller?.signal,
    },
  )
}

function toggleChatbotVisibility(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/chatbot-config/v1/chatbot-visibility",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
      signal: controller?.signal,
    },
  )
}

function addEditChatbot(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/chatbot-config/v1/add-and-edit-chatbot-content",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
      signal: controller?.signal,
    },
  )
}
function addEditMaintenanceMode(data: any, auditHeader: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/maintenance-mode/save-maintenance-mode",
    {
      ...data,
    },
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
      signal: controller?.signal,
    },
  )
}

function editMaintenanceMode(data: any, auditHeader: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/sysportal/v1/maintenance-mode/edit-maintenance-mode",
    {
      ...data,
    },
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
      signal: controller?.signal,
    },
  )
}

function listPlanComponents(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/plan-management/v1/list-plan-component",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
      signal: controller?.signal,
    },
  )
}

function listComponentIcon(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/plan-management/v1/list-plan-component-icon",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
      signal: controller?.signal,
    },
  )
}

function addEditPlanComponent(data: any, auditHeader: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/plan-management/v1/add-edit-plan-component",
    {
      ...data,
    },
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
      signal: controller?.signal,
    },
  )
}

function addEditPlanComponentIcon(
  data: any,
  auditHeader: any,
  controller?: any,
) {
  return httpRequest(authContext()).post(
    "/api/cms/plan-management/v1/add-edit-plan-component-icon",
    {
      ...data,
    },
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
      signal: controller?.signal,
    },
  )
}

function listPlanUsage(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/plan-management/v1/list-plan-usage",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
      signal: controller?.signal,
    },
  )
}

function addEditPlanUsage(data: any, auditHeader: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/plan-management/v1/add-edit-plan-usage",
    {
      ...data,
    },
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
      signal: controller?.signal,
    },
  )
}

function addEditCCExpiry(data: any, auditHeader: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/credit-card-expiry/edit-credit-card-expiry",
    {
      ...data,
    },
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
      signal: controller?.signal,
    },
  )
}

function bulkUploadPlanUsage(body: {
  file?: File
  uploadedBy: string
  type: string
  countryCode: string
}) {
  return httpRequest(authContext(), "/upload").post(
    "/api/cms/plan-management/v1/upload-plan-usage",
    body,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

function listPlanCategory(controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/plan-management/v1/list-plan-category",
    {},
    {
      headers: { channel: "WEB" },
      signal: controller?.signal,
    },
  )
}

function addPlanCategory(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/plan-management/v1/add-plan-category",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
      signal: controller?.signal,
    },
  )
}

function listPlanPrice(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/plan-management/v1/list-plan-price",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
      signal: controller?.signal,
    },
  )
}

function bulkUploadPlanPrice(body: {
  file?: File
  uploadedBy: string
  type: string
  countryCode: string
}) {
  return httpRequest(authContext(), "/upload").post(
    "/api/cms/plan-management/v1/upload-plan-price",
    body,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

// Add On Configuration APIs
function listAddOnConfigurations(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/add-on-config-management/v1/list-add-on-config",
    {
      ...data,
    },
    {
      headers: { channel: "WEB", countryCode: "PR" },
      signal: controller?.signal,
    },
  )
}

function addEditAddOnConfiguration(
  data: any,
  auditHeader: any,
  controller?: any,
) {
  return httpRequest(authContext()).post(
    "/api/cms/add-on-config-management/v1/add-edit-add-on-config",
    {
      ...data,
    },
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader, countryCode: "PR" },
      signal: controller?.signal,
    },
  )
}

function bulkUploadAddOnConfig(body: {
  file?: File
  uploadedBy: string
  type: string
  countryCode: string
}) {
  return httpRequest(authContext(), "/upload").post(
    "/api/cms/add-on-config-management/v1/upload-add-on-config",
    body,
    {
      headers: { "Content-type": "multipart/form-data" },
    },
  )
}

function downloadSampleFileAddOn(body: { fileType: string }) {
  return httpRequest(authContext()).post(
    "/api/cms/add-on-config-management/v1/download-add-on-template",
    body,
    {
      headers: { countryCode: "PR" },
    },
  )
}

function downloadExcelFileAddOn(body: {
  fileType: string
  searchQuery: string
}) {
  return httpRequest(authContext()).post(
    "/api/cms/add-on-config-management/v1/download-add-on",
    body,
    {
      headers: { countryCode: "PR" },
    },
  )
}

function listCCExpiry(data: any, controller?: any) {
  return httpRequest(authContext()).post(
    "/api/cms/credit-card-expiry/get-list-credit-card-expiry",
    {
      ...data,
    },
    {
      headers: { channel: "WEB" },
      signal: controller?.signal,
    },
  )
}

export default null
export {
  listPlans,
  addEditPlan,
  bulkUpload,
  autoPayDiscountToggle,
  updateVisibilityAndDefault,
  listPaymentMethods,
  editPaymentMethod,
  listConfig,
  editConfig,
  listMaintenanceMode,
  listChatbot,
  toggleChatbotVisibility,
  addEditChatbot,
  addEditMaintenanceMode,
  listPlanComponents,
  listComponentIcon,
  addEditPlanComponent,
  addEditPlanComponentIcon,
  bulkUploadPlanComponent,
  listPlanUsage,
  addEditPlanUsage,
  bulkUploadPlanUsage,
  editMaintenanceMode,
  listAddOnConfigurations,
  addEditAddOnConfiguration,
  bulkUploadAddOnConfig,
  downloadSampleFileAddOn,
  downloadExcelFileAddOn,
  listPlanCategory,
  addPlanCategory,
  listPlanPrice,
  bulkUploadPlanPrice,
  listCCExpiry,
  addEditCCExpiry,
  listPaymentDueConciliation,
  editPaymentDueAlert,
  listOutageAlert,
  editOutageAlert,
  listPaymentDueAlert,
  editAutopayFailedAlert,
  listBillNotGeneratedAlert,
  editBillNotGeneratedAlert,
}
