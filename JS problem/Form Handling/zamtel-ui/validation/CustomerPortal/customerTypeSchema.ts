/* eslint-disable no-prototype-builtins */
import * as yup from "yup"
import "app/Yup.config"
import { IDefaultValueObject } from "app/models/form"
import { genValidation } from "app/utils/commonFunctions"

function customerTypeFormSchema(formStage: string) {
  let validationSchema = yup.object()

  const trustLevelSchema = {
    name: genValidation({
      type: "mixed",
      isNullable: true,
      isRequired: true,
    }),
    minBalance: yup
      .string()
      // .transform((value: number) => (Number.isNaN(value) ? undefined : value))
      .required()
      // .min(0)
      // .nullable()
      .test("typeError", "Specify valid number", (value: any) => {
        if (value !== ".") return true
        return false
      })
      .test(
        "upToDecimalDigits",
        "Specify number upto 2 decimal digits.",
        (newVal: any) => {
          if (
            (newVal &&
              newVal.includes(".") &&
              newVal.length - 1 - newVal.indexOf(".") <= 2 &&
              newVal.length - 1 - newVal.indexOf(".") > 0) ||
            !newVal ||
            !newVal.includes(".")
          )
            return true
          return false
        },
      ),
    maxBalance: yup.string().when(["isMaxBalanceApplicable"], {
      is: (isMaxBalanceApplicable: boolean) => !isMaxBalanceApplicable,
      then: (scheme) =>
        scheme
          .required()
          .test("typeError", "Specify valid number", (value: any) => {
            if (value !== ".") return true
            return false
          })
          .test(
            "upToDecimalDigits",
            "Specify number upto 2 decimal digits.",
            (newVal: any) => {
              if (
                (newVal &&
                  newVal.includes(".") &&
                  newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                  newVal.length - 1 - newVal.indexOf(".") > 0) ||
                !newVal ||
                !newVal.includes(".")
              )
                return true
              return false
            },
          )
          .test(
            "greaterThanMinRange",
            "Maximum Balance should be greater than Minimum Balance",
            (item: any, context: any) => {
              if (
                Number(context.parent.minBalance) >= Number(item) &&
                context.parent.isMaxBalanceApplicable !== true
              )
                return false
              return true
            },
          ),
    }),
  }

  const viamPesaValidation = {
    viamPesaMinAmountCustomerTypeAddMoney: yup.string().when(["viamPesa"], {
      is: (viamPesa: boolean) => {
        return viamPesa !== false
      },
      then: yup
        .string()
        .required()
        .test("typeError", "Specify valid number", (value: any) => {
          if (value !== ".") return true
          return false
        })
        .test(
          "upToDecimalDigits",
          "Specify number upto 2 decimal digits.",
          (newVal: any) => {
            if (
              (newVal &&
                newVal.includes(".") &&
                newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                newVal.length - 1 - newVal.indexOf(".") > 0) ||
              !newVal ||
              !newVal.includes(".")
            )
              return true
            return false
          },
        ),
    }),
    viamPesaMaxAmountCustomerTypeAddMoney: yup
      .string()
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (context.parent.viamPesa !== true) return true
          if (
            Number(context.parent.viamPesaMinAmountCustomerTypeAddMoney) >=
              Number(item) &&
            context.parent
              .viamPesaIsMaxAmountNotApplicableCustomerTypeAddMoney !== true
          )
            return false
          return true
        },
      )
      .when(
        ["viamPesaIsMaxAmountNotApplicableCustomerTypeAddMoney", "viamPesa"],
        {
          is: (
            viamPesaIsMaxAmountNotApplicableCustomerTypeAddMoney: boolean,
            viamPesa: boolean,
          ) =>
            viamPesaIsMaxAmountNotApplicableCustomerTypeAddMoney &&
            viamPesa !== false,
          then: yup
            .string()
            .required()
            .test("typeError", "Specify valid number", (value: any) => {
              if (value !== ".") return true
              return false
            })
            .test(
              "upToDecimalDigits",
              "Specify number upto 2 decimal digits.",
              (newVal: any) => {
                if (
                  (newVal &&
                    newVal.includes(".") &&
                    newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                    newVal.length - 1 - newVal.indexOf(".") > 0) ||
                  !newVal ||
                  !newVal.includes(".")
                )
                  return true
                return false
              },
            )
            .test(
              "greaterThanMinRange",
              "Maximum Balance should be greater than Minimum Balance",
              (item: any, context: any) => {
                if (context.parent.viamPesa !== true) return true
                if (
                  Number(
                    context.parent.viamPesaMinAmountCustomerTypeAddMoney,
                  ) >= Number(item) &&
                  context.parent
                    .viamPesaIsMaxAmountNotApplicableCustomerTypeAddMoney !==
                    true
                )
                  return false
                return true
              },
            ),
        },
      ),
  }

  const customerTypeStep1AddMoney = {
    ChannelviamPesa: yup.string().when(["viamPesa"], {
      is: (viamPesa: boolean) => viamPesa,
      then: (scheme) => scheme.required(),
    }),
    viamPesaMinAmountCustomerTypeAddMoney: yup.string().when(["viamPesa"], {
      is: (viamPesa: boolean) => {
        return viamPesa !== false
      },
      then: yup
        .string()
        .required()
        .test("typeError", "Specify valid number", (value: any) => {
          if (value !== ".") return true
          return false
        })
        .test(
          "upToDecimalDigits",
          "Specify number upto 2 decimal digits.",
          (newVal: any) => {
            if (
              (newVal &&
                newVal.includes(".") &&
                newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                newVal.length - 1 - newVal.indexOf(".") > 0) ||
              !newVal ||
              !newVal.includes(".")
            )
              return true
            return false
          },
        ),
    }),
    viamPesaMaxAmountCustomerTypeAddMoney: yup
      .string()
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (context.parent.viamPesa !== true) return true
          if (
            Number(context.parent.viamPesaMinAmountCustomerTypeAddMoney) >=
              Number(item) &&
            context.parent
              .viamPesaIsMaxAmountNotApplicableCustomerTypeAddMoney !== true
          )
            return false
          return true
        },
      )
      .when(
        ["viamPesaIsMaxAmountNotApplicableCustomerTypeAddMoney", "viamPesa"],
        {
          is: (
            viamPesaIsMaxAmountNotApplicableCustomerTypeAddMoney: boolean,
            viamPesa: boolean,
          ) =>
            viamPesaIsMaxAmountNotApplicableCustomerTypeAddMoney &&
            viamPesa !== false,
          then: yup
            .string()
            .required()
            .test("typeError", "Specify valid number", (value: any) => {
              if (value !== ".") return true
              return false
            })
            .test(
              "upToDecimalDigits",
              "Specify number upto 2 decimal digits.",
              (newVal: any) => {
                if (
                  (newVal &&
                    newVal.includes(".") &&
                    newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                    newVal.length - 1 - newVal.indexOf(".") > 0) ||
                  !newVal ||
                  !newVal.includes(".")
                )
                  return true
                return false
              },
            )
            .test(
              "greaterThanMinRange",
              "Maximum Balance should be greater than Minimum Balance",
              (item: any, context: any) => {
                if (context.parent.viamPesa !== true) return true
                if (
                  Number(
                    context.parent.viamPesaMinAmountCustomerTypeAddMoney,
                  ) >= Number(item) &&
                  context.parent
                    .viamPesaIsMaxAmountNotApplicableCustomerTypeAddMoney !==
                    true
                )
                  return false
                return true
              },
            ),
        },
      ),

    ChannelviaBank: yup.string().when(["viaBank"], {
      is: (viaBank: boolean) => viaBank,
      then: (scheme) => scheme.required(),
    }),
    viaBankMinAmountCustomerTypeAddMoney: yup.string().when(["viaBank"], {
      is: (viaBank: boolean) => {
        return viaBank !== false
      },
      then: yup
        .string()
        .required()
        .test("typeError", "Specify valid number", (value: any) => {
          if (value !== ".") return true
          return false
        })
        .test(
          "upToDecimalDigits",
          "Specify number upto 2 decimal digits.",
          (newVal: any) => {
            if (
              (newVal &&
                newVal.includes(".") &&
                newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                newVal.length - 1 - newVal.indexOf(".") > 0) ||
              !newVal ||
              !newVal.includes(".")
            )
              return true
            return false
          },
        ),
    }),
    viaBankMaxAmountCustomerTypeAddMoney: yup
      .string()
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (context.parent.viaBank !== true) return true
          if (
            Number(context.parent.viaBankMinAmountCustomerTypeAddMoney) >=
              Number(item) &&
            context.parent
              .viaBankIsMaxAmountNotApplicableCustomerTypeAddMoney !== true
          )
            return false
          return true
        },
      )
      .when(
        ["viaBankIsMaxAmountNotApplicableCustomerTypeAddMoney", "viaBank"],
        {
          is: (
            viaBankIsMaxAmountNotApplicableCustomerTypeAddMoney: boolean,
            viaBank: boolean,
          ) =>
            viaBankIsMaxAmountNotApplicableCustomerTypeAddMoney &&
            viaBank !== false,
          then: yup
            .string()
            .required()
            .test("typeError", "Specify valid number", (value: any) => {
              if (value !== ".") return true
              return false
            })
            .test(
              "upToDecimalDigits",
              "Specify number upto 2 decimal digits.",
              (newVal: any) => {
                if (
                  (newVal &&
                    newVal.includes(".") &&
                    newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                    newVal.length - 1 - newVal.indexOf(".") > 0) ||
                  !newVal ||
                  !newVal.includes(".")
                )
                  return true
                return false
              },
            )
            .test(
              "greaterThanMinRange",
              "Maximum Balance should be greater than Minimum Balance",
              (item: any, context: any) => {
                if (context.parent.viaBank !== true) return true
                if (
                  Number(context.parent.viaBankMinAmountCustomerTypeAddMoney) >=
                    Number(item) &&
                  context.parent
                    .viaBankIsMaxAmountNotApplicableCustomerTypeAddMoney !==
                    true
                )
                  return false
                return true
              },
            ),
        },
      ),

    ChannelviaSourceX: yup.string().when(["viaSourceX"], {
      is: (viaSourceX: boolean) => viaSourceX,
      then: (scheme) => scheme.required(),
    }),
    viaSourceXMinAmountCustomerTypeAddMoney: yup.string().when(["viaSourceX"], {
      is: (viaSourceX: boolean) => {
        return viaSourceX !== false
      },
      then: yup
        .string()
        .required()
        .test("typeError", "Specify valid number", (value: any) => {
          if (value !== ".") return true
          return false
        })
        .test(
          "upToDecimalDigits",
          "Specify number upto 2 decimal digits.",
          (newVal: any) => {
            if (
              (newVal &&
                newVal.includes(".") &&
                newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                newVal.length - 1 - newVal.indexOf(".") > 0) ||
              !newVal ||
              !newVal.includes(".")
            )
              return true
            return false
          },
        ),
    }),
    viaSourceXMaxAmountCustomerTypeAddMoney: yup
      .string()
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (context.parent.viaSourceX !== true) return true
          if (
            Number(context.parent.viaSourceXMinAmountCustomerTypeAddMoney) >=
              Number(item) &&
            context.parent
              .viaSourceXIsMaxAmountNotApplicableCustomerTypeAddMoney !== true
          )
            return false
          return true
        },
      )
      .when(
        [
          "viaSourceXIsMaxAmountNotApplicableCustomerTypeAddMoney",
          "viaSourceX",
        ],
        {
          is: (
            viaSourceXIsMaxAmountNotApplicableCustomerTypeAddMoney: boolean,
            viaSourceX: boolean,
          ) =>
            viaSourceXIsMaxAmountNotApplicableCustomerTypeAddMoney &&
            viaSourceX !== false,
          then: yup
            .string()
            .required()
            .test("typeError", "Specify valid number", (value: any) => {
              if (value !== ".") return true
              return false
            })
            .test(
              "upToDecimalDigits",
              "Specify number upto 2 decimal digits.",
              (newVal: any) => {
                if (
                  (newVal &&
                    newVal.includes(".") &&
                    newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                    newVal.length - 1 - newVal.indexOf(".") > 0) ||
                  !newVal ||
                  !newVal.includes(".")
                )
                  return true
                return false
              },
            )
            .test(
              "greaterThanMinRange",
              "Maximum Balance should be greater than Minimum Balance",
              (item: any, context: any) => {
                if (context.parent.viaSourceX !== true) return true
                if (
                  Number(
                    context.parent.viaSourceXMinAmountCustomerTypeAddMoney,
                  ) >= Number(item) &&
                  context.parent
                    .viaSourceXIsMaxAmountNotApplicableCustomerTypeAddMoney !==
                    true
                )
                  return false
                return true
              },
            ),
        },
      ),
  }

  const customerTypeStep1Settlement = {
    sendMoneyToBankMinAmount: yup.string().when(["sendMoneyToBank"], {
      is: (sendMoneyToBank: boolean) => {
        return sendMoneyToBank !== false
      },
      then: yup
        .string()
        .required()
        .test("typeError", "Specify valid number", (value: any) => {
          if (value !== ".") return true
          return false
        })
        .test(
          "upToDecimalDigits",
          "Specify number upto 2 decimal digits.",
          (newVal: any) => {
            if (
              (newVal &&
                newVal.includes(".") &&
                newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                newVal.length - 1 - newVal.indexOf(".") > 0) ||
              !newVal ||
              !newVal.includes(".")
            )
              return true
            return false
          },
        ),
    }),
    sendMoneyToBankMaxAmount: yup
      .string()
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (context.parent.sendMoneyToBank !== true) return true
          if (
            Number(context.parent.sendMoneyToBankMinAmount) >= Number(item) &&
            context.parent.sendMoneyToBankIsMaxAmountApplicable !== true
          )
            return false
          return true
        },
      )

      .when(["sendMoneyToBankIsMaxAmountApplicable", "sendMoneyToBank"], {
        is: (
          sendMoneyToBankIsMaxAmountApplicable: boolean,
          sendMoneyToBank: boolean,
        ) => !sendMoneyToBankIsMaxAmountApplicable && sendMoneyToBank !== false,
        then: yup
          .string()
          .required()
          .test("typeError", "Specify valid number", (value: any) => {
            if (value !== ".") return true
            return false
          })
          .test(
            "upToDecimalDigits",
            "Specify number upto 2 decimal digits.",
            (newVal: any) => {
              if (
                (newVal &&
                  newVal.includes(".") &&
                  newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                  newVal.length - 1 - newVal.indexOf(".") > 0) ||
                !newVal ||
                !newVal.includes(".")
              )
                return true
              return false
            },
          )
          .test(
            "greaterThanMinRange",
            "Maximum Balance should be greater than Minimum Balance",
            (item: any, context: any) => {
              if (context.parent.sendMoneyToBank !== true) return true
              if (
                Number(context.parent.sendMoneyToBankMinAmount) >=
                  Number(item) &&
                context.parent.sendMoneyToBankIsMaxAmountApplicable !== true
              )
                return false
              return true
            },
          ),
      }),
  }

  // eslint-disable-next-line default-case
  switch (formStage) {
    case "trustLevelSchema":
      validationSchema = yup.object().shape({
        trustLevel: yup.object().shape({
          ...trustLevelSchema,
        }),
      })
      break
    case "customerTypeStep1AddMoney":
      validationSchema = yup.object().shape({
        ...customerTypeStep1AddMoney,
      })
      break
    case "viamPesaValidation":
      validationSchema = yup.object().shape({
        ...viamPesaValidation,
      })
      break
    case "customerTypeStep1Transactions":
      validationSchema = yup.object().shape({
        // ...customerTypeStep1Transactions,
      })
      break
    case "customerTypeStep1Settlement":
      validationSchema = yup.object().shape({ ...customerTypeStep1Settlement })
      break
    // case "customerTypeLimitHeads":
    //   validationSchema = yup.object().shape({ ...customerTypeLimitHeads })
    // break
  }
  return validationSchema
}

