import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"
import { ValidationField } from "app/models/validationFieldModel"

function schema(dynamicMerchantFields: ValidationField[] = []) {
  const dynamicMerchantFieldsValidationSchema: any = {}
  if (dynamicMerchantFields.length) {
    dynamicMerchantFields.forEach((field: ValidationField) => {
      if (field.name) {
        dynamicMerchantFieldsValidationSchema[field.name] = genValidation(field)
      }
    })
  }

  const merchantRegStep1BasicDetails = {
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
    mno: genValidation({
      type: "mixed",
      isNullable: true,
      isRequired: true,
    }),
    nameEn: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    email: genValidation({
      type: "string",
      format: "email",
      isRequired: true,
      isNullable: true,
    }),
    merchantCategoryCode: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: true,
    }),
    merchantType: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: true,
    }),
    businessCategory: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: true,
    }),
    businessType: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: true,
    }),
    displayName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    organisationEmail: genValidation({
      type: "string",
      format: "email",
      isNullable: true,
    }),
    organisationType: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: true,
    }),
    shopName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    merchantAggregatorId: genValidation({
      type: "string",
      isNullable: true,
    }),
    tradeLicenseNumber: genValidation({
      type: "string",
      isNullable: true,
    }),
    tradeLicenseExpiryDate: yup.string().when({
      is: (tradeLicenseExpiryDate: string) =>
        tradeLicenseExpiryDate?.length === 0 ||
        tradeLicenseExpiryDate === undefined ||
        tradeLicenseExpiryDate === null,
      then: genValidation({
        type: "string",
        isNullable: true,
      }),
      otherwise: genValidation({
        type: "date",
        isFutureDate: true,
      }),
    }),
    issuingAuthority: genValidation({
      type: "string",
      isNullable: true,
    }),
    tinNumber: genValidation({
      type: "string",
      isNullable: true,
    }),
    vatRegNumber: genValidation({
      type: "string",
      isNullable: true,
    }),
  }

  const merchantRegStep1BasicAdditionalDetails = {
    applicantName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    fatherName: genValidation({
      type: "string",
      isNullable: true,
    }),
    applicantContactNumber: yup.string().when({
      is: (applicantContactNumber: string) =>
        applicantContactNumber === null || applicantContactNumber === undefined,
      then: genValidation({
        type: "string",
        isNullable: true,
      }),
      otherwise: genValidation({
        type: "mobile",
        label: "Applicant Contact No",
      }),
    }),
    motherName: genValidation({
      type: "string",
      isNullable: true,
    }),
    relationshipMerchant: genValidation({
      type: "mixed",
      isNullable: true,
    }),
    spouseName: genValidation({
      type: "string",
      isNullable: true,
    }),
    userNationality: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: true,
    }),
    dateOfBirth: yup.string().when({
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
        isRequired: true,
        isValidDOB: true,
      }),
    }),
    gender: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: true,
    }),
    occupation: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: true,
    }),
    otherOccupation: yup.string().when(["occupation"], {
      is: (occupation: any) => {
        return (
          occupation?.keyValue === undefined || occupation?.keyValue === null
        )
      },
      then: (scheme) => scheme.nullable(),
      otherwise: (scheme) =>
        scheme.when("occupation", {
          is: (occupation: any) => {
            return occupation?.keyValue === "Other" || occupation === "Other"
          },
          then: genValidation({
            type: "string",
            isNullable: true,
            isRequired: true,
          }),
          otherwise: genValidation({
            type: "string",
            isNullable: true,
          }),
        }),
    }),
    emergencyContactName: genValidation({
      type: "string",
      isNullable: true,
    }),
    emergencyContactNo: yup.string().when({
      is: (emergencyContactNo: string) =>
        emergencyContactNo === null || emergencyContactNo === undefined,
      then: genValidation({
        type: "string",
        isNullable: true,
      }),
      otherwise: genValidation({
        type: "mobile",
        label: "Emergency Contact Number",
      }),
    }),
    applicantEmail: genValidation({
      type: "string",
      format: "email",
      isNullable: true,
    }),
    applicantMNO: genValidation({
      type: "mixed",
      isNullable: true,
    }),
    incomeSource: genValidation({
      type: "mixed",
      isNullable: true,
    }),
    residentStatus: genValidation({
      type: "string",
      isNullable: true,
    }),
    applicantIdType: yup.mixed().when({
      is: (applicantIdType: any) => {
        return applicantIdType === undefined || applicantIdType === null
      },
      then: genValidation({
        type: "string",
        isRequired: true,
        isNullable: true,
      }),
      otherwise: genValidation({
        type: "mixed",
        isRequired: true,
        isNullable: true,
      }),
    }),

    applicantIdNumber: yup.string().when(["applicantIdType"], {
      is: (applicantIdType: { keyValue: string }) => {
        return (
          applicantIdType?.keyValue === undefined ||
          applicantIdType?.keyValue === null
        )
      },
      then: (scheme) => scheme.nullable(),
      otherwise: (scheme) =>
        scheme.when("applicantIdType", {
          is: (applicantIdType: { keyValue: string }) => {
            return applicantIdType?.keyValue === "NID"
          },
          then: genValidation({
            type: "nid",
            isNullable: true,
            isRequired: true,
          }),
          otherwise: (scheme2) =>
            scheme2.when("applicantIdType", {
              is: (applicantIdType: { keyValue: string }) => {
                return applicantIdType?.keyValue === "Passport"
              },
              then: genValidation({
                type: "passport",
                isNullable: true,
                isRequired: true,
              }),
              otherwise: (scheme3) =>
                scheme3.when("applicantIdType", {
                  is: (applicantIdType: { keyValue: string }) => {
                    return applicantIdType?.keyValue === "Driving Licence"
                  },
                  then: genValidation({
                    type: "drivinglicence",
                    isNullable: true,
                    isRequired: true,
                  }),
                  otherwise: genValidation({
                    type: "string",
                    isNullable: true,
                    isRequired: true,
                  }),
                }),
            }),
        }),
    }),
    applicantTinNumber: genValidation({
      type: "mixed",
      isNullable: true,
    }),
    applicantIdValidity: yup.string().when("applicantIdType", {
      is: (applicantIdType: any) => {
        return (
          applicantIdType?.keyValue?.toLowerCase() === "passport" ||
          applicantIdType?.keyValue?.toLowerCase() === "driving licence" ||
          (typeof applicantIdType === "string" &&
            applicantIdType?.toLowerCase() === "passport") ||
          (typeof applicantIdType === "string" &&
            applicantIdType?.toLowerCase() === "driving licence")
        )
      },
      then: genValidation({
        type: "date",
        isRequired: true,
        isNullable: true,
        isFutureDate: true,
      }),
      otherwise: (scheme1) => scheme1.nullable(),
    }),
  }

  const merchantRegStep3 = {
    introducerName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    introducerAcNo: genValidation({
      type: "mobile",
      isRequired: true,
      isNullable: true,
    }),
    introducerAgencyName: genValidation({
      type: "string",
      isNullable: true,
    }),
    nomineeAddress: genValidation({
      type: "string",
      isNullable: true,
    }),
    percentageReserved: genValidation({
      type: "percentage",
      isNullable: true,
    }),
  }

  const addressSchemaWithRequiredFields = {
    completeAddress: genValidation({
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
    postCode: genValidation({
      type: "number",
      isRequired: true,
      isNullable: true,
    }),
  }

  const addressSchema = {
    completeAddress: genValidation({
      type: "string",
      isNullable: true,
    }),
    division: genValidation({
      type: "string",
      isNullable: true,
    }),
    district: genValidation({
      type: "string",
      isNullable: true,
    }),
    thana: genValidation({
      type: "string",
      isNullable: true,
    }),
    postCode: genValidation({
      type: "number",
      isNullable: true,
    }),
  }

  // const bankDetailsSchema = yup.object().shape(
  //   {
  //     accountNumber: yup
  //       .string()
  //       .nullable()
  //       .notRequired()
  //       .when("accountNumber", {
  //         is: (accountNumber: string) =>
  //           accountNumber && accountNumber.length > 0,
  //         then: yup
  //           .string()
  //           .min(6, "Minimum allowed length is 6")
  //           .max(25, "Maximum allowed length is 25"),
  //       }),
  //   },
  //   [["accountNumber", "accountNumber"]],
  // )

  const validationSchema = yup.object().shape({
    ...merchantRegStep1BasicDetails,
    ORG_REGISTERED: yup.object().shape({ ...addressSchemaWithRequiredFields }),
    ORG_CURRENT: yup.object().shape({ ...addressSchema }),
    applicantDetails: yup.object().shape({
      ...merchantRegStep1BasicAdditionalDetails,
    }),
    CURRENT: yup.object().shape({ ...addressSchemaWithRequiredFields }),
    PERMANENT: yup.object().shape({ ...addressSchema }),
    ...merchantRegStep3,
    bankDetails: yup.array().of(
      yup
        .object()
        .shape(
          {
            accountNumber: yup
              .string()
              .nullable()
              .when(["holderName", "branch", "bankName"], {
                is: (holderName: any, branch: any, bankName: any) =>
                  holderName || branch || bankName,
                then: yup
                  .string()
                  .required()
                  .nullable()
                  .min(6, "Minimum allowed length is 6")
                  .max(25, "Maximum allowed length is 25"),
                otherwise: yup.lazy((value): any => {
                  return value && value?.length > 0
                    ? yup
                        .string()
                        .nullable()
                        .min(6, "Minimum allowed length is 6")
                        .max(25, "Maximum allowed length is 25")
                    : yup.string().nullable()
                }),
              }),
            holderName: yup
              .string()
              .nullable()
              .when(["accountNumber", "branch", "bankName"], {
                is: (accountNumber: any, branch: any, bankName: any) =>
                  accountNumber || branch || bankName,
                then: yup.string().required().nullable(),
              }),
            branch: yup
              .mixed()
              .nullable()
              .when(["accountNumber", "holderName", "bankName"], {
                is: (accountNumber: any, holderName: any, bankName: any) =>
                  accountNumber || holderName || bankName,
                then: yup.lazy((value): any => {
                  switch (typeof value) {
                    case "object":
                      return yup
                        .object()
                        .required("Branch is required")
                        .nullable(true)
                    case "string":
                      return yup.string().required("Branch is required")
                    default:
                      return yup.object().required("Branch is required")
                  }
                }),
              }),
            bankName: yup
              .mixed()
              .nullable()
              .when(["accountNumber", "branch", "holderName"], {
                is: (accountNumber: any, branch: any, holderName: any) =>
                  accountNumber || branch || holderName,
                then: yup.lazy((value): any => {
                  switch (typeof value) {
                    case "object":
                      return yup
                        .object()
                        .required("Bank is required")
                        .nullable(true)
                    case "string":
                      return yup.string().required("Bank is required")
                    default:
                      return yup.object().required("Bank is required")
                  }
                }),
              }),
          },
          [
            ["accountNumber", "holderName"],
            ["accountNumber", "branch"],
            ["accountNumber", "bankName"],
            ["branch", "accountNumber"],
            ["branch", "bankName"],
            ["branch", "holderName"],
            ["holderName", "accountNumber"],
            ["holderName", "bankName"],
            ["holderName", "branch"],
            ["bankName", "branch"],
            ["bankName", "holderName"],
            ["bankName", "accountNumber"],
          ],
        )
        .nullable(),
    ),
    ...dynamicMerchantFieldsValidationSchema,
  })

  return validationSchema
}

export default schema
