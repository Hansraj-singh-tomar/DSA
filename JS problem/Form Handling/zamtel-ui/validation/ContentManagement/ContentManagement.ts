/* eslint-disable func-names */
import { getDateTimeEpoch, getStartTimeEpoch } from "app/utils/dateUtils"
import * as yup from "yup"

function ContentMgmtSchema(formStage: string) {
  let validationSchema = yup.object().shape({})

  const AddEditAppInfo = {
    titlePrimary: yup
      .string()
      .required("Title is required")
      .max(250, "Title should be less than 250 characters")
      .nullable(),
    detailMode: yup.string().required("Mode is required").nullable(),
    urlPrimary: yup
      .string()
      .when("detailMode", {
        is: (detailMode: string) => detailMode === "URL",
        then: yup.string().required("URL is required").nullable(),
      })
      .nullable(),
    urlSecondary: yup
      .string()
      .when("detailMode", {
        is: (detailMode: string) => detailMode === "URL",
        then: yup.string().required("URL is required").nullable(),
      })
      .nullable(),
    descriptionPrimary: yup
      .string()
      .when("detailMode", {
        is: (detailMode: string) => detailMode === "CUSTOM_EDITOR",
        then: yup.string().required("Custom Editor is required").nullable(),
      })
      .nullable(),
    descriptionSecondary: yup
      .string()
      .when("detailMode", {
        is: (detailMode: string) => detailMode === "CUSTOM_EDITOR",
        then: yup.string().required("Custom Editor is required").nullable(),
      })
      .nullable(),
  }

  const TNCTypeField = {
    tncType: yup.mixed().required("Module is required").nullable(),
  }

  const EditAddLineTNC = {
    descriptionPrimary: yup
      .string()
      .required("Description is required")
      .nullable(),
    descriptionSecondary: yup
      .string()
      .required("Description is required")
      .nullable(),
  }
  const SubAgreementAddLineTNC = {
    titlePrimary: yup.string().required("Title is required").nullable(),
    titleSecondary: yup.string().required("Title is required").nullable(),
    descriptionPrimary: yup
      .string()
      .required("Description is required")
      .nullable(),
    descriptionSecondary: yup
      .string()
      .required("Description is required")
      .nullable(),
  }

  const EditTopHeaderSection = {
    status: yup.string().required("Status is required").nullable(),
    titlePrimary: yup.string().required("Title is required").nullable(),
    titleSecondary: yup.string().required("Title is required").nullable(),
    subTextPrimary: yup.string().required("Subtext is required").nullable(),
    subTextSecondary: yup.string().required("Subtext is required").nullable(),
    imageUrlPrimary: yup.string().required("Image is required").nullable(),
    imageUrlSecondary: yup.string().required("Image is required").nullable(),
  }

  const EditCoreModuleSectionDetails = {
    status: yup.string().required("Status is required").nullable(),
    // collapseNoOfRows: yup.string().required("Collapse No of Rows is required").nullable(),
    titlePrimary: yup.string().required("Title is required").nullable(),
    titleSecondary: yup.string().required("Title is required").nullable(),
  }

  const EditBannerSectionDetails = {
    status: yup.string().required("Status is required").nullable(),
  }

  const AddEditCoreModuleService = {
    status: yup.string().required("Status is required").nullable(),
    serviceNamePrimary: yup
      .string()
      .required("Service Name is required")
      .nullable(),
    imageUrlPrimary: yup.mixed().required("Image is required").nullable(),
    // serviceNameSecondary: yup
    //   .string()
    //   .required("Service Name is required")
    //   .nullable(),
    // imageUrlPrimary: yup.string().required("Image is required").nullable(),
  }

  const BannerSchedulingStartDateDetails = {
    notApplicable: yup.boolean(),
    visibilityDateFrom: yup
      .string()
      .required("Start Date is required")
      .test(
        "min_current_date",
        "Start date cannot be less than current date",
        function (value: string | undefined | null) {
          const startDate = getStartTimeEpoch(Number(value))
          if (startDate) {
            return (
              startDate >= new Date().getTime().valueOf() - 24 * 60 * 60 * 1000
            )
          }
          return true
        },
      )
      .test(
        "min_start_date",
        "Start date cannot be greater than End date",
        function (value: string | undefined | null, context: any) {
          const { visibilityDateTo } = context.parent
          const startDate = getStartTimeEpoch(Number(value))
          const endDate = getStartTimeEpoch(Number(visibilityDateTo))
          if (endDate && startDate) {
            return startDate <= endDate
          }
          return true
        },
      )
      .nullable(),
    visibilityTimeFrom: yup
      .string()
      .required("Start Time is required")
      .test(
        "min_start_time",
        "You cant pick past time",
        function (value: string | undefined | null, context: any) {
          const { visibilityDateFrom, visibilityDateTo, visibilityTimeTo } =
            context.parent
          const startDate = getDateTimeEpoch(
            Number(visibilityDateFrom),
            Number(value),
          )
          const endDate = getDateTimeEpoch(
            Number(visibilityDateTo),
            Number(visibilityTimeTo),
          )
          if (endDate && startDate) {
            return startDate <= endDate
          }
          if (startDate) {
            return startDate >= new Date().getTime()
          }
          return true
        },
      )
      .nullable(),
  }
  const BannerSchedulingEndDateDetails = {
    notApplicable: yup.boolean(),
    visibilityDateTo: yup
      .string()
      .when("notApplicable", {
        is: (data: any) => data !== true,
        then: yup
          .string()
          .required("End Date is required")
          .test(
            "min_end_date",
            "End date cannot be less than Start date",
            function (value: string | undefined | null, context: any) {
              const { visibilityDateFrom } = context.parent
              const startDate = getStartTimeEpoch(Number(visibilityDateFrom))
              const endDate = getStartTimeEpoch(Number(value))
              if (endDate && startDate) {
                return startDate <= endDate
              }
              return true
            },
          )
          .nullable(),
      })
      .nullable(),
    visibilityTimeTo: yup
      .string()
      .when("notApplicable", {
        is: (data: any) => data !== true,
        then: yup
          .string()
          .required("End Time is required")
          .test(
            "min_end_time",
            "End time cannot be less than Start time",
            function (value: string | undefined | null, context: any) {
              const {
                visibilityTimeFrom,
                visibilityDateFrom,
                visibilityDateTo,
              } = context.parent
              const startDate = getDateTimeEpoch(
                Number(visibilityDateFrom),
                Number(visibilityTimeFrom),
              )
              const endDate = getDateTimeEpoch(
                Number(visibilityDateTo),
                Number(value),
              )
              if (endDate && startDate) {
                return startDate <= endDate
              }
              return true
            },
          )
          .nullable(),
      })
      .nullable(),
  }

  const AddEditBannerDetails = {
    // status: yup.string().required("Status is required").nullable(),
    // bannerCriteria: yup
    //   .mixed()
    //   .required("Banner Display Criteria is required")
    //   .nullable(),
    pageType: yup.string().required("Page Type is required").nullable(),
    title: yup.string().required("Title is required").nullable(),
    // visibility: yup.string().required("Visibility is required").nullable(),
    // showAudience: yup
    //   .array()
    //   .when("visibility", {
    //     is: (data: string) => data === "ALL",
    //     then: yup.array().nullable(),
    //     otherwise: yup.array().min(1, "At least one select").required("Show To is required").nullable(),
    //   })
    //   .nullable(),
    imageUrlPrimary: yup.mixed().required("Image is required").nullable(),
  }

  // const AddEditBannerMoreInfo = {
  //   selectedStatus: yup.string().required("Status is required").nullable(),
  //   notApplicable: yup.boolean().required("Not Applicable is required").nullable(),
  //   searchValue: yup.string().required("Search Value is required").nullable(),

  //   bannerSchedulingSUNDAY: yup.boolean().required("Schedule for Sunday is required").nullable(),
  //   bannerSchedulingMONDAY: yup.boolean().required("Schedule for Monday is required").nullable(),
  //   bannerSchedulingTUESDAY: yup.boolean().required("Schedule for Tuesday is required").nullable(),
  //   bannerSchedulingWEDNESDAY: yup.boolean().required("Schedule for Wednesday is required").nullable(),
  //   bannerSchedulingTHURSDAY: yup.boolean().required("Schedule for Thursday is required").nullable(),
  //   bannerSchedulingFRIDAY: yup.boolean().required("Schedule for Friday is required").nullable(),
  //   bannerSchedulingSATURDAY: yup.boolean().required("Schedule for Saturday is required").nullable(),

  //   allDaySUNDAY: yup.boolean().required("All Day selection for Sunday is required").nullable(),
  //   allDayMONDAY: yup.boolean().required("All Day selection for Monday is required").nullable(),
  //   allDayTUESDAY: yup.boolean().required("All Day selection for Tuesday is required").nullable(),
  //   allDayWEDNESDAY: yup.boolean().required("All Day selection for Wednesday is required").nullable(),
  //   allDayTHURSDAY: yup.boolean().required("All Day selection for Thursday is required").nullable(),
  //   allDayFRIDAY: yup.boolean().required("All Day selection for Friday is required").nullable(),
  //   allDaySATURDAY: yup.boolean().required("All Day selection for Saturday is required").nullable(),
  // }

  const AddEditDrawerMenu = {
    serviceNamePrimary: yup
      .string()
      .required("Service Name is required")
      .nullable(),
    subtextPrimary: yup.string().required("Subtext is required").nullable(),
    status: yup.string().required("Status is required").nullable(),
    imageUrlPrimary: yup.mixed().required("Image is required").nullable(),
  }

  const AddEditQuickAction = {
    serviceNamePrimary: yup
      .string()
      .required("Service Name is required")
      .nullable(),
    serviceNameSecondary: yup
      .string()
      .required("Service Name is required")
      .nullable(),
    status: yup.string().required("Status is required").nullable(),
    imageUrlPrimary: yup.string().required("Image is required").nullable(),
  }

  const AddEditTutorial = {
    status: yup.string().required("Status is required").nullable(),
    titlePrimary: yup.string().required("Title is required").nullable(),
    descriptionPrimary: yup
      .string()
      .required("Description is required")
      .nullable(),
    imageUrlPrimary: yup.string().required("Image is required").nullable(),
  }

  const AddEditContectCenter = {
    titlePrimary: yup.string().required("Title is required").nullable(),
    titleSecondary: yup.string().required("Title is required").nullable(),
    status: yup.string().required("Status is required").nullable(),
    valuePrimary: yup
      .string()
      .required("Contact Number is required")
      .min(
        12,
        "Contact Number should be atleast 12 digit including country code",
      )
      .max(
        18,
        "Contact Number should be at max 18 digit including country code",
      )
      .nullable(),
    urlPrimary: yup.string().required("Image is required").nullable(),
  }

  const AddEditSupportIcons = {
    serviceNamePrimary: yup
      .string()
      .required("Service Name is required")
      .nullable(),
    serviceNameSecondary: yup
      .string()
      .required("Service Name is required")
      .nullable(),
    subtextPrimary: yup.string().required("Subtext is required").nullable(),
    subtextSecondary: yup.string().required("Subtext is required").nullable(),
    status: yup.string().required("Status is required").nullable(),
    imageUrlPrimary: yup.string().required("Image is required").nullable(),
    categoryName: yup.string().required("Category Name is required").nullable(),
    // visibility: yup.string().required("Visibility is required").nullable(),
    // showAudience: yup
    //   .array()
    //   .when("visibility", {
    //     is: (data: string) => data === "ALL",
    //     then: yup.array().nullable(),
    //     otherwise: yup.array().min(1, "At least one select").required("Show To is required").nullable(),
    //   })
    //   .nullable(),
    // doNotShowAudience: yup.array().min(1, "At least one select").required("Do Not Show is required").nullable(),
  }

  const AddEditSocialMedia = {
    titlePrimary: yup.string().required("Title is required").nullable(),
    titleSecondary: yup.string().required("Title is required").nullable(),
    status: yup.string().required("Status is required").nullable(),
    platformUrlPrimary: yup.string().required("URL is required").nullable(),
    imageUrlPrimary: yup.string().required("Image is required").nullable(),
  }

  const AddEditContact = {
    titlePrimary: yup.string().required("Label is required").nullable(),
    titleSecondary: yup.string().required("Label is required").nullable(),
    status: yup.string().required("Status is required").nullable(),
    type: yup.string().required("Type is required").nullable(),
    valuePrimary: yup.string().required("Value is required").nullable(),
    valueSecondary: yup.string().required("Value is required").nullable(),
  }

  const EditContactSection = {
    email: yup.string().required("Email is required").nullable(),
    status: yup.string().required("Status is required").nullable(),
    officeAddressPrimary: yup
      .string()
      .required("Office Address is required")
      .nullable(),
    officeAddressSecondary: yup
      .string()
      .required("Office Address is required")
      .nullable(),
  }

  const CTAModule = {
    appTargetCTAMappingDTO: yup.object().shape({
      targetType: yup.mixed().required("Target Type is required").nullable(),
      targetModule: yup
        .mixed()
        .when("targetType", {
          is: (data: any) =>
            typeof data === "string"
              ? data === "MODULE"
              : data?.keyName === "MODULE",
          then: yup.mixed().required("Module is required").nullable(),
        })
        .nullable(),
      openIn: yup
        .mixed()
        .when("targetType", {
          is: (data: any) =>
            typeof data === "string" ? data === "URL" : data?.keyName === "URL",
          then: yup.mixed().required("Open In is required").nullable(),
        })
        .nullable(),
      targetUrlPrimary: yup
        .string()
        .when("targetType", {
          is: (data: any) =>
            typeof data === "string" ? data === "URL" : data?.keyName === "URL",
          then: yup.string().required("URL is required").nullable(),
        })
        .nullable(),
      targetUrlSecondary: yup
        .string()
        .when("targetType", {
          is: (data: any) =>
            typeof data === "string" ? data === "URL" : data?.keyName === "URL",
          then: yup.string().required("URL is required").nullable(),
        })
        .nullable(),
      ctaTextPrimary: yup
        .string()
        .required("CTA Name (English) is required")
        .nullable(),
      // ctaTextSecondary: yup
      //   .string()
      //   .required("CTA Name (Spanish) is required")
      //   .nullable(),
    }),
  }
  const EditFAQ = {
    videoUrlPrimary: yup.string().url().required("URL is required").nullable(),
  }

  const AddEditCreditCheckTNC = {
    titlePrimary: yup
      .string()
      .required("Title is required")
      .max(250, "Title should be less than 250 characters")
      .nullable(),
    titleSecondary: yup
      .string()
      .required("Title is required")
      .max(250, "Title should be less than 250 characters")
      .nullable(),
    detailMode: yup.string().required("Mode is required").nullable(),
    urlPrimary: yup
      .string()
      .when("detailMode", {
        is: (detailMode: string) => detailMode === "URL",
        then: yup.string().required("URL is required").nullable(),
      })
      .nullable(),
    urlSecondary: yup
      .string()
      .when("detailMode", {
        is: (detailMode: string) => detailMode === "URL",
        then: yup.string().required("URL is required").nullable(),
      })
      .nullable(),
    descriptionPrimary: yup
      .string()
      .when("detailMode", {
        is: (detailMode: string) => detailMode === "CUSTOM_EDITOR",
        then: yup.string().required("Custom Editor is required").nullable(),
      })
      .nullable(),
    descriptionSecondary: yup
      .string()
      .when("detailMode", {
        is: (detailMode: string) => detailMode === "CUSTOM_EDITOR",
        then: yup.string().required("Custom Editor is required").nullable(),
      })
      .nullable(),
  }

  const AddEditAutopayTNC = {
    versionNumber: yup
      .string()
      .required("Version number is required")
      .nullable(),
    titlePrimary: yup
      .string()
      .required("Title is required")
      .max(250, "Title should be less than 250 characters")
      .nullable(),
    titleSecondary: yup
      .string()
      .required("Title is required")
      .max(250, "Title should be less than 250 characters")
      .nullable(),
    detailMode: yup.string().required("Mode is required").nullable(),
    urlPrimary: yup
      .string()
      .when("detailMode", {
        is: (detailMode: string) => detailMode === "URL",
        then: yup.string().required("URL is required").nullable(),
      })
      .nullable(),
    urlSecondary: yup
      .string()
      .when("detailMode", {
        is: (detailMode: string) => detailMode === "URL",
        then: yup.string().required("URL is required").nullable(),
      })
      .nullable(),
    descriptionPrimary: yup
      .string()
      .when("detailMode", {
        is: (detailMode: string) => detailMode === "CUSTOM_EDITOR",
        then: yup.string().required("Custom Editor is required").nullable(),
      })
      .nullable(),
    descriptionSecondary: yup
      .string()
      .when("detailMode", {
        is: (detailMode: string) => detailMode === "CUSTOM_EDITOR",
        then: yup.string().required("Custom Editor is required").nullable(),
      })
      .nullable(),
    disclaimerPrimary: yup
      .string()
      .when("detailMode", {
        is: (detailMode: string) => detailMode === "CUSTOM_EDITOR",
        then: yup.string().required("Custom Editor is required").nullable(),
      })
      .nullable(),
    disclaimerSecondary: yup
      .string()
      .when("detailMode", {
        is: (detailMode: string) => detailMode === "CUSTOM_EDITOR",
        then: yup.string().required("Custom Editor is required").nullable(),
      })
      .nullable(),
  }

  switch (formStage) {
    case "AddEditTNC":
      validationSchema = yup.object().shape({
        ...AddEditAppInfo,
        ...TNCTypeField,
      })
      break
    case "AddEditAboutUsPolicy":
      validationSchema = yup.object().shape({
        ...AddEditAppInfo,
      })
      break
    case "EditTopHeaderSection":
      validationSchema = yup.object().shape({
        ...EditTopHeaderSection,
      })
      break
    case "EditCoreModuleSectionDetails":
      validationSchema = yup.object().shape({
        ...EditCoreModuleSectionDetails,
      })
      break
    case "AddEditCoreModuleService":
      validationSchema = yup.object().shape({
        ...AddEditCoreModuleService,
        ...CTAModule,
      })
      break
    case "EditBannerSectionDetails":
      validationSchema = yup.object().shape({
        ...EditBannerSectionDetails,
      })
      break
    case "AddBannerDetails":
      validationSchema = yup.object().shape({
        ...AddEditBannerDetails,
        // ...AddEditBannerMoreInfo,
        ...BannerSchedulingStartDateDetails,
        ...BannerSchedulingEndDateDetails,
        ...CTAModule,
      })
      break
    case "EditBannerDetails":
      validationSchema = yup.object().shape({
        ...AddEditBannerDetails,
        // ...AddEditBannerMoreInfo,
        ...BannerSchedulingEndDateDetails,
        ...CTAModule,
      })
      break
    case "AddEditDrawerMenu":
      validationSchema = yup.object().shape({
        ...AddEditDrawerMenu,
        ...CTAModule,
      })
      break
    case "AddEditQuickAction":
      validationSchema = yup.object().shape({
        ...AddEditQuickAction,
      })
      break
    case "AddEditTutorial":
      validationSchema = yup.object().shape({
        ...AddEditTutorial,
      })
      break
    case "AddEditContact":
      validationSchema = yup.object().shape({
        ...AddEditContact,
      })
      break
    case "AddEditContectCenter":
      validationSchema = yup.object().shape({
        ...AddEditContectCenter,
      })
      break
    case "AddEditSupportIcons":
      validationSchema = yup.object().shape({
        ...AddEditSupportIcons,
      })
      break
    case "AddEditSocialMedia":
      validationSchema = yup.object().shape({
        ...AddEditSocialMedia,
      })
      break
    case "EditContactSection":
      validationSchema = yup.object().shape({
        ...EditContactSection,
      })
      break
    case "EditFAQ":
      validationSchema = yup.object().shape({
        ...EditFAQ,
      })
      break
    case "EditAddLineTNC":
      validationSchema = yup.object().shape({
        ...EditAddLineTNC,
        appTncSubAgreementDto: yup
          .array()
          .of(yup.object().shape(SubAgreementAddLineTNC))
          .default([]),
      })
      break
    case "AddEditCreditCheckTNC":
      validationSchema = yup.object().shape({
        ...AddEditCreditCheckTNC,
      })
      break
    case "AddEditAutopayTNC":
      validationSchema = yup.object().shape({
        ...AddEditAutopayTNC,
      })
      break
    default:
      validationSchema = yup.object().shape({})
      break
  }
  return validationSchema
}
export default ContentMgmtSchema