export const step3LimitHeadsSchema = (limitHeadsData: IDefaultValueObject) => {
  let validationSchema = {}

  const parentValidation = limitHeadsData
    .map((item: any) => {
      return item.parentTransactions.map(
        (item1: { parentLimitHeadId: any }) => {
          return item1.parentLimitHeadId
        },
      )
    })
    .flat()

  const childValidation = limitHeadsData.map((item: any) => {
    return item.parentTransactions.map(
      (item1: {
        childTransactions: { childLimitHeadId: any }[]
        parentLimitHeadId: any
      }) => {
        const childIds = item1.childTransactions.map(
          (item2: { childLimitHeadId: any }) => item2.childLimitHeadId,
        )
        return childIds
      },
    )
  })

  const customerTypeLimitHeads = parentValidation.map((item: any) => {
    const validation = {
      [`${item}`]: yup
        .object()
        .shape({
          dailyCount: yup
            .number()
            .transform((value: number) =>
              Number.isNaN(value) ? undefined : value,
            )
            .when("dailyCountIsApplicable", {
              is: true,
              then: (scheme) => scheme.nullable(),
              otherwise: (scheme) => scheme.required(""),
              // scheme.when("weeklyCountIsApplicable", {
              //   is: true,
              //   then: (scheme1) => scheme1.nullable().required(""),
              //   otherwise: (scheme1) =>
              //     scheme1.when("weeklyCount", (weeklyCount, scheme2) =>
              //       scheme2.max(weeklyCount, "").nullable().required(""),
              //     ),
              // }),
            }),

          dailyAmount: yup
            .number()
            .transform((value: number) =>
              Number.isNaN(value) ? undefined : value,
            )
            .when("dailyAmountIsApplicable", {
              is: true,
              then: (scheme) => scheme.nullable(),
              otherwise: (scheme) => scheme.required(""),
              // scheme.when("weeklyAmountIsApplicable", {
              //   is: true,
              //   then: (scheme1) => scheme1.nullable().required(""),
              //   otherwise: (scheme1) =>
              //     scheme1.when("weeklyAmount", (weeklyAmount, scheme2) =>
              //       scheme2.max(weeklyAmount, "").nullable().required(""),
              //     ),
              // }),
            }),
          weeklyCount: yup
            .number()
            .transform((value: number) =>
              Number.isNaN(value) ? undefined : value,
            )
            .when("weeklyCountIsApplicable", {
              is: true,
              then: (scheme) => scheme.nullable(),
              // otherwise: (scheme) =>
              //   scheme.when("dailyCountIsApplicable", {
              //     is: true,
              //     then: (scheme1) => scheme1.nullable(),
              //     otherwise: (scheme1) =>
              //       scheme1.when("dailyCount", (dailyCount, scheme2) =>
              //         scheme2.min(dailyCount + 1, "").nullable(),
              //       ),
              //   }),
            }),

          weeklyAmount: yup
            .number()
            .transform((value: number) =>
              Number.isNaN(value) ? undefined : value,
            )
            .when("weeklyAmountIsApplicable", {
              is: true,
              then: (scheme) => scheme.nullable(),
              // otherwise: (scheme) =>
              //   scheme.when("dailyAmountIsApplicable", {
              //     is: true,
              //     then: (scheme1) => scheme1.nullable(),
              //     otherwise: (scheme1) =>
              //       scheme1.when("dailyAmount", (dailyAmount, scheme2) =>
              //         scheme2.min(dailyAmount + 1, "").nullable(),
              //       ),
              //   }),
            }),
          monthlyCount: yup
            .number()
            .transform((value: number) =>
              Number.isNaN(value) ? undefined : value,
            )
            .when("monthlyCountIsApplicable", {
              is: true,
              then: (scheme1) => scheme1.nullable(),
              // otherwise: (scheme) =>
              //   scheme.when("weeklyCountIsApplicable", {
              //     is: true,
              //     then: (scheme1) => scheme1.nullable(),
              //     otherwise: (scheme1) =>
              //       scheme1.when("weeklyCount", (weeklyCount, scheme2) =>
              //         scheme2.min(weeklyCount + 1, "").nullable(),
              //       ),
              //   }),
            }),
          monthlyAmount: yup
            .number()
            .transform((value: number) =>
              Number.isNaN(value) ? undefined : value,
            )
            .when("monthlyAmountIsApplicable", {
              is: true,
              then: (scheme1) => scheme1.nullable(),
              // otherwise: (scheme) =>
              //   scheme.when("weeklyAmountIsApplicable", {
              //     is: true,
              //     then: (scheme1) => scheme1.nullable(),
              //     otherwise: (scheme1) =>
              //       scheme1.when("weeklyAmount", (weeklyAmount, scheme2) =>
              //         scheme2.min(weeklyAmount + 1, "").nullable(),
              //       ),
              //   }),
            }),
        })
        .nullable()
        .default(null),
    }
    return validation
  })

  const ChildLimitsHeadValidation = childValidation
    .map((item: any[]) => {
      return item.map((item1) =>
        item1.map((item2: any) => {
          const validation = {
            [`${item2}`]: yup
              .object()
              .shape({
                dailyCount: yup
                  .number()
                  .transform((value: number) =>
                    Number.isNaN(value) ? undefined : value,
                  )
                  .when("dailyCountIsApplicable", {
                    is: true,
                    then: (scheme) => scheme.nullable(),
                    otherwise: (scheme) => scheme.required(""),
                    // scheme.when("weeklyCountIsApplicable", {
                    //   is: true,
                    //   then: (scheme1) => scheme1.nullable().required(""),
                    //   otherwise: (scheme1) =>
                    //     scheme1.when("weeklyCount", (weeklyCount, scheme2) =>
                    //       scheme2.max(weeklyCount, "").nullable().required(""),
                    //     ),
                    // }),
                  }),

                dailyAmount: yup
                  .number()
                  .transform((value: number) =>
                    Number.isNaN(value) ? undefined : value,
                  )
                  .when("dailyAmountIsApplicable", {
                    is: true,
                    then: (scheme) => scheme.nullable(),
                    otherwise: (scheme) => scheme.required(""),
                    // scheme.when("weeklyAmountIsApplicable", {
                    //   is: true,
                    //   then: (scheme1) => scheme1.nullable().required(""),
                    //   otherwise: (scheme1) =>
                    //     scheme1.when("weeklyAmount", (weeklyAmount, scheme2) =>
                    //       scheme2.max(weeklyAmount, "").nullable().required(""),
                    //     ),
                    // }),
                  }),
                weeklyCount: yup
                  .number()
                  .transform((value: number) =>
                    Number.isNaN(value) ? undefined : value,
                  )
                  .when("weeklyCountIsApplicable", {
                    is: true,
                    then: (scheme) => scheme.nullable(),
                    otherwise: (scheme) =>
                      scheme.when("dailyCountIsApplicable", {
                        is: true,
                        then: (scheme1) => scheme1.nullable().required(),
                        otherwise: (scheme1) =>
                          scheme1.when("dailyCount", (dailyCount, scheme2) =>
                            scheme2
                              .min(dailyCount + 1, "")
                              .nullable()
                              .required(""),
                          ),
                      }),
                  }),

                weeklyAmount: yup
                  .number()
                  .transform((value: number) =>
                    Number.isNaN(value) ? undefined : value,
                  )
                  .when("weeklyAmountIsApplicable", {
                    is: true,
                    then: (scheme) => scheme.nullable(),
                    otherwise: (scheme) =>
                      scheme.when("dailyAmountIsApplicable", {
                        is: true,
                        then: (scheme1) => scheme1.nullable().required(),
                        otherwise: (scheme1) =>
                          scheme1.when("dailyAmount", (dailyAmount, scheme2) =>
                            scheme2
                              .min(dailyAmount + 1, "")
                              .nullable()
                              .required(""),
                          ),
                      }),
                  }),
                monthlyCount: yup
                  .number()
                  .transform((value: number) =>
                    Number.isNaN(value) ? undefined : value,
                  )
                  .when("monthlyCountIsApplicable", {
                    is: true,
                    then: (scheme1) => scheme1.nullable(),
                    otherwise: (scheme) =>
                      scheme.when("weeklyCountIsApplicable", {
                        is: true,
                        then: (scheme1) => scheme1.nullable().required(),
                        otherwise: (scheme1) =>
                          scheme1.when("weeklyCount", (weeklyCount, scheme2) =>
                            scheme2
                              .min(weeklyCount + 1, "")
                              .nullable()
                              .required(""),
                          ),
                      }),
                  }),
                monthlyAmount: yup
                  .number()
                  .transform((value: number) =>
                    Number.isNaN(value) ? undefined : value,
                  )
                  .when("monthlyAmountIsApplicable", {
                    is: true,
                    then: (scheme1) => scheme1.nullable(),
                    otherwise: (scheme) =>
                      scheme.when("weeklyAmountIsApplicable", {
                        is: true,
                        then: (scheme1) => scheme1.nullable().required(),
                        otherwise: (scheme1) =>
                          scheme1.when(
                            "weeklyAmount",
                            (weeklyAmount, scheme2) =>
                              scheme2
                                .min(weeklyAmount + 1, "")
                                .nullable()
                                .required(""),
                          ),
                      }),
                  }),
              })
              .nullable()
              .default(null),
          }
          return validation
        }),
      )
    })
    .flat(2)

  let customerTypeLimitHeads1 = {}
  customerTypeLimitHeads.forEach((element: {}) => {
    customerTypeLimitHeads1 = { ...customerTypeLimitHeads1, ...element }
  })

  let ChildLimitsHeadValidation1 = {}
  ChildLimitsHeadValidation.forEach((element: {}) => {
    ChildLimitsHeadValidation1 = { ...ChildLimitsHeadValidation1, ...element }
  })

  validationSchema = {
    ...validationSchema,
    ...customerTypeLimitHeads1,
    ...ChildLimitsHeadValidation1,
  }

  return yup.object().shape({
    ...validationSchema,
  })
}

