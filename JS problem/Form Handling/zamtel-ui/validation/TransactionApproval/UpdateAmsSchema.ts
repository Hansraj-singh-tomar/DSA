import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function validationCheckOnClickDefineAmsButton() {
  const validationOnDefineAmsButtonClick = {
    slabs: yup
      .array()
      .min(1, "Minimum 1 slab need to created with 0 to No-Limit.")
      .test(
        "noLimitCheckForLastSlab",
        'Either add the new slab with maximum range empty as "No Limit" or define the existing last slab maximum range empty as "No Limit"',
        (item: any) => {
          const lastIndex = item.length - 1
          const { maxRange, id } = item[lastIndex]

          if (maxRange && id) return false
          if (maxRange && !id) return true
          return true
        },
      )
      .of(
        yup.object().shape({
          minRange: yup
            .string()
            .required()
            .test("typeError", "Specify valid number", (value: any) => {
              if (value !== ".") return true
              return false
            }),
          maxRange: yup
            .string()
            .nullable()
            .test("typeError", "Specify valid number", (value: any) => {
              if (value !== ".") return true
              return false
            })
            .test(
              "upToDecimalDigits",
              "Specify number upto 2 decimal digits.",
              (value) => {
                if (
                  (value &&
                    value.includes(".") &&
                    value.length - 1 - value.indexOf(".") <= 2) ||
                  !value ||
                  !value.includes(".")
                )
                  return true
                return false
              },
            )
            .test(
              "requiredCheck",
              "Maximum Range is required",
              (item: any, context: any) => {
                const lastIndex =
                  context.options.from[1].value.slabs.length - 1 || 0
                const itemIndex = parseInt(
                  context.path.split("[")[1].split("]")[0],
                  10,
                )
                if (lastIndex === itemIndex && !item) return true
                if (item) return true
                return false
              },
            )
            .test(
              "greaterThanMinRange",
              "Maximum Range is greater than Minimum Range",
              (item: any, context: any) => {
                const lastIndex = context.options.from[1].value.slabs.length - 1
                const itemIndex = parseInt(
                  context.path.split("[")[1].split("]")[0],
                  10,
                )
                const { minRange } =
                  context.options.from[1].value.slabs[itemIndex]

                if (item && +item > +minRange && lastIndex !== itemIndex)
                  return true
                if (lastIndex === itemIndex) return true
                return false
              },
            )
            .test(
              "lastSlabNoLimitRange",
              'Maximum Range should be empty as "No Limit"',
              (item: any, context: any) => {
                const lastIndex = context.options.from[1].value.slabs.length - 1
                const itemIndex = parseInt(
                  context.path.split("[")[1].split("]")[0],
                  10,
                )
                const { id } = context.options.from[1].value.slabs[itemIndex]

                if (
                  (item === null || item === undefined || item === "") &&
                  lastIndex === itemIndex
                )
                  return true
                if (lastIndex !== itemIndex) return true
                if (id && lastIndex === itemIndex) return true
                return false
              },
            ),
        }),
      ),
  }

  const defineAmsButtonClickValidationSchema = yup.object().shape({
    ...validationOnDefineAmsButtonClick,
  })

  return defineAmsButtonClickValidationSchema
}

function validationCheckOnClickCreateButtonInAdd() {
  const additionaPriceCodeStep2OnAddSlabClick = {
    slabs: yup
      .array()
      .min(1, "Minimum 1 slab need to created with 0 to No-Limit.")
      .of(
        yup.object().shape({
          minRange: yup
            .string()
            .required()
            .test("typeError", "Specify valid number", (value: any) => {
              if (value !== ".") return true
              return false
            }),
          maxRange: yup
            .string()
            .nullable()
            .test("typeError", "Specify valid number", (value: any) => {
              if (value !== ".") return true
              return false
            })
            .test(
              "upToDecimalDigits",
              "Specify number upto 2 decimal digits.",
              (value) => {
                if (
                  (value &&
                    value.includes(".") &&
                    value.length - 1 - value.indexOf(".") <= 2) ||
                  !value ||
                  !value.includes(".")
                )
                  return true
                return false
              },
            )
            .test(
              "requiredCheck",
              "Maximum Range is required",
              (item: any, context: any) => {
                const lastIndex =
                  context.options.from[1].value.slabs.length - 1 || 0
                const itemIndex = parseInt(
                  context.path.split("[")[1].split("]")[0],
                  10,
                )
                if (lastIndex === itemIndex && !item) return true
                if (item) return true
                return false
              },
            )
            .test(
              "greaterThanMinRange",
              "Maximum Range is greater than Minimum Range",
              (item: any, context: any) => {
                const lastIndex = context.options.from[1].value.slabs.length - 1
                const itemIndex = parseInt(
                  context.path.split("[")[1].split("]")[0],
                  10,
                )
                const { minRange } =
                  context.options.from[1].value.slabs[itemIndex]

                if (item && +item > +minRange && lastIndex !== itemIndex)
                  return true
                if (lastIndex === itemIndex) return true
                return false
              },
            )
            .test(
              "lastSlabNoLimitRange",
              'Maximum Range should be empty as "No Limit"',
              (item: any, context: any) => {
                const lastIndex = context.options.from[1].value.slabs.length - 1
                const itemIndex = parseInt(
                  context.path.split("[")[1].split("]")[0],
                  10,
                )
                const { id } = context.options.from[1].value.slabs[itemIndex]
                if (
                  (item === null || item === undefined || item === "") &&
                  lastIndex === itemIndex
                )
                  return true
                if (lastIndex !== itemIndex) return true
                if (id && lastIndex === itemIndex) return true
                return false
              },
            ),
          approvalLevel: genValidation({
            type: "arrayWithSubObject",
            arrayObjectType: [
              {
                name: "level",
                type: "string",
                isRequired: true,
              },
              {
                name: "approvalLevel",
                type: "object",
                isRequired: true,
                isNullable: true,
              },
            ],
          }),
        }),
      ),
  }

  const additionaPriceCodeStep2OnAddSlabClickValidationSchema = yup
    .object()
    .shape({
      ...additionaPriceCodeStep2OnAddSlabClick,
    })

  return additionaPriceCodeStep2OnAddSlabClickValidationSchema
}

function validationCheckOnClickCreateButtonInEdit() {
  const additionaPriceCodeStep2OnAddSlabClick = {
    slabs: yup
      .array()
      .min(1, "Minimum 1 slab need to created with 0 to No-Limit.")
      .of(
        yup.object().shape({
          minRange: yup.string().required(),
          maxRange: yup.string().nullable(),
          approvalLevel: genValidation({
            type: "arrayWithSubObject",
            arrayObjectType: [
              {
                name: "level",
                type: "string",
                isRequired: true,
              },
              {
                name: "approvalLevel",
                type: "object",
                isRequired: true,
                isNullable: true,
              },
            ],
          }),
        }),
      ),
  }

  const additionaPriceCodeStep2OnAddSlabClickValidationSchema = yup
    .object()
    .shape({
      ...additionaPriceCodeStep2OnAddSlabClick,
    })

  return additionaPriceCodeStep2OnAddSlabClickValidationSchema
}

// eslint-disable-next-line import/prefer-default-export
export {
  validationCheckOnClickDefineAmsButton,
  validationCheckOnClickCreateButtonInAdd,
  validationCheckOnClickCreateButtonInEdit,
}
