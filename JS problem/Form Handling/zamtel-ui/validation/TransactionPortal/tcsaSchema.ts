import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function tcsaSchema(formStage: string) {
  let validationSchema = yup.object().shape({})

  const adjustmentRejectRemarks = {
    rejected_remarks: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
  }
  switch (formStage) {
    case "adjustmentRemarks":
      validationSchema = yup.object().shape({
        ...adjustmentRejectRemarks,
      })
      break
    default:
      validationSchema = yup.object().shape({})
      break
  }
  return validationSchema
}
export default tcsaSchema