export const step2TransactionSchema = (
  transactionDetails: IDefaultValueObject,
) => {
  let validationSchema = {}

  // merchant
  if (transactionDetails?.merchant?.initiatedTransactionsList) {
    const merchantSchema = {
      ChannelMerchant: yup.string().when(["usePayBillCollapse"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),
      usePayBillMinAmount: yup.string().when(["usePayBillCollapse"], {
        is: true,
        then: yup
          .string()
          .required()
          .test("typeError", "Specify valid number", (value: any) => {
            if (value !== ".") return true
            return false
          })
          .test(
            "upToDecimalDigits",
            "Specify number upto 2 decimal digits.",
            (newVal: any) => {
              if (
                (newVal &&
                  newVal.includes(".") &&
                  newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                  newVal.length - 1 - newVal.indexOf(".") > 0) ||
                !newVal ||
                !newVal.includes(".")
              )
                return true
              return false
            },
          ),
      }),

      usePayBillMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent.usePayBillCollapse !== true) return true
            if (
              Number(context.parent.usePayBillMinAmount) >= Number(item) &&
              context.parent.usePayBillIsMaxAmountApplicable !== true
            )
              return false

            return true
          },
        )
        .when(["usePayBillIsMaxAmountApplicable", "usePayBillCollapse"], {
          is: (
            usePayBillIsMaxAmountApplicable: boolean,
            usePayBillCollapse: boolean,
          ) => !usePayBillIsMaxAmountApplicable && usePayBillCollapse === true,
          then: yup
            .string()
            .required()
            .test("typeError", "Specify valid number", (value: any) => {
              if (value !== ".") return true
              return false
            })
            .test(
              "upToDecimalDigits",
              "Specify number upto 2 decimal digits.",
              (newVal: any) => {
                if (
                  (newVal &&
                    newVal.includes(".") &&
                    newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                    newVal.length - 1 - newVal.indexOf(".") > 0) ||
                  !newVal ||
                  !newVal.includes(".")
                )
                  return true
                return false
              },
            )
            .test(
              "minBalance",
              "Maximum Balance should be greater than Minimum Balance",
              (item: any, context: any) => {
                if (context.parent.usePayBillCollapse !== true) return true
                if (
                  Number(context.parent.usePayBillMinAmount) >= Number(item) &&
                  context.parent.usePayBillIsMaxAmountApplicable !== true
                )
                  return false

                return true
              },
            ),
        }),
    }

    const merchantSchema2 = {
      ChannelMerchant1: yup.string().when(["useTillCollapse"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),

      useTillMinAmount: yup.string().when(["useTillCollapse"], {
        is: true,
        then: yup
          .string()
          .required()
          .test("typeError", "Specify valid number", (value: any) => {
            if (value !== ".") return true
            return false
          })
          .test(
            "upToDecimalDigits",
            "Specify number upto 2 decimal digits.",
            (newVal: any) => {
              if (
                (newVal &&
                  newVal.includes(".") &&
                  newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                  newVal.length - 1 - newVal.indexOf(".") > 0) ||
                !newVal ||
                !newVal.includes(".")
              )
                return true
              return false
            },
          ),
      }),
      useTillMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent.useTillCollapse !== true) return true
            if (
              Number(context.parent.useTillMinAmount) >= Number(item) &&
              context.parent.useTillIsMaxAmountApplicable !== true
            )
              return false

            return true
          },
        )
        .when(["useTillIsMaxAmountApplicable", "useTillCollapse"], {
          is: (
            useTillIsMaxAmountApplicable: boolean,
            useTillCollapse: boolean,
          ) => !useTillIsMaxAmountApplicable && useTillCollapse === true,
          then: yup
            .string()
            .required()
            .test("typeError", "Specify valid number", (value: any) => {
              if (value !== ".") return true
              return false
            })
            .test(
              "upToDecimalDigits",
              "Specify number upto 2 decimal digits.",
              (newVal: any) => {
                if (
                  (newVal &&
                    newVal.includes(".") &&
                    newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                    newVal.length - 1 - newVal.indexOf(".") > 0) ||
                  !newVal ||
                  !newVal.includes(".")
                )
                  return true
                return false
              },
            )
            .test(
              "minBalance",
              "Maximum Balance should be greater than Minimum Balance",
              (item: any, context: any) => {
                if (context.parent.useTillCollapse !== true) return true
                if (
                  Number(context.parent.useTillMinAmount) >= Number(item) &&
                  context.parent.useTillIsMaxAmountApplicable !== true
                )
                  return false

                return true
              },
            ),
        }),
    }

    validationSchema = {
      ...validationSchema,
      ...merchantSchema,
      ...merchantSchema2,
    }
  }

  // customer
  if (transactionDetails?.customer?.initiatedTransactionsList) {
    const customerSchema1 = {
      ChannelCustomer1: yup.string().when(["sendMoneyToMpesaCollapse"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),

      sendMoneyToMpesaMinAmount: yup
        .string()
        .when(["sendMoneyToMpesaCollapse"], {
          is: true,
          then: yup.string().required(),
        }),
      sendMoneyToMpesaMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent.sendMoneyToMpesaCollapse !== true) return true
            if (
              Number(context.parent.sendMoneyToMpesaMinAmount) >=
                Number(item) &&
              context.parent.sendMoneyToMpesaIsMaxAmountNotApplicable !== true
            )
              return false

            return true
          },
        )
        .when(
          [
            "sendMoneyToMpesaIsMaxAmountNotApplicable",
            "sendMoneyToMpesaCollapse",
          ],
          {
            is: (
              sendMoneyToMpesaIsMaxAmountNotApplicable: boolean,
              sendMoneyToMpesaCollapse: boolean,
            ) =>
              !sendMoneyToMpesaIsMaxAmountNotApplicable &&
              sendMoneyToMpesaCollapse === true,
            then: yup
              .string()
              .required()
              .test("typeError", "Specify valid number", (value: any) => {
                if (value !== ".") return true
                return false
              })
              .test(
                "upToDecimalDigits",
                "Specify number upto 2 decimal digits.",
                (newVal: any) => {
                  if (
                    (newVal &&
                      newVal.includes(".") &&
                      newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                      newVal.length - 1 - newVal.indexOf(".") > 0) ||
                    !newVal ||
                    !newVal.includes(".")
                  )
                    return true
                  return false
                },
              )
              .test(
                "minBalance",
                "Maximum Balance should be greater than Minimum Balance",
                (item: any, context: any) => {
                  if (context.parent.sendMoneyToMpesaCollapse !== true)
                    return true
                  if (
                    Number(context.parent.sendMoneyToMpesaMinAmount) >=
                      Number(item) &&
                    context.parent.sendMoneyToMpesaIsMaxAmountNotApplicable !==
                      true
                  )
                    return false

                  return true
                },
              ),
          },
        ),
    }

    const customerSchema2 = {
      ChannelCustomer2: yup.string().when(["sendMoneyToPaylessCollapse"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),

      sendMoneyToPaylessMinAmount: yup
        .string()
        .when(["sendMoneyToPaylessCollapse"], {
          is: true,
          then: yup.string().required(),
        }),
      sendMoneyToPaylessMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent.sendMoneyToPaylessCollapse !== true) return true
            if (
              Number(context.parent.sendMoneyToPaylessMinAmount) >=
                Number(item) &&
              context.parent.sendMoneyToPaylessIsMaxAmountNotApplicable !== true
            )
              return false

            return true
          },
        )
        .when(
          [
            "sendMoneyToPaylessIsMaxAmountNotApplicable",
            "sendMoneyToPaylessCollapse",
          ],
          {
            is: (
              sendMoneyToPaylessIsMaxAmountNotApplicable: boolean,
              sendMoneyToPaylessCollapse: boolean,
            ) =>
              !sendMoneyToPaylessIsMaxAmountNotApplicable &&
              sendMoneyToPaylessCollapse === true,
            then: yup
              .string()
              .required()
              .test("typeError", "Specify valid number", (value: any) => {
                if (value !== ".") return true
                return false
              })
              .test(
                "upToDecimalDigits",
                "Specify number upto 2 decimal digits.",
                (newVal: any) => {
                  if (
                    (newVal &&
                      newVal.includes(".") &&
                      newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                      newVal.length - 1 - newVal.indexOf(".") > 0) ||
                    !newVal ||
                    !newVal.includes(".")
                  )
                    return true
                  return false
                },
              )
              .test(
                "minBalance",
                "Maximum Balance should be greater than Minimum Balance",
                (item: any, context: any) => {
                  if (context.parent.sendMoneyToPaylessCollapse !== true)
                    return true
                  if (
                    Number(
                      context.parent
                        .customerTypeTransactionCustomerMinAmountIslamic2Islamic,
                    ) >= Number(item) &&
                    context.parent
                      .sendMoneyToPaylessIsMaxAmountNotApplicable !== true
                  )
                    return false

                  return true
                },
              ),
          },
        ),
    }

    const customerSchema3 = {
      ChannelCustomer3: yup.string().when(["transferToOthersPwCollapse"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),

      transferToOthersPwMinAmount: yup
        .string()
        .when(["transferToOthersPwCollapse"], {
          is: true,
          then: yup.string().required(),
        }),
      transferToOthersPwMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent.transferToOthersPwCollapse !== true) return true
            if (
              Number(context.parent.transferToOthersPwMinAmount) >=
                Number(item) &&
              context.parent.transferToOthersPwIsMaxAmountNotApplicable !== true
            )
              return false

            return true
          },
        )
        .when(
          [
            "transferToOthersPwIsMaxAmountNotApplicable",
            "transferToOthersPwCollapse",
          ],
          {
            is: (
              transferToOthersPwIsMaxAmountNotApplicable: boolean,
              transferToOthersPwCollapse: boolean,
            ) =>
              !transferToOthersPwIsMaxAmountNotApplicable &&
              transferToOthersPwCollapse === true,
            then: yup
              .string()
              .required()
              .test("typeError", "Specify valid number", (value: any) => {
                if (value !== ".") return true
                return false
              })
              .test(
                "upToDecimalDigits",
                "Specify number upto 2 decimal digits.",
                (newVal: any) => {
                  if (
                    (newVal &&
                      newVal.includes(".") &&
                      newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                      newVal.length - 1 - newVal.indexOf(".") > 0) ||
                    !newVal ||
                    !newVal.includes(".")
                  )
                    return true
                  return false
                },
              )
              .test(
                "minBalance",
                "Maximum Balance should be greater than Minimum Balance",
                (item: any, context: any) => {
                  if (context.parent.transferToOthersPwCollapse !== true)
                    return true
                  if (
                    Number(context.parent.transferToOthersPwMinAmount) >=
                      Number(item) &&
                    context.parent
                      .transferToOthersPwIsMaxAmountNotApplicable !== true
                  )
                    return false

                  return true
                },
              ),
          },
        ),
    }

    const customerSchema4 = {
      ChannelCustomer4: yup.string().when(["transferToOtherSwCollapse"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),

      transferToOtherSwMinAmount: yup
        .string()
        .when(["transferToOtherSwCollapse"], {
          is: true,
          then: yup.string().required(),
        }),
      transferToOtherSwMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent.transferToOtherSwCollapse !== true) return true
            if (
              Number(context.parent.transferToOtherSwMinAmount) >=
                Number(item) &&
              context.parent.transferToOtherSwIsMaxAmountNotApplicable !== true
            )
              return false

            return true
          },
        )
        .when(
          [
            "transferToOtherSwIsMaxAmountNotApplicable",
            "transferToOtherSwCollapse",
          ],
          {
            is: (
              transferToOtherSwIsMaxAmountNotApplicable: boolean,
              transferToOtherSwCollapse: boolean,
            ) =>
              !transferToOtherSwIsMaxAmountNotApplicable &&
              transferToOtherSwCollapse === true,
            then: yup
              .string()
              .required()
              .test("typeError", "Specify valid number", (value: any) => {
                if (value !== ".") return true
                return false
              })
              .test(
                "upToDecimalDigits",
                "Specify number upto 2 decimal digits.",
                (newVal: any) => {
                  if (
                    (newVal &&
                      newVal.includes(".") &&
                      newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                      newVal.length - 1 - newVal.indexOf(".") > 0) ||
                    !newVal ||
                    !newVal.includes(".")
                  )
                    return true
                  return false
                },
              )
              .test(
                "minBalance",
                "Maximum Balance should be greater than Minimum Balance",
                (item: any, context: any) => {
                  if (context.parent.transferToOtherSwCollapse !== true)
                    return true
                  if (
                    Number(context.parent.transferToOtherSwMinAmount) >=
                      Number(item) &&
                    context.parent.transferToOtherSwIsMaxAmountNotApplicable !==
                      true
                  )
                    return false

                  return true
                },
              ),
          },
        ),
    }

    const customerSchema5 = {
      ChannelCustomer5: yup.string().when(["transferToSelfPwCollapse"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),

      transferToSelfPwMinAmount: yup
        .string()
        .when(["transferToSelfPwCollapse"], {
          is: true,
          then: yup.string().required(),
        }),
      transferToSelfPwMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent.transferToSelfPwCollapse !== true) return true
            if (
              Number(context.parent.transferToSelfPwMinAmount) >=
                Number(item) &&
              context.parent.transferToSelfPwIsMaxAmountNotApplicable !== true
            )
              return false

            return true
          },
        )
        .when(
          [
            "transferToSelfPwIsMaxAmountNotApplicable",
            "transferToSelfPwCollapse",
          ],
          {
            is: (
              transferToSelfPwIsMaxAmountNotApplicable: boolean,
              transferToSelfPwCollapse: boolean,
            ) =>
              !transferToSelfPwIsMaxAmountNotApplicable &&
              transferToSelfPwCollapse === true,
            then: yup
              .string()
              .required()
              .test("typeError", "Specify valid number", (value: any) => {
                if (value !== ".") return true
                return false
              })
              .test(
                "upToDecimalDigits",
                "Specify number upto 2 decimal digits.",
                (newVal: any) => {
                  if (
                    (newVal &&
                      newVal.includes(".") &&
                      newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                      newVal.length - 1 - newVal.indexOf(".") > 0) ||
                    !newVal ||
                    !newVal.includes(".")
                  )
                    return true
                  return false
                },
              )
              .test(
                "minBalance",
                "Maximum Balance should be greater than Minimum Balance",
                (item: any, context: any) => {
                  if (context.parent.transferToSelfPwCollapse !== true)
                    return true
                  if (
                    Number(context.parent.transferToSelfPwMinAmount) >=
                      Number(item) &&
                    context.parent.transferToSelfPwIsMaxAmountNotApplicable !==
                      true
                  )
                    return false

                  return true
                },
              ),
          },
        ),
    }

    validationSchema = {
      ...validationSchema,
      ...customerSchema1,
      ...customerSchema2,
      ...customerSchema3,
      ...customerSchema4,
      ...customerSchema5,
    }
  }

  // nfs
  if (transactionDetails?.nfs?.initiatedTransactionsList) {
    const customerSchema1 = {
      ChannelCustomer1: yup.string().when(["sendMoneyToMpesaCollapse"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),

      sendMoneyToMpesaMinAmount: yup
        .string()
        .when(["sendMoneyToMpesaCollapse"], {
          is: true,
          then: yup.string().required(),
        }),
      sendMoneyToMpesaMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent.sendMoneyToMpesaCollapse !== true) return true
            if (
              Number(context.parent.sendMoneyToMpesaMinAmount) >=
                Number(item) &&
              context.parent.sendMoneyToMpesaIsMaxAmountNotApplicable !== true
            )
              return false

            return true
          },
        )
        .when(
          [
            "sendMoneyToMpesaIsMaxAmountNotApplicable",
            "sendMoneyToMpesaCollapse",
          ],
          {
            is: (
              sendMoneyToMpesaIsMaxAmountNotApplicable: boolean,
              sendMoneyToMpesaCollapse: boolean,
            ) =>
              !sendMoneyToMpesaIsMaxAmountNotApplicable &&
              sendMoneyToMpesaCollapse === true,
            then: yup
              .string()
              .required()
              .test("typeError", "Specify valid number", (value: any) => {
                if (value !== ".") return true
                return false
              })
              .test(
                "upToDecimalDigits",
                "Specify number upto 2 decimal digits.",
                (newVal: any) => {
                  if (
                    (newVal &&
                      newVal.includes(".") &&
                      newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                      newVal.length - 1 - newVal.indexOf(".") > 0) ||
                    !newVal ||
                    !newVal.includes(".")
                  )
                    return true
                  return false
                },
              )
              .test(
                "minBalance",
                "Maximum Balance should be greater than Minimum Balance",
                (item: any, context: any) => {
                  if (context.parent.sendMoneyToMpesaCollapse !== true)
                    return true
                  if (
                    Number(context.parent.sendMoneyToMpesaMinAmount) >=
                      Number(item) &&
                    context.parent.sendMoneyToMpesaIsMaxAmountNotApplicable !==
                      true
                  )
                    return false

                  return true
                },
              ),
          },
        ),
    }

    const customerSchema2 = {
      ChannelCustomer2: yup.string().when(["sendMoneyToPaylessCollapse"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),

      sendMoneyToPaylessMinAmount: yup
        .string()
        .when(["sendMoneyToPaylessCollapse"], {
          is: true,
          then: yup.string().required(),
        }),
      sendMoneyToPaylessMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent.sendMoneyToPaylessCollapse !== true) return true
            if (
              Number(context.parent.sendMoneyToPaylessMinAmount) >=
                Number(item) &&
              context.parent.sendMoneyToPaylessIsMaxAmountNotApplicable !== true
            )
              return false

            return true
          },
        )
        .when(
          [
            "sendMoneyToPaylessIsMaxAmountNotApplicable",
            "sendMoneyToPaylessCollapse",
          ],
          {
            is: (
              sendMoneyToPaylessIsMaxAmountNotApplicable: boolean,
              sendMoneyToPaylessCollapse: boolean,
            ) =>
              !sendMoneyToPaylessIsMaxAmountNotApplicable &&
              sendMoneyToPaylessCollapse === true,
            then: yup
              .string()
              .required()
              .test("typeError", "Specify valid number", (value: any) => {
                if (value !== ".") return true
                return false
              })
              .test(
                "upToDecimalDigits",
                "Specify number upto 2 decimal digits.",
                (newVal: any) => {
                  if (
                    (newVal &&
                      newVal.includes(".") &&
                      newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                      newVal.length - 1 - newVal.indexOf(".") > 0) ||
                    !newVal ||
                    !newVal.includes(".")
                  )
                    return true
                  return false
                },
              )
              .test(
                "minBalance",
                "Maximum Balance should be greater than Minimum Balance",
                (item: any, context: any) => {
                  if (context.parent.sendMoneyToPaylessCollapse !== true)
                    return true
                  if (
                    Number(
                      context.parent
                        .customerTypeTransactionCustomerMinAmountIslamic2Islamic,
                    ) >= Number(item) &&
                    context.parent
                      .sendMoneyToPaylessIsMaxAmountNotApplicable !== true
                  )
                    return false

                  return true
                },
              ),
          },
        ),
    }

    const customerSchema3 = {
      ChannelCustomer3: yup.string().when(["transferToOthersPwCollapse"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),

      transferToOthersPwMinAmount: yup
        .string()
        .when(["transferToOthersPwCollapse"], {
          is: true,
          then: yup.string().required(),
        }),
      transferToOthersPwMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent.transferToOthersPwCollapse !== true) return true
            if (
              Number(context.parent.transferToOthersPwMinAmount) >=
                Number(item) &&
              context.parent.transferToOthersPwIsMaxAmountNotApplicable !== true
            )
              return false

            return true
          },
        )
        .when(
          [
            "transferToOthersPwIsMaxAmountNotApplicable",
            "transferToOthersPwCollapse",
          ],
          {
            is: (
              transferToOthersPwIsMaxAmountNotApplicable: boolean,
              transferToOthersPwCollapse: boolean,
            ) =>
              !transferToOthersPwIsMaxAmountNotApplicable &&
              transferToOthersPwCollapse === true,
            then: yup
              .string()
              .required()
              .test("typeError", "Specify valid number", (value: any) => {
                if (value !== ".") return true
                return false
              })
              .test(
                "upToDecimalDigits",
                "Specify number upto 2 decimal digits.",
                (newVal: any) => {
                  if (
                    (newVal &&
                      newVal.includes(".") &&
                      newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                      newVal.length - 1 - newVal.indexOf(".") > 0) ||
                    !newVal ||
                    !newVal.includes(".")
                  )
                    return true
                  return false
                },
              )
              .test(
                "minBalance",
                "Maximum Balance should be greater than Minimum Balance",
                (item: any, context: any) => {
                  if (context.parent.transferToOthersPwCollapse !== true)
                    return true
                  if (
                    Number(context.parent.transferToOthersPwMinAmount) >=
                      Number(item) &&
                    context.parent
                      .transferToOthersPwIsMaxAmountNotApplicable !== true
                  )
                    return false

                  return true
                },
              ),
          },
        ),
    }

    const customerSchema4 = {
      ChannelCustomer4: yup.string().when(["transferToOtherSwCollapse"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),

      transferToOtherSwMinAmount: yup
        .string()
        .when(["transferToOtherSwCollapse"], {
          is: true,
          then: yup.string().required(),
        }),
      transferToOtherSwMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent.transferToOtherSwCollapse !== true) return true
            if (
              Number(context.parent.transferToOtherSwMinAmount) >=
                Number(item) &&
              context.parent.transferToOtherSwIsMaxAmountNotApplicable !== true
            )
              return false

            return true
          },
        )
        .when(
          [
            "transferToOtherSwIsMaxAmountNotApplicable",
            "transferToOtherSwCollapse",
          ],
          {
            is: (
              transferToOtherSwIsMaxAmountNotApplicable: boolean,
              transferToOtherSwCollapse: boolean,
            ) =>
              !transferToOtherSwIsMaxAmountNotApplicable &&
              transferToOtherSwCollapse === true,
            then: yup
              .string()
              .required()
              .test("typeError", "Specify valid number", (value: any) => {
                if (value !== ".") return true
                return false
              })
              .test(
                "upToDecimalDigits",
                "Specify number upto 2 decimal digits.",
                (newVal: any) => {
                  if (
                    (newVal &&
                      newVal.includes(".") &&
                      newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                      newVal.length - 1 - newVal.indexOf(".") > 0) ||
                    !newVal ||
                    !newVal.includes(".")
                  )
                    return true
                  return false
                },
              )
              .test(
                "minBalance",
                "Maximum Balance should be greater than Minimum Balance",
                (item: any, context: any) => {
                  if (context.parent.transferToOtherSwCollapse !== true)
                    return true
                  if (
                    Number(context.parent.transferToOtherSwMinAmount) >=
                      Number(item) &&
                    context.parent.transferToOtherSwIsMaxAmountNotApplicable !==
                      true
                  )
                    return false

                  return true
                },
              ),
          },
        ),
    }

    const customerSchema5 = {
      ChannelCustomer5: yup.string().when(["transferToSelfPwCollapse"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),

      transferToSelfPwMinAmount: yup
        .string()
        .when(["transferToSelfPwCollapse"], {
          is: true,
          then: yup.string().required(),
        }),
      transferToSelfPwMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent.transferToSelfPwCollapse !== true) return true
            if (
              Number(context.parent.transferToSelfPwMinAmount) >=
                Number(item) &&
              context.parent.transferToSelfPwIsMaxAmountNotApplicable !== true
            )
              return false

            return true
          },
        )
        .when(
          [
            "transferToSelfPwIsMaxAmountNotApplicable",
            "transferToSelfPwCollapse",
          ],
          {
            is: (
              transferToSelfPwIsMaxAmountNotApplicable: boolean,
              transferToSelfPwCollapse: boolean,
            ) =>
              !transferToSelfPwIsMaxAmountNotApplicable &&
              transferToSelfPwCollapse === true,
            then: yup
              .string()
              .required()
              .test("typeError", "Specify valid number", (value: any) => {
                if (value !== ".") return true
                return false
              })
              .test(
                "upToDecimalDigits",
                "Specify number upto 2 decimal digits.",
                (newVal: any) => {
                  if (
                    (newVal &&
                      newVal.includes(".") &&
                      newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                      newVal.length - 1 - newVal.indexOf(".") > 0) ||
                    !newVal ||
                    !newVal.includes(".")
                  )
                    return true
                  return false
                },
              )
              .test(
                "minBalance",
                "Maximum Balance should be greater than Minimum Balance",
                (item: any, context: any) => {
                  if (context.parent.transferToSelfPwCollapse !== true)
                    return true
                  if (
                    Number(context.parent.transferToSelfPwMinAmount) >=
                      Number(item) &&
                    context.parent.transferToSelfPwIsMaxAmountNotApplicable !==
                      true
                  )
                    return false

                  return true
                },
              ),
          },
        ),
    }

    validationSchema = {
      ...validationSchema,
      ...customerSchema1,
      ...customerSchema2,
      ...customerSchema3,
      ...customerSchema4,
      ...customerSchema5,
    }
  }

  return yup.object().shape({
    ...validationSchema,
  })
}

