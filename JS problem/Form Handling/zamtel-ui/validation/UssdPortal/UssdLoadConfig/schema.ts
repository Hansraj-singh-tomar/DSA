/* eslint-disable func-names */
import * as yup from "yup"

function schema(formStage: string) {
  let validationSchema = yup.object().shape({})

  const viaMNOFieldSchema = {
    viaMno: yup
      .number()
      .required("Via Mno is required")
      .typeError("Via Mno must be a number")
      .nullable(),
    viaParichoy: yup
      .number()
      .nullable()
      .typeError("Via Parichoy must be a number")
      .required("Via Parichoy is required")
      .test(
        "sum",
        "Sum of Via Mno and Via Parichoy must be equal to 100",
        function (value) {
          const { viaMno, viaParichoy } = this.parent
          if (
            Number.isNaN(value) ||
            Number.isNaN(viaMno) ||
            Number.isNaN(viaParichoy)
          ) {
            return false
          }

          const sum = viaMno + value
          return sum === 100
        },
      ),
  }

  switch (formStage) {
    case "loadConfig":
      validationSchema = yup.object().shape({
        ...viaMNOFieldSchema,
      })
      break
    default:
      break
  }
  return validationSchema
}

export default schema
