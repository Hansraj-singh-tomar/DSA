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
  }

  const Step1Tab3 = {
    // applicantName: genValidation({
    //   type: "string",
    //   isRequired: true,
    //   isNullable: true,
    // }),
    // fatherName: genValidation({
    //   type: "string",
    //   isRequired: true,
    //   isNullable: true,
    // }),
    agent: yup.mixed().required().nullable(),
    // motherName: genValidation({
    //   type: "string",
    //   isRequired: true,
    //   isNullable: true,
    // }),
    // gender: genValidation({
    //   type: "mixed",
    //   isNullable: true,
    //   isRequired: true,
    // }),
    // occupation: genValidation({
    //   type: "mixed",
    //   isNullable: true,
    //   isRequired: true,
    // }),
    // dateOfBirth: yup.string().when({
    //   is: (dateOfBirth: string) =>
    //     dateOfBirth === undefined || dateOfBirth === null,
    //   then: genValidation({
    //     type: "string",
    //     isNullable: true,
    //     isRequired: true,
    //   }),
    //   otherwise: genValidation({
    //     type: "date",
    //     isPastDate: true,
    //     isValidDOB: true,
    //     isRequired: true,
    //   }),
    // }),
  }

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
    customer_email: genValidation({
      type: "string",
      format: "email",
      isNullable: true,
      // isRequired: true,
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
    // agentCode: genValidation({
    //   type: "string",
    //   isRequired: true,
    //   isNullable: true,
    //   // label: "Merchant Code is required",
    // }),
    // notApplicable: yup.boolean().required(),
    agentCode: yup
      .string()
      .nullable()
      .when("notApplicable", {
        is: true,
        then: (scheme) => scheme.notRequired().nullable(),
        otherwise: (scheme) => scheme.required("Agent Code is required"),
      }),
    taxType: genValidation({
      type: "mixed",
      isNullable: true,
      isRequired: true,
    }),
  }
  const BulkStep2Tab2 = {
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
    // agentCode: genValidation({
    //   type: "string",
    //   isRequired: true,
    //   isNullable: true,
    //   // label: "Merchant Code is required",
    // }),
    // notApplicable: yup.boolean().required(),
    // agentCode: yup
    //   .string()
    //   .nullable()
    //   .when("notApplicable", {
    //     is: true,
    //     then: (scheme) => scheme.notRequired().nullable(),
    //     otherwise: (scheme) => scheme.required("Agent Code is required"),
    //   }),
    // taxType: genValidation({
    //   type: "mixed",
    //   isNullable: true,
    //   isRequired: true,
    // }),
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
  const Step3Tab2BulkDocuments = {
    TpinCertificate: yup.lazy((value): any => {
      if (value === null || value === undefined || value === "") {
        return yup.mixed().nullable().required("TPIN Certificate is required")
      }
      if (typeof value === "string") {
        return yup.string().required("TPIN Certificate is required")
      }
      if (typeof value === "object") {
        return yup
          .object()
          .nullable(true)
          .required("TPIN Certificate is required")
      }
      return yup.mixed().required("TPIN Certificate is required")
    }),
    "Passpoort/NRC": yup.lazy((value): any => {
      if (value === null || value === undefined || value === "") {
        return yup.mixed().nullable().required("Passpoort/NRC is required")
      }
      if (typeof value === "string") {
        return yup.string().required("Passpoort/NRC is required")
      }
      if (typeof value === "object") {
        return yup.object().nullable(true).required("Passpoort/NRC is required")
      }
      return yup.mixed().required("Passpoort/NRC is required")
    }),
    registrationDocument: yup.lazy((value): any => {
      if (value === null || value === undefined || value === "") {
        return yup
          .mixed()
          .nullable()
          .required("Company Registration Form is required")
      }
      if (typeof value === "string") {
        return yup.string().required("Company Registration Form is required")
      }
      if (typeof value === "object") {
        return yup
          .object()
          .nullable(true)
          .required("Company Registration Form is required")
      }
      return yup.mixed().required("Company Registration Form is required")
    }),
    additionalDocument1: yup.lazy((value): any => {
      if (!value) return yup.mixed().nullable(true) // Optional field
      if (typeof value === "string") return yup.string()
      if (typeof value === "object") return yup.object().nullable(true)
      return yup.mixed()
    }),

    // Textfield validations
    TpinNumber: yup.string().required("TPIN Number is required"),
    nrc: yup.string().required("NRC Number is required"),
    registrationNumber: yup
      .string()
      .required("Registration Number is required"),
    additionalDocumentNumber: yup.string().nullable(), // Optional
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
          ...Step1Tab3,
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
        ...Step1Tab3,
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
      //   applicantDetails: yup.object().shape({
      //     ...Step2Tab2,
      //   }),
      //   BUSINESS_HIERARCHY: yup.object().shape({ ...businessAddressSchema }),
      //   ...Step2Tab1,
      //   SHOP_ADDRESS: yup
      //     .object()
      //     .shape({ ...addressSchemaWithRequiredFields }),
      // })
      validationSchema = yup.object().shape({
        otherDetails: yup.object().shape({
          ...Step2Tab2,
        }),
      })
      break
    case "BulkStep2Tab2":
      validationSchema = yup.object().shape({
        otherDetails: yup.object().shape({
          ...BulkStep2Tab2,
        }),
      })
      break
    case "Step3Tab1":
      validationSchema = yup.object().shape({
        ...Step3Tab1,
      })
      break
    case "Step3Tab2":
      validationSchema = yup.object().shape({
        ...Step3Tab2BulkDocuments,
      })
      break

    default:
      validationSchema = yup.object().shape({})
      break
  }
  return validationSchema
}

export default schema
