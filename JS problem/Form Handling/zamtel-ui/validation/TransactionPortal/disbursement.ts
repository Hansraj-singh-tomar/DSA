import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function disbursementSchema(formStage: string) {
  let validationSchema = yup.object().shape({})

  const saveDisbursement = {
    IBasCheckingAfter: genValidation({
      isRequired: true,
      type: "string",
    }),
  }

  switch (formStage) {
    case "saveDisbursement":
      validationSchema = yup.object().shape({
        ...saveDisbursement,
      })
      break
    default:
      validationSchema = yup.object().shape({})
      break
  }

  return validationSchema
}
export default disbursementSchema
