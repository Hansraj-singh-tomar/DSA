// // import { values } from "lodash"
// import * as yup from "yup"
// import { genValidation } from "app/utils/commonFunctions"
// import { ValidationField } from "app/models/validationFieldModel"

// function schema(
//   formStage: string,
//   dynamicMerchantFields: ValidationField[] = [],
// ) {
//   let validationSchema
//   const dynamicMerchantFieldsValidationSchema: any = {}
//   if (dynamicMerchantFields?.length) {
//     dynamicMerchantFields.forEach((field: ValidationField) => {
//       if (field.name) {
//         dynamicMerchantFieldsValidationSchema[field.name] = genValidation(field)
//       }
//     })
//   }

//   const merchantTypeStep1AddMoney = {
//     ChannelViaLifting: yup.string().when(["viaLifting"], {
//       is: true,
//       then: (scheme) => scheme.required(),
//     }),
//     // Lifting
//     autoLiftingThreshold: yup.string().when(["viaLifting", "autoLifting"], {
//       is: (viaLifting: boolean, autoLifting: boolean) =>
//         viaLifting && autoLifting,
//       then: yup.string().required(),
//     }),
//     viaLiftingMinAmount: yup.string().when(["viaLifting"], {
//       is: (viaLifting: boolean) => {
//         return viaLifting
//       },
//       then: yup.string().required(),
//     }),
//     viaLiftingMaxAmount: yup
//       .string()
//       .test(
//         "greaterThanMinRange",
//         "Maximum Balance should be greater than Minimum Balance",
//         (item: any, context: any) => {
//           if (context.parent.viaLifting !== true) return true
//           if (
//             Number(context.parent.viaLiftingMinAmount) >= Number(item) &&
//             context.parent.viaLiftingIsMaxNotAmountApplicable !== true
//           )
//             return false
//           return true
//         },
//       )
//       .when(["viaLiftingIsMaxNotAmountApplicable", "viaLifting"], {
//         is: (
//           viaLiftingIsMaxNotAmountApplicable: boolean,
//           viaLifting: boolean,
//         ) => !viaLiftingIsMaxNotAmountApplicable && viaLifting,
//         then: yup.string().required(),
//       }),
//     viaLiftingSelectBank: yup.mixed().when(["viaLifting"], {
//       is: (viaLifting: boolean) => viaLifting,
//       then: genValidation({
//         type: "multiSelectArrayOptions",
//         minArraySize: 1,
//       }),
//     }),
//   }

//   const merchantTypeStep1Settlement = {
//     ChannelSettlementsMerchantType: yup.string().when(["settlementFeeFields"], {
//       is: true,
//       then: (scheme) => scheme.required(),
//     }),
//     manualSettlementFeeMinAmount: yup
//       .string()
//       .when(["manualSettlementFields"], {
//         is: true,
//         then: yup.string().required(),
//       }),
//     manualExcludingBalance: yup.string().when(["manualSettlementFields"], {
//       is: true,
//       then: yup.string().required(),
//     }),

//     autoSettlementFeeMinAmount: yup.string().when(["autoSettlementFields"], {
//       is: true,
//       then: yup.string().required(),
//     }),
//     autoExcludingBalance: yup.string().when(["autoSettlementFields"], {
//       is: true,
//       then: yup.string().required(),
//     }),

//     settlementPolicy: yup.mixed().when(["autoSettlementFields"], {
//       is: true,
//       then: yup.mixed().required(),
//     }),

//     settlementPolicyMonthlyDay: yup
//       .mixed()
//       .when(["autoSettlementFields", "settlementPolicy"], {
//         is: (autoSettlementFields: boolean, settlementPolicy: string) =>
//           settlementPolicy === "Monthly" && autoSettlementFields,
//         then: yup.mixed().required(),
//       }),

//     settlementPolicyMonthlyHours: yup
//       .mixed()
//       .when(["autoSettlementFields", "settlementPolicy"], {
//         is: (autoSettlementFields: boolean, settlementPolicy: string) =>
//           settlementPolicy === "Monthly" && autoSettlementFields,
//         then: yup.mixed().required(),
//       }),

//     settlementPolicyMonthlyMinutes: yup
//       .mixed()
//       .when(["autoSettlementFields", "settlementPolicy"], {
//         is: (autoSettlementFields: boolean, settlementPolicy: string) =>
//           settlementPolicy === "Monthly" && autoSettlementFields,
//         then: yup.mixed().required(),
//       }),

//     settlementPolicyWeeklyDay: yup
//       .mixed()
//       .when(["autoSettlementFields", "settlementPolicy"], {
//         is: (autoSettlementFields: boolean, settlementPolicy: string) =>
//           settlementPolicy === "Weekly" && autoSettlementFields,
//         then: yup.mixed().required(),
//       }),

//     settlementPolicyWeeklyHours: yup
//       .mixed()
//       .when(["autoSettlementFields", "settlementPolicy"], {
//         is: (autoSettlementFields: boolean, settlementPolicy: string) =>
//           settlementPolicy === "Weekly" && autoSettlementFields,
//         then: yup.mixed().required(),
//       }),

//     settlementPolicyWeeklyMinutes: yup
//       .mixed()
//       .when(["autoSettlementFields", "settlementPolicy"], {
//         is: (autoSettlementFields: boolean, settlementPolicy: string) =>
//           settlementPolicy === "Weekly" && autoSettlementFields,
//         then: yup.mixed().required(),
//       }),

