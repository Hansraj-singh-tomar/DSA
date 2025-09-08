import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function schema(formStage: string) {
  let validationSchema

  const BulkUpload = {
    bulkAssignmentFile: genValidation({
      type: "uploadedFile",
      isRequired: true,
      label: "Excel file",
    }),
  }

  switch (formStage) {
    case "BulkUpload":
      validationSchema = yup.object().shape({
        ...BulkUpload,
      })
      break
    default:
      validationSchema = yup.object().shape({})
      break
  }
  return validationSchema
}

export default schema
