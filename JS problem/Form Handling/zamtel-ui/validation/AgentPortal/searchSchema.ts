import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function searchSchema(formStage: string, msisdn?: string) {
  let validationSchema

  const changeType = {
    merchantType: genValidation({
      type: "object",
      isNullable: true,
      isRequired: true,
    }),
    ChangeTypeReason: genValidation({
      type: "string",
      isRequired: true,
    }),
  }

  const changeCategory = {
    distributorCategory: genValidation({
      type: "object",
      isNullable: true,
      isRequired: true,
    }),
    ChangeCategoryReason: genValidation({
      type: "string",
      isRequired: true,
    }),
  }
  const advanceSearchRegDate = {
    regStartDate: yup.number().nullable(),
    regEndDate: yup
      .number()
      .nullable()
      .min(yup.ref("regStartDate"), "End date must be after Start date"),
  }
  const kycInfoStartEndDate = {
    regStartDate: yup.number().nullable(),
    regEndDate: yup
      .number()
      .nullable()
      .min(yup.ref("regStartDate"), "End date must be after Start date"),
  }
  const transactionHistoryStartEndDate = {
    registrationDateFrom: yup.number().nullable(),
    registrationDateTo: yup
      .number()
      .nullable()
      .min(
        yup.ref("registrationDateFrom"),
        "End date must be after Start date",
      ),
  }
  const autoPayment = {
    autoPaymentType: yup
      .object()
      .nullable()
      .required("Auto Payment Type Required"),
  }
  const editFormValidation = {
    emergencyContactNo: yup
      .string()
      .notOneOf(
        [msisdn, null],
        "Emergency contact no. should be different from Reg. no.",
      )
      .when({
        is: (emergencyContactNo: string) =>
          emergencyContactNo.length === 0 || emergencyContactNo === undefined,
        then: genValidation({
          type: "string",
        }),
        otherwise: genValidation({
          type: "mobile",
          label: "Emergency Contact No.",
        }),
      }),
    nationality: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: true,
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
    fatherName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    motherName: genValidation({
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
      }),
      otherwise: genValidation({
        type: "date",
        isPastDate: true,
        isValidDOB: true,
      }),
    }),
  }

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

  const editForm1Validation = {
    applicantDetails: yup.object().shape({
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
        isNullable: true,
        isRequired: true,
      }),
      motherName: genValidation({
        type: "string",
        isRequired: true,
        isNullable: true,
      }),
      gender: genValidation({
        type: "mixed",
        isNullable: true,
        isRequired: true,
      }),
      occupation: genValidation({
        type: "mixed",
        isNullable: true,
        isRequired: true,
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
          isValidDOB: true,
          isRequired: true,
        }),
      }),

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
      emailId: genValidation({
        type: "string",
        format: "email",
        isNullable: true,
      }),
      emergencyContactNo: yup
        .string()
        .notOneOf(
          [yup.ref("applicantContactNumber"), null],
          "Emergency contact no should be different form Reg. no.",
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
            label: "Emergency Contact No.",
          }),
        }),
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
    SHOP_ADDRESS: yup.object().shape({ ...addressSchemaWithRequiredFields }),
    BUSINESS_HIERARCHY: yup.object().shape({ ...businessAddressSchema }),
  }

  switch (formStage) {
    case "ChangeType":
      validationSchema = yup.object().shape({
        ...changeType,
      })
      break
    case "ChangeCategory":
      validationSchema = yup.object().shape({
        ...changeCategory,
      })
      break
    case "EditForm":
      validationSchema = yup.object().shape({
        ...editFormValidation,
      })
      break

    case "EditForm1":
      validationSchema = yup.object().shape({
        ...editForm1Validation,
      })
      break
    case "advanceSearchRegDate":
      validationSchema = yup.object().shape({
        ...advanceSearchRegDate,
      })
      break
    case "kycInfoStartEndDate":
      validationSchema = yup.object().shape({
        ...kycInfoStartEndDate,
      })
      break
    case "transactionHistoryStartEndDate":
      validationSchema = yup.object().shape({
        ...transactionHistoryStartEndDate,
      })
      break
    case "autoPayment":
      validationSchema = yup.object().shape({
        ...autoPayment,
      })
      break
    default:
      break
  }
  return validationSchema
}

export default searchSchema