//     settlementFeeFields: yup.boolean(),
//     autoSettlementFields: yup
//       .boolean()
//       .when(["settlementFeeFields", "manualSettlementFields"], {
//         is: (settlementFeeFields: boolean, manualSettlementFields2: boolean) =>
//           settlementFeeFields && !manualSettlementFields2,
//         then: (instance) => {
//           return instance.isTrue(
//             "Auto Settlement / Manual Settlement should be enabled",
//           )
//         },
//       }),
//     manualSettlementFields: yup
//       .boolean()
//       .when(["settlementFeeFields", "autoSettlementFields"], {
//         is: (settlementFeeFields: boolean, autoSettlementFields2: boolean) =>
//           settlementFeeFields && !autoSettlementFields2,
//         then: (instance) => {
//           return instance.isTrue(
//             "Auto Settlement / Manual Settlement should be enabled",
//           )
//         },
//       }),
//     merchantTypeSettlementPolicyDailyHours: yup
//       .string()
//       .when(["autoSettlementFields", "settlementPolicy"], {
//         is: (autoSettlementFields: boolean, settlementPolicy: string) =>
//           autoSettlementFields && settlementPolicy === "Daily",
//         then: (scheme) => scheme.required(),
//       })
//       .nullable(),
//   }

//   const merchantRegStep1PhoneReg = {
//     mobile: yup.string().when({
//       is: (mobile: string) => mobile === null || mobile === undefined,
//       then: genValidation({
//         type: "string",
//         isRequired: true,
//       }),
//       otherwise: genValidation({
//         type: "mobile",
//         isRequired: true,
//         label: "MSISDN",
//       }),
//     }),
//     Identifier: genValidation({
//       type: "mixed",
//       isNullable: true,
//       isRequired: true,
//     }),
//   }

//   const merchantRegStep1BasicDetails = {
//     // nameEn: genValidation({
//     //   type: "string",
//     //   isRequired: true,
//     //   isNullable: true,
//     // }),
//     // email: genValidation({
//     //   type: "string",
//     //   format: "email",
//     //   isRequired: false,
//     //   isNullable: true,
//     // }),
//     // merchantCategoryCode: genValidation({
//     //   type: "mixed",
//     //   isRequired: true,
//     //   isNullable: true,
//     // }),
//     userProfileType: genValidation({
//       type: "mixed",
//       isRequired: true,
//       isNullable: true,
//     }),
//     // businessCategory: genValidation({
//     //   type: "mixed",
//     //   isRequired: true,
//     //   isNullable: true,
//     // }),
//     // businessType: genValidation({
//     //   type: "mixed",
//     //   isRequired: true,
//     //   isNullable: true,
//     // }),
//     // displayName: genValidation({
//     //   type: "string",
//     //   isRequired: true,
//     //   isNullable: true,
//     // }),
//     // organisationEmail: genValidation({
//     //   type: "string",
//     //   format: "email",
//     //   isNullable: true,
//     // }),
//     // organisationType: genValidation({
//     //   type: "mixed",
//     //   isRequired: true,
//     //   isNullable: true,
//     // }),
//     // shopName: genValidation({
//     //   type: "string",
//     //   isRequired: true,
//     //   isNullable: true,
//     // }),
//     // merchantAggregatorId: genValidation({
//     //   type: "string",
//     //   isNullable: true,
//     // }),
//     // tradeLicenseNumber: genValidation({
//     //   type: "string",
//     //   isNullable: true,
//     // }),
//     // tradeLicenseExpiryDate: yup.string().when({
//     //   is: (tradeLicenseExpiryDate: string) =>
//     //     tradeLicenseExpiryDate?.length === 0 ||
//     //     tradeLicenseExpiryDate === undefined ||
//     //     tradeLicenseExpiryDate === null,
//     //   then: genValidation({
//     //     type: "string",
//     //     isNullable: true,
//     //   }),
//     //   otherwise: genValidation({
//     //     type: "date",
//     //     isFutureDate: true,
//     //   }),
//     // }),
//     // issuingAuthority: genValidation({
//     //   type: "string",
//     //   isNullable: true,
//     // }),
//     // tinNumber: genValidation({
//     //   type: "string",
//     //   isNullable: true,
//     // }),
//     // vatRegNumber: genValidation({
//     //   type: "string",
//     //   isNullable: true,
//     // }),
//   }

