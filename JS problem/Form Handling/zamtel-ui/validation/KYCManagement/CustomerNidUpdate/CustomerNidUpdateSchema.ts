import { genValidation } from "app/utils/commonFunctions"
import * as yup from "yup"

function schema(formStage: string) {
  let validationSchema = yup.object().shape({})

  const bulkNidUpdateUpload = {
    excelFile: genValidation({
      type: "uploadedFile",
      isRequired: true,
      label: "Excel file",
    }),
  }

  switch (formStage) {
    case "bulNidUpdate":
      validationSchema = yup.object().shape({
        ...bulkNidUpdateUpload,
      })
      break
    default:
      break
  }
  return validationSchema
}

export default schema
