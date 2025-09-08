import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function schema(formStage: string) {
  let validationSchema
  const configForm = {
    module: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    transaction: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: true,
    }),
  }

  switch (formStage) {
    case "config":
      validationSchema = yup.object().shape({
        ...configForm,
      })
      break
    default:
      validationSchema = yup.object().shape({})
      break
  }
  return validationSchema
}

export default schema
