import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"
import { validateBankAccount } from "app/api/transactionManagement/WalletsGLMapping/TCSAManagementApi"

function tcsaManagementSchema(level: string): any {
  let validationSchema
  const subControlSchema = {
    name: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    description: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    class: yup.mixed().required("Please select a class").nullable(),
    // control: yup.mixed().required("Please select a control").nullable(),
    walletType: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
  }

  const subsidiarySchema = {
    subControl: yup.mixed().required("Please select a sub-control").nullable(),
    class: yup.mixed().required("Please select a class").nullable(),
    // control: yup.mixed().required("Please select a control").nullable(),
    typeOfAccount: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    bankAccountName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    bankAccountNumber: yup
      .string()
      .required()
      .nullable()
      .test("len", "Account Number should be of 16 digits", (val: any) => {
        return (val && val.length && val !== undefined) > 0
          ? val.length === 16
          : true
      })
      .test(
        "CustomAPiCheck",
        "Bank account number already exists",
        async (val: any) => {
          if (val?.length === 16) {
            try {
              const validateBankAccountResponse = await validateBankAccount({
                accountNumber: val,
              })
              if (
                validateBankAccountResponse?.status?.toUpperCase() !== "SUCCESS"
              ) {
                return false
              }
            } catch (err) {
              console.log(err)
            }
          }
          return true
        },
      ),
    gl: yup.mixed().required("Please select a gl").nullable(),
    bank: yup.mixed().required("Please select a bank").nullable(),
    branch: yup.mixed().required("Please select a branch").nullable(),
    balance: yup
      .number()
      .required("Enter number")
      .typeError("Amount must be a number")
      .nullable(),
    name: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    description: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
  }

  switch (level) {
    case "sub-control":
      validationSchema = yup.object().shape({ ...subControlSchema })
      break
    case "subsidiary":
      validationSchema = yup.object().shape({ ...subsidiarySchema })
      break
    default:
      validationSchema = yup.object().shape({})
      break
  }

  return validationSchema
}

export default tcsaManagementSchema