//   const merchantRegStep1BasicAdditionalDetails = {
//     applicantName: genValidation({
//       type: "string",
//       isRequired: true,
//       isNullable: true,
//     }),
//     fatherName: genValidation({
//       type: "string",
//       isNullable: true,
//     }),
//     applicantContactNumber: yup.string().when({
//       is: (applicantContactNumber: string) =>
//         applicantContactNumber === null || applicantContactNumber === undefined,
//       then: genValidation({
//         type: "string",
//         isNullable: true,
//       }),
//       otherwise: genValidation({
//         type: "mobile",
//         label: "Applicant Contact No",
//       }),
//     }),
//     motherName: genValidation({
//       type: "string",
//       isNullable: true,
//     }),
//     relationshipMerchant: genValidation({
//       type: "mixed",
//       isNullable: true,
//     }),
//     spouseName: genValidation({
//       type: "string",
//       isNullable: true,
//     }),
//     userNationality: genValidation({
//       type: "mixed",
//       isRequired: true,
//       isNullable: true,
//     }),
//     dateOfBirth: yup.string().when({
//       is: (dateOfBirth: string) =>
//         dateOfBirth === undefined || dateOfBirth === null,
//       then: genValidation({
//         type: "string",
//         isNullable: true,
//         isRequired: true,
//       }),
//       otherwise: genValidation({
//         type: "date",
//         isPastDate: true,
//         isRequired: true,
//         isValidDOB: true,
//       }),
//     }),
//     gender: genValidation({
//       type: "mixed",
//       isRequired: true,
//       isNullable: true,
//     }),
//     occupation: genValidation({
//       type: "mixed",
//       isRequired: true,
//       isNullable: true,
//     }),
//     otherOccupation: yup.string().when(["occupation"], {
//       is: (occupation: any) => {
//         return (
//           occupation?.keyValue === undefined || occupation?.keyValue === null
//         )
//       },
//       then: (scheme) => scheme.nullable(),
//       otherwise: (scheme) =>
//         scheme.when("occupation", {
//           is: (occupation: any) => {
//             return occupation?.keyValue === "Other" || occupation === "Other"
//           },
//           then: genValidation({
//             type: "string",
//             isNullable: true,
//             isRequired: true,
//           }),
//           otherwise: genValidation({
//             type: "string",
//             isNullable: true,
//           }),
//         }),
//     }),
//     emergencyContactName: genValidation({
//       type: "string",
//       isNullable: true,
//     }),
//     emergencyContactNo: yup.string().when({
//       is: (emergencyContactNo: string) =>
//         emergencyContactNo === null || emergencyContactNo === undefined,
//       then: genValidation({
//         type: "string",
//         isNullable: true,
//       }),
//       otherwise: genValidation({
//         type: "mobile",
//         label: "Emergency Contact Number",
//       }),
//     }),
//     applicantEmail: genValidation({
//       type: "string",
//       format: "email",
//       isNullable: true,
//     }),
//     applicantMNO: genValidation({
//       type: "mixed",
//       isNullable: true,
//     }),
//     incomeSource: genValidation({
//       type: "mixed",
//       isNullable: true,
//     }),
//     residentStatus: genValidation({
//       type: "string",
//       isNullable: true,
//     }),
//     applicantIdType: yup.mixed().when({
//       is: (applicantIdType: any) => {
//         return applicantIdType === undefined || applicantIdType === null
//       },
//       then: genValidation({
//         type: "string",
//         isRequired: true,
//         isNullable: true,
//       }),
//       otherwise: genValidation({
//         type: "mixed",
//         isRequired: true,
//         isNullable: true,
//       }),
//     }),
//     applicantIdNumber: yup.string().when(["applicantIdType"], {
//       is: (applicantIdType: { keyValue: string }) => {
//         return (
//           applicantIdType?.keyValue === undefined ||
//           applicantIdType?.keyValue === null
//         )
//       },
//       then: (scheme) => scheme.nullable(),
//       otherwise: (scheme) =>
//         scheme.when("applicantIdType", {
//           is: (applicantIdType: { keyValue: string }) => {
//             return applicantIdType?.keyValue === "NID"
//           },
//           then: genValidation({
//             type: "nid",
//             isNullable: true,
//             isRequired: true,
//           }),
//           otherwise: (scheme2) =>
//             scheme2.when("applicantIdType", {
//               is: (applicantIdType: { keyValue: string }) => {
//                 return applicantIdType?.keyValue === "Passport"
//               },
//               then: genValidation({
//                 type: "passport",
//                 isNullable: true,
//                 isRequired: true,
//               }),
//               otherwise: (scheme3) =>
//                 scheme3.when("applicantIdType", {
//                   is: (applicantIdType: { keyValue: string }) => {
//                     return applicantIdType?.keyValue === "Driving Licence"
//                   },
//                   then: genValidation({
//                     type: "drivinglicence",
//                     isNullable: true,
//                     isRequired: true,
//                   }),
//                   otherwise: genValidation({
//                     type: "string",
//                     isNullable: true,
//                     isRequired: true,
//                   }),
//                 }),
//             }),
//         }),
//     }),
//     applicantTinNumber: genValidation({
//       type: "mixed",
//       isNullable: true,
//     }),
//     applicantIdValidity: yup.string().when("applicantIdType", {
//       is: (applicantIdType: any) => {
//         return (
//           applicantIdType?.keyValue?.toLowerCase() === "passport" ||
//           applicantIdType?.keyValue?.toLowerCase() === "driving licence" ||
//           (typeof applicantIdType === "string" &&
//             applicantIdType?.toLowerCase() === "passport") ||
//           (typeof applicantIdType === "string" &&
//             applicantIdType?.toLowerCase() === "driving licence")
//         )
//       },
//       then: genValidation({
//         type: "date",
//         isRequired: true,
//         isNullable: true,
//         isFutureDate: true,
//       }),
//       otherwise: (scheme1) => scheme1.nullable(),
//     }),
//   }

//   const merchantRegStep2 = {}

