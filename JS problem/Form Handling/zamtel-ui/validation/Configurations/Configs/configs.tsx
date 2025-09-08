import * as yup from "yup"
// import { genValidation } from "app/utils/commonFunctions"

function schema(formStage: string) {
  let validationSchema

  const editConfig = {
    unitValue: yup.string().required("Value is required"),
    //   .max(250, "Name should be less than 250 characters")
    //   .nullable(false),
  }

  switch (formStage) {
    case "editConfig":
      validationSchema = yup.object().shape({
        ...editConfig,
      })
      break
    default:
  }
  return validationSchema
}

export default schema
