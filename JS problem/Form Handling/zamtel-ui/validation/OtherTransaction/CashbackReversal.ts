import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function schema(formStage: string) {
  let validationSchema

  const CashbackReversalUpload = {
    excelFile: genValidation({
      type: "uploadedFile",
      isRequired: true,
      label: "Excel file",
    }),
  }

  switch (formStage) {
    case "cashbackReversalUpload":
      validationSchema = yup.object().shape({
        ...CashbackReversalUpload,
      })
      break
    default:
      validationSchema = yup.object().shape({})
      break
  }
  return validationSchema
}

export default schema
