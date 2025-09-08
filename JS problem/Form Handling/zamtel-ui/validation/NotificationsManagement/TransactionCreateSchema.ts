import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

const getDefaultSchema = (length: number) => {
  return {
    englishMessage: yup
      .string()
      .test("len", `Max ${length} characters allowed`, (val: any = "") => {
        let valLength = val.length
        let start = 0
        let startAvailable = false
        let endAvailable = false
        let end = 0
        for (let i = 0; i < val.length; i += 1) {
          if (val[i] === "<") {
            start = i
            startAvailable = true
          }
          if (val[i] === ">") {
            end = i
            endAvailable = true
          }

          if (startAvailable && endAvailable) {
            valLength = valLength - end + start - 1
            start = 0
            startAvailable = false
            endAvailable = false
            end = 0
          }
        }
        return valLength <= length
      })
      .required(),
    // banglaMessage: yup
    //   .string()
    //   .test("len", `Max ${length} characters allowed`, (val: any = "") => {
    //     let valLength = val.length
    //     let start = 0
    //     let startAvailable = false
    //     let endAvailable = false
    //     let end = 0
    //     for (let i = 0; i < val.length; i += 1) {
    //       if (val[i] === "<") {
    //         start = i
    //         startAvailable = true
    //       }
    //       if (val[i] === ">") {
    //         end = i
    //         endAvailable = true
    //       }

    //       if (startAvailable && endAvailable) {
    //         valLength = valLength - end + start - 1
    //         start = 0
    //         startAvailable = false
    //         endAvailable = false
    //         end = 0
    //       }
    //     }
    //     return valLength <= length
    //   })
    //   .required(),
  }
}

function schema(modeType: string) {
  const smsFormSchema: any = {
    priority: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    enableUnicode: yup.boolean().required().nullable(),
  }
  const emailAppFormSchema: any = {
    subjectEn: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    // subjectBn: genValidation({
    //   type: "string",
    //   isRequired: true,
    //   isNullable: true,
    // }),
  }

  switch (modeType) {
    case "sms":
      return yup.object().shape({
        ...smsFormSchema,
      })
    case "email":
      return yup.object().shape({
        ...emailAppFormSchema,
        ...getDefaultSchema(384000),
      })
    case "push":
      return yup.object().shape({
        ...emailAppFormSchema,
        // ...getDefaultSchema(160),
      })
    case "api":
      return yup.object().shape({
        // ...getDefaultSchema(160),
      })
    default:
      return yup.object().shape({
        ...getDefaultSchema(10000000000),
      })
  }
}

export default schema
