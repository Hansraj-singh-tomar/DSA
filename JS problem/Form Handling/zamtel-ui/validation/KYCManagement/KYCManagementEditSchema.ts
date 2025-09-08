import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

export default function schema() {
  const validationSchema = {
    mno: yup
      .mixed()
      .transform((v) => (!v ? undefined : v))
      .required()
      .nullable(),
    issueDate: yup.string().when({
      is: (applicantIdIssueDate: string) =>
        applicantIdIssueDate === undefined || applicantIdIssueDate === null,
      then: genValidation({
        type: "string",
        isNullable: true,
      }),
      otherwise: genValidation({
        type: "date",
        isPastDate: true,
      }),
    }),
    expiryDate: yup.string().when({
      is: (expiryIdDate: string) =>
        expiryIdDate === undefined || expiryIdDate === null,
      then: genValidation({
        type: "string",
        isNullable: true,
      }),
      otherwise: genValidation({
        type: "date",
        isFutureDate: true,
      }),
    }),
    email: genValidation({
      type: "string",
      format: "email",
      isNullable: true,
    }),
    dateofBirth: yup.string().when({
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
    emergencyContactNo: yup.string().when({
      is: (emergencyContactNo: string) =>
        emergencyContactNo === null ||
        emergencyContactNo.length === 0 ||
        emergencyContactNo === undefined,
      then: genValidation({
        type: "string",
        isNullable: true,
      }),
      otherwise: genValidation({
        type: "mobile",
        label: "Emergency Contact No.",
      }),
    }),

    accountNo: genValidation({
      type: "string",
      isNullable: true,
      isRequired: true,
    }),
    customerType: yup
      .mixed()
      .transform((v) => (!v ? undefined : v))
      .required()
      .nullable(),
    profileType: yup
      .mixed()
      .transform((v) => (!v ? undefined : v))
      .required()
      .nullable(),
    profit: yup
      .mixed()
      .transform((v) => (!v ? undefined : v))
      .required()
      .nullable(),

    nomineeNid: yup.string().when({
      is: (nomineeNID: string) =>
        nomineeNID === null ||
        nomineeNID.length === 0 ||
        nomineeNID === undefined,
      then: genValidation({
        type: "string",
        isNullable: true,
      }),
      otherwise: genValidation({
        type: "nid",
        // isRequired: true,
      }),
    }),
    nomineeNo: yup.string().when({
      is: (nomineeNo: string) =>
        nomineeNo === null || nomineeNo.length === 0 || nomineeNo === undefined,
      then: genValidation({
        type: "string",
        isNullable: true,
      }),
      otherwise: genValidation({
        type: "mobile",
        label: "Nominee Phone No.",
      }),
    }),
    introducerNo: yup.string().when({
      is: (introducerMobileNumber: string) =>
        introducerMobileNumber === null ||
        introducerMobileNumber.length === 0 ||
        introducerMobileNumber === undefined,
      then: genValidation({
        type: "string",
        isNullable: true,
      }),
      otherwise: genValidation({
        type: "mobile",
        label: "Mobile No.",
      }),
    }),
    documentSelector: yup
      .string()
      .nullable()
      .when(
        [
          "uploadBirthCertificate",
          "uploadNID",
          "uploadDrivingLicense",
          "uploadPassport",
          "uploadOther",
        ],
        {
          is: (
            uploadBirthCertificate: any,
            uploadNID: any,
            uploadDrivingLicense: any,
            uploadOther: any,
            uploadPassport: any,
          ) => {
            return (
              uploadBirthCertificate ||
              uploadNID ||
              uploadDrivingLicense ||
              uploadPassport ||
              uploadOther
            )
          },
          then: yup.string().nullable(),
          otherwise: (schemas) => {
            return schemas.test(
              "required-if-no-images",
              "Please upload at least 1 document",
              function validateDocumentSelector(value) {
                const { parent } = this
                const { userImagesDTO } = parent
                return userImagesDTO.length > 0 || !!value
              },
            )
          },
        },
      ),
  }

  return yup.object().shape({ ...validationSchema })
}
