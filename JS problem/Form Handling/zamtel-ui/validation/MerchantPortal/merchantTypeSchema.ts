/* eslint-disable no-prototype-builtins */
import * as yup from "yup"
import "app/Yup.config"
import { IDefaultValueObject } from "app/models/form"
// import { genValidation } from "app/utils/commonFunctions"

function MerchantTypeFormSchema(formStage: string) {
  let validationSchema = yup.object()

  const trustLevelSchema = {
    name: yup.string().required().nullable(),
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
    ChannelmPesa: yup.string().when(["viamPesa"], {
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

    // ChannelPw: yup.string().when(["viaPw"], {
    //   is: (viaPw: boolean) => viaPw,
    //   then: (scheme) => scheme.required(),
    // }),
    // viaPwMinAmountCustomerTypeAddMoney: yup.string().when(["viaPw"], {
    //   is: (viaPw: boolean) => {
    //     return viaPw !== false
    //   },
    //   then: yup
    //     .string()
    //     .required()
    //     .test("typeError", "Specify valid number", (value: any) => {
    //       if (value !== ".") return true
    //       return false
    //     })
    //     .test(
    //       "upToDecimalDigits",
    //       "Specify number upto 2 decimal digits.",
    //       (newVal: any) => {
    //         if (
    //           (newVal &&
    //             newVal.includes(".") &&
    //             newVal.length - 1 - newVal.indexOf(".") <= 2 &&
    //             newVal.length - 1 - newVal.indexOf(".") > 0) ||
    //           !newVal ||
    //           !newVal.includes(".")
    //         )
    //           return true
    //         return false
    //       },
    //     ),
    // }),
    // viaPwMaxAmountCustomerTypeAddMoney: yup
    //   .string()
    //   .test(
    //     "greaterThanMinRange",
    //     "Maximum Balance should be greater than Minimum Balance",
    //     (item: any, context: any) => {
    //       if (context.parent.viaPw !== true) return true
    //       if (
    //         Number(context.parent.viaPwMinAmountCustomerTypeAddMoney) >=
    //           Number(item) &&
    //         context.parent.viaPwIsMaxAmountNotApplicableCustomerTypeAddMoney !==
    //           true
    //       )
    //         return false
    //       return true
    //     },
    //   )
    //   .when(["viaPwIsMaxAmountNotApplicableCustomerTypeAddMoney", "viaPw"], {
    //     is: (
    //       viaPwIsMaxAmountNotApplicableCustomerTypeAddMoney: boolean,
    //       viaPw: boolean,
    //     ) =>
    //       viaPwIsMaxAmountNotApplicableCustomerTypeAddMoney && viaPw !== false,
    //     then: yup
    //       .string()
    //       .required()
    //       .test("typeError", "Specify valid number", (value: any) => {
    //         if (value !== ".") return true
    //         return false
    //       })
    //       .test(
    //         "upToDecimalDigits",
    //         "Specify number upto 2 decimal digits.",
    //         (newVal: any) => {
    //           if (
    //             (newVal &&
    //               newVal.includes(".") &&
    //               newVal.length - 1 - newVal.indexOf(".") <= 2 &&
    //               newVal.length - 1 - newVal.indexOf(".") > 0) ||
    //             !newVal ||
    //             !newVal.includes(".")
    //           )
    //             return true
    //           return false
    //         },
    //       )
    //       .test(
    //         "greaterThanMinRange",
    //         "Maximum Balance should be greater than Minimum Balance",
    //         (item: any, context: any) => {
    //           if (context.parent.viaPw !== true) return true
    //           if (
    //             Number(context.parent.viaPwMinAmountCustomerTypeAddMoney) >=
    //               Number(item) &&
    //             context.parent
    //               .viaPwIsMaxAmountNotApplicableCustomerTypeAddMoney !== true
    //           )
    //             return false
    //           return true
    //         },
    //       ),
    //   }),
  }

  const customerTypeStep1Settlement = {
    BankmanualSettlementFeeMinAmounttoBank: yup
      .string()
      .when(["BankmanualSettlementFieldstoBank"], {
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
          )
          .test(
            "upToDecimalDigits",
            "Specify number should less than 9999999999.99",
            (newVal: any) => {
              if (newVal && Number(newVal) <= 9999999999.99) return true
              return false
            },
          ),
      }),
    BankmanualExcludingBalancetoBank: yup
      .string()
      .when(["BankmanualSettlementFieldstoBank"], {
        is: true,
        then: yup.string().required(),
      }),

    BankautoSettlementFeeMinAmounttoBank: yup
      .string()
      .when(["BankautoSettlementFieldstoBank"], {
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
          )
          .test(
            "upToDecimalDigits",
            "Specify number should less than 9999999999.99",
            (newVal: any) => {
              if (newVal && Number(newVal) <= 9999999999.99) return true
              return false
            },
          ),
      }),
    BankautoExcludingBalancetoBank: yup
      .string()
      .when(["BankautoSettlementFieldstoBank"], {
        is: true,
        then: yup.string().required(),
      }),

    BanksettlementPolicytoBank: yup
      .string()
      .when(["BankautoSettlementFieldstoBank"], {
        is: true,
        then: (scheme) => scheme.required(),
      })
      .nullable(),

    BankmerchantTypeSettlementPolicyDailyHourstoBank: yup
      .string()
      .when(["BankautoSettlementFieldstoBank", "BanksettlementPolicytoBank"], {
        is: (
          BankautoSettlementFieldstoBank: boolean,
          BanksettlementPolicytoBank: string,
        ) =>
          BankautoSettlementFieldstoBank &&
          BanksettlementPolicytoBank === "Daily",
        then: (scheme) => scheme.required(),
      })
      .nullable(),

    BanksettlementPolicyMonthlyDaytoBank: yup
      .string()
      .when(["BankautoSettlementFieldstoBank", "BanksettlementPolicytoBank"], {
        is: (
          BankautoSettlementFieldstoBank: boolean,
          BanksettlementPolicytoBank: string,
        ) =>
          BankautoSettlementFieldstoBank &&
          BanksettlementPolicytoBank === "Monthly",
        then: (scheme) => scheme.required(),
      })
      .nullable(),

    BanksettlementPolicyMonthlyHourstoBank: yup
      .string()
      .when(["BankautoSettlementFieldstoBank", "BanksettlementPolicytoBank"], {
        is: (
          BankautoSettlementFieldstoBank: boolean,
          BanksettlementPolicytoBank: string,
        ) =>
          BankautoSettlementFieldstoBank &&
          BanksettlementPolicytoBank === "Monthly",
        then: (scheme) => scheme.required(),
      })
      .nullable(),

    BanksettlementPolicyWeeklyDaytoBank: yup
      .string()
      .when(["BankautoSettlementFieldstoBank", "BanksettlementPolicytoBank"], {
        is: (
          BankautoSettlementFieldstoBank: boolean,
          BanksettlementPolicytoBank: string,
        ) =>
          BankautoSettlementFieldstoBank &&
          BanksettlementPolicytoBank === "Weekly",
        then: (scheme) => scheme.required(),
      })
      .nullable(),
    BanksettlementPolicyWeeklyHourstoBank: yup
      .string()
      .when(["BankautoSettlementFieldstoBank", "BanksettlementPolicytoBank"], {
        is: (
          BankautoSettlementFieldstoBank: boolean,
          BanksettlementPolicytoBank: string,
        ) =>
          BankautoSettlementFieldstoBank &&
          BanksettlementPolicytoBank === "Weekly",
        then: (scheme) => scheme.required(),
      })
      .nullable(),

    sendMoneyToBank: yup.boolean(),
    BankautoSettlementFieldstoBank: yup
      .boolean()
      .when(["sendMoneyToBank", "BankmanualSettlementFieldstoBank"], {
        is: (sendMoneyToBank: boolean, manualSettlementFields2: boolean) =>
          sendMoneyToBank && !manualSettlementFields2,
        then: (instance) => {
          return instance.isTrue(
            "Auto Settlement / Manual Settlement should be enabled",
          )
        },
      }),
    BankmanualSettlementFieldstoBank: yup
      .boolean()
      .when(["sendMoneyToBank", "BankautoSettlementFieldstoBank"], {
        is: (sendMoneyToBank: boolean, autoSettlementFields2: boolean) =>
          sendMoneyToBank && !autoSettlementFields2,
        then: (instance) => {
          return instance.isTrue(
            "Auto Settlement / Manual Settlement should be enabled",
          )
        },
      }),

    MpesamanualSettlementFeeMinAmounttoMpesa: yup
      .string()
      .when(["MpesamanualSettlementFieldstoMpesa"], {
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
          )
          .test(
            "upToDecimalDigits",
            "Specify number should less than 9999999999.99",
            (newVal: any) => {
              if (newVal && Number(newVal) <= 9999999999.99) return true
              return false
            },
          ),
      }),
    MpesamanualExcludingBalancetoMpesa: yup
      .string()
      .when(["MpesamanualSettlementFieldstoMpesa"], {
        is: true,
        then: yup.string().required(),
      }),

    MpesaautoSettlementFeeMinAmounttoMpesa: yup
      .string()
      .when(["MpesaautoSettlementFieldstoMpesa"], {
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
          )
          .test(
            "upToDecimalDigits",
            "Specify number should less than 9999999999.99",
            (newVal: any) => {
              if (newVal && Number(newVal) <= 9999999999.99) return true
              return false
            },
          ),
      }),
    MpesaautoExcludingBalancetoMpesa: yup
      .string()
      .when(["MpesaautoSettlementFieldstoMpesa"], {
        is: true,
        then: yup.string().required(),
      }),

    MpesasettlementPolicytoMpesa: yup
      .string()
      .when(["MpesaautoSettlementFieldstoMpesa"], {
        is: true,
        then: (scheme) => scheme.required(),
      })
      .nullable(),

    MpesamerchantTypeSettlementPolicyDailyHourstoMpesa: yup
      .string()
      .when(
        ["MpesaautoSettlementFieldstoMpesa", "MpesasettlementPolicytoMpesa"],
        {
          is: (
            MpesaautoSettlementFieldstoMpesa: boolean,
            MpesasettlementPolicytoMpesa: string,
          ) =>
            MpesaautoSettlementFieldstoMpesa &&
            MpesasettlementPolicytoMpesa === "Daily",
          then: (scheme) => scheme.required(),
        },
      )
      .nullable(),

    MpesasettlementPolicyMonthlyDaytoMpesa: yup
      .string()
      .when(
        ["MpesaautoSettlementFieldstoMpesa", "MpesasettlementPolicytoMpesa"],
        {
          is: (
            MpesaautoSettlementFieldstoMpesa: boolean,
            MpesasettlementPolicytoMpesa: string,
          ) =>
            MpesaautoSettlementFieldstoMpesa &&
            MpesasettlementPolicytoMpesa === "Monthly",
          then: (scheme) => scheme.required(),
        },
      )
      .nullable(),

    MpesasettlementPolicyMonthlyHourstoMpesa: yup
      .string()
      .when(
        ["MpesaautoSettlementFieldstoMpesa", "MpesasettlementPolicytoMpesa"],
        {
          is: (
            MpesaautoSettlementFieldstoMpesa: boolean,
            MpesasettlementPolicytoMpesa: string,
          ) =>
            MpesaautoSettlementFieldstoMpesa &&
            MpesasettlementPolicytoMpesa === "Monthly",
          then: (scheme) => scheme.required(),
        },
      )
      .nullable(),

    MpesasettlementPolicyWeeklyDaytoMpesa: yup
      .string()
      .when(
        ["MpesaautoSettlementFieldstoMpesa", "MpesasettlementPolicytoMpesa"],
        {
          is: (
            MpesaautoSettlementFieldstoMpesa: boolean,
            MpesasettlementPolicytoMpesa: string,
          ) =>
            MpesaautoSettlementFieldstoMpesa &&
            MpesasettlementPolicytoMpesa === "Weekly",
          then: (scheme) => scheme.required(),
        },
      )
      .nullable(),
    MpesasettlementPolicyWeeklyHourstoMpesa: yup
      .string()
      .when(
        ["MpesaautoSettlementFieldstoMpesa", "MpesasettlementPolicytoMpesa"],
        {
          is: (
            MpesaautoSettlementFieldstoMpesa: boolean,
            MpesasettlementPolicytoMpesa: string,
          ) =>
            MpesaautoSettlementFieldstoMpesa &&
            MpesasettlementPolicytoMpesa === "Weekly",
          then: (scheme) => scheme.required(),
        },
      )
      .nullable(),

    sendMpesaCustomer: yup.boolean(),
    MpesaautoSettlementFieldstoMpesa: yup
      .boolean()
      .when(["sendMpesaCustomer", "MpesamanualSettlementFieldstoMpesa"], {
        is: (sendMpesaCustomer: boolean, manualSettlementFields2: boolean) =>
          sendMpesaCustomer && !manualSettlementFields2,
        then: (instance) => {
          return instance.isTrue(
            "Auto Settlement / Manual Settlement should be enabled",
          )
        },
      }),
    MpesamanualSettlementFieldstoMpesa: yup
      .boolean()
      .when(["sendMpesaCustomer", "MpesaautoSettlementFieldstoMpesa"], {
        is: (sendMpesaCustomer: boolean, autoSettlementFields2: boolean) =>
          sendMpesaCustomer && !autoSettlementFields2,
        then: (instance) => {
          return instance.isTrue(
            "Auto Settlement / Manual Settlement should be enabled",
          )
        },
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
      validationSchema = yup
        .object()
        .shape({ ...customerTypeStep1Settlement }, [
          [
            "BankmanualSettlementFieldstoBank",
            "BankautoSettlementFieldstoBank",
          ],
          [
            "MpesamanualSettlementFieldstoMpesa",
            "MpesaautoSettlementFieldstoMpesa",
          ],
        ])
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
              otherwise: (scheme) => scheme.required(""),
              // scheme.when("dailyCountIsApplicable", {
              //   is: true,
              //   then: (scheme1) => scheme1.nullable().required(),
              //   otherwise: (scheme1) =>
              //     scheme1.when("dailyCount", (dailyCount, scheme2) =>
              //       scheme2
              //         .min(dailyCount + 1, "")
              //         .nullable()
              //         .required(""),
              //     ),
              // }),
            }),

          weeklyAmount: yup
            .number()
            .transform((value: number) =>
              Number.isNaN(value) ? undefined : value,
            )
            .when("weeklyAmountIsApplicable", {
              is: true,
              then: (scheme) => scheme.nullable(),
              otherwise: (scheme) => scheme.required(""),
              // scheme.when("dailyAmountIsApplicable", {
              //   is: true,
              //   then: (scheme1) => scheme1.nullable().required(),
              //   otherwise: (scheme1) =>
              //     scheme1.when("dailyAmount", (dailyAmount, scheme2) =>
              //       scheme2
              //         .min(dailyAmount + 1, "")
              //         .nullable()
              //         .required(""),
              //     ),
              // }),
            }),
          monthlyCount: yup
            .number()
            .transform((value: number) =>
              Number.isNaN(value) ? undefined : value,
            )
            .when("monthlyCountIsApplicable", {
              is: true,
              then: (scheme1) => scheme1.nullable(),
              otherwise: (scheme) => scheme.required(""),
              // scheme.when("weeklyCountIsApplicable", {
              //   is: true,
              //   then: (scheme1) => scheme1.nullable().required(),
              //   otherwise: (scheme1) =>
              //     scheme1.when("weeklyCount", (weeklyCount, scheme2) =>
              //       scheme2
              //         .min(weeklyCount + 1, "")
              //         .nullable()
              //         .required(""),
              //     ),
              // }),
            }),
          monthlyAmount: yup
            .number()
            .transform((value: number) =>
              Number.isNaN(value) ? undefined : value,
            )
            .when("monthlyAmountIsApplicable", {
              is: true,
              then: (scheme1) => scheme1.nullable(),
              otherwise: (scheme) => scheme.required(""),
              // scheme.when("weeklyAmountIsApplicable", {
              //   is: true,
              //   then: (scheme1) => scheme1.nullable().required(),
              //   otherwise: (scheme1) =>
              //     scheme1.when("weeklyAmount", (weeklyAmount, scheme2) =>
              //       scheme2
              //         .min(weeklyAmount + 1, "")
              //         .nullable()
              //         .required(""),
              //     ),
              // }),
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
                    otherwise: (scheme) => scheme.required(""),
                    // scheme.when("dailyCountIsApplicable", {
                    //   is: true,
                    //   then: (scheme1) => scheme1.nullable().required(),
                    //   otherwise: (scheme1) =>
                    //     scheme1.when("dailyCount", (dailyCount, scheme2) =>
                    //       scheme2
                    //         .min(dailyCount + 1, "")
                    //         .nullable()
                    //         .required(""),
                    //     ),
                    // }),
                  }),

                weeklyAmount: yup
                  .number()
                  .transform((value: number) =>
                    Number.isNaN(value) ? undefined : value,
                  )
                  .when("weeklyAmountIsApplicable", {
                    is: true,
                    then: (scheme) => scheme.nullable(),
                    otherwise: (scheme) => scheme.required(""),
                    // scheme.when("dailyAmountIsApplicable", {
                    //   is: true,
                    //   then: (scheme1) => scheme1.nullable().required(),
                    //   otherwise: (scheme1) =>
                    //     scheme1.when("dailyAmount", (dailyAmount, scheme2) =>
                    //       scheme2
                    //         .min(dailyAmount + 1, "")
                    //         .nullable()
                    //         .required(""),
                    //     ),
                    // }),
                  }),
                monthlyCount: yup
                  .number()
                  .transform((value: number) =>
                    Number.isNaN(value) ? undefined : value,
                  )
                  .when("monthlyCountIsApplicable", {
                    is: true,
                    then: (scheme1) => scheme1.nullable(),
                    otherwise: (scheme) => scheme.required(""),
                    // scheme.when("weeklyCountIsApplicable", {
                    //   is: true,
                    //   then: (scheme1) => scheme1.nullable().required(),
                    //   otherwise: (scheme1) =>
                    //     scheme1.when("weeklyCount", (weeklyCount, scheme2) =>
                    //       scheme2
                    //         .min(weeklyCount + 1, "")
                    //         .nullable()
                    //         .required(""),
                    //     ),
                    // }),
                  }),
                monthlyAmount: yup
                  .number()
                  .transform((value: number) =>
                    Number.isNaN(value) ? undefined : value,
                  )
                  .when("monthlyAmountIsApplicable", {
                    is: true,
                    then: (scheme1) => scheme1.nullable(),
                    otherwise: (scheme) => scheme.required(""),
                    // scheme.when("weeklyAmountIsApplicable", {
                    //   is: true,
                    //   then: (scheme1) => scheme1.nullable().required(),
                    //   otherwise: (scheme1) =>
                    //     scheme1.when(
                    //       "weeklyAmount",
                    //       (weeklyAmount, scheme2) =>
                    //         scheme2
                    //           .min(weeklyAmount + 1, "")
                    //           .nullable()
                    //           .required(""),
                    //     ),
                    // }),
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
  const validationSchema = {}

  // // merchant
  // if (transactionDetails?.merchant?.initiatedTransactionsList) {
  //   const merchantSchema = {
  //     ChannelM2M: yup.string().when(["m2mCollapse"], {
  //       is: true,
  //       then: (scheme) => scheme.required(),
  //     }),
  //     m2mMinAmount: yup.string().when(["m2mCollapse"], {
  //       is: true,
  //       then: yup
  //         .string()
  //         .required()
  //         .test("typeError", "Specify valid number", (value: any) => {
  //           if (value !== ".") return true
  //           return false
  //         })
  //         .test(
  //           "upToDecimalDigits",
  //           "Specify number upto 2 decimal digits.",
  //           (newVal: any) => {
  //             if (
  //               (newVal &&
  //                 newVal.includes(".") &&
  //                 newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                 newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //               !newVal ||
  //               !newVal.includes(".")
  //             )
  //               return true
  //             return false
  //           },
  //         ),
  //     }),

  //     m2mMaxAmount: yup
  //       .string()
  //       .test(
  //         "greaterThanMinRange",
  //         "Maximum Balance should be greater than Minimum Balance",
  //         (item: any, context: any) => {
  //           if (context.parent.m2mCollapse !== true) return true
  //           if (
  //             Number(context.parent.m2mMinAmount) >= Number(item) &&
  //             context.parent.m2mIsMaxAmountApplicable !== true
  //           )
  //             return false

  //           return true
  //         },
  //       )
  //       .when(["m2mIsMaxAmountApplicable", "m2mCollapse"], {
  //         is: (m2mIsMaxAmountApplicable: boolean, m2mCollapse: boolean) =>
  //           !m2mIsMaxAmountApplicable && m2mCollapse === true,
  //         then: yup
  //           .string()
  //           .required()
  //           .test("typeError", "Specify valid number", (value: any) => {
  //             if (value !== ".") return true
  //             return false
  //           })
  //           .test(
  //             "upToDecimalDigits",
  //             "Specify number upto 2 decimal digits.",
  //             (newVal: any) => {
  //               if (
  //                 (newVal &&
  //                   newVal.includes(".") &&
  //                   newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                   newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //                 !newVal ||
  //                 !newVal.includes(".")
  //               )
  //                 return true
  //               return false
  //             },
  //           )
  //           .test(
  //             "minBalance",
  //             "Maximum Balance should be greater than Minimum Balance",
  //             (item: any, context: any) => {
  //               if (context.parent.m2mCollapse !== true) return true
  //               if (
  //                 Number(context.parent.m2mMinAmount) >= Number(item) &&
  //                 context.parent.m2mIsMaxAmountApplicable !== true
  //               )
  //                 return false

  //               return true
  //             },
  //           ),
  //       }),
  //   }

  //   const merchantSchema2 = {
  //     ChannelM2Mwano: yup.string().when(["m2mwanoCollapse"], {
  //       is: true,
  //       then: (scheme) => scheme.required(),
  //     }),

  //     m2mwanoMinAmount: yup.string().when(["m2mwanoCollapse"], {
  //       is: true,
  //       then: yup
  //         .string()
  //         .required()
  //         .test("typeError", "Specify valid number", (value: any) => {
  //           if (value !== ".") return true
  //           return false
  //         })
  //         .test(
  //           "upToDecimalDigits",
  //           "Specify number upto 2 decimal digits.",
  //           (newVal: any) => {
  //             if (
  //               (newVal &&
  //                 newVal.includes(".") &&
  //                 newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                 newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //               !newVal ||
  //               !newVal.includes(".")
  //             )
  //               return true
  //             return false
  //           },
  //         ),
  //     }),
  //     m2mwanoMaxAmount: yup
  //       .string()
  //       .test(
  //         "greaterThanMinRange",
  //         "Maximum Balance should be greater than Minimum Balance",
  //         (item: any, context: any) => {
  //           if (context.parent.m2mwanoCollapse !== true) return true
  //           if (
  //             Number(context.parent.m2mwanoMinAmount) >= Number(item) &&
  //             context.parent.m2mwanoIsMaxAmountApplicable !== true
  //           )
  //             return false

  //           return true
  //         },
  //       )
  //       .when(["m2mwanoIsMaxAmountApplicable", "m2mwanoCollapse"], {
  //         is: (
  //           m2mwanoIsMaxAmountApplicable: boolean,
  //           m2mwanoCollapse: boolean,
  //         ) => !m2mwanoIsMaxAmountApplicable && m2mwanoCollapse === true,
  //         then: yup
  //           .string()
  //           .required()
  //           .test("typeError", "Specify valid number", (value: any) => {
  //             if (value !== ".") return true
  //             return false
  //           })
  //           .test(
  //             "upToDecimalDigits",
  //             "Specify number upto 2 decimal digits.",
  //             (newVal: any) => {
  //               if (
  //                 (newVal &&
  //                   newVal.includes(".") &&
  //                   newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                   newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //                 !newVal ||
  //                 !newVal.includes(".")
  //               )
  //                 return true
  //               return false
  //             },
  //           )
  //           .test(
  //             "minBalance",
  //             "Maximum Balance should be greater than Minimum Balance",
  //             (item: any, context: any) => {
  //               if (context.parent.m2mwanoCollapse !== true) return true
  //               if (
  //                 Number(context.parent.m2mwanoMinAmount) >= Number(item) &&
  //                 context.parent.m2mwanoIsMaxAmountApplicable !== true
  //               )
  //                 return false

  //               return true
  //             },
  //           ),
  //       }),
  //   }

  //   const merchantSchema3 = {
  //     ChannelPsw2m: yup.string().when(["psw2mCollapse"], {
  //       is: true,
  //       then: (scheme) => scheme.required(),
  //     }),

  //     psw2mMinAmount: yup.string().when(["psw2mCollapse"], {
  //       is: true,
  //       then: yup
  //         .string()
  //         .required()
  //         .test("typeError", "Specify valid number", (value: any) => {
  //           if (value !== ".") return true
  //           return false
  //         })
  //         .test(
  //           "upToDecimalDigits",
  //           "Specify number upto 2 decimal digits.",
  //           (newVal: any) => {
  //             if (
  //               (newVal &&
  //                 newVal.includes(".") &&
  //                 newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                 newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //               !newVal ||
  //               !newVal.includes(".")
  //             )
  //               return true
  //             return false
  //           },
  //         ),
  //     }),
  //     psw2mMaxAmount: yup
  //       .string()
  //       .test(
  //         "greaterThanMinRange",
  //         "Maximum Balance should be greater than Minimum Balance",
  //         (item: any, context: any) => {
  //           if (context.parent.psw2mCollapse !== true) return true
  //           if (
  //             Number(context.parent.psw2mMinAmount) >= Number(item) &&
  //             context.parent.psw2mIsMaxAmountApplicable !== true
  //           )
  //             return false

  //           return true
  //         },
  //       )
  //       .when(["psw2mIsMaxAmountApplicable", "psw2mCollapse"], {
  //         is: (psw2mIsMaxAmountApplicable: boolean, psw2mCollapse: boolean) =>
  //           !psw2mIsMaxAmountApplicable && psw2mCollapse === true,
  //         then: yup
  //           .string()
  //           .required()
  //           .test("typeError", "Specify valid number", (value: any) => {
  //             if (value !== ".") return true
  //             return false
  //           })
  //           .test(
  //             "upToDecimalDigits",
  //             "Specify number upto 2 decimal digits.",
  //             (newVal: any) => {
  //               if (
  //                 (newVal &&
  //                   newVal.includes(".") &&
  //                   newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                   newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //                 !newVal ||
  //                 !newVal.includes(".")
  //               )
  //                 return true
  //               return false
  //             },
  //           )
  //           .test(
  //             "minBalance",
  //             "Maximum Balance should be greater than Minimum Balance",
  //             (item: any, context: any) => {
  //               if (context.parent.psw2mCollapse !== true) return true
  //               if (
  //                 Number(context.parent.psw2mMinAmount) >= Number(item) &&
  //                 context.parent.psw2mIsMaxAmountApplicable !== true
  //               )
  //                 return false

  //               return true
  //             },
  //           ),
  //       }),
  //   }

  //   const merchantSchema4 = {
  //     ChannelPsw2mwano: yup.string().when(["psw2manoCollapse"], {
  //       is: true,
  //       then: (scheme) => scheme.required(),
  //     }),

  //     psw2manoMinAmount: yup.string().when(["psw2manoCollapse"], {
  //       is: true,
  //       then: yup
  //         .string()
  //         .required()
  //         .test("typeError", "Specify valid number", (value: any) => {
  //           if (value !== ".") return true
  //           return false
  //         })
  //         .test(
  //           "upToDecimalDigits",
  //           "Specify number upto 2 decimal digits.",
  //           (newVal: any) => {
  //             if (
  //               (newVal &&
  //                 newVal.includes(".") &&
  //                 newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                 newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //               !newVal ||
  //               !newVal.includes(".")
  //             )
  //               return true
  //             return false
  //           },
  //         ),
  //     }),
  //     psw2manoMaxAmount: yup
  //       .string()
  //       .test(
  //         "greaterThanMinRange",
  //         "Maximum Balance should be greater than Minimum Balance",
  //         (item: any, context: any) => {
  //           if (context.parent.psw2manoCollapse !== true) return true
  //           if (
  //             Number(context.parent.psw2manoMinAmount) >= Number(item) &&
  //             context.parent.psw2manoIsMaxAmountApplicable !== true
  //           )
  //             return false

  //           return true
  //         },
  //       )
  //       .when(["psw2manoIsMaxAmountApplicable", "psw2manoCollapse"], {
  //         is: (
  //           psw2manoIsMaxAmountApplicable: boolean,
  //           psw2manoCollapse: boolean,
  //         ) => !psw2manoIsMaxAmountApplicable && psw2manoCollapse === true,
  //         then: yup
  //           .string()
  //           .required()
  //           .test("typeError", "Specify valid number", (value: any) => {
  //             if (value !== ".") return true
  //             return false
  //           })
  //           .test(
  //             "upToDecimalDigits",
  //             "Specify number upto 2 decimal digits.",
  //             (newVal: any) => {
  //               if (
  //                 (newVal &&
  //                   newVal.includes(".") &&
  //                   newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                   newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //                 !newVal ||
  //                 !newVal.includes(".")
  //               )
  //                 return true
  //               return false
  //             },
  //           )
  //           .test(
  //             "minBalance",
  //             "Maximum Balance should be greater than Minimum Balance",
  //             (item: any, context: any) => {
  //               if (context.parent.psw2manoCollapse !== true) return true
  //               if (
  //                 Number(context.parent.psw2manoMinAmount) >= Number(item) &&
  //                 context.parent.psw2manoIsMaxAmountApplicable !== true
  //               )
  //                 return false

  //               return true
  //             },
  //           ),
  //       }),
  //   }

  //   const merchantSchema5 = {
  //     ChannelSw2Sw: yup.string().when(["sw2swCollapse"], {
  //       is: true,
  //       then: (scheme) => scheme.required(),
  //     }),

  //     sw2swMinAmount: yup.string().when(["sw2swCollapse"], {
  //       is: true,
  //       then: yup
  //         .string()
  //         .required()
  //         .test("typeError", "Specify valid number", (value: any) => {
  //           if (value !== ".") return true
  //           return false
  //         })
  //         .test(
  //           "upToDecimalDigits",
  //           "Specify number upto 2 decimal digits.",
  //           (newVal: any) => {
  //             if (
  //               (newVal &&
  //                 newVal.includes(".") &&
  //                 newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                 newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //               !newVal ||
  //               !newVal.includes(".")
  //             )
  //               return true
  //             return false
  //           },
  //         ),
  //     }),
  //     sw2swMaxAmount: yup
  //       .string()
  //       .test(
  //         "greaterThanMinRange",
  //         "Maximum Balance should be greater than Minimum Balance",
  //         (item: any, context: any) => {
  //           if (context.parent.sw2swCollapse !== true) return true
  //           if (
  //             Number(context.parent.sw2swMinAmount) >= Number(item) &&
  //             context.parent.sw2swIsMaxAmountApplicable !== true
  //           )
  //             return false

  //           return true
  //         },
  //       )
  //       .when(["sw2swIsMaxAmountApplicable", "sw2swCollapse"], {
  //         is: (sw2swIsMaxAmountApplicable: boolean, sw2swCollapse: boolean) =>
  //           !sw2swIsMaxAmountApplicable && sw2swCollapse === true,
  //         then: yup
  //           .string()
  //           .required()
  //           .test("typeError", "Specify valid number", (value: any) => {
  //             if (value !== ".") return true
  //             return false
  //           })
  //           .test(
  //             "upToDecimalDigits",
  //             "Specify number upto 2 decimal digits.",
  //             (newVal: any) => {
  //               if (
  //                 (newVal &&
  //                   newVal.includes(".") &&
  //                   newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                   newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //                 !newVal ||
  //                 !newVal.includes(".")
  //               )
  //                 return true
  //               return false
  //             },
  //           )
  //           .test(
  //             "minBalance",
  //             "Maximum Balance should be greater than Minimum Balance",
  //             (item: any, context: any) => {
  //               if (context.parent.sw2swCollapse !== true) return true
  //               if (
  //                 Number(context.parent.sw2swMinAmount) >= Number(item) &&
  //                 context.parent.sw2swIsMaxAmountApplicable !== true
  //               )
  //                 return false

  //               return true
  //             },
  //           ),
  //       }),
  //   }

  //   const merchantSchema6 = {
  //     ChannelTsw2Pw: yup.string().when(["tsw2pwCollapse"], {
  //       is: true,
  //       then: (scheme) => scheme.required(),
  //     }),

  //     tsw2pwMinAmount: yup.string().when(["tsw2pwCollapse"], {
  //       is: true,
  //       then: yup
  //         .string()
  //         .required()
  //         .test("typeError", "Specify valid number", (value: any) => {
  //           if (value !== ".") return true
  //           return false
  //         })
  //         .test(
  //           "upToDecimalDigits",
  //           "Specify number upto 2 decimal digits.",
  //           (newVal: any) => {
  //             if (
  //               (newVal &&
  //                 newVal.includes(".") &&
  //                 newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                 newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //               !newVal ||
  //               !newVal.includes(".")
  //             )
  //               return true
  //             return false
  //           },
  //         ),
  //     }),
  //     tsw2pwMaxAmount: yup
  //       .string()
  //       .test(
  //         "greaterThanMinRange",
  //         "Maximum Balance should be greater than Minimum Balance",
  //         (item: any, context: any) => {
  //           if (context.parent.tsw2pwCollapse !== true) return true
  //           if (
  //             Number(context.parent.tsw2pwMinAmount) >= Number(item) &&
  //             context.parent.tsw2pwIsMaxAmountApplicable !== true
  //           )
  //             return false

  //           return true
  //         },
  //       )
  //       .when(["tsw2pwIsMaxAmountApplicable", "tsw2pwCollapse"], {
  //         is: (tsw2pwIsMaxAmountApplicable: boolean, tsw2pwCollapse: boolean) =>
  //           !tsw2pwIsMaxAmountApplicable && tsw2pwCollapse === true,
  //         then: yup
  //           .string()
  //           .required()
  //           .test("typeError", "Specify valid number", (value: any) => {
  //             if (value !== ".") return true
  //             return false
  //           })
  //           .test(
  //             "upToDecimalDigits",
  //             "Specify number upto 2 decimal digits.",
  //             (newVal: any) => {
  //               if (
  //                 (newVal &&
  //                   newVal.includes(".") &&
  //                   newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                   newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //                 !newVal ||
  //                 !newVal.includes(".")
  //               )
  //                 return true
  //               return false
  //             },
  //           )
  //           .test(
  //             "minBalance",
  //             "Maximum Balance should be greater than Minimum Balance",
  //             (item: any, context: any) => {
  //               if (context.parent.tsw2pwCollapse !== true) return true
  //               if (
  //                 Number(context.parent.tsw2pwMinAmount) >= Number(item) &&
  //                 context.parent.tsw2pwIsMaxAmountApplicable !== true
  //               )
  //                 return false

  //               return true
  //             },
  //           ),
  //       }),
  //   }

  //   validationSchema = {
  //     ...validationSchema,
  //     ...merchantSchema,
  //     ...merchantSchema2,
  //     ...merchantSchema3,
  //     ...merchantSchema4,
  //     ...merchantSchema5,
  //     ...merchantSchema6,
  //   }
  // }

  // // mpesa
  // if (transactionDetails?.mpesa?.initiatedTransactionsList) {
  //   const customerSchema1 = {
  //     ChannelPayBill: yup.string().when(["usePayBillCollapse"], {
  //       is: true,
  //       then: (scheme) => scheme.required(),
  //     }),

  //     usePayBillMinAmount: yup.string().when(["usePayBillCollapse"], {
  //       is: true,
  //       then: yup.string().required(),
  //     }),
  //     usePayBillMaxAmount: yup
  //       .string()
  //       .test(
  //         "greaterThanMinRange",
  //         "Maximum Balance should be greater than Minimum Balance",
  //         (item: any, context: any) => {
  //           if (context.parent.usePayBillCollapse !== true) return true
  //           if (
  //             Number(context.parent.usePayBillMinAmount) >= Number(item) &&
  //             context.parent.usePayBillIsMaxAmountApplicable !== true
  //           )
  //             return false

  //           return true
  //         },
  //       )
  //       .when(["usePayBillIsMaxAmountApplicable", "usePayBillCollapse"], {
  //         is: (
  //           usePayBillIsMaxAmountApplicable: boolean,
  //           usePayBillCollapse: boolean,
  //         ) => !usePayBillIsMaxAmountApplicable && usePayBillCollapse === true,
  //         then: yup
  //           .string()
  //           .required()
  //           .test("typeError", "Specify valid number", (value: any) => {
  //             if (value !== ".") return true
  //             return false
  //           })
  //           .test(
  //             "upToDecimalDigits",
  //             "Specify number upto 2 decimal digits.",
  //             (newVal: any) => {
  //               if (
  //                 (newVal &&
  //                   newVal.includes(".") &&
  //                   newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                   newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //                 !newVal ||
  //                 !newVal.includes(".")
  //               )
  //                 return true
  //               return false
  //             },
  //           )
  //           .test(
  //             "minBalance",
  //             "Maximum Balance should be greater than Minimum Balance",
  //             (item: any, context: any) => {
  //               if (context.parent.usePayBillCollapse !== true) return true
  //               if (
  //                 Number(context.parent.usePayBillMinAmount) >= Number(item) &&
  //                 context.parent.usePayBillIsMaxAmountApplicable !== true
  //               )
  //                 return false

  //               return true
  //             },
  //           ),
  //       }),
  //   }

  //   const customerSchema2 = {
  //     ChannelM2till: yup.string().when(["m2tillCollapse"], {
  //       is: true,
  //       then: (scheme) => scheme.required(),
  //     }),

  //     m2tillMinAmount: yup.string().when(["m2tillCollapse"], {
  //       is: true,
  //       then: yup.string().required(),
  //     }),
  //     m2tillMaxAmount: yup
  //       .string()
  //       .test(
  //         "greaterThanMinRange",
  //         "Maximum Balance should be greater than Minimum Balance",
  //         (item: any, context: any) => {
  //           if (context.parent.m2tillCollapse !== true) return true
  //           if (
  //             Number(context.parent.m2tillMinAmount) >= Number(item) &&
  //             context.parent.m2tillIsMaxAmountApplicable !== true
  //           )
  //             return false

  //           return true
  //         },
  //       )
  //       .when(["m2tillIsMaxAmountApplicable", "m2tillCollapse"], {
  //         is: (m2tillIsMaxAmountApplicable: boolean, m2tillCollapse: boolean) =>
  //           !m2tillIsMaxAmountApplicable && m2tillCollapse === true,
  //         then: yup
  //           .string()
  //           .required()
  //           .test("typeError", "Specify valid number", (value: any) => {
  //             if (value !== ".") return true
  //             return false
  //           })
  //           .test(
  //             "upToDecimalDigits",
  //             "Specify number upto 2 decimal digits.",
  //             (newVal: any) => {
  //               if (
  //                 (newVal &&
  //                   newVal.includes(".") &&
  //                   newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                   newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //                 !newVal ||
  //                 !newVal.includes(".")
  //               )
  //                 return true
  //               return false
  //             },
  //           )
  //           .test(
  //             "minBalance",
  //             "Maximum Balance should be greater than Minimum Balance",
  //             (item: any, context: any) => {
  //               if (context.parent.m2tillCollapse !== true) return true
  //               if (
  //                 Number(
  //                   context.parent
  //                     .customerTypeTransactionCustomerMinAmountIslamic2Islamic,
  //                 ) >= Number(item) &&
  //                 context.parent.m2tillIsMaxAmountApplicable !== true
  //               )
  //                 return false

  //               return true
  //             },
  //           ),
  //       }),
  //   }

  //   const customerSchema3 = {
  //     ChannelPsw2mpb: yup.string().when(["psw2mpbCollapse"], {
  //       is: true,
  //       then: (scheme) => scheme.required(),
  //     }),

  //     psw2mpbMinAmount: yup.string().when(["psw2mpbCollapse"], {
  //       is: true,
  //       then: yup.string().required(),
  //     }),
  //     psw2mpbMaxAmount: yup
  //       .string()
  //       .test(
  //         "greaterThanMinRange",
  //         "Maximum Balance should be greater than Minimum Balance",
  //         (item: any, context: any) => {
  //           if (context.parent.psw2mpbCollapse !== true) return true
  //           if (
  //             Number(context.parent.psw2mpbMinAmount) >= Number(item) &&
  //             context.parent.psw2mpbIsMaxAmountApplicable !== true
  //           )
  //             return false

  //           return true
  //         },
  //       )
  //       .when(["psw2mpbIsMaxAmountApplicable", "psw2mpbCollapse"], {
  //         is: (
  //           psw2mpbIsMaxAmountApplicable: boolean,
  //           psw2mpbCollapse: boolean,
  //         ) => !psw2mpbIsMaxAmountApplicable && psw2mpbCollapse === true,
  //         then: yup
  //           .string()
  //           .required()
  //           .test("typeError", "Specify valid number", (value: any) => {
  //             if (value !== ".") return true
  //             return false
  //           })
  //           .test(
  //             "upToDecimalDigits",
  //             "Specify number upto 2 decimal digits.",
  //             (newVal: any) => {
  //               if (
  //                 (newVal &&
  //                   newVal.includes(".") &&
  //                   newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                   newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //                 !newVal ||
  //                 !newVal.includes(".")
  //               )
  //                 return true
  //               return false
  //             },
  //           )
  //           .test(
  //             "minBalance",
  //             "Maximum Balance should be greater than Minimum Balance",
  //             (item: any, context: any) => {
  //               if (context.parent.psw2mpbCollapse !== true) return true
  //               if (
  //                 Number(context.parent.psw2mpbMinAmount) >= Number(item) &&
  //                 context.parent.psw2mpbIsMaxAmountApplicable !== true
  //               )
  //                 return false

  //               return true
  //             },
  //           ),
  //       }),
  //   }

  //   const customerSchema4 = {
  //     ChannelPsw2mm: yup.string().when(["psw2mmCollapse"], {
  //       is: true,
  //       then: (scheme) => scheme.required(),
  //     }),

  //     psw2mmMinAmount: yup.string().when(["psw2mmCollapse"], {
  //       is: true,
  //       then: yup.string().required(),
  //     }),
  //     psw2mmMaxAmount: yup
  //       .string()
  //       .test(
  //         "greaterThanMinRange",
  //         "Maximum Balance should be greater than Minimum Balance",
  //         (item: any, context: any) => {
  //           if (context.parent.psw2mmCollapse !== true) return true
  //           if (
  //             Number(context.parent.psw2mmMinAmount) >= Number(item) &&
  //             context.parent.psw2mmIsMaxAmountApplicable !== true
  //           )
  //             return false

  //           return true
  //         },
  //       )
  //       .when(["psw2mmIsMaxAmountApplicable", "psw2mmCollapse"], {
  //         is: (psw2mmIsMaxAmountApplicable: boolean, psw2mmCollapse: boolean) =>
  //           !psw2mmIsMaxAmountApplicable && psw2mmCollapse === true,
  //         then: yup
  //           .string()
  //           .required()
  //           .test("typeError", "Specify valid number", (value: any) => {
  //             if (value !== ".") return true
  //             return false
  //           })
  //           .test(
  //             "upToDecimalDigits",
  //             "Specify number upto 2 decimal digits.",
  //             (newVal: any) => {
  //               if (
  //                 (newVal &&
  //                   newVal.includes(".") &&
  //                   newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                   newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //                 !newVal ||
  //                 !newVal.includes(".")
  //               )
  //                 return true
  //               return false
  //             },
  //           )
  //           .test(
  //             "minBalance",
  //             "Maximum Balance should be greater than Minimum Balance",
  //             (item: any, context: any) => {
  //               if (context.parent.psw2mmCollapse !== true) return true
  //               if (
  //                 Number(context.parent.psw2mmMinAmount) >= Number(item) &&
  //                 context.parent.psw2mmIsMaxAmountApplicable !== true
  //               )
  //                 return false

  //               return true
  //             },
  //           ),
  //       }),
  //   }

  //   validationSchema = {
  //     ...validationSchema,
  //     ...customerSchema1,
  //     ...customerSchema2,
  //     ...customerSchema3,
  //     ...customerSchema4,
  //   }
  // }

  const merchantSchema: any = {}
  if (transactionDetails?.merchant?.initiatedTransactionsList?.length > 0) {
    console.log(transactionDetails.merchant, "TXX")

    transactionDetails.merchant.initiatedTransactionsList.forEach(
      (txn: any, index: any) => {
        const txnDisplayName = txn.transactionTypeDisplayName || ""

        merchantSchema[`merchantMinAmount${index}`] = yup
          .string()
          .when([txnDisplayName], {
            is: (value: boolean) => {
              console.log("VALUE", value)
              return value === true
            },
            then: (schema) => schema.required("Minimum amount is required"),
            otherwise: (schema) => schema,
          })

        // Conditionally require maxAmount only if the checkbox is selected
        merchantSchema[`merchantMaxAmount${index}`] = yup
          .string()
          .when(`merchantIsMaxAmountApplicable${index}`, {
            is: (isApplicable: boolean) =>
              isApplicable === false && Boolean(txnDisplayName),
            then: (schema) => schema.required("Maximum amount is required"),
            otherwise: (schema) => schema.notRequired(),
          })
      },
    )
  }

  const customerSchema: any = {}
  if (transactionDetails?.customer?.initiatedTransactionsList?.length > 0) {
    console.log(transactionDetails.merchant, "TXX")

    transactionDetails.customer.initiatedTransactionsList.forEach(
      (txn: any, index: any) => {
        const txnDisplayName = txn.transactionTypeDisplayName || ""

        customerSchema[`customerMinAmount${index}`] = yup
          .string()
          .when([txnDisplayName], {
            is: (value: boolean) => {
              console.log("VALUE", value)
              return value === true
            },
            then: (schema) => schema.required("Minimum amount is required"),
            otherwise: (schema) => schema,
          })

        // Conditionally require maxAmount only if the checkbox is selected
        customerSchema[`customerMaxAmount${index}`] = yup
          .string()
          .when(`customerIsMaxAmountApplicable${index}`, {
            is: (isApplicable: boolean) =>
              isApplicable === false && Boolean(txnDisplayName),
            then: (schema) => schema.required("Maximum amount is required"),
            otherwise: (schema) => schema.notRequired(),
          })
      },
    )
  }

  const serviceSchema: any = {}
  if (
    transactionDetails?.serviceprovider?.initiatedTransactionsList?.length > 0
  ) {
    console.log(transactionDetails.merchant, "TXX")

    transactionDetails.serviceprovider.initiatedTransactionsList.forEach(
      (txn: any, index: any) => {
        const txnDisplayName = txn.transactionTypeDisplayName || ""

        serviceSchema[`serviceproviderMinAmount${index}`] = yup
          .string()
          .when([txnDisplayName], {
            is: (value: boolean) => {
              console.log("VALUE", value)
              return value === true
            },
            then: (schema) => schema.required("Minimum amount is required"),
            otherwise: (schema) => schema,
          })

        // Conditionally require maxAmount only if the checkbox is selected
        serviceSchema[`serviceproviderMaxAmount${index}`] = yup
          .string()
          .when(`serviceproviderIsMaxAmountApplicable${index}`, {
            is: (isApplicable: boolean) =>
              isApplicable === false && Boolean(txnDisplayName),
            then: (schema) => schema.required("Maximum amount is required"),
            otherwise: (schema) => schema.notRequired(),
          })
      },
    )
  }

  return yup.object().shape({
    ...validationSchema,
    ...merchantSchema,
    ...customerSchema,
    ...serviceSchema,
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

export default MerchantTypeFormSchema
