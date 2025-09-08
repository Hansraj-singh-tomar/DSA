import * as yup from "yup"

function schema(formStage: string) {
  let validationSchema = yup.object().shape({})

  const userSchema = {
    user: yup.mixed().required("Please select a user").nullable(),
    // profile: yup.mixed().required("Please select a profile").nullable(),
    template: yup.mixed().required("Please select a template").nullable(),
  }

  switch (formStage) {
    case "userSchema":
      validationSchema = yup.object().shape({
        ...userSchema,
      })
      break
    default:
      break
  }
  return validationSchema
}

export default schema
