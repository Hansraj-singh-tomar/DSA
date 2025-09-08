import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function schema(formStage: string) {
  let validationSchema

  const MerchantBulkUpload = {
    excelFile: genValidation({
      type: "uploadedFile",
      isRequired: true,
      label: "Excel file",
    }),
    zipFile: genValidation({
      type: "uploadedFile",
      isRequired: false,
      label: "Zip file",
    }),
  }

  switch (formStage) {
    case "MerchantBulkUpload":
      validationSchema = yup.object().shape({
        ...MerchantBulkUpload,
      })
      break
    default:
      validationSchema = yup.object().shape({})
      break
  }
  return validationSchema
}

export default schema
