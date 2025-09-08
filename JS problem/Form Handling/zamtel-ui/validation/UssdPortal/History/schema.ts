import * as yup from "yup"

function schema(formStage: string) {
  let validationSchema = yup.object().shape({})

  const user = {
    user: yup.mixed().required("Please select a user").nullable(),
    profile: yup.mixed().when("user.keyValue", {
      is: "CUSTOMER",
      then: yup.mixed().required().nullable(),
    }),
  }

  switch (formStage) {
    case "user":
      validationSchema = yup.object().shape({
        ...user,
      })
      break
    default:
      break
  }
  return validationSchema
}

export default schema
