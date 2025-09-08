import * as yup from "yup"

function schema(formStage: string) {
  let validationSchema = yup.object().shape({})

  const serviceUser = {
    serviceUser: yup.mixed().required("Please select a user").nullable(),
  }

  switch (formStage) {
    case "serviceUser":
      validationSchema = yup.object().shape({
        ...serviceUser,
      })
      break
    default:
      break
  }
  return validationSchema
}

const editSchema = (ussdDatafields: any) => {
  const validationShape: Record<string, any> = {}

  ussdDatafields?.forEach((item: any) => {
    validationShape[item.attributeKey] = yup
      .string()
      .nullable()
      .required(`${item.attributeKey} is required`)

    if (item.errorAttributeKey)
      validationShape[item.errorAttributeKey] = yup
        .string()
        .nullable()
        .required(`${item.attributeKey} is required`)
  })

  return yup.object().shape(validationShape)
}

export default schema

export { editSchema }