//   const merchantRegStep3 = {
//     ...merchantTypeStep1AddMoney,
//     ...merchantTypeStep1Settlement,
//     introducerName: genValidation({
//       type: "string",
//       isRequired: true,
//       isNullable: true,
//     }),
//     introducerAcNo: genValidation({
//       type: "mobile",
//       isRequired: true,
//       isNullable: true,
//       label: "Introducer Account No.",
//     }),
//     introducerAgencyName: genValidation({
//       type: "string",
//       isNullable: true,
//     }),
//     nomineeAddress: genValidation({
//       type: "string",
//       isNullable: true,
//     }),
//     percentageReserved: genValidation({
//       type: "percentage",
//       isNullable: true,
//     }),

//     autoSettlementCharges: yup.string().when(["autoSettlementRequest"], {
//       is: (autoSettlementRequest: any) => {
//         return autoSettlementRequest
//       },
//       then: yup
//         .string()
//         .test("typeError", "Specify valid number", (value: any) => {
//           if (value !== ".") return true
//           return false
//         })
//         .test(
//           "valueSize",
//           "Auto Settlement Charges should be at most 100%",
//           (value: number | undefined | null | string) => {
//             if (value != null) {
//               const val = Number(value)
//               return val <= 100
//             }
//             return true
//           },
//         )
//         .nullable(),

//       otherwise: (scheme) => scheme.nullable(),
//     }),

//     manualSettlementCharges: yup.string().when(["manualSettlementRequest"], {
//       is: (manualSettlementRequest: any) => {
//         return manualSettlementRequest
//       },
//       then: yup
//         .string()
//         .test("typeError", "Specify valid number", (value: any) => {
//           if (value !== ".") return true
//           return false
//         })
//         .test(
//           "valueSize",
//           "Manual Settlement Charges should be at most 100%",
//           (value: number | undefined | null | string) => {
//             if (value != null) {
//               const val = Number(value)
//               return val <= 100
//             }
//             return true
//           },
//         )
//         .nullable(),
//       otherwise: (scheme) => scheme.nullable(),
//     }),
//   }

//   const addressSchemaWithRequiredFields = {
//     completeAddress: genValidation({
//       type: "string",
//       isRequired: true,
//       isNullable: true,
//     }),
//     division: genValidation({
//       type: "string",
//       isNullable: true,
//       isRequired: true,
//     }),
//     district: genValidation({
//       type: "string",
//       isNullable: true,
//       isRequired: true,
//     }),
//     thana: genValidation({
//       type: "string",
//       isNullable: true,
//       isRequired: true,
//     }),
//     postCode: genValidation({
//       type: "number",
//       isRequired: true,
//       isNullable: true,
//     }),
//   }

//   const addressSchema = {
//     completeAddress: genValidation({
//       type: "string",
//       isNullable: true,
//     }),
//     division: genValidation({
//       type: "string",
//       isNullable: true,
//     }),
//     district: genValidation({
//       type: "string",
//       isNullable: true,
//     }),
//     thana: genValidation({
//       type: "string",
//       isNullable: true,
//     }),
//     postCode: genValidation({
//       type: "number",
//       isNullable: true,
//     }),
//   }

//   const bankDetailsRequiredSchema = yup.object().shape(
//     {
//       holderName: yup.string().nullable().required(),
//       accountNumber: yup
//         .string()
//         .nullable()
//         .required()
//         .when("accountNumber", {
//           is: (accountNumber: string) =>
//             accountNumber && accountNumber?.length > 0,
//           then: yup
//             .string()
//             .min(6, "Minimum allowed length is 6")
//             .max(25, "Maximum allowed length is 25")
//             .required()
//             .nullable(),
//         }),
//       branch: yup.lazy((value): any => {
//         switch (typeof value) {
//           case "object":
//             return yup.object().required().nullable(true)
//           case "string":
//             return yup.string().required()
//           default:
//             return yup.object().required()
//         }
//       }),
//       bankName: yup.lazy((value): any => {
//         switch (typeof value) {
//           case "object":
//             return yup.object().required().nullable(true)
//           case "string":
//             return yup.string().required()
//           default:
//             return yup.object().required()
//         }
//       }),
//     },
//     [["accountNumber", "accountNumber"]],
//   )

