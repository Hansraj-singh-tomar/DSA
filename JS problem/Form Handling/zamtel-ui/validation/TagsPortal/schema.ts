/* eslint-disable no-else-return */
// import { values } from "lodash"
import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"
import { getDateTimeEpoch } from "app/utils/dateUtils"
// import moment from "moment"
// import { ValidationField } from "app/models/validationFieldModel"
import { isAfter, isBefore, isEqual, isValid } from "date-fns"

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
    tagName: yup.object().test("Tag", "Please select a tag", (value: any) => {
      return value?.tagName
    }),
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
      then: yup
        .number()
        .transform((value: number) => (Number.isNaN(value) ? undefined : value))
        .required()
        .nullable()
        .test(
          "min_end_time",
          "validity cannot be 0 or more than validity of tag and it's expiry date",
          (value: number | undefined | null, context: any) => {
            const { validityDays, tagExpiry } = context.parent
            if (value && validityDays && tagExpiry) {
              const now = new Date()
              now.setDate(now.getDate() + value)
              const expiryDate = new Date(tagExpiry)
              return value <= validityDays && now <= expiryDate && value > 0
              // const sDate = Number(validityDays)
              // const tVal = getDateTimeEpoch(sDate, Number(value))
              // const now = new Date()
              // return now.getTime() <= new Date(tVal).getTime()
            } else if (value && validityDays && !tagExpiry) {
              return value <= validityDays && value > 0
            } else if (value && !validityDays && tagExpiry) {
              const now = new Date()
              now.setDate(now.getDate() + value)

              const expiryDate = new Date(tagExpiry)
              return now <= expiryDate && value > 0
            } else if (value && !validityDays && !tagExpiry) {
              return true
            }
            // if (value && tagExpiry) {
            //   const now = new Date()
            //   now.setDate(now.getDate() + value)
            //   const expiryDate = new Date(tagExpiry)
            //   return now < expiryDate
            // }
            return false
          },
        ),
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
            (value: number | undefined | null | string, context) => {
              if (value) {
                console.log(context.parent)
                const { expiryDate } = context.parent
                const newExpiry = new Date(Number(expiryDate))
                console.log(expiryDate)
                const newExpiryTime = new Date(Number(value))
                const hours = newExpiryTime.getHours()
                const min = newExpiryTime.getMinutes()
                const sec = newExpiryTime.getSeconds()
                const milisec = newExpiryTime.getMilliseconds()
                const newTime = new Date(
                  newExpiry.setHours(hours, min, sec, milisec),
                )
                const now = new Date()
                console.log(newTime, now, "......time")
                return now <= newTime
              }
              return false
            },
          )
          .test(
            "effectiveTime",
            "Cannot pick future hours",
            (value: number | undefined | null | string, context: any) => {
              const { tagExpiry } = context.parent
              console.log(tagExpiry)
              if (tagExpiry === null) {
                return true
              }
              if (value) {
                const { expiryDate } = context.parent
                const newExpiry = new Date(Number(expiryDate))
                console.log(expiryDate)
                const newExpiryTime = new Date(Number(value))
                const hours = newExpiryTime.getHours()
                const min = newExpiryTime.getMinutes()
                const sec = newExpiryTime.getSeconds()
                const milisec = newExpiryTime.getMilliseconds()
                const newTime = new Date(
                  newExpiry.setHours(hours, min, sec, milisec),
                )
                // const sDate = new Date(Number(value))
                console.log(newTime)
                const tagExpiryDate = new Date(Number(tagExpiry))
                console.log(tagExpiryDate)

                return newTime <= tagExpiryDate
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
      then: yup
        .number()
        .transform((value: number) => (Number.isNaN(value) ? undefined : value))
        .required()
        .nullable()
        .test(
          "min_end_time",
          "validity cannot be 0 or more than validity of tag and it's expiry date",
          (value: number | undefined | null, context: any) => {
            const { validityDays, tagExpiry } = context.parent
            console.log(validityDays, tagExpiry, "edit sschema")
            if (value && validityDays && tagExpiry) {
              const now = new Date()
              now.setDate(now.getDate() + value)
              const expiryDate = new Date(tagExpiry)
              return value <= validityDays && now <= expiryDate && value > 0
              // const sDate = Number(validityDays)
              // const tVal = getDateTimeEpoch(sDate, Number(value))
              // const now = new Date()
              // return now.getTime() <= new Date(tVal).getTime()
            } else if (value && validityDays && !tagExpiry) {
              return value <= validityDays && value > 0
            } else if (value && !validityDays && tagExpiry) {
              const now = new Date()
              now.setDate(now.getDate() + value)

              const expiryDate = new Date(tagExpiry)
              return now <= expiryDate && value > 0
            } else if (value && !validityDays && !tagExpiry) {
              return true
            }
            // if (value && tagExpiry) {
            //   const now = new Date()
            //   now.setDate(now.getDate() + value)
            //   const expiryDate = new Date(tagExpiry)
            //   return now < expiryDate
            // }
            return false
          },
        ),
      otherwise: genValidation({
        type: "number",
        isNullable: true,
      }),
    }),
  }

  const filter = {
    expiredOnFrom: yup.mixed().test({
      name: "validator-time",
      test(expiredOnFrom: Date | null) {
        if (!expiredOnFrom) return true
        if (expiredOnFrom) {
          if (isValid(expiredOnFrom)) {
            const { expiredOnTo } = this.parent
            if (isValid(expiredOnTo) && expiredOnTo) {
              if (
                isEqual(expiredOnTo, expiredOnFrom) ||
                isAfter(expiredOnFrom, expiredOnTo) ||
                isBefore(expiredOnTo, expiredOnFrom)
              ) {
                return this.createError({
                  message: "start time should be before end time",
                  path: "expiredOnFrom",
                })
              }
              return true
            }
            return true
          }
          return this.createError({
            message: "Invalid Time",
            path: "expiredOnFrom",
          })
        }
        return true
      },
    }),
    expiredOnTo: yup.mixed().test({
      name: "validator-time",
      test(expiredOnTo: Date | null) {
        if (!expiredOnTo) return true
        if (expiredOnTo) {
          if (isValid(expiredOnTo)) {
            const { expiredOnFrom } = this.parent
            if (isValid(expiredOnFrom) && expiredOnFrom) {
              if (
                isEqual(expiredOnTo, expiredOnFrom) ||
                isAfter(expiredOnFrom, expiredOnTo) ||
                isBefore(expiredOnTo, expiredOnFrom)
              ) {
                return this.createError({
                  message: "end time cannot be before start time",
                  path: "expiredOnTo",
                })
              }
              return true
            }
            return true
          }
          return this.createError({
            message: "invalid time",
            path: "expiredOnTo",
          })
        }
        return true
      },
    }),

    lastActivatedOnFrom: yup.mixed().test({
      name: "validator-time",
      test(lastActivatedOnFrom: Date | null) {
        if (!lastActivatedOnFrom) return true
        if (lastActivatedOnFrom) {
          if (isValid(lastActivatedOnFrom)) {
            const { lastActivatedOnTo } = this.parent
            if (isValid(lastActivatedOnTo) && lastActivatedOnTo) {
              if (
                isEqual(lastActivatedOnTo, lastActivatedOnFrom) ||
                isAfter(lastActivatedOnFrom, lastActivatedOnTo) ||
                isBefore(lastActivatedOnTo, lastActivatedOnFrom)
              ) {
                return this.createError({
                  message: "start time should be before end time",
                  path: "lastActivatedOnFrom",
                })
              }
              return true
            }
            return true
          }
          return this.createError({
            message: "Invalid Time",
            path: "lastActivatedOnFrom",
          })
        }
        return true
      },
    }),
    lastActivatedOnTo: yup.mixed().test({
      name: "validator-time",
      test(lastActivatedOnTo: Date | null) {
        if (!lastActivatedOnTo) return true
        if (lastActivatedOnTo) {
          if (isValid(lastActivatedOnTo)) {
            const { lastActivatedOnFrom } = this.parent
            if (isValid(lastActivatedOnFrom) && lastActivatedOnFrom) {
              if (
                isEqual(lastActivatedOnTo, lastActivatedOnFrom) ||
                isAfter(lastActivatedOnFrom, lastActivatedOnTo) ||
                isBefore(lastActivatedOnTo, lastActivatedOnFrom)
              ) {
                return this.createError({
                  message: "end time cannot be before start time",
                  path: "lastActivatedOnTo",
                })
              }
              return true
            }
            return true
          }
          return this.createError({
            message: "invalid time",
            path: "lastActivatedOnTo",
          })
        }
        return true
      },
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
    case "filter":
      validationSchema = yup.object().shape({
        ...filter,
      })
      break

    default:
      validationSchema = yup.object().shape({})
      break
  }
  return validationSchema
}
export default schema
