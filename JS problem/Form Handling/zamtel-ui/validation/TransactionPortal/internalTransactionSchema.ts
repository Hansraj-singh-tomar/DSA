import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function internalTransactionSchema() {
  const editTransactionDetails = {
    globalFeeConfiguration: yup.string().nullable(),
    nlWallet: yup.string().when("globalFeeConfiguration", {
      is: "CUSTOM",
      then: genValidation({
        type: "string",
        isRequired: true,
        isNullable: true,
      }),
      otherwise: genValidation({
        type: "string",
        isRequired: false,
        isNullable: true,
      }),
    }),
    bpoWallet: yup.string().when("globalFeeConfiguration", {
      is: "CUSTOM",
      then: genValidation({
        type: "string",
        isRequired: true,
        isNullable: true,
      }),
      otherwise: genValidation({
        type: "string",
        isRequired: false,
        isNullable: true,
      }),
    }),
    bpoAit: yup.string().when("globalFeeConfiguration", {
      is: "CUSTOM",
      then: genValidation({
        type: "string",
        isRequired: true,
        isNullable: true,
      }),
      otherwise: genValidation({
        type: "string",
        isRequired: false,
        isNullable: true,
      }),
    }),
  }

  const defaultValidationSchema = yup.object().shape({
    ...editTransactionDetails,
  })

  return defaultValidationSchema
}

export default internalTransactionSchema