//   const bankDetailsSchema = yup
//     .object()
//     .shape(
//       {
//         accountNumber: yup
//           .string()
//           .nullable()
//           .when(["holderName", "branch", "bankName"], {
//             is: (holderName: any, branch: any, bankName: any) =>
//               holderName || branch || bankName,
//             then: yup
//               .string()
//               .required()
//               .nullable()
//               .min(6, "Minimum allowed length is 6")
//               .max(25, "Maximum allowed length is 25"),
//             otherwise: yup.lazy((value): any => {
//               return value && value?.length > 0
//                 ? yup
//                     .string()
//                     .nullable()
//                     .min(6, "Minimum allowed length is 6")
//                     .max(25, "Maximum allowed length is 25")
//                 : yup.string().nullable()
//             }),
//           }),
//         holderName: yup
//           .string()
//           .nullable()
//           .when(["accountNumber", "branch", "bankName"], {
//             is: (accountNumber: any, branch: any, bankName: any) =>
//               accountNumber || branch || bankName,
//             then: yup.string().required().nullable(),
//           }),
//         branch: yup
//           .mixed()
//           .nullable()
//           .when(["accountNumber", "holderName", "bankName"], {
//             is: (accountNumber: any, holderName: any, bankName: any) =>
//               accountNumber || holderName || bankName,
//             then: yup.lazy((value): any => {
//               switch (typeof value) {
//                 case "object":
//                   return yup
//                     .object()
//                     .required("Branch is required")
//                     .nullable(true)
//                 case "string":
//                   return yup.string().required("Branch is required")
//                 default:
//                   return yup.object().required("Branch is required")
//               }
//             }),
//           }),
//         bankName: yup
//           .mixed()
//           .nullable()
//           .when(["accountNumber", "branch", "holderName"], {
//             is: (accountNumber: any, branch: any, holderName: any) =>
//               accountNumber || branch || holderName,
//             then: yup.lazy((value): any => {
//               switch (typeof value) {
//                 case "object":
//                   return yup
//                     .object()
//                     .required("Bank is required")
//                     .nullable(true)
//                 case "string":
//                   return yup.string().required("Bank is required")
//                 default:
//                   return yup.object().required("Bank is required")
//               }
//             }),
//           }),
//       },
//       [
//         ["accountNumber", "holderName"],
//         ["accountNumber", "branch"],
//         ["accountNumber", "bankName"],
//         ["branch", "accountNumber"],
//         ["branch", "bankName"],
//         ["branch", "holderName"],
//         ["holderName", "accountNumber"],
//         ["holderName", "bankName"],
//         ["holderName", "branch"],
//         ["bankName", "branch"],
//         ["bankName", "holderName"],
//         ["bankName", "accountNumber"],
//       ],
//     )
//     .nullable()
//   switch (formStage) {
//     case "merchantRegStep1PhoneReg":
//       validationSchema = yup.object().shape({
//         ...merchantRegStep1PhoneReg,
//       })
//       break
//     case "merchantRegStep1BasicDetails":
//       validationSchema = yup.object().shape({
//         ...merchantRegStep1BasicDetails,
//         ORG_REGISTERED: yup
//           .object()
//           .shape({ ...addressSchemaWithRequiredFields }),
//         ORG_CURRENT: yup.object().shape({ ...addressSchema }),
//         ...dynamicMerchantFieldsValidationSchema,
//       })
//       break
//     case "merchantBulkRegStep1BasicAdditionalDetails":
//       validationSchema = yup.object().shape({
//         applicantDetails: yup.object().shape({
//           ...merchantRegStep1BasicAdditionalDetails,
//         }),
//         CURRENT: yup.object().shape({ ...addressSchemaWithRequiredFields }),
//         PERMANENT: yup.object().shape({ ...addressSchema }),
//       })
//       break

//     case "merchantRegStep1BasicAdditionalDetails":
//       validationSchema = yup.object().shape({
//         ...merchantRegStep1PhoneReg,
//         ...merchantRegStep1BasicDetails,
//         ORG_REGISTERED: yup
//           .object()
//           .shape({ ...addressSchemaWithRequiredFields }),
//         ORG_CURRENT: yup.object().shape({ ...addressSchema }),
//         ...dynamicMerchantFieldsValidationSchema,
//         applicantDetails: yup.object().shape({
//           ...merchantRegStep1BasicAdditionalDetails,
//         }),
//         CURRENT: yup.object().shape({ ...addressSchemaWithRequiredFields }),
//         PERMANENT: yup.object().shape({ ...addressSchema }),
//       })
//       break
//     case "merchantRegStep2":
//       validationSchema = yup.object().shape({
//         ...merchantRegStep2,
//       })
//       break
//     case "merchantRegStep3":
//       validationSchema = yup.object().shape(
//         {
//           ...merchantRegStep3,
//           ...dynamicMerchantFieldsValidationSchema,
//           bankDetails: yup.boolean().when(["settlementFeeFields"], {
//             is: (settlementFeeFields: boolean) => settlementFeeFields,
//             then: () => yup.array().of(bankDetailsRequiredSchema),
//             otherwise: () => yup.array().of(bankDetailsSchema),
//           }),
//         },
//         [["manualSettlementFields", "autoSettlementFields"]],
//       )
//       break
//     case "merchantRegStep4":
//       validationSchema = yup.object().shape({
//         ...dynamicMerchantFieldsValidationSchema,
//       })
//       break
//     default:
//       validationSchema = yup.object().shape({})
//       break
//   }
//   return validationSchema
// }

// export default schema

