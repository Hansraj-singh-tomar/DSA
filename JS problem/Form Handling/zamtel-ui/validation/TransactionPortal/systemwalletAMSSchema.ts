import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function systemwalletAMSSchema() {
  const rejectPopUp = {
    rejected_remarks: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
  }

  const defaultValidationSchema = yup.object().shape({
    ...rejectPopUp,
  })

  return defaultValidationSchema
}

export default systemwalletAMSSchema
