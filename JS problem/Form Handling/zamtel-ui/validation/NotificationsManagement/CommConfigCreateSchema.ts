import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

const combineSchema = (prefix: string, schema1: any, schema2: any): any => {
  const result: any = {}

  Object.keys(schema1).forEach((key: string) => {
    result[`${prefix}_${key}`] = schema1[key]
  })

  Object.keys(schema2).forEach((key: string) => {
    result[`${prefix}_${key}`] = schema2[key]
  })
  return result
}

function schema(includeFormSchemas: string[]) {
  let combineFormSchema: any = {}
  const defaultFormSchema: any = {
    templateName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
  }

  const smsSchema: any = {
    priority: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    unicode: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
  }

  const emailAppSchema: any = {
    subjectEn: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    subjectBn: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
  }

  const messageSchema: any = {
    messageEn: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    messageBn: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
  }

  includeFormSchemas.forEach((key: string) => {
    switch (key.split("_")[0]) {
      case "sms":
        combineFormSchema = {
          ...combineFormSchema,
          ...combineSchema(key, messageSchema, smsSchema),
        }
        break
      case "email":
      case "app":
        combineFormSchema = {
          ...combineFormSchema,
          ...combineSchema(key, messageSchema, emailAppSchema),
        }
        break
      default:
        break
    }
  })

  return yup.object().shape({
    ...defaultFormSchema,
    ...combineFormSchema,
  })
}

export default schema
