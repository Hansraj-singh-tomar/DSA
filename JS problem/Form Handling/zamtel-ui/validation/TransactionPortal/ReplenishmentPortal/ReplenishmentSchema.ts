import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"
import { AnyObject } from "yup/lib/types"
import {
  netOffCategoryName1,
  opexCategoryName1,
  tcsaReceivableCategoryName1,
} from "app/pages/ManagementPortal/TransactionPortal/Replenishment/constant"

function ReplenishmentSchema(formStage: string) {
  let validationSchema = yup.object().shape({})

  const saveOperationalTcsa = {
    tcsaTransit: genValidation({
      isRequired: true,
      type: "object",
      isNullable: true,
    }),
    tcsaSubControl: yup.object().when("replenishmentType", {
      is: (replenishmentType: string) => {
        return (
          replenishmentType === tcsaReceivableCategoryName1 ||
          replenishmentType === opexCategoryName1
        )
      },
      then: genValidation({
        isRequired: true,
        type: "object",
        isNullable: true,
      }),
      otherwise: genValidation({
        isRequired: false,
        type: "object",
        isNullable: true,
      }),
    }),
    backlogs: yup.array().when("isBackLog", {
      is: (isBackLog: boolean) => {
        return isBackLog
      },
      then: genValidation({
        type: "multiSelectArrayOptions",
        minArraySize: 1,
      }),
    }),
    tcsaBank: yup.string().when("replenishmentType", {
      is: (replenishmentType: string) => {
        return (
          replenishmentType === opexCategoryName1 ||
          replenishmentType === tcsaReceivableCategoryName1
        )
      },
      then: genValidation({
        isRequired: true,
        type: "string",
        isNullable: true,
      }),
      otherwise: genValidation({
        isRequired: false,
        type: "string",
        isNullable: true,
      }),
    }),
    opexSubControl: yup.object().when("replenishmentType", {
      is: (replenishmentType: string) => {
        return (
          replenishmentType === opexCategoryName1 ||
          replenishmentType === tcsaReceivableCategoryName1
        )
      },
      then: genValidation({
        isRequired: true,
        type: "object",
        isNullable: true,
      }),
      otherwise: genValidation({
        isRequired: false,
        type: "object",
        isNullable: true,
      }),
    }),
    tcsaBankAccount: yup.object().when("replenishmentType", {
      is: (replenishmentType: string) => {
        return (
          replenishmentType === opexCategoryName1 ||
          replenishmentType === tcsaReceivableCategoryName1
        )
      },
      then: genValidation({
        isRequired: true,
        type: "object",
        isNullable: true,
      }),
      otherwise: genValidation({
        isRequired: false,
        type: "object",
        isNullable: true,
      }),
    }),
    opexBank: yup.object().when("replenishmentType", {
      is: (replenishmentType: string) => {
        return replenishmentType === opexCategoryName1
      },
      then: genValidation({
        isRequired: true,
        type: "object",
        isNullable: true,
      }),
      otherwise: genValidation({
        isRequired: false,
        type: "object",
        isNullable: true,
      }),
    }),
    opexBankAccount: yup.object().when("replenishmentType", {
      is: (replenishmentType: string) => {
        return replenishmentType === opexCategoryName1
      },
      then: genValidation({
        isRequired: true,
        type: "object",
        isNullable: true,
      }),
      otherwise: genValidation({
        isRequired: false,
        type: "object",
        isNullable: true,
      }),
    }),
    amount: yup
      .string()
      .when(
        [
          "transitBalanceAmount",
          "amount",
          "replenishmentType",
          "walletBalance",
        ],
        {
          is: (
            transitBalanceAmount: any,
            amount: any,
            replenishmentType: any,
            walletBalance: AnyObject,
          ) => {
            return (
              ((replenishmentType === opexCategoryName1 ||
                replenishmentType === tcsaReceivableCategoryName1) &&
                // transitBalanceAmount &&
                Number(amount) > Number(transitBalanceAmount)) ||
              (replenishmentType === netOffCategoryName1 &&
                // transitBalanceAmount &&
                (Number(amount) > Number(transitBalanceAmount) ||
                  Number(walletBalance) < Number(amount))) ||
              !Number(amount)
            )
          },
          then: yup
            .string()
            .required()
            .test("typeError", "", (_value: any, context: any) => {
              if (!Number(context.parent.amount)) {
                return context.createError({
                  message: "Amount should not be Zero",
                  path: "amount",
                })
              }
              if (
                Number(context.parent.walletBalance) <
                Number(context.parent.amount)
              ) {
                return context.createError({
                  message: "Amount should be less than Wallet Balance",
                  path: "amount",
                })
              }

              return context.createError({
                message: "Insufficient Balance in TCSA Transit A/C",
                path: "amount",
              })
            }),
          otherwise: yup.string().required(),
        },
      ),
    supportingDoc: genValidation({
      type: "uploadedFile",
      isRequired: false,
      isNullable: true,
      label: "Document",
    }),
  }

  switch (formStage) {
    case "saveOperationalTcsa":
      validationSchema = yup.object().shape(
        {
          ...saveOperationalTcsa,
        },
        [["amount", "amount"]],
      )
      break
    default:
      validationSchema = yup.object().shape({})
      break
  }

  return validationSchema
}
export default ReplenishmentSchema