// import { values } from "lodash"
import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function schema(formStage: string) {
  let validationSchema
  const Step1Tab1 = {
    mobile: yup.string().when({
      is: (mobile: string) => mobile === null || mobile === undefined,
      then: genValidation({
        type: "string",
        isRequired: true,
      }),
      otherwise: genValidation({
        type: "mobile",
        isRequired: true,
        label: "Phone Number",
      }),
    }),
  }

  const Step1Tab2 = {
    userProfileType: genValidation({
      type: "mixed",
      isNullable: true,
      isRequired: true,
    }),
    identifier: genValidation({
      type: "mixed",
      isNullable: true,
      isRequired: true,
    }),
  }

  // const Step1Tab3 = {
  //   // applicantName: genValidation({
  //   //   type: "string",
  //   //   isRequired: true,
  //   //   isNullable: true,
  //   // }),
  //   // fatherName: genValidation({
  //   //   type: "string",
  //   //   isRequired: true,
  //   //   isNullable: true,
  //   // }),
  //   // merchant: yup.mixed().required().nullable(),
  //   // motherName: genValidation({
  //   //   type: "string",
  //   //   isRequired: true,
  //   //   isNullable: true,
  //   // }),
  //   // gender: genValidation({
  //   //   type: "mixed",
  //   //   isNullable: true,
  //   //   isRequired: true,
  //   // }),
  //   // occupation: genValidation({
  //   //   type: "mixed",
  //   //   isNullable: true,
  //   //   isRequired: true,
  //   // }),
  //   // dateOfBirth: yup.string().when({
  //   //   is: (dateOfBirth: string) =>
  //   //     dateOfBirth === undefined || dateOfBirth === null,
  //   //   then: genValidation({
  //   //     type: "string",
  //   //     isNullable: true,
  //   //     isRequired: true,
  //   //   }),
  //   //   otherwise: genValidation({
  //   //     type: "date",
  //   //     isPastDate: true,
  //   //     isValidDOB: true,
  //   //     isRequired: true,
  //   //   }),
  //   // }),
  // }

  const Step1Tab4 = {
    firstname: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    surname: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    nationality: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    msisdn: genValidation({
      type: "mixed",
      isNullable: true,
      isRequired: true,
    }),
    gender: genValidation({
      type: "mixed",
      isNullable: true,
      isRequired: true,
    }),
    birthdate: yup.string().when({
      is: (dateOfBirth: string) =>
        dateOfBirth === undefined || dateOfBirth === null,
      then: genValidation({
        type: "string",
        isNullable: true,
        isRequired: true,
      }),
      otherwise: genValidation({
        type: "date",
        isPastDate: true,
        isValidDOB: true,
        isRequired: true,
      }),
    }),
    customer_email: genValidation({
      type: "string",
      format: "email",
      isNullable: true,
      // isRequired: true,
    }),

    customer_idtype: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    customer_id: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    province: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),

    registration_date: yup.string().when({
      is: (registration_date: string) =>
        registration_date === undefined || registration_date === null,
      then: genValidation({
        type: "string",
        isNullable: true,
        isRequired: true,
      }),
      otherwise: genValidation({
        type: "date",
        isRequired: true,
      }),
    }),
  }

  const Step2Tab1 = {
    organisationName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    // organisationType: genValidation({
    //   type: "mixed",
    //   isNullable: true,
    //   isRequired: true,
    // }),
    businessType: genValidation({
      type: "mixed",
      isNullable: true,
      isRequired: true,
    }),
    tinNumber: genValidation({
      type: "string",
      isNullable: true,
    }),
    vatRegNumber: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    tradeLicenseNumber: genValidation({
      type: "string",
      // isRequired: true,
      isNullable: true,
    }),
    tradeLicenseExpiryDate: yup.string().when({
      is: (tradeLicenseExpiryDate: string) =>
        tradeLicenseExpiryDate === undefined || tradeLicenseExpiryDate === null,
      then: genValidation({
        type: "string",
        isNullable: true,
        // isRequired: true,
      }),
      otherwise: genValidation({
        type: "date",
        isFutureDate: true,
        // isRequired: true,
      }),
    }),
    issuingAuthority: genValidation({
      type: "string",
      // isRequired: true,
      isNullable: true,
    }),
  }

  const Step2Tab2 = {
    organizationName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    organizationMobileNumber: yup.string().when({
      is: (mobile: string) => mobile === null || mobile === undefined,
      then: genValidation({
        type: "string",
        isRequired: true,
      }),
      otherwise: genValidation({
        type: "mobile",
        isRequired: true,
        label: "Phone Number",
      }),
    }),
    organizationEmail: genValidation({
      type: "string",
      format: "email",
      isNullable: true,
      isRequired: true,
    }),
    organizationCommunicationAddress: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
      // label: "Organization Communication Address is required",
    }),
    // merchantCode: genValidation({
    //   type: "string",
    //   isRequired: true,
    //   isNullable: true,
    //   // label: "Merchant Code is required",
    // }),
    merchantCode: yup
      .string()
      .nullable()
      .when("notApplicable", {
        is: true,
        then: (scheme) => scheme.notRequired().nullable(),
        otherwise: (scheme) => scheme.required("Merchant Code is required"),
      }),
    taxType: genValidation({
      type: "mixed",
      isNullable: true,
      isRequired: true,
    }),
  }
  const Step3Tab1 = {
    imageCode1: yup.lazy((value): any => {
      switch (typeof value) {
        case "object":
          return yup.object().required("Image is required").nullable(true)
        case "string":
          return yup.string().required("Image is required")
        default:
          return yup.object().required("Image is required")
      }
    }),
    // imageCode1: yup.lazy((value): any => {
    //   if (value === null || value === undefined || value === "") {
    //     // If the image is deleted or not present, allow null but make it required
    //     return yup.mixed().nullable(true).required("Image is required")
    //   }

    //   if (typeof value === "string") {
    //     return yup.string().required("Image is required")
    //   }

    //   if (typeof value === "object") {
    //     return yup.object().required("Image is required").nullable(true)
    //   }

    //   return yup.mixed().required("Image is required")
    // }),
    imageCode2: yup.lazy((value): any => {
      switch (typeof value) {
        case "object":
          return yup.object().required("Image is required").nullable(true)
        case "string":
          return yup.string().required("Image is required")
        default:
          return yup.object().required("Image is required")
      }
    }),
    // imageCode2: yup.lazy((value): any => {
    //   if (value === null || value === undefined || value === "") {
    //     // If the image is deleted or not present, allow null but make it required
    //     return yup.mixed().nullable(true).required("Image is required")
    //   }

    //   if (typeof value === "string") {
    //     return yup.string().required("Image is required")
    //   }

    //   if (typeof value === "object") {
    //     return yup.object().required("Image is required").nullable(true)
    //   }

    //   return yup.mixed().required("Image is required")
    // }),
  }
  // const Step2Tab2 = {
  //   applicantIdType: yup.lazy((value): any => {
  //     switch (typeof value) {
  //       case "object":
  //         return yup.object().required().nullable(true)
  //       case "string":
  //         return yup.string().required()
  //       default:
  //         return yup.object().required()
  //     }
  //   }),
  //   applicantIdNumber: yup.string().when(["applicantIdType"], {
  //     is: (applicantIdType: { keyValue: string }) => {
  //       return (
  //         applicantIdType?.keyValue === undefined ||
  //         applicantIdType?.keyValue === null
  //       )
  //     },
  //     then: (scheme) => scheme.nullable(),
  //     otherwise: (scheme) =>
  //       scheme.when("applicantIdType", {
  //         is: (applicantIdType: { keyValue: string }) => {
  //           return applicantIdType?.keyValue === "NID"
  //         },
  //         then: genValidation({
  //           type: "nid",
  //           isNullable: true,
  //           isRequired: true,
  //         }),
  //         otherwise: (scheme2) =>
  //           scheme2.when("applicantIdType", {
  //             is: (applicantIdType: { keyValue: string }) => {
  //               return applicantIdType?.keyValue === "Passport"
  //             },
  //             then: genValidation({
  //               type: "passport",
  //               isNullable: true,
  //               isRequired: true,
  //             }),
  //             otherwise: (scheme3) =>
  //               scheme3.when("applicantIdType", {
  //                 is: (applicantIdType: { keyValue: string }) => {
  //                   return applicantIdType?.keyValue === "Driving Licence"
  //                 },
  //                 then: genValidation({
  //                   type: "drivinglicence",
  //                   isNullable: true,
  //                   isRequired: true,
  //                 }),
  //                 otherwise: genValidation({
  //                   type: "string",
  //                   isNullable: true,
  //                   isRequired: true,
  //                 }),
  //               }),
  //           }),
  //       }),
  //   }),
  //   applicantIdValidity: yup.string().when("applicantIdType", {
  //     is: (applicantIdType: any) => {
  //       return (
  //         applicantIdType?.keyValue?.toLowerCase() === "passport" ||
  //         applicantIdType?.keyValue?.toLowerCase() === "driving licence" ||
  //         (typeof applicantIdType === "string" &&
  //           applicantIdType?.toLowerCase() === "passport") ||
  //         (typeof applicantIdType === "string" &&
  //           applicantIdType?.toLowerCase() === "driving licence")
  //       )
  //     },
  //     then: genValidation({
  //       type: "date",
  //       isRequired: true,
  //       isNullable: true,
  //       isFutureDate: true,
  //     }),
  //     otherwise: (scheme1) => scheme1.nullable(),
  //   }),
  //   applicantContactNumber: yup.string().when({
  //     is: (applicantContactNumber: string) =>
  //       applicantContactNumber === null ||
  //       // applicantContactNumber.length === 0 ||
  //       applicantContactNumber === undefined,
  //     then: genValidation({
  //       type: "string",
  //       isRequired: true,
  //     }),
  //     otherwise: genValidation({
  //       type: "mobile",
  //       isRequired: true,
  //       label: "Contact No.",
  //     }),
  //   }),
  //   applicantEmail: genValidation({
  //     type: "string",
  //     format: "email",
  //     isNullable: true,
  //   }),
  //   emergencyContactNo: yup
  //     .string()
  //     .notOneOf(
  //       [yup.ref("applicantContactNumber"), null],
  //       "Emergency contact no should be different form Reg. no.",
  //     )
  //     .when({
  //       is: (emergencyContactNo: string) =>
  //         emergencyContactNo === null ||
  //         // emergencyContactNo.length === 0 ||
  //         emergencyContactNo === undefined,
  //       then: genValidation({
  //         type: "string",
  //         isRequired: true,
  //         isNullable: true,
  //       }),
  //       otherwise: genValidation({
  //         type: "mobile",
  //         isRequired: true,
  //         label: "Emergency Contact No.",
  //       }),
  //     }),
  // }

  const permanentaddressSchemaWithRequiredFields = {
    completeAddress: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
      label: "Permanent address is required",
    }),
    division: genValidation({
      type: "string",
      isNullable: true,
      isRequired: false,
    }),
    district: genValidation({
      type: "string",
      isNullable: true,
      isRequired: false,
    }),
    thana: genValidation({
      type: "string",
      isNullable: true,
      isRequired: false,
    }),
    subthana: genValidation({
      type: "string",
      isNullable: true,
      // isRequired: true,
    }),
    postCode: genValidation({
      type: "number",
      isNullable: true,
      // isRequired: true,
    }),
  }

  const addressSchemaWithRequiredFields = {
    userHouseNo: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    market: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    roadNoOrName: genValidation({
      type: "string",
      isNullable: true,
    }),
    village: genValidation({
      type: "string",
      isNullable: true,
      isRequired: true,
    }),
    postOffice: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    ward: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    division: genValidation({
      type: "string",
      isNullable: true,
      isRequired: true,
    }),
    district: genValidation({
      type: "string",
      isNullable: true,
      isRequired: true,
    }),
    thana: genValidation({
      type: "string",
      isNullable: true,
      isRequired: true,
    }),
    subthana: genValidation({
      type: "string",
      isNullable: true,
      // isRequired: true,
    }),
    postCode: genValidation({
      type: "number",
      isNullable: true,
      // isRequired: true,
    }),
  }

  const businessAddressSchema = {
    clusters: yup.lazy((value): any => {
      switch (typeof value) {
        case "object":
          return yup.object().required().nullable(true)
        case "string":
          return yup.string().required()
        default:
          return yup.object().required()
      }
    }),
    region: yup.lazy((value): any => {
      switch (typeof value) {
        case "object":
          return yup.object().required().nullable(true)
        case "string":
          return yup.string().required()
        default:
          return yup.object().required()
      }
    }),
    area: yup.lazy((value): any => {
      switch (typeof value) {
        case "object":
          return yup.object().required().nullable(true)
        case "string":
          return yup.string().required()
        default:
          return yup.object().required()
      }
    }),
    territory: yup.lazy((value): any => {
      switch (typeof value) {
        case "object":
          return yup.object().required().nullable(true)
        case "string":
          return yup.string().required()
        default:
          return yup.object().required()
      }
    }),
    district: yup.lazy((value): any => {
      switch (typeof value) {
        case "object":
          return yup.object().required().nullable(true)
        case "string":
          return yup.string().required()
        default:
          return yup.object().required()
      }
    }),
    thana: yup.lazy((value): any => {
      switch (typeof value) {
        case "object":
          return yup.object().required().nullable(true)
        case "string":
          return yup.string().required()
        default:
          return yup.object().required()
      }
    }),
  }

  switch (formStage) {
    case "Step1Tab1":
      validationSchema = yup.object().shape({
        ...Step1Tab1,
      })
      break
    case "Step1Tab2":
      validationSchema = yup.object().shape({
        ...Step1Tab2,
      })
      break

    case "Step1Tab3Bulk":
      validationSchema = yup.object().shape({
        applicantDetails: yup.object().shape({
          // ...Step1Tab3,
        }),
        applicationDetails: yup.object().shape({
          agentType: yup.lazy((value): any => {
            switch (typeof value) {
              case "object":
                return yup.object().required().nullable(true)
              case "string":
                return yup.string().required()
              default:
                return yup.object().required()
            }
          }),
        }),
        PERMANENT: yup
          .object()
          .shape({ ...permanentaddressSchemaWithRequiredFields }),
        ...Step1Tab2,
      })
      break
    case "Step1Tab3":
      validationSchema = yup.object().shape({
        // applicantDetails: yup.object().shape({
        // ...Step1Tab3,
        // }),
        // applicationDetails: yup.object().shape({
        //   agentType: yup.lazy((value): any => {
        //     switch (typeof value) {
        //       case "object":
        //         return yup.object().required().nullable(true)
        //       case "string":
        //         return yup.string().required()
        //       default:
        //         return yup.object().required()
        //     }
        //   }),
        // }),
        // PERMANENT: yup
        //   .object()
        //   .shape({ ...permanentaddressSchemaWithRequiredFields }),
        // ...Step1Tab1,
        // ...Step1Tab2,
      })
      break
    case "Step1Tab4":
      validationSchema = yup.object().shape({
        // applicantDetails: yup.object().shape({
        ...Step1Tab4,
        // }),
        // applicationDetails: yup.object().shape({
        //   agentType: yup.lazy((value): any => {
        //     switch (typeof value) {
        //       case "object":
        //         return yup.object().required().nullable(true)
        //       case "string":
        //         return yup.string().required()
        //       default:
        //         return yup.object().required()
        //     }
        //   }),
        // }),
        // PERMANENT: yup
        //   .object()
        //   .shape({ ...permanentaddressSchemaWithRequiredFields }),
        // ...Step1Tab1,
        // ...Step1Tab2,
      })
      break
    case "Step2Tab1":
      validationSchema = yup.object().shape({
        ...Step2Tab1,
        SHOP_ADDRESS: yup
          .object()
          .shape({ ...addressSchemaWithRequiredFields }),
      })
      break
    case "Step2Tab2Bulk":
      validationSchema = yup.object().shape({
        applicantDetails: yup.object().shape({
          ...Step2Tab2,
        }),
        BUSINESS_HIERARCHY: yup.object().shape({ ...businessAddressSchema }),
        ...Step2Tab1,
        SHOP_ADDRESS: yup
          .object()
          .shape({ ...addressSchemaWithRequiredFields }),
      })
      break
    case "Step2Tab2":
      // validationSchema = yup.object().shape({
      //   ...Step2Tab2,
      // })
      validationSchema = yup.object().shape({
        otherDetails: yup.object().shape({
          ...Step2Tab2,
        }),
      })
      //   BUSINESS_HIERARCHY: yup.object().shape({ ...businessAddressSchema }),
      //   ...Step2Tab1,
      //   SHOP_ADDRESS: yup
      //     .object()
      //     .shape({ ...addressSchemaWithRequiredFields }),
      // })
      break
    case "Step3Tab1":
      validationSchema = yup.object().shape({
        ...Step3Tab1,
      })
      break
    default:
      validationSchema = yup.object().shape({})
      break
  }
  return validationSchema
}

export default schema
