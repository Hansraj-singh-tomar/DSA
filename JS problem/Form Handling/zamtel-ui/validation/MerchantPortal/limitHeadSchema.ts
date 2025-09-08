import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function limitHeadSchema() {
  const limitHeads = {
    // nameEn: genValidation({
    //   type: "string",
    //   isRequired: true,
    // }),

    nameEn: yup
      .string()
      .required()
      .test(
        "is-valid-ascii",
        "Only English letters, numbers, and special characters are allowed",
        (value) => {
          if (!value) return true // skip regex if value is empty to allow 'required' to handle it
          return /^[\x20-\x7E]+$/.test(value)
        },
      ),

    transactionLimitHeadHistory: genValidation({
      type: "multiSelectArrayOptions",
      minArraySize: 0,
    }),
    childLimitHeadHistory: yup.array().of(
      yup.object().shape({
        nameEn: genValidation({
          type: "string",
          isRequired: true,
        }),

        transactionLimitHeadHistory: yup
          .array()
          .min(1, "Minimum 1 option need to select")
          .test(
            "allOf",
            "Child Transactions doesn't belong to the selected Parent Transactions",
            (value: any, context: any) => {
              if (value) {
                for (let m = 0; m < value.length; m += 1) {
                  const filterParentTransactionLH =
                    context?.options?.from[1]?.value?.transactionLimitHeadHistory?.filter(
                      (parentTransactionLH: any) =>
                        parentTransactionLH.transactionCode ===
                        value[m].transactionCode,
                    )
                  if (
                    filterParentTransactionLH &&
                    filterParentTransactionLH.length === 0
                  ) {
                    return false
                  }
                  if (!filterParentTransactionLH) {
                    return false
                  }
                }
                return true
              }
              return false
            },
          ),
      }),
    ),
    // childLimitHead: genValidation({
    //   type: "arrayWithSubObject",
    //   arrayObjectType: [
    //     {
    //       name: "nameEn",
    //       type: "string",
    //       isRequired: true,
    //     },
    //     {
    //       name: "nameBn",
    //       type: "string",
    //       isRequired: true,
    //     },
    //     {
    //       name: "transactionLimitHead",
    //       type: "multiSelectArrayOptions",
    //       minArraySize: 1,
    //     },
    //   ],
    // }),
  }

  const validationSchema = yup.object().shape({
    ...limitHeads,
  })

  return validationSchema
}

export default limitHeadSchema
