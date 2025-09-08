import { genValidation } from "app/utils/commonFunctions"
import * as yup from "yup"

function schema(formStage: string) {
  let validationSchema = yup.object().shape({})
  const bulkQRUpload = {
    bulkQRCodeExcelFile: genValidation({
      type: "uploadedFile",
      isRequired: true,
      isNullable: true,
      label: "Excel file upload",
    }).test({
      message: "File size should be less than 10 MB",
      test: (file: any) => {
        if (file?.size) {
          return file.size / 1024 / 1024 < 10
        }
        return false
      },
    }),
  }

  switch (formStage) {
    case "bulkQRUploadValidationSchema":
      validationSchema = yup.object().shape({
        ...bulkQRUpload,
      })
      break
    default:
      validationSchema = yup.object().shape({})
      break
  }
  return validationSchema
}

export default schema
