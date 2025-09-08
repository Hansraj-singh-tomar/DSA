import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function schema(formStage: string) {
  let validationSchema

  const AgentBulkUpload = {
    agentBulkexcelFile: genValidation({
      type: "uploadedFile",
      isRequired: true,
      label: "Excel file",
    }),
  }

  switch (formStage) {
    case "AgentBulkUpload":
      validationSchema = yup.object().shape({
        ...AgentBulkUpload,
      })
      break
    default:
      validationSchema = yup.object().shape({})
      break
  }
  return validationSchema
}

export default schema
