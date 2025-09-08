import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

const amountValidationMessage =
  "Please enter valid format (max upto two decimal places allowed)"

const valIsEmpty = (val: any) => {
  return val != null && typeof val === "string"
    ? val.replace(/\s/g, "").length === 0
    : true
}
const amountValidation = (val: string) => {
  const regex = /(^([1-9]([0-9]*)?|0)(\.[0-9]{1,2})?$)/
  // console.log({ val, reg: regex.test(val) })
  return val != null ? regex.test(val) : true
}
const moreThan = (val: string, compVal: number) => {
  if (val == null) {
    return true
  }
  if (val != null && +val > +compVal) return true
  return false
}
const maxUpto = (val: string, compVal: number) => {
  if (val == null) {
    return true
  }
  if (val != null && +val <= +compVal) return true
  return false
}

function schema(formStage: string) {
  let validationSchema

  const Details = {
    schemeCode: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    schemeName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    isDisbursementAllowed: genValidation({
      type: "checkbox",
      isRequired: true,
      isNullable: true,
      label: "Disbursement",
    }),
    isOccurenceEnabled: genValidation({
      type: "checkbox",
      isRequired: true,
      isNullable: true,
      label: "Occurence",
    }),
    enterDescription: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
      maxLength: 100,
    }),
  }
  const merchantFeesConfig = {
    chargesType: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    modeOfCharges: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    charges: yup.string().when("chargesType", {
      is: "FIXED",
      then: yup
        .string()
        .required()
        .test("len", amountValidationMessage, (val: any) => {
          const check = amountValidation(val)
          return check
        }),
      otherwise: yup
        .string()
        .required()
        .test("len", amountValidationMessage, (val: any) => {
          const check = amountValidation(val)
          return check
        })
        .test("moreThan", "Percentage value can't be 0%", (val: any) => {
          return moreThan(val, 0)
        })
        .test("max", "Enter a percentage of at most 100%", (val: any) => {
          return maxUpto(val, 100)
        }),
    }),
    amountRange: yup
      .object()
      .nullable()
      .when("chargesType", {
        is: "PERCENTAGE",
        then: yup.object({
          // min: genValidation({
          //   type: "number",
          //   isRequired: true,
          //   isNullable: true,
          // }),
          // max: genValidation({
          //   type: "number",
          //   isRequired: true,
          //   isNullable: true,
          // }),
          min: yup
            .string()
            .nullable()
            .required("Amount Range / Minimum Amount is required")
            .test("len", amountValidationMessage, (val: any) => {
              const check = amountValidation(val)
              return check
            })
            .test(
              "min",
              "Minimum Amount should be lesser than Maximum Amount",
              (value, context) => {
                const maxVal = context.parent.max
                /*
              console.log(
                "error Min => ",
                value,
                maxVal,
                value != null && +value < +maxVal,
                context.parent,
              )
              */
                if (valIsEmpty(maxVal) || (value != null && +value < +maxVal)) {
                  return true
                }
                return false
              },
            ),
          max: yup
            .string()
            .nullable()
            .required("Amount Range / Maximun Amount is required")
            .test("len", amountValidationMessage, (val: any) => {
              const check = amountValidation(val)
              return check
            })
            .test(
              "max",
              "Maximum Amount should be greater than Minimum Amount",
              (value, context) => {
                const minVal = context.parent.min
                /*
              console.log(
                "error max => ",
                value,
                minVal,
                value != null && +value > +minVal,
                context.parent,
              )
              */
                if (valIsEmpty(minVal) || (value != null && +value > +minVal)) {
                  return true
                }
                return false
              },
            ),
        }),
      }),
  }
  const chargeFromPrincipalConfig = {
    chargesType: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    charges: yup.string().when("chargesType", {
      is: "FIXED",
      then: yup
        .string()
        .required()
        .test("len", amountValidationMessage, (val: any) => {
          const check = amountValidation(val)
          return check
        }),
      otherwise: yup
        .string()
        .required()
        .test("len", amountValidationMessage, (val: any) => {
          const check = amountValidation(val)
          return check
        })
        .test("moreThan", "Percentage value can't be 0%", (val: any) => {
          return moreThan(val, 0)
        })
        .test("max", "Enter a percentage of at most 100%", (val: any) => {
          return maxUpto(val, 100)
        }),
    }),
    principleChargeAmountRange: yup
      .object()
      .nullable()
      .when("chargesType", {
        is: "PERCENTAGE",
        then: yup.object({
          // min: genValidation({
          //   type: "number",
          //   isRequired: true,
          //   isNullable: true,
          // }),
          // max: genValidation({
          //   type: "number",
          //   isRequired: true,
          //   isNullable: true,
          // }),
          min: yup
            .string()
            .nullable()
            .required("Amount Range / Minimum Amount is required")
            .test("len", amountValidationMessage, (val: any) => {
              const check = amountValidation(val)
              return check
            })
            .test(
              "min",
              "Minimum Amount should be lesser than Maximum Amount",
              (value, context) => {
                const maxVal = context.parent.max
                /*
              console.log(
                "error Min => ",
                value,
                maxVal,
                value != null && +value < +maxVal,
              )
              */
                if (valIsEmpty(maxVal) || (value != null && +value < +maxVal)) {
                  return true
                }
                return false
              },
            ),
          max: yup
            .string()
            .nullable()
            .required("Amount Range / Maximun Amount is required")
            .test("len", amountValidationMessage, (val: any) => {
              const check = amountValidation(val)
              return check
            })
            .test(
              "max",
              "Maximum Amount should be greater than Minimum Amount",
              (value, context) => {
                const minVal = context.parent.min
                /*
              console.log(
                "error max => ",
                value,
                minVal,
                value != null && +value > +minVal,
              )
              */
                if (valIsEmpty(minVal) || (value != null && +value > +minVal)) {
                  return true
                }
                return false
              },
            ),
        }),
      }),
  }
  const splitConfiguration = {
    splitAmountType: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    splitAmount: yup.string().when("splitAmountType", {
      is: "AMOUNT",
      // then: genValidation({
      //   type: "number",
      //   isRequired: true,
      //   isNullable: true,
      // }),
      // otherwise: yup
      //   .number()
      //   .transform((value) => (Number.isNaN(value) ? undefined : value))
      //   .moreThan(0, "Percentage value can't be 0%")
      //   .max(100, "Enter a percentage of at most 100%")
      //   .when("splitAmountType", {
      //     is: "PERCENTAGE",
      //     then: genValidation({
      //       type: "number",
      //       isNullable: true,
      //       isRequired: true,
      //     }),
      //   }),
      then: yup
        .string()
        .required()
        .test("len", amountValidationMessage, (val: any) => {
          const check = amountValidation(val)
          return check
        }),
      otherwise: yup
        .string()
        .required()
        .test("len", amountValidationMessage, (val: any) => {
          const check = amountValidation(val)
          return check
        })
        .test("moreThan", "Percentage value can't be 0%", (val: any) => {
          return moreThan(val, 0)
        })
        .test("max", "Enter a percentage of at most 100%", (val: any) => {
          return maxUpto(val, 100)
        }),
    }),
  }
  const OtherConfiguration = {
    nonRegisteredUsers: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    dmtapValidityHours: yup
      .number()
      .nullable()
      .transform((value) => (Number.isNaN(value) ? undefined : value))
      .min(1, "Enter value of at least 1")
      .max(24, "Enter value of at most 24")
      .when("nonRegisteredUsers", {
        is: "DMTAP",
        then: genValidation({
          type: "number",
          isRequired: true,
          isNullable: true,
        }),
      }),
    profitPreference: yup
      .string()
      .nullable()
      .when("nonRegisteredUsers", {
        is: "AUTOREGISTRATION",
        then: genValidation({
          type: "string",
          isRequired: false,
          isNullable: true,
        }),
      }),
    profileType: yup
      .string()
      .nullable()
      .when("nonRegisteredUsers", {
        is: "AUTOREGISTRATION",
        then: genValidation({
          type: "string",
          isRequired: false,
          isNullable: true,
        }),
      }),
    customerType: yup
      .string()
      .nullable()
      .when("nonRegisteredUsers", {
        is: "AUTOREGISTRATION",
        then: genValidation({
          type: "string",
          isRequired: false,
          isNullable: true,
        }),
      }),
    notifications: yup.object({
      isPushNotificationEnabled: genValidation({
        type: "checkbox",
        isRequired: false,
        isNullable: true,
        label: "Push Notification",
      }),
      isSMSNotificationEnabled: genValidation({
        type: "checkbox",
        isRequired: false,
        isNullable: true,
        label: "SMS Notification",
      }),
      pushNotificationTemplate: yup
        .string()
        .nullable()
        .when("isPushNotificationEnabled", {
          is: (value: any) => {
            return !!value
          },
          then: genValidation({
            type: "string",
            isRequired: true,
            isNullable: true,
            maxLength: 100,
            minLength: 1,
          }),
        }),
      smsNotificationTemplate: yup
        .string()
        .nullable()
        .when("isSMSNotificationEnabled", {
          is: (value: any) => {
            return !!value
          },
          then: genValidation({
            type: "string",
            isRequired: true,
            isNullable: true,
            maxLength: 100,
            minLength: 1,
          }),
        }),
    }),
    autoMigrationCustomerType: yup.string().when("autoMigration", {
      is: true,
      then: genValidation({
        type: "string",
        isRequired: true,
        isNullable: true,
      }),
      otherwise: genValidation({
        type: "string",
        isNullable: true,
      }),
    }),
    autoAssignmentCustomerTag: yup.string().when("autoAssignment", {
      is: true,
      then: genValidation({
        type: "string",
        isRequired: true,
        isNullable: true,
      }),
      otherwise: genValidation({
        type: "string",
        isNullable: true,
      }),
    }),
  }
  switch (formStage) {
    case "Details":
      validationSchema = yup.object().shape({
        ...Details,
      })
      break
    case "MerchantFeesConfiguration":
      validationSchema = yup.object().shape({
        ...merchantFeesConfig,
      })
      break
    case "ChargesFromPrincipal":
      validationSchema = yup.object().shape({
        ...chargeFromPrincipalConfig,
      })
      break
    case "SplitConfiguration":
      validationSchema = yup.object().shape({
        ...splitConfiguration,
      })
      break
    case "OtherConfiguration":
      validationSchema = yup.object().shape({
        ...OtherConfiguration,
      })
      break
    default:
      validationSchema = yup.object().shape({})
      break
  }
  return validationSchema
}
export default schema
