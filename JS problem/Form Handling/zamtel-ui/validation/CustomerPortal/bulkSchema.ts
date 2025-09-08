import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function schema(formStage: string) {
  let validationSchema

  const CustomerBulkUpload = {
    excelFile: genValidation({
      type: "uploadedFile",
      isRequired: true,
      label: "Excel File",
    }),
  }
  const bulMigration = {
    excelFile: genValidation({
      type: "uploadedFile",
      isRequired: true,
      label: "Excel File",
    }),
    rfiInput: yup.string().when("rfiCheckbox", {
      is: (rfiCheckbox: boolean) => rfiCheckbox,
      then: yup.string().required(),
    }),
  }

  switch (formStage) {
    case "CustomerBulkUpload":
      validationSchema = yup.object().shape({
        ...CustomerBulkUpload,
      })
      break
    case "bulMigration":
      validationSchema = yup.object().shape({
        ...bulMigration,
      })
      break
    default:
      validationSchema = yup.object().shape({})
      break
  }
  return validationSchema
}

export default schema
