import httpRequest from "../apiWrapper"
import authContext from "../services/Protected/ProtectedContext"

const STOREFRONT_API_URL = "/api/storefront/app-management/v1"

const COMMONS_API_URL = "/api/sysportal/v1/system-commons"

function getHomepageChronologyList(data: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/home-page-chronology`,
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getAppServicesList(data: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/drawermenu-section-list`,
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}

function reorderSectionPriority(data: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/reorder-section-priority`,
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}
function getSectionDataById(data: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/app-section-data-by-id`,
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}

function addEditSection(data: any, auditHeader: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/add-edit-section`,
    data,
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
    },
  )
}

function getSectionDetailsById(data: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/app-section-details-by-id`,
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}

function reorderServicePriority(data: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/reorder-service-details`,
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}
function reorderBannerPriority(data: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/reorder-banner-priority`,
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}

function addNewService(data: any, auditHeader: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/add-new-service`,
    data,
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
    },
  )
}

function fetchDropdown(data: any) {
  return httpRequest(authContext()).post(
    `${COMMONS_API_URL}/properties`,
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}

function getAppServiceDetailsById(data: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/app-service-details-by-id`,
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}

function editServiceDetails(data: any, auditHeader: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/edit-service-details`,
    data,
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
    },
  )
}

function getDrawerMenuChronologyList(data: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/get-drawer-menu-chronology`,
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}

function reorderDrawerMenuChronology(data: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/reorder-service-details`,
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}

function reorderTutorial(data: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/reorder-tutorial-details`,
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}

function editService(data: any, auditHeader: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/edit-service-details`,
    data,
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
    },
  )
}

function addBannerDetails(data: any, auditHeader: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/add-banner-details`,
    data,
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
    },
  )
}

function getAppBannerDetailsByID(data: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/app-banner-details-by-id`,
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}

function editBannerDetails(data: any, auditHeader: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/edit-banner-details`,
    data,
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
    },
  )
}
function getTermsAndConditionsList(body: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/term-condition-policies`,
    body,
    {
      headers: { channel: "WEB" },
    },
  )
}
function editTNCPolicies(data: any, auditHeader: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/edit-tnc-policies`,
    data,
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
    },
  )
}
function getFaqList(data: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/get-faq-list`,
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}
function getTutorialCategoryList(data: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/get-app-tutorial-category-list-data`,
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}
function getTutorialList(data: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/get-app-tutorial-details-data-list`,
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}
function addTutorialDetails(data: any, auditHeader: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/add-tutorial-details`,
    data,
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
    },
  )
}
function editTutorialDetails(data: any, auditHeader: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/edit-tutorial-details`,
    data,
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
    },
  )
}

function addEditContactCenter(data: any, auditHeader: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/add-edit-contact-center`,
    data,
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
    },
  )
}

function listContactCenter(data: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/list-contact-center`,
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}

function listSocialMedia(data: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/list-social-media`,
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}

function addSocialMedia(data: any, auditHeader: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/add-ns-media`,
    data,
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
    },
  )
}

function editSocialMedia(data: any, auditHeader: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/edit-social-media`,
    data,
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
    },
  )
}

function editFaq(data: any, auditHeader: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/edit-faq-mapping`,
    data,
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
    },
  )
}

function addFaq(data: any, auditHeader: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/add-faq-mapping`,
    data,
    {
      headers: { channel: "WEB", "x-bo-audit": auditHeader },
    },
  )
}

function listFaqCategory(data: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/get-faq-category`,
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}
function appServiceList(data: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/app-service-list`,
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}
function listBannerHistory(data: any) {
  return httpRequest(authContext()).post(
    `${STOREFRONT_API_URL}/list-banner-history`,
    data,
    {
      headers: { channel: "WEB" },
    },
  )
}

export {
  getHomepageChronologyList,
  reorderSectionPriority,
  getSectionDataById,
  addEditSection,
  getSectionDetailsById,
  reorderServicePriority,
  addNewService,
  fetchDropdown,
  getAppServiceDetailsById,
  editServiceDetails,
  getDrawerMenuChronologyList,
  reorderDrawerMenuChronology,
  editService,
  addBannerDetails,
  getAppBannerDetailsByID,
  editBannerDetails,
  getTermsAndConditionsList,
  editTNCPolicies,
  getFaqList,
  getTutorialList,
  addTutorialDetails,
  editTutorialDetails,
  getTutorialCategoryList,
  addEditContactCenter,
  listContactCenter,
  listSocialMedia,
  addSocialMedia,
  editSocialMedia,
  editFaq,
  addFaq,
  listFaqCategory,
  appServiceList,
  listBannerHistory,
  reorderBannerPriority,
  reorderTutorial,
  getAppServicesList,
}
