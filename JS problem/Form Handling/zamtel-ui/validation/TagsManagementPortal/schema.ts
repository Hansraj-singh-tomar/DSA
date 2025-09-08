// import { values } from "lodash"
import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"
import { getDateTimeEpoch } from "app/utils/dateUtils"
// import { ValidationField } from "app/models/validationFieldModel"
function schema(formStage: string) {
  let validationSchema = yup.object().shape({})

  const AddEditTags = {
    tagName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    detachmentValiditynotApplicable: yup.boolean(),
    detachmentValidity: yup.string().when("detachmentValiditynotApplicable", {
      is: true,
      then: genValidation({
        type: "string",
        isNullable: true,
      }),
      otherwise: genValidation({
        type: "string",
        isNullable: true,
        isRequired: true,
      }),
    }),
    expiredDateTimeNotApplicable: yup.boolean(),
    expiryDate: yup.string().when("expiredDateTimeNotApplicable", {
      is: true,
      then: genValidation({
        type: "string",
        isNullable: true,
      }),
      otherwise: genValidation({
        type: "date",
        isFutureDate: true,
        isNullable: true,
        isRequired: true,
      }),
    }),
    expiryTime: yup.string().when("expiredDateTimeNotApplicable", {
      is: true,
      then: (scheme) => scheme.nullable(),
      otherwise: (scheme) =>
        scheme
          .required()
          .nullable()
          .test(
            "effectiveTime",
            "Cannot pick past hours",
            (value: number | undefined | null | string, context: any) => {
              const { expiryDate } = context.parent
              if (value) {
                const sDate = Number(expiryDate)
                const tVal = getDateTimeEpoch(sDate, Number(value))
                const now = new Date()
                return now.getTime() <= new Date(tVal).getTime()
              }
              return false
            },
          ),
    }),
  }
  const AddCustomerVersion = {
    minVersionCode: yup.string().required("min version code is required"),
    minVersionName: yup
      .string()
      .max(30, "min version name max length should not be greater than 30")
      .required("min version name is required"),
    updatedType: yup.string().nullable().required("updated type is required"),
    updateText: yup.string().required("update text is required"),
  }
  const EditDetails = {
    updatedType: yup.string().nullable().required("updated type is required"),
    updateText: yup.string().required("update text is required"),
  }

  const AddSingleAssignmentTag = {
    tagName: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: true,
    }),
    expiry: yup.string().required("Please Select an option").nullable(),
    isDateTimeNotApplicable: yup.boolean(),
    expiryDate: yup.string().when(["isDateTimeNotApplicable", "expiry"], {
      is: (isDateTimeNotApplicable: boolean, expiry: string) =>
        (isDateTimeNotApplicable === false ||
          isDateTimeNotApplicable === undefined) &&
        expiry === "dateTime",
      then: genValidation({
        type: "date",
        isFutureDate: true,
        isNullable: true,
        isRequired: true,
      }),
      otherwise: genValidation({
        type: "string",
        isNullable: true,
      }),
    }),
    expiryTime: yup.string().when(["isDateTimeNotApplicable", "expiry"], {
      is: (isDateTimeNotApplicable: boolean, expiry: string) =>
        (isDateTimeNotApplicable === false ||
          isDateTimeNotApplicable === undefined) &&
        expiry === "dateTime",
      then: (scheme) =>
        scheme
          .required()
          .nullable()
          .test(
            "effectiveTime",
            "Cannot pick past hours",
            (value: number | undefined | null | string, context: any) => {
              const { expiryDate } = context.parent
              if (value) {
                const sDate = Number(expiryDate)
                const tVal = getDateTimeEpoch(sDate, Number(value))
                const now = new Date()
                return now.getTime() <= new Date(tVal).getTime()
              }
              return false
            },
          ),
      otherwise: (scheme) => scheme.nullable(),
    }),
    isDaysNotApplicable: yup.boolean(),
    expiryDays: yup.number().when(["isDaysNotApplicable", "expiry"], {
      is: (isDaysNotApplicable: boolean, expiry: string) =>
        (isDaysNotApplicable === false || isDaysNotApplicable === undefined) &&
        expiry === "days",
      then: genValidation({
        type: "number",
        isRequired: true,
      }),
      otherwise: genValidation({
        type: "number",
        isNullable: true,
      }),
    }),
  }
  const EditSingleAssignmentTag = {
    expiry: yup.string().required("Please Select an option"),
    isDateTimeNotApplicable: yup.boolean(),
    expiryDate: yup.string().when(["isDateTimeNotApplicable", "expiry"], {
      is: (isDateTimeNotApplicable: boolean, expiry: string) =>
        (isDateTimeNotApplicable === false ||
          isDateTimeNotApplicable === undefined) &&
        expiry === "dateTime",
      then: genValidation({
        type: "date",
        isFutureDate: true,
        isNullable: true,
        isRequired: true,
      }),
      otherwise: genValidation({
        type: "string",
        isNullable: true,
      }),
    }),
    expiryTime: yup.string().when(["isDateTimeNotApplicable", "expiry"], {
      is: (isDateTimeNotApplicable: boolean, expiry: string) =>
        (isDateTimeNotApplicable === false ||
          isDateTimeNotApplicable === undefined) &&
        expiry === "dateTime",
      then: (scheme) =>
        scheme
          .required()
          .nullable()
          .test(
            "effectiveTime",
            "Cannot pick past hours",
            (value: number | undefined | null | string, context: any) => {
              const { expiryDate } = context.parent
              if (value) {
                const sDate = Number(expiryDate)
                const tVal = getDateTimeEpoch(sDate, Number(value))
                const now = new Date()
                return now.getTime() <= new Date(tVal).getTime()
              }
              return false
            },
          ),
      otherwise: (scheme) => scheme.nullable(),
    }),
    isDaysNotApplicable: yup.boolean(),
    expiryDays: yup.number().when(["isDaysNotApplicable", "expiry"], {
      is: (isDaysNotApplicable: boolean, expiry: string) =>
        (isDaysNotApplicable === false || isDaysNotApplicable === undefined) &&
        expiry === "days",
      then: genValidation({
        type: "number",
        isRequired: true,
      }),
      otherwise: genValidation({
        type: "number",
        isNullable: true,
      }),
    }),
  }
  switch (formStage) {
    case "AddEditTags":
      validationSchema = yup.object().shape({
        ...AddEditTags,
      })
      break
    case "AddSingleAssignmentTag":
      validationSchema = yup.object().shape({
        ...AddSingleAssignmentTag,
      })
      break
    case "EditSingleAssignmentTag":
      validationSchema = yup.object().shape({
        ...EditSingleAssignmentTag,
      })
      break
    case "AddCustomerVersion":
      validationSchema = yup.object().shape({
        ...AddCustomerVersion,
      })
      break
    case "EditDetails":
      validationSchema = yup.object().shape({
        ...EditDetails,
      })
      break

    default:
      validationSchema = yup.object().shape({})
      break
  }
  return validationSchema
}
export default schema
