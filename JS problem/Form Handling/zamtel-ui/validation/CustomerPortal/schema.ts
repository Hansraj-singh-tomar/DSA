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
    // userProfileType: genValidation({
    //   type: "mixed",
    //   isRequired: true,
    //   isNullable: true,
    // }),
  }

  const Step1Tab2 = {
    userProfileType: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: true,
    }),
  }

  const Step1Tab3 = {
    firstname: genValidation({
      type: "string",
      isNullable: true,
      isRequired: true,
    }),
    surname: genValidation({
      type: "string",
      isNullable: true,
      isRequired: true,
    }),
    nationality: genValidation({
      type: "string",
      isNullable: true,
      isRequired: true,
    }),
    msisdn: genValidation({
      type: "string",
      isNullable: true,
      isRequired: true,
    }),
    // accountType: genValidation({
    //   type: "mixed",
    //   isNullable: true,
    //   isRequired: true,
    // }),
    // userProfit: genValidation({
    //   type: "mixed",
    //   isNullable: true,
    //   isRequired: true,
    // }),
    gender: genValidation({
      type: "string",
      isNullable: true,
      isRequired: true,
    }),
    customer_email: genValidation({
      type: "string",
      format: "email",
      isNullable: true,
      // isRequired: true,
    }),
    customer_idtype: genValidation({
      type: "mixed",
      isNullable: true,
      isRequired: true,
    }),
    customer_id: genValidation({
      type: "mixed",
      isNullable: true,
      isRequired: true,
    }),
    // dateOfBirth: yup.string().when({
    //   is: (dateOfBirth: string) =>
    //     dateOfBirth === undefined || dateOfBirth === null,
    //   then: genValidation({
    //     type: "string",
    //     isNullable: true,
    //   }),
    // }),
    // userAddressLine1: yup.object().shape({
    customer_address_line1: genValidation({
      type: "string",
      isNullable: true,
      isRequired: true,
    }),
    // }),
    province: genValidation({
      type: "string",
      isNullable: true,
      isRequired: true,
    }),
    // alternativeMobile: yup.string().when({
    //   is: (alternativeMobile: string) =>
    //     alternativeMobile === null || alternativeMobile === undefined,
    //   then: genValidation({
    //     type: "string",
    //     isNullable: true,
    //   }),
    //   otherwise: genValidation({
    //     type: "mobile",
    //     label: "Alternative Mobile No.",
    //   }),
    // }),
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
        isPastDate: true,
      }),
    }),

    // approvalStatus: genValidation({
    //   type: "mixed",
    //   isNullable: true,
    // }),
    // approvalDate: yup.string().when({
    //   is: (approvalDate: string) =>
    //     approvalDate === undefined || approvalDate === null,
    //   then: genValidation({
    //     type: "string",
    //     isNullable: true,
    //   }),
    //   otherwise: genValidation({
    //     type: "date",
    //     isPastDate: true,
    //   }),
    // }),
    // agent_username: genValidation({
    //   type: "string",
    //   isNullable: true,
    //   isRequired: true,
    // }),
  }

  // const Step1Tab3ApplicantDetails = {
  //   newNid: genValidation({
  //     type: "nid",
  //     isNullable: true,
  //   }),
  //   oldNID: genValidation({
  //     type: "nid",
  //     isNullable: true,
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
  //         }),
  //         otherwise: (scheme2) =>
  //           scheme2.when("applicantIdType", {
  //             is: (applicantIdType: { keyValue: string }) => {
  //               return applicantIdType?.keyValue === "Passport"
  //             },
  //             then: genValidation({
  //               type: "passport",
  //               isNullable: true,
  //             }),
  //             otherwise: (scheme3) =>
  //               scheme3.when("applicantIdType", {
  //                 is: (applicantIdType: { keyValue: string }) => {
  //                   return applicantIdType?.keyValue === "Driving Licence"
  //                 },
  //                 then: genValidation({
  //                   type: "drivinglicence",
  //                   isNullable: true,
  //                 }),
  //                 otherwise: genValidation({
  //                   type: "string",
  //                   isNullable: true,
  //                 }),
  //               }),
  //           }),
  //       }),
  //   }),
  //   otherIdNumber: yup.string().when(["otherIdType"], {
  //     is: (otherIdType: { keyValue: string }) => {
  //       return (
  //         otherIdType?.keyValue === undefined || otherIdType?.keyValue === null
  //       )
  //     },
  //     then: (scheme) => scheme.nullable(),
  //     otherwise: (scheme) =>
  //       scheme.when("otherIdType", {
  //         is: (otherIdType: { keyValue: string }) => {
  //           return otherIdType?.keyValue === "NID"
  //         },
  //         then: genValidation({
  //           type: "nid",
  //           isNullable: true,
  //         }),
  //         otherwise: (scheme2) =>
  //           scheme2.when("otherIdType", {
  //             is: (otherIdType: { keyValue: string }) => {
  //               return otherIdType?.keyValue === "Passport"
  //             },
  //             then: genValidation({
  //               type: "passport",
  //               isNullable: true,
  //             }),
  //             otherwise: (scheme3) =>
  //               scheme3.when("otherIdType", {
  //                 is: (otherIdType: { keyValue: string }) => {
  //                   return otherIdType?.keyValue === "Driving Licence"
  //                 },
  //                 then: genValidation({
  //                   type: "drivinglicence",
  //                   isNullable: true,
  //                 }),
  //                 otherwise: genValidation({
  //                   type: "string",
  //                   isNullable: true,
  //                 }),
  //               }),
  //           }),
  //       }),
  //   }),
  //   applicantIdIssueDate: yup.string().when({
  //     is: (applicantIdIssueDate: string) =>
  //       applicantIdIssueDate === undefined || applicantIdIssueDate === null,
  //     then: genValidation({
  //       type: "string",
  //       isNullable: true,
  //     }),
  //     otherwise: genValidation({
  //       type: "date",
  //       isPastDate: true,
  //     }),
  //   }),
  //   expiryIdDate: yup.string().when({
  //     is: (expiryIdDate: string) =>
  //       expiryIdDate === undefined || expiryIdDate === null,
  //     then: genValidation({
  //       type: "string",
  //       isNullable: true,
  //     }),
  //     otherwise: genValidation({
  //       type: "date",
  //       isFutureDate: true,
  //     }),
  //   }),
  //   fatherName: genValidation({
  //     type: "string",
  //     isNullable: true,
  //   }),
  //   motherName: genValidation({
  //     type: "string",
  //     isNullable: true,
  //   }),
  //   spouseName: genValidation({
  //     type: "string",
  //     isNullable: true,
  //   }),
  //   userNationality: genValidation({
  //     type: "mixed",
  //     isNullable: true,
  //   }),
  //   gender: genValidation({
  //     type: "mixed",
  //     isNullable: true,
  //   }),
  //   applicantEmail: genValidation({
  //     type: "string",
  //     format: "email",
  //     isNullable: true,
  //   }),
  //   occupation: genValidation({
  //     type: "mixed",
  //     isNullable: true,
  //   }),
  //   dateOfBirth: yup.string().when({
  //     is: (dateOfBirth: string) =>
  //       dateOfBirth === undefined || dateOfBirth === null,
  //     then: genValidation({
  //       type: "string",
  //       isNullable: true,
  //     }),
  //     otherwise: genValidation({
  //       type: "date",
  //       isPastDate: true,
  //       isValidDOB: true,
  //     }),
  //   }),
  //   emergencyContactName: genValidation({
  //     type: "string",
  //     isNullable: true,
  //   }),
  //   emergencyContactNo: yup.string().when({
  //     is: (emergencyContactNo: string) =>
  //       // emergencyContactNo.length === 0 ||
  //       emergencyContactNo === null || emergencyContactNo === undefined,
  //     then: genValidation({
  //       type: "string",
  //       isNullable: true,
  //     }),
  //     otherwise: genValidation({
  //       type: "mobile",
  //       label: "Emergency Contact No.",
  //     }),
  //   }),
  // }

  // const Step2 = {
  //   nomineeName: genValidation({
  //     type: "string",
  //     isNullable: true,
  //   }),
  //   nomineeNID: yup.string().when({
  //     is: (nomineeNID: string) =>
  //       nomineeNID === null ||
  //       // nomineeNID.length === 0 ||
  //       nomineeNID === undefined,
  //     then: genValidation({
  //       type: "string",
  //       isNullable: true,
  //     }),
  //     otherwise: genValidation({
  //       type: "nid",
  //       // isRequired: true,
  //     }),
  //   }),
  //   nomineeNo: yup.string().when({
  //     is: (nomineeNo: string) =>
  //       nomineeNo === null ||
  //       //  nomineeNo.length === 0 ||
  //       nomineeNo === undefined,
  //     then: genValidation({
  //       type: "string",
  //       isNullable: true,
  //     }),
  //     otherwise: genValidation({
  //       type: "mobile",
  //       label: "Nominee Phone No.",
  //     }),
  //   }),
  //   percentageReserved: genValidation({
  //     type: "percentage",
  //     isNullable: true,
  //   }),
  //   introducerName: genValidation({
  //     type: "string",
  //     isNullable: true,
  //   }),
  //   introducerMobileNumber: yup.string().when({
  //     is: (introducerMobileNumber: string) =>
  //       introducerMobileNumber === null ||
  //       // introducerMobileNumber.length === 0 ||
  //       introducerMobileNumber === undefined,
  //     then: genValidation({
  //       type: "string",
  //       isNullable: true,
  //     }),
  //     otherwise: genValidation({
  //       type: "mobile",
  //       label: "Mobile No.",
  //     }),
  //   }),
  //   introducerOccupation: genValidation({
  //     type: "string",
  //     isNullable: true,
  //   }),
  // }

  switch (formStage) {
    case "Step1Tab1":
      validationSchema = yup.object().shape({
        ...Step1Tab1,
      })
      break
    // case "Step1Tab2Bulk":
    //   validationSchema = yup.object().shape({
    //     ...Step1Tab2,
    //     applicantDetails: yup.object().shape({
    //       applicantIdType: genValidation({
    //         type: "mixed",
    //         isNullable: true,
    //         isRequired: true,
    //       }),
    //       applicantIdNumber: yup.string().when(["applicantIdType"], {
    //         is: (applicantIdType: { keyValue: string }) => {
    //           return (
    //             applicantIdType?.keyValue === undefined ||
    //             applicantIdType?.keyValue === null
    //           )
    //         },
    //         then: (scheme) => scheme.nullable(),
    //         otherwise: (scheme) =>
    //           scheme.when("applicantIdType", {
    //             is: (applicantIdType: { keyValue: string }) => {
    //               return applicantIdType?.keyValue === "NID"
    //             },
    //             then: genValidation({
    //               type: "nid",
    //               isNullable: true,
    //               isRequired: true,
    //             }),
    //             otherwise: (scheme2) =>
    //               scheme2.when("applicantIdType", {
    //                 is: (applicantIdType: { keyValue: string }) => {
    //                   return applicantIdType?.keyValue === "Passport"
    //                 },
    //                 then: genValidation({
    //                   type: "passport",
    //                   isNullable: true,
    //                   isRequired: true,
    //                 }),
    //                 otherwise: (scheme3) =>
    //                   scheme3.when("applicantIdType", {
    //                     is: (applicantIdType: { keyValue: string }) => {
    //                       return applicantIdType?.keyValue === "Driving Licence"
    //                     },
    //                     then: genValidation({
    //                       type: "drivinglicence",
    //                       isNullable: true,
    //                       isRequired: true,
    //                     }),
    //                     otherwise: genValidation({
    //                       type: "string",
    //                       isNullable: true,
    //                       isRequired: true,
    //                     }),
    //                   }),
    //               }),
    //           }),
    //       }),
    //     }),
    //   })
    //   break

    case "Step1Tab2":
      validationSchema = yup.object().shape({
        ...Step1Tab1,
        ...Step1Tab2,
      })
      break
    // case "Step1Tab3Bulk":
    //   validationSchema = yup.object().shape({
    //     ...Step1Tab3,
    //     applicantDetails: yup.object().shape({
    //       ...Step1Tab3ApplicantDetails,
    //     }),
    //     PERMANENT: yup.object().shape({
    //       completeAddress: genValidation({
    //         type: "string",
    //         isNullable: true,
    //       }),
    //     }),
    //     CURRENT: yup.object().shape({
    //       completeAddress: genValidation({
    //         type: "string",
    //         isNullable: true,
    //       }),
    //     }),
    //   })
    //   break
    case "Step1Tab3":
      validationSchema = yup.object().shape({
        ...Step1Tab1,
        ...Step1Tab2,
        ...Step1Tab3,
        // applicantDetails: yup.object().shape({
        //   ...Step1Tab3ApplicantDetails,
        //   applicantIdType: genValidation({
        //     type: "mixed",
        //     isNullable: true,
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
        // }),
        // PERMANENT: yup.object().shape({
        //   completeAddress: genValidation({
        //     type: "string",
        //     isNullable: true,
        //   }),
        // }),
        // CURRENT: yup.object().shape({
        //   completeAddress: genValidation({
        //     type: "string",
        //     isNullable: true,
        //   }),
        // }),
      })
      break
    case "Step2":
      // validationSchema = yup.object().shape({
      //   ...Step2,
      //   INTRODUCER_ADDRESS: yup.object().shape({
      //     completeAddress: genValidation({
      //       type: "string",
      //       isNullable: true,
      //     }),
      //   }),
      // })

      break
    default:
      break
  }
  return validationSchema
}

export default schema
