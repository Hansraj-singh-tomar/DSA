import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function merchantCategorySchema(userCategory: string) {
  const merchantCategory = {
    merchantCategoryName: genValidation({
      type: "string",
      isRequired: true,
    }),
    tagMerchantType: genValidation({
      type: "multiSelectArrayOptions",
      minArraySize: 1,
    }),
    defaultMerchantType: yup.object().when("tagMerchantType", {
      is: (tagMerchantType: any[]) => {
        return tagMerchantType && tagMerchantType?.length > 0
      },
      then: yup
        .object()
        .required(
          userCategory === "distributor"
            ? "Default Distributor Type is required"
            : "Default Merchant Type is required",
        )
        .nullable()
        .test(
          "oneOf",
          "Default Merchant Type is belongs to one of the above selected Merchant Types",
          (value, context) => {
            for (let i = 0; i < context.parent.tagMerchantType.length; i += 1) {
              if (
                context.parent.tagMerchantType[i].merchantType ===
                value?.merchantType
              ) {
                return true
              }
            }
            return false
          },
        ),
      otherwise: genValidation({
        type: "object",
        isRequired: true,
        isNullable: true,
      }),
    }),
  }

  const validationSchema = yup.object().shape({
    ...merchantCategory,
  })
  return validationSchema
}

export function AddParameterInMerchantCategorySchema() {
  const parameter = {
    section: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    parameter: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
  }

  const validationSchema = yup.object().shape({
    ...parameter,
  })

  return validationSchema
}
export default merchantCategorySchema
