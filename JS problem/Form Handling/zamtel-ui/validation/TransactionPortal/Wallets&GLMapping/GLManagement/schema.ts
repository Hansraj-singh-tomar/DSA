import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function glManagementSchema(type: string) {
  let validationSchema: any = {}

  const controlForm = {
    class: genValidation({
      type: "mixed",
      isNullable: true,
      isRequired: true,
    }),
  }

  const subControlForm = {
    control: genValidation({
      type: "mixed",
      isNullable: true,
      isRequired: true,
    }),
  }

  const subsidiaryForm = {
    control: genValidation({
      type: "mixed",
      isNullable: true,
      isRequired: true,
    }),
    subControl: genValidation({
      type: "mixed",
      isNullable: true,
      isRequired: true,
    }),
  }

  const createForm = {
    name: genValidation({
      type: "string",
      maxLength: 40,
      isRequired: true,
      isNullable: true,
    }),
    description: genValidation({
      type: "string",
      maxLength: 150,
      isRequired: true,
      isNullable: true,
    }),
  }

  switch (type) {
    case "Control":
      validationSchema = yup.object().shape({
        ...createForm,
        ...controlForm,
      })
      break
    case "Sub Control":
      validationSchema = yup.object().shape({
        ...createForm,
        ...subControlForm,
      })
      break
    case "Subsidiary":
      validationSchema = yup.object().shape({
        ...createForm,
        ...subsidiaryForm,
      })
      break
    default:
      validationSchema = yup.object().shape({
        ...createForm,
      })
      break
  }

  return validationSchema
}

export default glManagementSchema
