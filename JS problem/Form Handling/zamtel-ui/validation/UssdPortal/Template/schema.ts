import { genValidation } from "app/utils/commonFunctions"
import * as yup from "yup"

function schema(formStage: string) {
  let validationSchema = yup.object().shape({})

  const templateUser = {
    templateUser: yup.mixed().required("Please select a user").nullable(),
    profile: yup.mixed().when("templateUser.keyValue", {
      is: "CUSTOMER",
      then: yup.mixed().required().nullable(),
    }),
  }

  const templateAssignmentUser = {
    user: yup.mixed().required("Please select a user").nullable(),
    profile: yup.mixed().when("user.keyValue", {
      is: "CUSTOMER",
      then: yup.mixed().required().nullable(),
    }),
  }

  const templateConfig = {
    templateText: yup.string().required(),
    templateAction: yup.mixed().required(),
  }

  const profileUserMappingSchema = {
    userTypes: genValidation({
      type: "multiSelectArrayOptions",
      minArraySize: 1,
    }),
    accountStatus: genValidation({
      type: "multiSelectArrayOptions",
      minArraySize: 1,
    }),
  }

  switch (formStage) {
    case "templateUser":
      validationSchema = yup.object().shape({
        ...templateUser,
      })
      break
    case "templateAssignmentUser":
      validationSchema = yup.object().shape({
        ...templateAssignmentUser,
      })
      break
    case "profileUserMappingSchema":
      validationSchema = yup.object().shape({
        ...profileUserMappingSchema,
      })
      break
    case "templateConfig":
      validationSchema = yup.object().shape({
        template6: yup.object().shape({
          ...templateConfig,
        }),
      })
      break
    default:
      break
  }
  return validationSchema
}

export default schema
