import { genValidation } from "app/utils/commonFunctions"
import * as yup from "yup"

function schema(formStage: string) {
  let validationSchema

  const ApprovalModal = {
    approveRemarks: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
  }

  switch (formStage) {
    case "ApprovalModal":
      validationSchema = yup.object().shape({ ...ApprovalModal })
      break
    default:
      validationSchema = yup.object().shape({})
      break
  }
  return validationSchema
}

export default schema
