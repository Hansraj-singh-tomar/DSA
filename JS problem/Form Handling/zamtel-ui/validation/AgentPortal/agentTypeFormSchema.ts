/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import * as yup from "yup"
import "app/Yup.config"
import { IDefaultValueObject } from "app/models/form"

function agentTypeFormSchema(formStage: string) {
  let validationSchema = yup.object()

  const trustLevelSchema = {
    name: yup.string().required(),
    minBalance: yup
      .string()
      // .transform((value: number) => (Number.isNaN(value) ? undefined : value))
      .required()
      // .min(0)
      .nullable()
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
          newVal = newVal?.replaceAll(",", "")
          if (newVal && Number(newVal) <= 9999999999.99) return true
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
          .transform((value) => value?.replaceAll(",", ""))
          .test(
            "minBalance",
            "Maximum Balance should be greater than Minimum Balance",
            (value: any, context: any) => {
              if (
                Number(value) >
                Number(context.parent.minBalance?.replaceAll(",", ""))
              )
                return true
              return false
            },
          )
          .test(
            "upToDecimalDigits",
            "Specify number should less than 9999999999.99",
            (newVal: any) => {
              newVal = newVal?.replaceAll(",", "")
              if (newVal && Number(newVal) <= 9999999999.99) return true
              return false
            },
          ),
    }),
  }

  const customerTypeStep1Settlement = {
    bankTransferMinAmount: yup.string().when(["bankTransfer"], {
      is: (bankTransfer: boolean) => {
        return bankTransfer !== false
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
        )
        .test(
          "upToDecimalDigits",
          "Specify number should less than 9999999999.99",
          (newVal: any) => {
            newVal = newVal?.replaceAll(",", "")
            if (newVal && Number(newVal) <= 9999999999.99) return true
            return false
          },
        ),
    }),
    bankTransferMaxAmount: yup
      .string()
      .transform((value) => value?.replaceAll(",", ""))
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (context.parent.bankTransfer !== true) return true
          if (
            Number(context.parent.bankTransferMinAmount?.replaceAll(",", "")) >=
              Number(item) &&
            context.parent.bankTransferIsMaxAmountApplicable !== true
          )
            return false
          return true
        },
      )
      .when(["bankTransferIsMaxAmountApplicable", "bankTransfer"], {
        is: (
          bankTransferIsMaxAmountApplicable: boolean,
          bankTransfer: boolean,
        ) => !bankTransferIsMaxAmountApplicable && bankTransfer !== false,
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
          .transform((value) => value?.replaceAll(",", ""))
          .test(
            "greaterThanMinRange",
            "Maximum Balance should be greater than Minimum Balance",
            (item: any, context: any) => {
              if (context.parent.bankTransfer !== true) return true
              if (
                Number(
                  context.parent.bankTransferMinAmount?.replaceAll(",", ""),
                ) >= Number(item) &&
                context.parent.bankTransferIsMaxAmountApplicable !== true
              )
                return false
              return true
            },
          )
          .test(
            "upToDecimalDigits",
            "Specify number should less than 9999999999.99",
            (newVal: any) => {
              newVal = newVal?.replaceAll(",", "")
              if (newVal && Number(newVal) <= 9999999999.99) return true
              return false
            },
          ),
      }),
    // cardTransferMinAmount: yup.string().when(["cardTransfer"], {
    //   is: (cardTransfer: boolean) => {
    //     return cardTransfer !== false
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
    //     )
    //     .test(
    //       "upToDecimalDigits",
    //       "Specify number should less than 9999999999.99",
    //       (newVal: any) => {
    //         newVal = newVal?.replaceAll(",", "")
    //         if (newVal && Number(newVal) <= 9999999999.99) return true
    //         return false
    //       },
    //     ),
    // }),
    // cardTransferMaxAmount: yup
    //   .string()
    //   .transform((value) => value?.replaceAll(",", ""))
    //   .test(
    //     "greaterThanMinRange",
    //     "Maximum Balance should be greater than Minimum Balance",
    //     (item: any, context: any) => {
    //       if (context.parent.cardTransfer !== true) return true
    //       if (
    //         Number(context.parent.cardTransferMinAmount?.replaceAll(",", "")) >=
    //           Number(item) &&
    //         context.parent.cardTransferIsMaxAmountApplicable !== true
    //       )
    //         return false

    //       return true
    //     },
    //   )
    //   .when(["cardTransferIsMaxAmountApplicable", "cardTransfer"], {
    //     is: (
    //       cardTransferIsMaxAmountApplicable: boolean,
    //       cardTransfer: boolean,
    //     ) => !cardTransferIsMaxAmountApplicable && cardTransfer !== false,
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
    //       .transform((value) => value?.replaceAll(",", ""))
    //       .test(
    //         "greaterThanMinRange",
    //         "Maximum Balance should be greater than Minimum Balance",
    //         (item: any, context: any) => {
    //           if (context.parent.cardTransfer !== true) return true
    //           if (
    //             Number(
    //               context.parent.cardTransferMinAmount?.replaceAll(",", ""),
    //             ) >= Number(item) &&
    //             context.parent.cardTransferIsMaxAmountApplicable !== true
    //           )
    //             return false

    //           return true
    //         },
    //       )
    //       .test(
    //         "upToDecimalDigits",
    //         "Specify number should less than 9999999999.99",
    //         (newVal: any) => {
    //           newVal = newVal?.replaceAll(",", "")
    //           if (newVal && Number(newVal) <= 9999999999.99) return true
    //           return false
    //         },
    //       ),
    //   }),
  }

  const customerTypeStep2 = {
    otherFunctionalityDisbursementPolicy: yup
      .string()
      .when("Receive Commission", {
        is: true,
        then: (scheme) => scheme.required(),
      })
      .nullable(),
    otherFunctionalityTimeHrsDaily: yup
      .string()
      .when(["Receive Commission", "otherFunctionalityDisbursementPolicy"], {
        is: (
          Receive_Commission: boolean,
          otherFunctionalityDisbursementPolicy: string,
        ) =>
          Receive_Commission &&
          otherFunctionalityDisbursementPolicy === "Daily",
        then: (scheme) => scheme.required(),
      })
      .nullable(),
    otherFunctionalityWeekDay: yup
      .string()
      .when(["Receive Commission", "otherFunctionalityDisbursementPolicy"], {
        is: (
          Receive_Commission: boolean,
          otherFunctionalityDisbursementPolicy: string,
        ) =>
          Receive_Commission &&
          otherFunctionalityDisbursementPolicy === "Weekly",
        then: (scheme) => scheme.required(),
      })
      .nullable(),
    otherFunctionalityTimeHrsWeek: yup
      .string()
      .when(["Receive Commission", "otherFunctionalityDisbursementPolicy"], {
        is: (
          Receive_Commission: boolean,
          otherFunctionalityDisbursementPolicy: string,
        ) =>
          Receive_Commission &&
          otherFunctionalityDisbursementPolicy === "Weekly",
        then: (scheme) => scheme.required(),
      })
      .nullable(),
    otherFunctionalityMonthDate: yup
      .string()
      .when(["Receive Commission", "otherFunctionalityDisbursementPolicy"], {
        is: (
          Receive_Commission: boolean,
          otherFunctionalityDisbursementPolicy: string,
        ) =>
          Receive_Commission &&
          otherFunctionalityDisbursementPolicy === "Monthly",
        then: (scheme) => scheme.required(),
      })
      .nullable(),
    otherFunctionalityTimeHrsMonth: yup
      .string()
      .when(["Receive Commission", "otherFunctionalityDisbursementPolicy"], {
        is: (
          Receive_Commission: boolean,
          otherFunctionalityDisbursementPolicy: string,
        ) =>
          Receive_Commission &&
          otherFunctionalityDisbursementPolicy === "Monthly",
        then: (scheme) => scheme.required(),
      })
      .nullable(),
    emiBillPayRegularAgentMinAmountUSSD: yup
      .string()
      .when(["EMI Bill Pay - Regular Agent USSD"], {
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
            )
            .test(
              "upToDecimalDigits",
              "Specify number should less than 9999999999.99",
              (newVal: any) => {
                newVal = newVal?.replaceAll(",", "")
                if (newVal && Number(newVal) <= 9999999999.99) return true
                return false
              },
            ),
      }),
    emiBillPayRegularAgentMaxAmountUSSD: yup
      .string()
      .when(["EMI Bill Pay - Regular Agent USSD"], {
        is: true,
        then: (scheme) =>
          scheme.when(["emiBillPayRegularAgentIsMaxAmountApplicableUSSD"], {
            is: (emiBillPayRegularAgentIsMaxAmountApplicableUSSD: boolean) => {
              return !emiBillPayRegularAgentIsMaxAmountApplicableUSSD
            },
            then: (scheme2) =>
              scheme2
                .required()
                .transform((value) => value?.replaceAll(",", ""))
                .test(
                  "greaterThanMinRange",
                  "Maximum Balance should be greater than Minimum Balance",
                  (item: any, context: any) => {
                    if (
                      context.parent["EMI Bill Pay - Regular Agent USSD"] !==
                      true
                    )
                      return true
                    if (
                      Number(
                        context.parent.emiBillPayRegularAgentMinAmountUSSD?.replaceAll(
                          ",",
                          "",
                        ),
                      ) >= Number(item) &&
                      context.parent
                        .emiBillPayRegularAgentIsMaxAmountApplicableUSSD !==
                        true
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
                )
                .test(
                  "upToDecimalDigits",
                  "Specify number should less than 9999999999.99",
                  (newVal: any) => {
                    newVal = newVal?.replaceAll(",", "")
                    if (newVal && Number(newVal) <= 9999999999.99) return true
                    return false
                  },
                ),
          }),
      }),
    emiBillPayRegularAgentMinAmountAPP: yup
      .string()
      .when(["EMI Bill Pay - Regular Agent APP"], {
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
            )
            .test(
              "upToDecimalDigits",
              "Specify number should less than 9999999999.99",
              (newVal: any) => {
                newVal = newVal?.replaceAll(",", "")
                if (newVal && Number(newVal) <= 9999999999.99) return true
                return false
              },
            ),
      }),
    emiBillPayRegularAgentMaxAmountAPP: yup
      .string()
      .when(["EMI Bill Pay - Regular Agent APP"], {
        is: true,
        then: (scheme) =>
          scheme.when(["emiBillPayRegularAgentIsMaxAmountApplicableAPP"], {
            is: (emiBillPayRegularAgentIsMaxAmountApplicableAPP: boolean) => {
              return !emiBillPayRegularAgentIsMaxAmountApplicableAPP
            },
            then: (scheme2) =>
              scheme2
                .required()
                .transform((value) => value?.replaceAll(",", ""))
                .test(
                  "greaterThanMinRange",
                  "Maximum Balance should be greater than Minimum Balance",
                  (item: any, context: any) => {
                    if (
                      context.parent["EMI Bill Pay - Regular Agent APP"] !==
                      true
                    )
                      return true
                    if (
                      Number(
                        context.parent.emiBillPayRegularAgentMinAmountAPP?.replaceAll(
                          ",",
                          "",
                        ),
                      ) >= Number(item) &&
                      context.parent
                        .emiBillPayRegularAgentIsMaxAmountApplicableAPP !== true
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
                )
                .test(
                  "upToDecimalDigits",
                  "Specify number should less than 9999999999.99",
                  (newVal: any) => {
                    newVal = newVal?.replaceAll(",", "")
                    if (newVal && Number(newVal) <= 9999999999.99) return true
                    return false
                  },
                ),
          }),
      }),
    mobileRechargeRegularAgentMinAmountAPP: yup
      .string()
      .when(["Mobile Recharge - Regular Agent APP"], {
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
            )
            .test(
              "upToDecimalDigits",
              "Specify number should less than 9999999999.99",
              (newVal: any) => {
                newVal = newVal?.replaceAll(",", "")
                if (newVal && Number(newVal) <= 9999999999.99) return true
                return false
              },
            ),
      }),
    mobileRechargeRegularAgentMaxAmountAPP: yup
      .string()
      .when(["Mobile Recharge - Regular Agent APP"], {
        is: true,
        then: (scheme) =>
          scheme.when(["mobileRechargeRegularAgentIsMaxAmountApplicableAPP"], {
            is: (
              mobileRechargeRegularAgentIsMaxAmountApplicableAPP: boolean,
            ) => {
              return !mobileRechargeRegularAgentIsMaxAmountApplicableAPP
            },
            then: (scheme2) =>
              scheme2
                .required()
                .transform((value) => value?.replaceAll(",", ""))
                .test(
                  "greaterThanMinRange",
                  "Maximum Balance should be greater than Minimum Balance",
                  (item: any, context: any) => {
                    if (
                      context.parent["Mobile Recharge - Regular Agent APP"] !==
                      true
                    )
                      return true
                    if (
                      Number(
                        context.parent.mobileRechargeRegularAgentMinAmountAPP?.replaceAll(
                          ",",
                          "",
                        ),
                      ) >= Number(item) &&
                      context.parent
                        .mobileRechargeRegularAgentIsMaxAmountApplicableAPP !==
                        true
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
                )
                .test(
                  "upToDecimalDigits",
                  "Specify number should less than 9999999999.99",
                  (newVal: any) => {
                    newVal = newVal?.replaceAll(",", "")
                    if (newVal && Number(newVal) <= 9999999999.99) return true
                    return false
                  },
                ),
          }),
      }),
    mobileRechargeRegularAgentMinAmountUSSD: yup
      .string()
      .when(["Mobile Recharge - Regular Agent USSD"], {
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
            )
            .test(
              "upToDecimalDigits",
              "Specify number should less than 9999999999.99",
              (newVal: any) => {
                newVal = newVal?.replaceAll(",", "")
                if (newVal && Number(newVal) <= 9999999999.99) return true
                return false
              },
            ),
      }),
    mobileRechargeRegularAgentMaxAmountUSSD: yup
      .string()
      .when(["Mobile Recharge - Regular Agent USSD"], {
        is: true,
        then: (scheme) =>
          scheme.when(["mobileRechargeRegularAgentIsMaxAmountApplicableUSSD"], {
            is: (
              mobileRechargeRegularAgentIsMaxAmountApplicableUSSD: boolean,
            ) => {
              return !mobileRechargeRegularAgentIsMaxAmountApplicableUSSD
            },
            then: (scheme2) =>
              scheme2
                .required()
                .transform((value) => value?.replaceAll(",", ""))
                .test(
                  "greaterThanMinRange",
                  "Maximum Balance should be greater than Minimum Balance",
                  (item: any, context: any) => {
                    if (
                      context.parent["Mobile Recharge - Regular Agent USSD"] !==
                      true
                    )
                      return true
                    if (
                      Number(
                        context.parent.mobileRechargeRegularAgentMinAmountUSSD?.replaceAll(
                          ",",
                          "",
                        ),
                      ) >= Number(item) &&
                      context.parent
                        .mobileRechargeRegularAgentIsMaxAmountApplicableUSSD !==
                        true
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
                )
                .test(
                  "upToDecimalDigits",
                  "Specify number should less than 9999999999.99",
                  (newVal: any) => {
                    newVal = newVal?.replaceAll(",", "")
                    if (newVal && Number(newVal) <= 9999999999.99) return true
                    return false
                  },
                ),
          }),
      }),
    billPaymentRegularAgentMinAmountUSSD: yup
      .string()
      .when(["Bill Payment - Regular Agent USSD"], {
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
            )
            .test(
              "upToDecimalDigits",
              "Specify number should less than 9999999999.99",
              (newVal: any) => {
                newVal = newVal?.replaceAll(",", "")
                if (newVal && Number(newVal) <= 9999999999.99) return true
                return false
              },
            ),
      }),
    billPaymentRegularAgentMaxAmountUSSD: yup
      .string()
      .when(["Bill Payment - Regular Agent USSD"], {
        is: true,
        then: (scheme) =>
          scheme.when(["billPaymentRegularAgentIsMaxAmountApplicableUSSD"], {
            is: (billPaymentRegularAgentIsMaxAmountApplicableUSSD: boolean) => {
              return !billPaymentRegularAgentIsMaxAmountApplicableUSSD
            },
            then: (scheme2) =>
              scheme2
                .required()
                .transform((value) => value?.replaceAll(",", ""))
                .test(
                  "greaterThanMinRange",
                  "Maximum Balance should be greater than Minimum Balance",
                  (item: any, context: any) => {
                    if (
                      context.parent["Bill Payment - Regular Agent USSD"] !==
                      true
                    )
                      return true
                    if (
                      Number(
                        context.parent.billPaymentRegularAgentMinAmountUSSD?.replaceAll(
                          ",",
                          "",
                        ),
                      ) >= Number(item) &&
                      context.parent
                        .billPaymentRegularAgentIsMaxAmountApplicableUSSD !==
                        true
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
                )
                .test(
                  "upToDecimalDigits",
                  "Specify number should less than 9999999999.99",
                  (newVal: any) => {
                    newVal = newVal?.replaceAll(",", "")
                    if (newVal && Number(newVal) <= 9999999999.99) return true
                    return false
                  },
                ),
          }),
      }),
    billPaymentRegularAgentMinAmountAPP: yup
      .string()
      .when(["Bill Payment - Regular Agent APP"], {
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
            )
            .test(
              "upToDecimalDigits",
              "Specify number should less than 9999999999.99",
              (newVal: any) => {
                newVal = newVal?.replaceAll(",", "")
                if (newVal && Number(newVal) <= 9999999999.99) return true
                return false
              },
            ),
      }),
    billPaymentRegularAgentMaxAmountAPP: yup
      .string()
      .when(["Bill Payment - Regular Agent APP"], {
        is: true,
        then: (scheme) =>
          scheme.when(["billPaymentRegularAgentIsMaxAmountApplicableAPP"], {
            is: (billPaymentRegularAgentIsMaxAmountApplicableAPP: boolean) => {
              return !billPaymentRegularAgentIsMaxAmountApplicableAPP
            },
            then: (scheme2) =>
              scheme2
                .required()
                .transform((value) => value?.replaceAll(",", ""))
                .test(
                  "greaterThanMinRange",
                  "Maximum Balance should be greater than Minimum Balance",
                  (item: any, context: any) => {
                    if (
                      context.parent["Bill Payment - Regular Agent APP"] !==
                      true
                    )
                      return true
                    if (
                      Number(
                        context.parent.billPaymentRegularAgentMinAmountAPP?.replaceAll(
                          ",",
                          "",
                        ),
                      ) >= Number(item) &&
                      context.parent
                        .billPaymentRegularAgentIsMaxAmountApplicableAPP !==
                        true
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
                )
                .test(
                  "upToDecimalDigits",
                  "Specify number should less than 9999999999.99",
                  (newVal: any) => {
                    newVal = newVal?.replaceAll(",", "")
                    if (newVal && Number(newVal) <= 9999999999.99) return true
                    return false
                  },
                ),
          }),
      }),

    eComMerchantPaymentAgentMinAmount: yup
      .string()
      .when(["e-Comm Merchant Payment - Agent"], {
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
            )
            .test(
              "upToDecimalDigits",
              "Specify number should less than 9999999999.99",
              (newVal: any) => {
                newVal = newVal?.replaceAll(",", "")
                if (newVal && Number(newVal) <= 9999999999.99) return true
                return false
              },
            ),
      }),
    eComMerchantPaymentAgentMaxAmount: yup
      .string()
      .when(["e-Comm Merchant Payment - Agent"], {
        is: true,
        then: (scheme) =>
          scheme.when(["eComMerchantPaymentAgentIsMaxAmountApplicable"], {
            is: (eComMerchantPaymentAgentIsMaxAmountApplicable: boolean) => {
              return !eComMerchantPaymentAgentIsMaxAmountApplicable
            },
            then: (scheme2) =>
              scheme2
                .required()
                .transform((value) => value?.replaceAll(",", ""))
                .test(
                  "greaterThanMinRange",
                  "Maximum Balance should be greater than Minimum Balance",
                  (item: any, context: any) => {
                    if (
                      context.parent["e-Comm Merchant Payment - Agent"] !== true
                    )
                      return true
                    if (
                      Number(
                        context.parent.eComMerchantPaymentAgentMinAmount?.replaceAll(
                          ",",
                          "",
                        ),
                      ) >= Number(item) &&
                      context.parent
                        .eComMerchantPaymentAgentIsMaxAmountApplicable !== true
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
                )
                .test(
                  "upToDecimalDigits",
                  "Specify number should less than 9999999999.99",
                  (newVal: any) => {
                    newVal = newVal?.replaceAll(",", "")
                    if (newVal && Number(newVal) <= 9999999999.99) return true
                    return false
                  },
                ),
          }),
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
    case "customerTypeStep1Settlement":
      validationSchema = yup.object().shape({ ...customerTypeStep1Settlement })
      break
    case "customerTypeStep2":
      validationSchema = yup.object().shape({ ...customerTypeStep2 })
      break
  }
  return validationSchema
}

export const step2TransactionSchema = (
  transactionDetails: IDefaultValueObject,
) => {
  const validationSchema = {}

  // customer
  // if (transactionDetails?.customer?.initiatedTransactionsList) {
  //   const customerSchema = {
  //     ChannelAgentCustomerRegular: yup
  //       .string()
  //       .when(["regularCustomerCashInAgentCollapse"], {
  //         is: true,
  //         then: (scheme) => scheme.required(),
  //       }),
  //     agentTypeTransactionCustomerMinAmountRegular: yup
  //       .string()
  //       .when(["regularCustomerCashInAgentCollapse"], {
  //         is: true,
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
  //             "upToDecimalDigits",
  //             "Specify number should less than 9999999999.99",
  //             (newVal: any) => {
  //               newVal = newVal?.replaceAll(",", "")
  //               if (newVal && Number(newVal) <= 9999999999.99) return true
  //               return false
  //             },
  //           ),
  //       }),
  //     agentTypeTransactionCustomerMaxAmountRegular: yup
  //       .string()
  //       .transform((value) => value?.replaceAll(",", ""))
  //       .test(
  //         "greaterThanMinRange",
  //         "Maximum Balance should be greater than Minimum Balance",
  //         (item: any, context: any) => {
  //           if (context.parent.regularCustomerCashInAgentCollapse !== true)
  //             return true
  //           if (
  //             Number(
  //               context.parent.agentTypeTransactionCustomerMinAmountRegular?.replaceAll(
  //                 ",",
  //                 "",
  //               ),
  //             ) >= Number(item) &&
  //             context.parent
  //               .agentTypeTransactionCustomerIsMaxAmountApplicableRegular !==
  //               true
  //           )
  //             return false

  //           return true
  //         },
  //       )
  //       .when(
  //         [
  //           "agentTypeTransactionCustomerIsMaxAmountApplicableRegular",
  //           "regularCustomerCashInAgentCollapse",
  //         ],
  //         {
  //           is: (
  //             agentTypeTransactionCustomerIsMaxAmountApplicableRegular: boolean,
  //             regularCustomerCashInAgentCollapse: boolean,
  //           ) =>
  //             !agentTypeTransactionCustomerIsMaxAmountApplicableRegular &&
  //             regularCustomerCashInAgentCollapse === true,
  //           then: yup
  //             .string()
  //             .required()
  //             .test("typeError", "Specify valid number", (value: any) => {
  //               if (value !== ".") return true
  //               return false
  //             })
  //             .test(
  //               "upToDecimalDigits",
  //               "Specify number upto 2 decimal digits.",
  //               (newVal: any) => {
  //                 if (
  //                   (newVal &&
  //                     newVal.includes(".") &&
  //                     newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                     newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //                   !newVal ||
  //                   !newVal.includes(".")
  //                 )
  //                   return true
  //                 return false
  //               },
  //             )
  //             .transform((value) => value?.replaceAll(",", ""))
  //             .test(
  //               "greaterThanMinRange",
  //               "Maximum Balance should be greater than Minimum Balance",
  //               (item: any, context: any) => {
  //                 if (
  //                   context.parent.regularCustomerCashInAgentCollapse !== true
  //                 )
  //                   return true
  //                 if (
  //                   Number(
  //                     context.parent.agentTypeTransactionCustomerMinAmountRegular?.replaceAll(
  //                       ",",
  //                       "",
  //                     ),
  //                   ) >= Number(item) &&
  //                   context.parent
  //                     .agentTypeTransactionCustomerIsMaxAmountApplicableRegular !==
  //                     true
  //                 )
  //                   return false

  //                 return true
  //               },
  //             )
  //             .test(
  //               "upToDecimalDigits",
  //               "Specify number should less than 9999999999.99",
  //               (newVal: any) => {
  //                 newVal = newVal?.replaceAll(",", "")
  //                 if (newVal && Number(newVal) <= 9999999999.99) return true
  //                 return false
  //               },
  //             ),
  //         },
  //       ),
  //     ChannelAgentCustomerIslamic: yup
  //       .string()
  //       .when(["islamicCustomerCashInAgentCollapse"], {
  //         is: true,
  //         then: (scheme) => scheme.required(),
  //       }),
  //     agentTypeTransactionCustomerMinAmountIslamic: yup
  //       .string()
  //       .when(["islamicCustomerCashInAgentCollapse"], {
  //         is: true,
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
  //             "upToDecimalDigits",
  //             "Specify number should less than 9999999999.99",
  //             (newVal: any) => {
  //               newVal = newVal?.replaceAll(",", "")
  //               if (newVal && Number(newVal) <= 9999999999.99) return true
  //               return false
  //             },
  //           ),
  //       }),
  //     agentTypeTransactionCustomerMaxAmountIslamic: yup
  //       .string()
  //       .transform((value) => value?.replaceAll(",", ""))
  //       .test(
  //         "greaterThanMinRange",
  //         "Maximum Balance should be greater than Minimum Balance",
  //         (item: any, context: any) => {
  //           if (context.parent.islamicCustomerCashInAgentCollapse !== true)
  //             return true
  //           if (
  //             Number(
  //               context.parent.agentTypeTransactionCustomerMinAmountIslamic?.replaceAll(
  //                 ",",
  //                 "",
  //               ),
  //             ) >= Number(item) &&
  //             context.parent
  //               .agentTypeTransactionCustomerIsMaxAmountApplicableIslamic !==
  //               true
  //           )
  //             return false

  //           return true
  //         },
  //       )
  //       .when(
  //         [
  //           "agentTypeTransactionCustomerIsMaxAmountApplicableIslamic",
  //           "islamicCustomerCashInAgentCollapse",
  //         ],
  //         {
  //           is: (
  //             agentTypeTransactionCustomerIsMaxAmountApplicableIslamic: boolean,
  //             islamicCustomerCashInAgentCollapse: boolean,
  //           ) =>
  //             !agentTypeTransactionCustomerIsMaxAmountApplicableIslamic &&
  //             islamicCustomerCashInAgentCollapse === true,
  //           then: yup
  //             .string()
  //             .required()
  //             .test("typeError", "Specify valid number", (value: any) => {
  //               if (value !== ".") return true
  //               return false
  //             })
  //             .test(
  //               "upToDecimalDigits",
  //               "Specify number upto 2 decimal digits.",
  //               (newVal: any) => {
  //                 if (
  //                   (newVal &&
  //                     newVal.includes(".") &&
  //                     newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                     newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //                   !newVal ||
  //                   !newVal.includes(".")
  //                 )
  //                   return true
  //                 return false
  //               },
  //             )
  //             .transform((value) => value?.replaceAll(",", ""))
  //             .test(
  //               "greaterThanMinRange",
  //               "Maximum Balance should be greater than Minimum Balance",
  //               (item: any, context: any) => {
  //                 if (
  //                   context.parent.islamicCustomerCashInAgentCollapse !== true
  //                 )
  //                   return true
  //                 if (
  //                   Number(
  //                     context.parent.agentTypeTransactionCustomerMinAmountIslamic?.replaceAll(
  //                       ",",
  //                       "",
  //                     ),
  //                   ) >= Number(item) &&
  //                   context.parent
  //                     .agentTypeTransactionCustomerIsMaxAmountApplicableIslamic !==
  //                     true
  //                 )
  //                   return false

  //                 return true
  //               },
  //             )
  //             .test(
  //               "upToDecimalDigits",
  //               "Specify number should less than 9999999999.99",
  //               (newVal: any) => {
  //                 newVal = newVal?.replaceAll(",", "")
  //                 if (newVal && Number(newVal) <= 9999999999.99) return true
  //                 return false
  //               },
  //             ),
  //         },
  //       ),
  //   }
  //   validationSchema = { ...validationSchema, ...customerSchema }
  // }

  // // distributor
  // if (transactionDetails?.distributor?.initiatedTransactionsList) {
  //   const distributorSchema = {
  //     ChannelAgentDistributor: yup
  //       .string()
  //       .when(
  //         [
  //           `${transactionDetails?.distributor?.initiatedTransactionsList[0]?.transactionTypeDisplayName}`,
  //         ],
  //         {
  //           is: true,
  //           then: (scheme) => scheme.required(),
  //         },
  //       ),
  //     distributorMinAmount: yup
  //       .string()
  //       // .transform((value: number) => (Number.isNaN(value) ? undefined : value))
  //       .when(
  //         [
  //           `${transactionDetails?.distributor?.initiatedTransactionsList[0]?.transactionTypeDisplayName}`,
  //         ],
  //         {
  //           is: true,
  //           then: (scheme) =>
  //             scheme
  //               .required()
  //               .test("typeError", "Specify valid number", (value: any) => {
  //                 if (value !== ".") return true
  //                 return false
  //               })
  //               .test(
  //                 "upToDecimalDigits",
  //                 "Specify number upto 2 decimal digits.",
  //                 (newVal: any) => {
  //                   if (
  //                     (newVal &&
  //                       newVal.includes(".") &&
  //                       newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                       newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //                     !newVal ||
  //                     !newVal.includes(".")
  //                   )
  //                     return true
  //                   return false
  //                 },
  //               )
  //               .test(
  //                 "upToDecimalDigits",
  //                 "Specify number should less than 9999999999.99",
  //                 (newVal: any) => {
  //                   newVal = newVal?.replaceAll(",", "")
  //                   if (newVal && Number(newVal) <= 9999999999.99) return true
  //                   return false
  //                 },
  //               ),
  //         },
  //       ),
  //     distributorMaxAmount: yup
  //       .string()
  //       .when(
  //         [
  //           `${transactionDetails?.distributor?.initiatedTransactionsList[0]?.transactionTypeDisplayName}`,
  //         ],
  //         {
  //           is: true,
  //           then: (scheme) =>
  //             scheme.when(["distributorIsMaxAmountApplicable"], {
  //               is: (distributorIsMaxAmountApplicable: boolean) => {
  //                 return !distributorIsMaxAmountApplicable
  //               },
  //               then: (scheme2) =>
  //                 scheme2
  //                   .required()
  //                   .test("typeError", "Specify valid number", (value: any) => {
  //                     if (value !== ".") return true
  //                     return false
  //                   })
  //                   .test(
  //                     "upToDecimalDigits",
  //                     "Specify number upto 2 decimal digits.",
  //                     (newVal: any) => {
  //                       if (
  //                         (newVal &&
  //                           newVal.includes(".") &&
  //                           newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                           newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //                         !newVal ||
  //                         !newVal.includes(".")
  //                       )
  //                         return true
  //                       return false
  //                     },
  //                   )
  //                   .transform((value) => value?.replaceAll(",", ""))
  //                   .test(
  //                     "greaterThanMinRange",
  //                     "Maximum Balance should be greater than Minimum Balance",
  //                     (item: any, context: any) => {
  //                       if (
  //                         context.parent[
  //                           `${transactionDetails?.distributor?.initiatedTransactionsList[0]?.transactionTypeDisplayName}`
  //                         ] !== true
  //                       )
  //                         return true
  //                       if (
  //                         Number(
  //                           context.parent.distributorMinAmount?.replaceAll(
  //                             ",",
  //                             "",
  //                           ),
  //                         ) >= Number(item) &&
  //                         context.parent.distributorIsMaxAmountApplicable !==
  //                           true
  //                       )
  //                         return false

  //                       return true
  //                     },
  //                   )
  //                   .test(
  //                     "upToDecimalDigits",
  //                     "Specify number should less than 9999999999.99",
  //                     (newVal: any) => {
  //                       newVal = newVal?.replaceAll(",", "")
  //                       if (newVal && Number(newVal) <= 9999999999.99)
  //                         return true
  //                       return false
  //                     },
  //                   ),
  //             }),
  //         },
  //       ),
  //   }
  //   validationSchema = { ...validationSchema, ...distributorSchema }
  // }

  // // dso
  // if (transactionDetails?.dso?.initiatedTransactionsList) {
  //   const dsoSchema = {
  //     ChannelAgentDso: yup
  //       .string()
  //       .when(
  //         [
  //           `${transactionDetails?.dso?.initiatedTransactionsList[0]?.transactionTypeDisplayName}`,
  //         ],
  //         {
  //           is: true,
  //           then: (scheme) => scheme.required(),
  //         },
  //       ),
  //     dsoMinAmount: yup
  //       .string()
  //       // .transform((value: number) => (Number.isNaN(value) ? undefined : value))
  //       .when(
  //         [
  //           `${transactionDetails?.dso?.initiatedTransactionsList[0]?.transactionTypeDisplayName}`,
  //         ],
  //         {
  //           is: true,
  //           then: (scheme) =>
  //             scheme
  //               .required()
  //               .test("typeError", "Specify valid number", (value: any) => {
  //                 if (value !== ".") return true
  //                 return false
  //               })
  //               .test(
  //                 "upToDecimalDigits",
  //                 "Specify number upto 2 decimal digits.",
  //                 (newVal: any) => {
  //                   if (
  //                     (newVal &&
  //                       newVal.includes(".") &&
  //                       newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                       newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //                     !newVal ||
  //                     !newVal.includes(".")
  //                   )
  //                     return true
  //                   return false
  //                 },
  //               )
  //               .test(
  //                 "upToDecimalDigits",
  //                 "Specify number should less than 9999999999.99",
  //                 (newVal: any) => {
  //                   newVal = newVal?.replaceAll(",", "")
  //                   if (newVal && Number(newVal) <= 9999999999.99) return true
  //                   return false
  //                 },
  //               ),
  //         },
  //       ),
  //     dsoMaxAmount: yup
  //       .string()
  //       .when(
  //         [
  //           `${transactionDetails?.dso?.initiatedTransactionsList[0]?.transactionTypeDisplayName}`,
  //         ],
  //         {
  //           is: true,
  //           then: (scheme) =>
  //             scheme.when(["dsoIsMaxAmountApplicable"], {
  //               is: (dsoIsMaxAmountApplicable: boolean) => {
  //                 return !dsoIsMaxAmountApplicable
  //               },
  //               then: (scheme2) =>
  //                 scheme2
  //                   .required()
  //                   .test("typeError", "Specify valid number", (value: any) => {
  //                     if (value !== ".") return true
  //                     return false
  //                   })
  //                   .test(
  //                     "upToDecimalDigits",
  //                     "Specify number upto 2 decimal digits.",
  //                     (newVal: any) => {
  //                       if (
  //                         (newVal &&
  //                           newVal.includes(".") &&
  //                           newVal.length - 1 - newVal.indexOf(".") <= 2 &&
  //                           newVal.length - 1 - newVal.indexOf(".") > 0) ||
  //                         !newVal ||
  //                         !newVal.includes(".")
  //                       )
  //                         return true
  //                       return false
  //                     },
  //                   )
  //                   .transform((value) => value?.replaceAll(",", ""))
  //                   .test(
  //                     "greaterThanMinRange",
  //                     "Maximum Balance should be greater than Minimum Balance",
  //                     (item: any, context: any) => {
  //                       if (
  //                         context.parent[
  //                           `${transactionDetails?.dso?.initiatedTransactionsList[0]?.transactionTypeDisplayName}`
  //                         ] !== true
  //                       )
  //                         return true
  //                       if (
  //                         Number(
  //                           context.parent.dsoMinAmount?.replaceAll(",", ""),
  //                         ) >= Number(item) &&
  //                         context.parent.dsoIsMaxAmountApplicable !== true
  //                       )
  //                         return false

  //                       return true
  //                     },
  //                   )
  //                   .test(
  //                     "upToDecimalDigits",
  //                     "Specify number should less than 9999999999.99",
  //                     (newVal: any) => {
  //                       newVal = newVal?.replaceAll(",", "")
  //                       if (newVal && Number(newVal) <= 9999999999.99)
  //                         return true
  //                       return false
  //                     },
  //                   ),
  //             }),
  //         },
  //       ),
  //   }
  //   validationSchema = { ...validationSchema, ...dsoSchema }
  // }

  // merchant
  const agentSchema: any = {}
  if (transactionDetails?.agent?.initiatedTransactionsList?.length > 0) {
    console.log(transactionDetails.merchant, "TXX")

    transactionDetails.agent.initiatedTransactionsList.forEach(
      (txn: any, index: any) => {
        const txnDisplayName = txn.transactionTypeDisplayName || ""
        // if (!txnDisplayName) {
        //   console.warn(
        //     `Skipping txn at index ${index} because txnDisplayName is undefined`,
        //   )
        //   return // Skip this iteration if the field is invalid
        // }
        // console.log("TXNDISPLAY", txn, txnDisplayName, index)
        // merchantSchema[`agentMinAmount${index}`] = yup
        //   .string()
        //   .when([txnDisplayName], {
        //     is: (value: boolean) => {
        //       console.log("VALUE", value)
        //       return value === true
        //     },
        //     then: (schema) => schema.required("Minimum amount is required"),
        //     otherwise: (schema) => schema,
        //   })
        // merchantSchema[`agentMaxAmount${index}`] = yup
        //   .string()
        //   .when([txnDisplayName], {
        //     is: (value: boolean) => {
        //       console.log("VALUE", value)
        //       return value !== false
        //     },
        //     then: (schema) => schema.required("Minimum amount is required"),
        //     otherwise: (schema) => schema,
        //   })

        agentSchema[`agentMinAmount${index}`] = yup
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
        agentSchema[`agentMaxAmount${index}`] = yup
          .string()
          .when(`agentIsMaxAmountApplicable${index}`, {
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

  const bankSchema: any = {}
  if (transactionDetails?.bank?.initiatedTransactionsList?.length > 0) {
    console.log(transactionDetails.merchant, "TXX")

    transactionDetails.bank.initiatedTransactionsList.forEach(
      (txn: any, index: any) => {
        const txnDisplayName = txn.transactionTypeDisplayName || ""

        bankSchema[`bankMinAmount${index}`] = yup
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
        bankSchema[`bankMaxAmount${index}`] = yup
          .string()
          .when(`bankIsMaxAmountApplicable${index}`, {
            is: (isApplicable: boolean) =>
              isApplicable === false && Boolean(txnDisplayName),
            then: (schema) => schema.required("Maximum amount is required"),
            otherwise: (schema) => schema.notRequired(),
          })
      },
    )
  }

  const nfsSchema: any = {}
  if (transactionDetails?.nfs?.initiatedTransactionsList?.length > 0) {
    console.log(transactionDetails.merchant, "TXX")

    transactionDetails.nfs.initiatedTransactionsList.forEach(
      (txn: any, index: any) => {
        const txnDisplayName = txn.transactionTypeDisplayName || ""

        nfsSchema[`nfsMinAmount${index}`] = yup
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
        nfsSchema[`nfsMaxAmount${index}`] = yup
          .string()
          .when(`nfsIsMaxAmountApplicable${index}`, {
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
    ...agentSchema,
    ...customerSchema,
    ...serviceSchema,
    ...bankSchema,
    ...nfsSchema,
  })
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
              otherwise: (scheme) =>
                scheme.when("dailyCountIsApplicable", {
                  is: true,
                  then: (scheme1) => scheme1.nullable().required(""),
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
                  then: (scheme1) => scheme1.nullable().required(""),
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
                  then: (scheme1) => scheme1.nullable().required(""),
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
                  then: (scheme1) => scheme1.nullable().required(""),
                  otherwise: (scheme1) =>
                    scheme1.when("weeklyAmount", (weeklyAmount, scheme2) =>
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
                        then: (scheme1) => scheme1.nullable().required(""),
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
                        then: (scheme1) => scheme1.nullable().required(""),
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
                        then: (scheme1) => scheme1.nullable().required(""),
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
                        then: (scheme1) => scheme1.nullable().required(""),
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

export default agentTypeFormSchema