export const otherFunctionalitySchema = () => {
  let validationSchema = yup.object()
  const step3OtherFunctionalitySchema = {
    mPesaBillerMinAmountAPP: yup
      .string()
      .when(["Customer to Biller (M-Pesa) via App - Off Net"], {
        is: true,
        then: (scheme) =>
          scheme
            .required()
            .test("typeError", "Specify valid number", (value: any) => {
              if (value !== ".") return true
              return false
            })
            .test(
              "upToDecimalDigits",
              "Specify number upto 2 decimal digits.",
              (newVal: any) => {
                if (
                  (newVal &&
                    newVal.includes(".") &&
                    newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                    newVal.length - 1 - newVal.indexOf(".") > 0) ||
                  !newVal ||
                  !newVal.includes(".")
                )
                  return true
                return false
              },
            ),
      }),
    mPesaBillerMaxAmountAPP: yup
      .string()
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (
            context.parent["Customer to Biller (M-Pesa) via App - Off Net"] !==
            true
          )
            return true
          if (
            Number(context.parent.mPesaBillerMinAmountAPP) >= Number(item) &&
            context.parent.mPesaBillerIsMaxAmountApplicableAPP !== true
          )
            return false
          return true
        },
      )
      .test("typeError", "Specify valid number", (value: any) => {
        if (value !== ".") return true
        return false
      })
      .test(
        "upToDecimalDigits",
        "Specify number upto 2 decimal digits.",
        (newVal: any) => {
          if (
            (newVal &&
              newVal.includes(".") &&
              newVal.length - 1 - newVal.indexOf(".") <= 2 &&
              newVal.length - 1 - newVal.indexOf(".") > 0) ||
            !newVal ||
            !newVal.includes(".")
          )
            return true
          return false
        },
      ),

    jamboPayBillerMinAmountAPP: yup
      .string()
      .when(["Customer to Biller (JamboPay) via App - Off Net"], {
        is: true,
        then: (scheme) =>
          scheme
            .required()
            .test("typeError", "Specify valid number", (value: any) => {
              if (value !== ".") return true
              return false
            })
            .test(
              "upToDecimalDigits",
              "Specify number upto 2 decimal digits.",
              (newVal: any) => {
                if (
                  (newVal &&
                    newVal.includes(".") &&
                    newVal.length - 1 - newVal.indexOf(".") <= 2 &&
                    newVal.length - 1 - newVal.indexOf(".") > 0) ||
                  !newVal ||
                  !newVal.includes(".")
                )
                  return true
                return false
              },
            ),
      }),
    jamboPayBillerMaxAmountAPP: yup
      .string()
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (
            context.parent[
              "Customer to Biller (JamboPay) via App - Off Net"
            ] !== true
          )
            return true
          if (
            Number(context.parent.jamboPayBillerMinAmountAPP) >= Number(item) &&
            context.parent.jamboPayBillerIsMaxAmountApplicableAPP !== true
          )
            return false
          return true
        },
      )
      .test("typeError", "Specify valid number", (value: any) => {
        if (value !== ".") return true
        return false
      })
      .test(
        "upToDecimalDigits",
        "Specify number upto 2 decimal digits.",
        (newVal: any) => {
          if (
            (newVal &&
              newVal.includes(".") &&
              newVal.length - 1 - newVal.indexOf(".") <= 2 &&
              newVal.length - 1 - newVal.indexOf(".") > 0) ||
            !newVal ||
            !newVal.includes(".")
          )
            return true
          return false
        },
      ),
  }

  validationSchema = yup.object().shape({
    ...step3OtherFunctionalitySchema,
  })
  return validationSchema
}

export const advanceSearchSchema = () => {
  return yup.object().shape({
    msisdn: yup.string().nullable(),
    walletCode: yup.string().nullable(),
    kycSerialNo: yup.string().nullable(),
    idNumber: yup.string().nullable(),
    startDateReg: yup.string().nullable(),
    endDateReg: yup.string().nullable(),
    registrationFrom: yup.date().nullable(),
    registrationTo: yup.date().nullable(),
    customerName: yup.string().nullable(),
    customerType: yup.string().nullable(),
    customerOrganizationName: yup.string().nullable(),
    dateOfbirth: yup.string().nullable(),
  })
}

export default customerTypeFormSchema
