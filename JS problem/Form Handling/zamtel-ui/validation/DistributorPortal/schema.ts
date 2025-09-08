// import { values } from "lodash"
import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"
import { ValidationField } from "app/models/validationFieldModel"

function schema(
  formStage: string,
  dynamicDistributorFields: ValidationField[] = [],
) {
  let validationSchema = yup.object().shape({})
  const dynamicDistributorFieldsValidationSchema: any = {}
  if (dynamicDistributorFields.length) {
    dynamicDistributorFields.forEach((field: ValidationField) => {
      if (field.name) {
        dynamicDistributorFieldsValidationSchema[field.name] =
          genValidation(field)
      }
    })
  }

  const deWhitelistModal = {
    deWhiteList: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
  }

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
    mno: genValidation({
      type: "mixed",
      isNullable: true,
      isRequired: true,
    }),
  }

  const Step1Tab2 = {
    applicantName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    fatherName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    userNationality: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: true,
    }),
    motherName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    gender: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: true,
    }),
    occupation: genValidation({
      type: "string",
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
  }

  const Step3Tab1 = {
    organisationName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    organisationType: genValidation({
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
      isNullable: true,
    }),
    tradeLicenseNumber: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    tradeLicenseExpiryDate: yup.string().when({
      is: (tradeLicenseExpiryDate: string) =>
        tradeLicenseExpiryDate === undefined || tradeLicenseExpiryDate === null,
      then: genValidation({
        type: "string",
        isRequired: true,
        isNullable: true,
      }),
      otherwise: genValidation({
        type: "date",
        isRequired: true,
        isFutureDate: true,
      }),
    }),
    issuingAuthority: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
  }

  const Step3Tab2 = {
    applicantIdType: yup.lazy((value): any => {
      switch (typeof value) {
        case "object":
          return yup.object().required().nullable(true)
        case "string":
          return yup.string().required()
        default:
          return yup.object().required()
      }
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
    applicantContactNumber: yup.string().when({
      is: (applicantContactNumber: string) =>
        applicantContactNumber === null ||
        // applicantContactNumber.length === 0 ||
        applicantContactNumber === undefined,
      then: genValidation({
        type: "string",
        isRequired: true,
      }),
      otherwise: genValidation({
        type: "mobile",
        isRequired: true,
        label: "Contact No.",
      }),
    }),
    applicantEmail: genValidation({
      type: "string",
      format: "email",
      isRequired: true,
      isNullable: true,
    }),
    emergencyContactNo: yup
      .string()
      .notOneOf(
        [yup.ref("applicantContactNumber"), null],
        "Emergency contact no should be different form your registered number",
      )
      .when({
        is: (emergencyContactNo: string) =>
          emergencyContactNo === null ||
          // emergencyContactNo.length === 0 ||
          emergencyContactNo === undefined,
        then: genValidation({
          type: "string",
          isRequired: true,
          isNullable: true,
        }),
        otherwise: genValidation({
          type: "mobile",
          isRequired: true,
          label: "Emergency Contact Number",
        }),
      }),
    emergencyContactName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    fax: genValidation({
      type: "string",
      isNullable: true,
    }),
  }

  const permanentAddressSchemaWithRequiredFields = {
    completeAddress: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
      maxLength: 500,
    }),
  }

  const addressSchemaWithRequiredFields = {
    completeAddress: genValidation({
      type: "string",
      isRequired: false,
      isNullable: true,
      maxLength: 500,
    }),
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
      // isRequired: true,
      isNullable: true,
    }),
    postOffice: genValidation({
      type: "string",
      // isRequired: true,
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
    }),
  }

  const businessAddressSchema = {
    clusters: yup.lazy((value): any => {
      switch (typeof value) {
        case "object":
          return yup
            .object()
            .test("Cluster", "Cluster is required", (value2: any) => {
              return value2?.clusterName
            })
            .nullable()
        case "string":
          return yup.string().required()
        default:
          return yup.object().required()
      }
    }),
    region: yup.lazy((value): any => {
      switch (typeof value) {
        case "object":
          return yup
            .object()
            .test("Region", "Region is required", (value2: any) => {
              return value2?.regionName
            })
            .nullable()
        case "string":
          return yup.string().required()
        default:
          return yup.object().required()
      }
    }),
    area: yup.lazy((value): any => {
      switch (typeof value) {
        case "object":
          return yup
            .object()
            .test("Area", "Area is required", (value2: any) => {
              return value2?.areaName
            })
            .nullable()
        case "string":
          return yup.string().required()
        default:
          return yup.object().required()
      }
    }),
    territory: yup.lazy((value): any => {
      switch (typeof value) {
        case "object":
          return yup
            .array()
            .test(
              "territory",
              "Selected territory is not available, please reselect",
              () => {
                const isArrayEmptyWithEmptyStrings = (array: any) => {
                  if (array?.length === 0) {
                    return true
                  }

                  for (let i = 0; i < array?.length; i += 1) {
                    const obj = array[i]

                    const allEmptyStrings = Object.values(obj).every(
                      (valuei) => !valuei,
                    )

                    if (!allEmptyStrings) {
                      return false
                    }
                  }
                  return true
                }
                return Array.isArray(value)
                  ? !isArrayEmptyWithEmptyStrings(value)
                  : true
              },
            )
            .min(1, "Please select at least 1 territory")
            .nullable(true)
        case "string":
          return yup.string().required()
        default:
          return yup.object().required()
      }
    }),
    district: yup.lazy((value): any => {
      switch (typeof value) {
        case "object":
          return yup
            .array()
            .min(1, "Please select at least 1 district")
            .nullable(true)
        case "string":
          return yup.string().required()
        default:
          return yup.object().required()
      }
    }),
    thana: yup.lazy((value): any => {
      switch (typeof value) {
        case "object":
          return yup
            .array()
            .min(1, "Please select at least 1 thana")
            .nullable(true)
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
    case "Step1Tab2Bulk":
      validationSchema = yup.object().shape({
        applicantDetails: yup.object().shape({ ...Step1Tab2 }),
        PERMANENT: yup
          .object()
          .shape({ ...permanentAddressSchemaWithRequiredFields }),
        merchantCategoryCode: genValidation({
          type: "mixed",
          isRequired: true,
          isNullable: true,
        }),
        distributorTypeCode: genValidation({
          type: "mixed",
          isRequired: true,
          isNullable: true,
        }),
        // distributorCategory: genValidation({
        //   type: "object",
        //   // isRequired: true,
        //   isNullable: true,
        // }),
        // distributorType: genValidation({
        //   type: "string",
        //   isNullable: true,
        // }),
        ...dynamicDistributorFieldsValidationSchema,
      })
      break
    case "Step1Tab2":
      validationSchema = yup.object().shape({
        ...Step1Tab1,
        applicantDetails: yup.object().shape({ ...Step1Tab2 }),
        PERMANENT: yup
          .object()
          .shape({ ...permanentAddressSchemaWithRequiredFields }),
        merchantCategoryCode: genValidation({
          type: "mixed",
          isRequired: true,
          isNullable: true,
        }),
        distributorTypeCode: genValidation({
          type: "mixed",
          isRequired: true,
          isNullable: true,
        }),
        // distributorCategory: genValidation({
        //   type: "object",
        //   // isRequired: true,
        //   isNullable: true,
        // }),
        // distributorType: genValidation({
        //   type: "string",
        //   isNullable: true,
        // }),
        ...dynamicDistributorFieldsValidationSchema,
      })
      break
    case "Step3Tab1":
      validationSchema = yup.object().shape({
        ...Step3Tab1,
        OFFICE: yup.object().shape({ ...addressSchemaWithRequiredFields }),
        ORG_REGISTERED: yup
          .object()
          .shape({ ...addressSchemaWithRequiredFields }),
        ...dynamicDistributorFieldsValidationSchema,
      })
      break
    case "Step3Tab2Bulk":
      validationSchema = yup.object().shape({
        ...Step3Tab1,
        OFFICE: yup.object().shape({ ...addressSchemaWithRequiredFields }),
        ORG_REGISTERED: yup
          .object()
          .shape({ ...addressSchemaWithRequiredFields }),
        ...dynamicDistributorFieldsValidationSchema,
        applicantDetails: yup.object().shape({
          ...Step3Tab2,
        }),
        BUSINESS_HIERARCHY: yup.object().shape({
          ...businessAddressSchema,
        }),
      })
      break
    case "Step3Tab2":
      validationSchema = yup.object().shape({
        ...Step3Tab1,
        OFFICE: yup.object().shape({ ...addressSchemaWithRequiredFields }),
        ORG_REGISTERED: yup
          .object()
          .shape({ ...addressSchemaWithRequiredFields }),
        ...dynamicDistributorFieldsValidationSchema,
        applicantDetails: yup.object().shape({
          ...Step3Tab2,
        }),
        BUSINESS_HIERARCHY: yup.object().shape({
          ...businessAddressSchema,
        }),
      })
      break
    case "deWhitelistModal":
      validationSchema = yup.object().shape({ ...deWhitelistModal })
      break
    case "Step4Tab1":
      validationSchema = yup.object().shape({
        ...dynamicDistributorFieldsValidationSchema,
      })
      break
    default:
      break
  }
  return validationSchema
}

export default schema
