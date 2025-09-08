/* eslint-disable no-else-return */
import * as yup from "yup"
import "app/Yup.config"
import { IDefaultValueObject } from "app/models/form"
import { genValidation } from "app/utils/commonFunctions"
import {
  convertEpochTimestampToDDMMYYYYhhmmAMPM,
  getDateTimeEpoch,
} from "app/utils/dateUtils"

function merchantTypeFormSchema(formStage: string) {
  let validationSchema = yup.object()

  const deviceBlockSchema = {
    deviceID: genValidation({
      type: "string",
      isRequired: true,
    }),
    DeviceBlockDate: yup
      .string()
      .nullable()
      .notRequired()
      .when(["DeviceBlockDate"], {
        is: (DeviceBlockDate: string) => DeviceBlockDate?.toString?.length,
        then: genValidation({
          type: "date",
          isNullable: true,
          label: "please enter valid Date",
        }),
      }),
    DeviceBlockTime: yup
      .string()
      .nullable()
      .when(["DeviceBlockDate"], {
        is: (DeviceBlockDate: Date) => DeviceBlockDate,
        then: yup
          .string()
          .nullable()
          .test(
            "min_end_time",
            "Cannot pick past hours",
            (value: string | undefined | null, context: any) => {
              const { DeviceBlockDate } = context.parent
              if (value) {
                const sDate = Number(DeviceBlockDate)
                const tVal = getDateTimeEpoch(sDate, Number(value))
                const now = new Date()
                return now.getTime() <= new Date(tVal).getTime()
              }
              return false
            },
          ),
      }),
  }

  const bulkOperatorSchema = {
    excelFile: genValidation({
      type: "uploadedFile",
      isRequired: true,
      label: "Excel file",
    }),
  }

  const channelBlockSchema = {
    ChannelsOfChannelBlock:
      // genValidation({
      //   type: "string",
      //   isRequired: true,
      // }),

      yup.string().when(["ChannelsOfChannelBlock"], {
        is: (ChannelsOfChannelBlock: string) => {
          return ChannelsOfChannelBlock || !ChannelsOfChannelBlock
        },

        then: yup
          .string()
          .nullable()
          .test(
            "channels_required",
            "Channel(s) is required",
            (values: string | undefined | null) => {
              if (values && values?.length > 0) {
                return true
              }
              return !!values
            },
          ),
      }),

    ChannelBlockDate: yup
      .string()
      .nullable()
      .when(["ChannelBlockTime", "ChannelBlockDate"], {
        // is: (ChannelBlockTime: string, ChannelBlockDate: string) => {
        //   console.log(ChannelBlockTime)
        //   console.log("ChannelBlockDate", ChannelBlockDate)
        //   return (
        //     ChannelBlockDate == null &&
        //     (ChannelBlockTime?.toString?.length > 1 ||
        //       (ChannelBlockTime?.toString?.length === 1 &&
        //         ChannelBlockTime !== "0"))
        //   )
        // },
        // then: genValidation({
        //   type: "string",
        //   isNullable: true,
        //   isRequired: true,
        //   label: "Please enter valid Date",
        // }),

        is: (ChannelBlockTime: Date) => ChannelBlockTime,
        then: yup
          .string()
          .nullable()
          .test(
            "date_required",
            "Select appropriate date",
            (_value: string | undefined | null, context: any) => {
              const { ChannelBlockTime, ChannelBlockDate } = context.parent
              console.log("ChannelBlockTime", ChannelBlockTime)
              if (
                ChannelBlockDate == null &&
                (ChannelBlockTime?.toString?.length > 1 ||
                  (ChannelBlockTime?.toString?.length === 1 &&
                    ChannelBlockTime !== "0"))
              ) {
                return false
              }
              return !!ChannelBlockDate
            },
          ),
      }),

    // .test("if_time_present", "Date is required when time is present",
    //   function(value: string | undefined | null, context: any) {

    //   }
    // ),
    // .when(["ChannelBlockTime"], {
    //   is: (ChannelBlockTime: string) => ChannelBlockTime,
    //   then: yup.string().required(),
    // }),
    // .when(["ChannelBlockTime"], {
    //   is: (value: any) => value && value.length > 0,
    //   then: yup.string().required("Date should be selected"),
    //   otherwise: yup.string().notRequired,
    // }),

    ChannelBlockTime: yup
      .string()
      .nullable()
      .when(["ChannelBlockDate"], {
        is: (ChannelBlockDate: Date) => ChannelBlockDate,
        then: yup
          .string()
          .nullable()
          .test(
            "min_end_time",
            "Cannot pick past hours",
            (value: string | undefined | null, context: any) => {
              const { ChannelBlockDate } = context.parent
              if (value) {
                const sDate = Number(ChannelBlockDate)
                const tVal = getDateTimeEpoch(sDate, Number(value))
                const now = new Date()
                return now.getTime() <= new Date(tVal).getTime()
              }
              return false
            },
          )
          .test(
            "min_end_time_gap",
            "Cannot pick time other than gap of 15 mins",
            (value: string | undefined | null) => {
              if (value !== "") {
                return (
                  Number(
                    convertEpochTimestampToDDMMYYYYhhmmAMPM(Number(value))
                      ?.split(":")[1]
                      ?.split(" ")[0],
                  ) %
                    15 ===
                  0
                )
              }
              return false
            },
          ),
      }),

    // .when(["ChannelBlockDate"], {
    //   is: (value: any) => value && value.length > 0,
    //   then: yup.string().required("Time should be selected"),
    //   otherwise: yup.string().notRequired,
    // }),

    // .when(["ChannelBlockDate"], {
    //   is: (ChannelBlockDate: Date) => ChannelBlockDate,
    //   then: yup
    //     .string()
    //     .nullable()
    //     .test(
    //       "min_end_time",
    //       "Cannot pick time other than specified gap",
    //       function (value: string | undefined | null) {
    //         if (
    //           Number(value) &&
    //           value !== "" &&
    //           Number(value?.split(":")[1]) % 15 !== 0
    //         ) {
    //           return true
    //         }
    //         return false
    //       },
    //     ),
    // }),
  }
  const transactionBlockSchema0 = {
    transactions1: genValidation({
      type: "object",
      isNullable: true,
      isRequired: true,
    }),
  }
  const transactionBlockSchema1 = {
    transactions: genValidation({
      type: "multiSelectArrayOptions",
      minArraySize: 1,
    }),
    transactionBlockDate: yup
      .string()
      .nullable()
      .notRequired()
      .when(["transactionBlockDate"], {
        is: (transactionBlockDate: string) =>
          transactionBlockDate?.toString?.length,
        then: genValidation({
          type: "date",
          isFutureDate: true,
          isNullable: true,
          isRequired: true,
          label: "please enter valid Date",
        }),
      }),
    transactionBlockTime: yup
      .string()
      .nullable()
      .when(["transactionBlockDate"], {
        is: (transactionBlockDate: Date) => transactionBlockDate,
        then: yup
          .string()
          .required()
          .nullable()
          .test(
            "min_end_time",
            "Cannot pick past hours",
            (value: string | undefined | null, context: any) => {
              const { transactionBlockDate } = context.parent
              if (value) {
                const sDate = Number(transactionBlockDate)
                const tVal = getDateTimeEpoch(sDate, Number(value))
                const now = new Date()
                return now.getTime() <= new Date(tVal).getTime()
              }
              return false
            },
          ),
      }),
  }

  const trustLevelSchema = {
    name: yup.string().required(),
    minBalance: yup.string().when(["name"], {
      is: (name: string) => name.length > 0,
      then: yup.string().required(),
    }),
    maxBalance: yup
      .string()
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (
            Number(context.parent.minBalance) >= Number(item) &&
            context.parent.isMaxBalanceNotApplicable !== true
          )
            return false
          return true
        },
      )
      .when(["isMaxBalanceNotApplicable", "name"], {
        is: (isMaxBalanceNotApplicable: boolean, name: string) =>
          name.length > 0 && !isMaxBalanceNotApplicable,
        then: yup.string().required(),
      }),
  }

  const merchantTypeStep1AddMoney = {
    ChannelViaLifting: yup.string().when(["viaLifting"], {
      is: true,
      then: (scheme) => scheme.required(),
    }),
    viaBankMinAmount: yup.string().when(["viaBank"], {
      is: (viaBank: boolean) => viaBank,
      then: yup.string().required(),
    }),
    viaBankMaxAmount: yup
      .string()
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (context.parent.viaBank !== true) return true
          if (
            Number(context.parent.viaBankMinAmount) >= Number(item) &&
            context.parent.viaBankIsMaxNotAmountApplicable !== true
          )
            return false
          return true
        },
      )
      .when(["viaBankIsMaxNotAmountApplicable", "viaBank"], {
        is: (viaBankIsMaxNotAmountApplicable: boolean, viaBank: boolean) =>
          !viaBankIsMaxNotAmountApplicable && viaBank,
        then: yup.string().required(),
      }),
    // Card
    viaCardMinAmount: yup.string().when(["viaCard"], {
      is: (viaCard: boolean) => viaCard,
      then: yup.string().required(),
    }),
    viaCardMaxAmount: yup
      .string()
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (context.parent.viaCard !== true) return true
          if (
            Number(context.parent.viaCardMinAmount) >= Number(item) &&
            context.parent.viaCardIsMaxNotAmountApplicable !== true
          )
            return false
          return true
        },
      )
      .when(["viaCardIsMaxNotAmountApplicable", "viaCard"], {
        is: (viaCardIsMaxNotAmountApplicable: boolean, viaCard: boolean) =>
          !viaCardIsMaxNotAmountApplicable && viaCard,
        then: yup.string().required(),
      }),
    // Lifting
    autoLiftingThreshold: yup.string().when(["viaLifting", "autoLifting"], {
      is: (viaLifting: boolean, autoLifting: boolean) =>
        viaLifting && autoLifting,
      then: yup.string().required(),
    }),
    viaLiftingMinAmount: yup.string().when(["viaLifting"], {
      is: (viaLifting: boolean) => {
        return viaLifting
      },
      then: yup.string().required(),
    }),
    viaLiftingMaxAmount: yup
      .string()
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (context.parent.viaLifting !== true) return true
          if (
            Number(context.parent.viaLiftingMinAmount) >= Number(item) &&
            context.parent.viaLiftingIsMaxNotAmountApplicable !== true
          )
            return false
          return true
        },
      )
      .when(["viaLiftingIsMaxNotAmountApplicable", "viaLifting"], {
        is: (
          viaLiftingIsMaxNotAmountApplicable: boolean,
          viaLifting: boolean,
        ) => !viaLiftingIsMaxNotAmountApplicable && viaLifting,
        then: yup.string().required(),
      }),
    viaLiftingSelectBank: yup.mixed().when(["viaLifting"], {
      is: (viaLifting: boolean) => viaLifting,
      then: genValidation({
        type: "multiSelectArrayOptions",
        minArraySize: 1,
      }),
    }),
  }

  const merchantTypeStep1Settlement = {
    ChannelSettlementsMerchantType: yup.string().when(["settlementFeeFields"], {
      is: true,
      then: (scheme) => scheme.required(),
    }),
    manualSettlementFeeMinAmount: yup
      .string()
      .when(["manualSettlementFields"], {
        is: true,
        then: yup.string().required(),
      }),
    manualExcludingBalance: yup.string().when(["manualSettlementFields"], {
      is: true,
      then: yup.string().required(),
    }),

    autoSettlementFeeMinAmount: yup.string().when(["autoSettlementFields"], {
      is: true,
      then: yup.string().required(),
    }),
    autoExcludingBalance: yup.string().when(["autoSettlementFields"], {
      is: true,
      then: yup.string().required(),
    }),

    settlementPolicy: yup.mixed().when(["autoSettlementFields"], {
      is: true,
      then: yup.mixed().required(),
    }),

    settlementPolicyMonthlyDay: yup
      .mixed()
      .when(["autoSettlementFields", "settlementPolicy"], {
        is: (autoSettlementFields: boolean, settlementPolicy: string) =>
          settlementPolicy === "Monthly" && autoSettlementFields,
        then: yup.mixed().required(),
      }),

    settlementPolicyMonthlyHours: yup
      .mixed()
      .when(["autoSettlementFields", "settlementPolicy"], {
        is: (autoSettlementFields: boolean, settlementPolicy: string) =>
          settlementPolicy === "Monthly" && autoSettlementFields,
        then: yup.mixed().required(),
      }),

    settlementPolicyMonthlyMinutes: yup
      .mixed()
      .when(["autoSettlementFields", "settlementPolicy"], {
        is: (autoSettlementFields: boolean, settlementPolicy: string) =>
          settlementPolicy === "Monthly" && autoSettlementFields,
        then: yup.mixed().required(),
      }),

    settlementPolicyWeeklyDay: yup
      .mixed()
      .when(["autoSettlementFields", "settlementPolicy"], {
        is: (autoSettlementFields: boolean, settlementPolicy: string) =>
          settlementPolicy === "Weekly" && autoSettlementFields,
        then: yup.mixed().required(),
      }),

    settlementPolicyWeeklyHours: yup
      .mixed()
      .when(["autoSettlementFields", "settlementPolicy"], {
        is: (autoSettlementFields: boolean, settlementPolicy: string) =>
          settlementPolicy === "Weekly" && autoSettlementFields,
        then: yup.mixed().required(),
      }),

    settlementPolicyWeeklyMinutes: yup
      .mixed()
      .when(["autoSettlementFields", "settlementPolicy"], {
        is: (autoSettlementFields: boolean, settlementPolicy: string) =>
          settlementPolicy === "Weekly" && autoSettlementFields,
        then: yup.mixed().required(),
      }),

    settlementFeeFields: yup.boolean(),
    autoSettlementFields: yup
      .boolean()
      .when(["settlementFeeFields", "manualSettlementFields"], {
        is: (settlementFeeFields: boolean, manualSettlementFields2: boolean) =>
          settlementFeeFields && !manualSettlementFields2,
        then: (instance) => {
          return instance.isTrue(
            "Auto Settlement / Manual Settlement should be enabled",
          )
        },
      }),
    manualSettlementFields: yup
      .boolean()
      .when(["settlementFeeFields", "autoSettlementFields"], {
        is: (settlementFeeFields: boolean, autoSettlementFields2: boolean) =>
          settlementFeeFields && !autoSettlementFields2,
        then: (instance) => {
          return instance.isTrue(
            "Auto Settlement / Manual Settlement should be enabled",
          )
        },
      }),
  }

  const merchantTypeStep2 = {}

  const merchantTypeStep1OtherFunctionality = {
    billPaymentMinAmountAPP: yup
      .string()
      .when(["Bill Payment - Regular Merchant APP"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),
    billPaymentMaxAmountAPP: yup
      .string()
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (context.parent["Bill Payment - Regular Merchant APP"] !== true)
            return true
          if (
            Number(context.parent.billPaymentMinAmountAPP) >= Number(item) &&
            context.parent.billPaymentIsMaxAmountApplicableAPP !== true
          )
            return false
          return true
        },
      ),

    billPaymentMinAmountUSSD: yup
      .string()
      .when(["Bill Payment - Regular Merchant USSD"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),
    billPaymentMaxAmountUSSD: yup
      .string()
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (context.parent["Bill Payment - Regular Merchant USSD"] !== true)
            return true
          if (
            Number(context.parent.billPaymentMinAmountUSSD) >= Number(item) &&
            context.parent.billPaymentIsMaxAmountApplicableUSSD !== true
          )
            return false
          return true
        },
      ),
    emiBillPayMinAmountAPP: yup
      .string()
      .when(["EMI Bill Pay - Regular Merchant APP"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),
    emiBillPayMaxAmountAPP: yup
      .string()
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (context.parent["EMI Bill Pay - Regular Merchant APP"] !== true)
            return true
          if (
            Number(context.parent.emiBillPayMinAmountAPP) >= Number(item) &&
            context.parent.emiBillPayIsMaxAmountApplicableAPP !== true
          )
            return false
          return true
        },
      ),

    emiBillPayMinAmountUSSD: yup
      .string()
      .when(["EMI Bill Pay - Regular Merchant USSD"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),
    emiBillPayMaxAmountUSSD: yup
      .string()
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (context.parent["EMI Bill Pay - Regular Merchant USSD"] !== true)
            return true
          if (
            Number(context.parent.emiBillPayMinAmountUSSD) >= Number(item) &&
            context.parent.emiBillPayIsMaxAmountApplicableUSSD !== true
          )
            return false
          return true
        },
      ),
    mobileRechargeRegularMerchantMinAmountAPP: yup
      .string()
      .when(["Mobile Recharge - Regular Merchant APP"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),
    mobileRechargeRegularMerchantMaxAmountAPP: yup
      .string()
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (context.parent["Mobile Recharge - Regular Merchant APP"] !== true)
            return true
          if (
            Number(context.parent.mobileRechargeRegularMerchantMinAmountAPP) >=
              Number(item) &&
            context.parent
              .mobileRechargeRegularMerchantIsMaxAmountApplicableAPP !== true
          )
            return false
          return true
        },
      ),

    mobileRechargeRegularMerchantMinAmountUSSD: yup
      .string()
      .when(["Mobile Recharge - Regular Merchant USSD"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),
    mobileRechargeRegularMerchantMaxAmountUSSD: yup
      .string()
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (
            context.parent["Mobile Recharge - Regular Merchant USSD"] !== true
          )
            return true
          if (
            Number(context.parent.mobileRechargeRegularMerchantMinAmountUSSD) >=
              Number(item) &&
            context.parent
              .mobileRechargeRegularMerchantIsMaxAmountApplicableUSSD !== true
          )
            return false
          return true
        },
      ),
    eComMerchantPaymentMinAmountRegular: yup
      .string()
      .when(["e-Comm Merchant Payment - Regular Customer WEB"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),
    eComMerchantPaymentMaxAmountRegular: yup
      .string()
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (
            context.parent["e-Comm Merchant Payment - Regular Customer WEB"] !==
            true
          )
            return true
          if (
            Number(context.parent.eComMerchantPaymentMinAmountRegular) >=
              Number(item) &&
            context.parent.eComMerchantPaymentIsMaxAmountApplicableRegular !==
              true
          )
            return false
          return true
        },
      ),

    eComMerchantPaymentMinAmountIslamic: yup
      .string()
      .when(["e-Comm Merchant Payment - Islamic Customer WEB"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),
    eComMerchantPaymentMaxAmountIslamic: yup
      .string()
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (
            context.parent["e-Comm Merchant Payment - Islamic Customer WEB"] !==
            true
          )
            return true
          if (
            Number(context.parent.eComMerchantPaymentMinAmountIslamic) >=
              Number(item) &&
            context.parent.eComMerchantPaymentIsMaxAmountApplicableIslamic !==
              true
          )
            return false
          return true
        },
      ),
    eComMerchantPaymentMinAmountAgent: yup
      .string()
      .when(["e-Comm Merchant Payment - Agent"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),
    eComMerchantPaymentMaxAmountAgent: yup
      .string()
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (context.parent["e-Comm Merchant Payment - Agent"] !== true)
            return true
          if (
            Number(context.parent.eComMerchantPaymentMinAmountAgent) >=
              Number(item) &&
            context.parent.eComMerchantPaymentIsMaxAmountApplicableAgent !==
              true
          )
            return false
          return true
        },
      ),
    qrCodeMinAmount: yup.string().when(["QR CODE"], {
      is: true,
      then: (scheme) => scheme.required(),
    }),
    qrCodeMaxAmount: yup
      .string()
      .test(
        "greaterThanMinRange",
        "Maximum Balance should be greater than Minimum Balance",
        (item: any, context: any) => {
          if (context.parent["QR CODE"] !== true) return true
          if (
            Number(context.parent.qrCodeMinAmount) >= Number(item) &&
            context.parent.qrCodeIsMaxAmountApplicable !== true
          )
            return false
          return true
        },
      ),
    tcsaTransit: yup.mixed().when(["Inward Remittance"], {
      is: true,
      then: (scheme) => scheme.required(),
    }),
    // apiCallCanceledInDays: yup.string().when(["Receive Online Payment"], {
    //   is: true,
    //   then: (scheme) => scheme.required(),
    // }),
    captureAfterAuthorization: yup.mixed().when(["Receive Online Payment"], {
      is: true,
      then: (scheme) => scheme.required(),
    }),
    // feeCode: yup.mixed().when(["Receive Online Payment"], {
    //   is: true,
    //   then: (scheme) => scheme.required(),
    // }),
    // commissionCode: yup.mixed().when(["Receive Online Payment"], {
    //   is: true,
    //   then: (scheme) => scheme.required(),
    // }),
    TokenisedEcomPaymentmaxAmountPerTransaction: yup
      .mixed()
      .when(["Receive Online Payment"], {
        is: true,
        then: yup.mixed().when(["Tokenised Ecom Payment"], {
          is: true,
          then: yup.string().required(),
        }),
      }),
    TokenisedEcomPaymentdailyCountPerUser: yup
      .mixed()
      .when(["Receive Online Payment"], {
        is: true,
        then: (scheme) =>
          scheme.when(["Tokenised Ecom Payment"], {
            is: true,
            then: yup.string().required(),
          }),
      }),
    TokenisedEcomPaymentdailyAmountPerUser: yup
      .mixed()
      .when(["Receive Online Payment"], {
        is: true,
        then: (scheme) =>
          scheme.when(["Tokenised Ecom Payment"], {
            is: true,
            then: yup.string().required(),
          }),
      }),
    TokenisedEcomPaymentmonthlyCountPerUser: yup
      .number()
      .transform((value: number) => (Number.isNaN(value) ? undefined : value))
      .when(["Receive Online Payment"], {
        is: true,
        then: (scheme) =>
          scheme.when(["Tokenised Ecom Payment"], {
            is: true,
            then: yup
              .number()
              .required()
              .moreThan(
                yup.ref("TokenisedEcomPaymentdailyCountPerUser"),
                "Monthly count should be greater than daily count",
              ),
          }),
      }),
    TokenisedEcomPaymentmonthlyAmountPerUser: yup
      .number()
      .transform((value: number) => (Number.isNaN(value) ? undefined : value))
      .when(["Receive Online Payment"], {
        is: true,
        then: (scheme) =>
          scheme.when(["Tokenised Ecom Payment"], {
            is: true,
            then: yup
              .number()
              .required()
              .moreThan(
                yup.ref("TokenisedEcomPaymentdailyAmountPerUser"),
                "Monthly amount should be greater than daily amount",
              ),
          }),
      }),
    TokenisedEcomPaymenttokenLifeTimePerDay: yup
      .mixed()
      .when(["Receive Online Payment"], {
        is: true,
        then: yup.mixed().when(["Tokenised Ecom Payment"], {
          is: true,
          then: yup.string().required(),
        }),
      }),
    DirectDebitmaxAmountPerTransaction: yup
      .mixed()
      .when(["Receive Online Payment"], {
        is: true,
        then: yup.mixed().when(["Direct Debit Ecom Payment"], {
          is: true,
          then: yup.string().required(),
        }),
      }),
    DirectDebitdailyCountPerUser: yup.mixed().when(["Receive Online Payment"], {
      is: true,
      then: yup.mixed().when(["Direct Debit Ecom Payment"], {
        is: true,
        then: yup.string().required(),
      }),
    }),
    DirectDebitdailyAmountPerUser: yup
      .mixed()
      .when(["Receive Online Payment"], {
        is: true,
        then: yup.mixed().when(["Direct Debit Ecom Payment"], {
          is: true,
          then: yup.string().required(),
        }),
      }),
    DirectDebitmonthlyCountPerUser: yup
      .number()
      .transform((value: number) => (Number.isNaN(value) ? undefined : value))
      .when(["Receive Online Payment"], {
        is: true,
        then: (scheme) =>
          scheme.when(["Direct Debit Ecom Payment"], {
            is: true,
            then: yup
              .number()
              .required()
              .moreThan(
                yup.ref("DirectDebitdailyCountPerUser"),
                "Monthly count should be greater than daily count",
              ),
          }),
      }),
    DirectDebitmonthlyAmountPerUser: yup
      .number()
      .transform((value: number) => (Number.isNaN(value) ? undefined : value))
      .when(["Receive Online Payment"], {
        is: true,
        then: (scheme) =>
          scheme.when(["Direct Debit Ecom Payment"], {
            is: true,
            then: yup
              .number()
              .required()
              .moreThan(
                yup.ref("DirectDebitdailyAmountPerUser"),
                "Monthly amount should be greater than daily amount",
              ),
          }),
      }),
    DirectDebittokenLifeTimePerDay: yup
      .mixed()
      .when(["Receive Online Payment"], {
        is: true,
        then: yup.mixed().when(["Direct Debit Ecom Payment"], {
          is: true,
          then: yup.string().required(),
        }),
      }),
    DirectDebitAutoRenewTnC: yup.mixed().when(["Receive Online Payment"], {
      is: true,
      then: yup.mixed().when(["Direct Debit Ecom Payment"], {
        is: true,
        then: yup.string().required(),
      }),
    }),
    // tokenDeleteNotificationCode: yup.mixed().when(["Receive Online Payment"], {
    //   is: true,
    //   then: yup.mixed().when(["Direct Debit Ecom Payment"], {
    //     is: true,
    //     then: yup.mixed().required(),
    //   }),
    // }),
    // tokenExpiryNotificationCode: yup.mixed().when(["Receive Online Payment"], {
    //   is: true,
    //   then: yup.mixed().when(["Direct Debit Ecom Payment"], {
    //     is: true,
    //     then: yup.mixed().required(),
    //   }),
    // }),

    AgentTokenisedEcomPaymentmaxAmountPerTransaction: yup
      .mixed()
      .when(["Receive Online Payment"], {
        is: true,
        then: yup.mixed().when(["Agent - Tokenised Ecom Payment"], {
          is: true,
          then: yup.string().required(),
        }),
      }),
    AgentTokenisedEcomPaymentdailyCountPerUser: yup
      .mixed()
      .when(["Receive Online Payment"], {
        is: true,
        then: (scheme) =>
          scheme.when(["Agent - Tokenised Ecom Payment"], {
            is: true,
            then: yup.string().required(),
          }),
      }),
    AgentTokenisedEcomPaymentdailyAmountPerUser: yup
      .mixed()
      .when(["Receive Online Payment"], {
        is: true,
        then: (scheme) =>
          scheme.when(["Agent - Tokenised Ecom Payment"], {
            is: true,
            then: yup.string().required(),
          }),
      }),
    AgentTokenisedEcomPaymentmonthlyCountPerUser: yup
      .number()
      .transform((value: number) => (Number.isNaN(value) ? undefined : value))
      .when(["Receive Online Payment"], {
        is: true,
        then: (scheme) =>
          scheme.when(["Agent - Tokenised Ecom Payment"], {
            is: true,
            then: yup
              .number()
              .required()
              .moreThan(
                yup.ref("AgentTokenisedEcomPaymentdailyCountPerUser"),
                "Monthly count should be greater than daily count",
              ),
          }),
      }),
    AgentTokenisedEcomPaymentmonthlyAmountPerUser: yup
      .number()
      .transform((value: number) => (Number.isNaN(value) ? undefined : value))
      .when(["Receive Online Payment"], {
        is: true,
        then: (scheme) =>
          scheme.when(["Agent - Tokenised Ecom Payment"], {
            is: true,
            then: yup
              .number()
              .required()
              .moreThan(
                yup.ref("AgentTokenisedEcomPaymentdailyAmountPerUser"),
                "Monthly amount should be greater than daily amount",
              ),
          }),
      }),
    AgentTokenisedEcomPaymenttokenLifeTimePerDay: yup
      .mixed()
      .when(["Receive Online Payment"], {
        is: true,
        then: yup.mixed().when(["Agent - Tokenised Ecom Payment"], {
          is: true,
          then: yup.string().required(),
        }),
      }),

    AgentDirectDebitmaxAmountPerTransaction: yup
      .mixed()
      .when(["Receive Online Payment"], {
        is: true,
        then: yup.mixed().when(["Agent - Direct Debit Ecom Payment"], {
          is: true,
          then: yup.string().required(),
        }),
      }),
    AgentDirectDebitdailyCountPerUser: yup
      .mixed()
      .when(["Receive Online Payment"], {
        is: true,
        then: (scheme) =>
          scheme.when(["Agent - Direct Debit Ecom Payment"], {
            is: true,
            then: yup.string().required(),
          }),
      }),
    AgentDirectDebitdailyAmountPerUser: yup
      .mixed()
      .when(["Receive Online Payment"], {
        is: true,
        then: (scheme) =>
          scheme.when(["Agent - Direct Debit Ecom Payment"], {
            is: true,
            then: yup.string().required(),
          }),
      }),
    AgentDirectDebitmonthlyCountPerUser: yup
      .number()
      .transform((value: number) => (Number.isNaN(value) ? undefined : value))
      .when(["Receive Online Payment"], {
        is: true,
        then: (scheme) =>
          scheme.when(["Agent - Direct Debit Ecom Payment"], {
            is: true,
            then: yup
              .number()
              .required()
              .moreThan(
                yup.ref("AgentDirectDebitdailyCountPerUser"),
                "Monthly count should be greater than daily count",
              ),
          }),
      }),
    AgentDirectDebitmonthlyAmountPerUser: yup
      .number()
      .transform((value: number) => (Number.isNaN(value) ? undefined : value))
      .when(["Receive Online Payment"], {
        is: true,
        then: (scheme) =>
          scheme.when(["Agent - Direct Debit Ecom Payment"], {
            is: true,
            then: yup
              .number()
              .required()
              .moreThan(
                yup.ref("AgentDirectDebitdailyAmountPerUser"),
                "Monthly amount should be greater than daily amount",
              ),
          }),
      }),
    AgentDirectDebittokenLifeTimePerDay: yup
      .mixed()
      .when(["Receive Online Payment"], {
        is: true,
        then: yup.mixed().when(["Agent - Direct Debit Ecom Payment"], {
          is: true,
          then: yup.string().required(),
        }),
      }),
  }

  // eslint-disable-next-line default-case
  switch (formStage) {
    case "deviceBlockSchema":
      validationSchema = yup.object().shape(
        {
          ...deviceBlockSchema,
        },
        [["DeviceBlockDate", "DeviceBlockDate"]],
      )
      break
    case "channelBlockSchema":
      validationSchema = yup.object().shape(
        {
          ...channelBlockSchema,
        },
        [
          ["ChannelBlockDate", "ChannelBlockTime"],
          ["ChannelBlockDate", "ChannelBlockDate"],
          ["ChannelsOfChannelBlock", "ChannelsOfChannelBlock"],
        ],
      )
      break
    case "transactionBlockSchema0":
      validationSchema = yup.object().shape({
        ...transactionBlockSchema0,
      })
      break
    case "transactionBlockSchema1":
      validationSchema = yup.object().shape(
        {
          ...transactionBlockSchema1,
        },
        [["transactionBlockDate", "transactionBlockDate"]],
      )
      break
    case "bulkOperatorSchema":
      validationSchema = yup.object().shape({
        ...bulkOperatorSchema,
      })
      break
    case "trustLevelSchema":
      validationSchema = yup.object().shape({
        trustLevel: yup.object().shape({
          ...trustLevelSchema,
        }),
      })
      break
    case "merchantTypeStep1AddMoney":
      validationSchema = yup.object().shape({
        ...merchantTypeStep1AddMoney,
      })
      break
    case "merchantTypeStep1Settlement":
      validationSchema = yup
        .object()
        .shape({ ...merchantTypeStep1Settlement }, [
          ["manualSettlementFields", "autoSettlementFields"],
        ])
      break
    case "merchantTypeStep1OtherFunctionality":
      validationSchema = yup
        .object()
        .shape({ ...merchantTypeStep1OtherFunctionality })
      break
    case "merchantTypeStep2":
      validationSchema = yup.object().shape({ ...merchantTypeStep2 })
      break
  }
  return validationSchema
}

export const step2TransactionSchema = (
  transactionDetails: IDefaultValueObject,
) => {
  let validationSchema = {}
  // distributor
  if (transactionDetails?.distributor?.initiatedTransactionsList) {
    const distributorSchema = {
      ChannelDistributorMerchantType: yup
        .string()
        .when(
          [
            `${transactionDetails?.distributor?.initiatedTransactionsList[0]?.transactionTypeDisplayName}`,
          ],
          {
            is: true,
            then: (scheme) => scheme.required(),
          },
        ),

      distributorMinAmount: yup
        .string()
        .when(
          [
            `${transactionDetails?.distributor?.initiatedTransactionsList[0]?.transactionTypeDisplayName}`,
          ],
          {
            is: true,
            then: yup.string().required(),
          },
        ),
      distributorMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (
              context.parent["Regular Merchant to Regular Distributor"] !== true
            )
              return true
            if (
              Number(context.parent.distributorMinAmount) >= Number(item) &&
              context.parent.distributorIsMaxAmountApplicable !== true
            )
              return false

            return true
          },
        )
        .when(
          [
            `${transactionDetails?.distributor?.initiatedTransactionsList[0]?.transactionTypeDisplayName}`,
          ],
          {
            is: true,
            then: yup.string().when(["distributorIsMaxAmountApplicable"], {
              is: (distributorIsMaxAmountApplicable: boolean) => {
                return !distributorIsMaxAmountApplicable
              },
              then: yup.string().required(),
            }),
          },
        ),
      // distributorAccountLockDH: yup
      //   .number()
      //   .when(
      //     [
      //       `${transactionDetails?.distributor?.initiatedTransactionsList[0]?.transactionTypeDisplayName}`,
      //     ],
      //     {
      //       is: true,
      //       then: yup.number().when(["distributorUSSD"], {
      //         is: (distributorUSSD: boolean) => {
      //           return distributorUSSD
      //         },
      //         then: yup.number().required(),
      //       }),
      //     },
      //   ),
    }
    validationSchema = { ...validationSchema, ...distributorSchema }
  }

  // dso
  if (transactionDetails?.dso?.initiatedTransactionsList) {
    const dsoSchema = {
      ChannelDsoMerchantType: yup
        .string()
        .when(
          [
            `${transactionDetails?.dso?.initiatedTransactionsList[0]?.transactionTypeDisplayName}`,
          ],
          {
            is: true,
            then: (scheme) => scheme.required(),
          },
        ),

      dsoMinAmount: yup
        .string()
        .when(
          [
            `${transactionDetails?.dso?.initiatedTransactionsList[0]?.transactionTypeDisplayName}`,
          ],
          {
            is: true,
            then: yup.string().required(),
          },
        ),
      dsoMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent["Regular Merchant Cash Out - DSO"] !== true)
              return true
            if (
              Number(context.parent.dsoMinAmount) >= Number(item) &&
              context.parent.dsoIsMaxAmountNotApplicable !== true
            )
              return false

            return true
          },
        )
        .when(
          [
            `${transactionDetails?.dso?.initiatedTransactionsList[0]?.transactionTypeDisplayName}`,
          ],
          {
            is: true,
            then: yup.string().when(["dsoIsMaxAmountNotApplicable"], {
              is: (dsoIsMaxAmountNotApplicable: boolean) => {
                return !dsoIsMaxAmountNotApplicable
              },
              then: yup.string().required(),
            }),
          },
        ),
      // dsoAccountLock: yup
      //   .number()
      //   .when(
      //     [
      //       `${transactionDetails?.dso?.initiatedTransactionsList[0]?.transactionTypeDisplayName}`,
      //     ],
      //     {
      //       is: true,
      //       then: yup.number().when(["dsoUSSD"], {
      //         is: (dsoUSSD: boolean) => {
      //           return dsoUSSD
      //         },
      //         then: yup.number().required(),
      //       }),
      //     },
      //   ),
    }
    validationSchema = { ...validationSchema, ...dsoSchema }
  }

  // agent
  if (transactionDetails?.agent?.initiatedTransactionsList) {
    const agentSchema = {
      ChannelAgentMerchantType: yup
        .string()
        .when(
          [
            `${transactionDetails?.agent?.initiatedTransactionsList[0]?.transactionTypeDisplayName}`,
          ],
          {
            is: true,
            then: (scheme) => scheme.required(),
          },
        ),

      agentMinAmount: yup
        .string()

        .when(
          [
            `${transactionDetails?.agent?.initiatedTransactionsList[0]?.transactionTypeDisplayName}`,
          ],
          {
            is: true,
            then: yup.string().required(),
          },
        ),
      agentMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent["Regular Merchant Cash Out - Agent"] !== true)
              return true
            if (
              Number(context.parent.agentMinAmount) >= Number(item) &&
              context.parent.agentIsMaxAmountNotApplicable !== true
            )
              return false

            return true
          },
        )
        .when(
          [
            `${transactionDetails?.agent?.initiatedTransactionsList[0]?.transactionTypeDisplayName}`,
          ],
          {
            is: true,
            then: yup.string().when(["agentIsMaxAmountNotApplicable"], {
              is: (agentIsMaxAmountNotApplicable: boolean) => {
                return !agentIsMaxAmountNotApplicable
              },
              then: yup.string().required(),
            }),
          },
        ),
      // agentAccountLock: yup
      //   .number()
      //   .when(
      //     [
      //       `${transactionDetails?.agent?.initiatedTransactionsList[0]?.transactionTypeDisplayName}`,
      //     ],
      //     {
      //       is: true,
      //       then: yup.number().when(["agentUSSD"], {
      //         is: (agentUSSD: boolean) => {
      //           return agentUSSD
      //         },
      //         then: yup.number().required(),
      //       }),
      //     },
      //   ),
    }
    validationSchema = { ...validationSchema, ...agentSchema }
  }

  // merchant
  if (transactionDetails?.merchant?.initiatedTransactionsList) {
    const merchantSchema1 = {
      ChannelRMCashOutMerchantType: yup
        .string()
        .when(["regularMerchantCashOutMerchantCollapse"], {
          is: true,
          then: (scheme) => scheme.required(),
        }),
      regularMerchantCashOutMerchantMinAmount: yup
        .string()
        .when(["regularMerchantCashOutMerchantCollapse"], {
          is: true,
          then: yup.string().required(),
        }),
      regularMerchantCashOutMerchantMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent.regularMerchantCashOutMerchantCollapse !== true)
              return true
            if (
              Number(context.parent.regularMerchantCashOutMerchantMinAmount) >=
                Number(item) &&
              context.parent
                .regularMerchantCashOutMerchantIsMaxAmountApplicable !== true
            )
              return false

            return true
          },
        )
        .when(
          [
            "regularMerchantCashOutMerchantIsMaxAmountApplicable",
            "regularMerchantCashOutMerchantCollapse",
          ],
          {
            is: (
              regularMerchantCashOutMerchantIsMaxAmountApplicable: boolean,
              regularMerchantCashOutMerchantCollapse: boolean,
            ) =>
              !regularMerchantCashOutMerchantIsMaxAmountApplicable &&
              regularMerchantCashOutMerchantCollapse === true,
            then: yup.string().required(),
          },
        ),
    }
    const merchantSchema2 = {
      ChannelRM2RMMerchantType: yup
        .string()
        .when(["regularMerchant2RegularMerchantCollapse"], {
          is: true,
          then: (scheme) => scheme.required(),
        }),
      regularMerchant2RegularMerchantMinAmount: yup
        .string()
        .when(["regularMerchant2RegularMerchantCollapse"], {
          is: true,
          then: yup.string().required(),
        }),
      regularMerchant2RegularMerchantMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent.regularMerchant2RegularMerchantCollapse !== true)
              return true
            if (
              Number(context.parent.regularMerchant2RegularMerchantMinAmount) >=
                Number(item) &&
              context.parent
                .regularMerchant2RegularMerchantIsMaxAmountApplicable !== true
            )
              return false

            return true
          },
        )
        .when(
          [
            "regularMerchant2RegularMerchantIsMaxAmountApplicable",
            "regularMerchant2RegularMerchantCollapse",
          ],
          {
            is: (
              regularMerchant2RegularMerchantIsMaxAmountApplicable: boolean,
              regularMerchant2RegularMerchantCollapse: boolean,
            ) =>
              !regularMerchant2RegularMerchantIsMaxAmountApplicable &&
              regularMerchant2RegularMerchantCollapse === true,
            then: yup.string().required(),
          },
        ),
    }
    const merchantSchema3 = {
      ChannelRM2RMDisbursementMerchantType: yup
        .string()
        .when(["regularMerchant2RegularMerchantDisbursementCollapse"], {
          is: true,
          then: (scheme) => scheme.required(),
        }),
      regularMerchant2RegularMerchantDisbursementMinAmount: yup
        .string()
        .when(["regularMerchant2RegularMerchantDisbursementCollapse"], {
          is: true,
          then: yup.string().required(),
        }),
      regularMerchant2RegularMerchantDisbursementMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (
              context.parent
                .regularMerchant2RegularMerchantDisbursementCollapse !== true
            )
              return true
            if (
              Number(
                context.parent
                  .regularMerchant2RegularMerchantDisbursementMinAmount,
              ) >= Number(item) &&
              context.parent
                .regularMerchant2RegularMerchantDisbursementIsMaxAmountApplicable !==
                true
            )
              return false

            return true
          },
        )
        .when(
          [
            "regularMerchant2RegularMerchantDisbursementIsMaxAmountApplicable",
            "regularMerchant2RegularMerchantDisbursementCollapse",
          ],
          {
            is: (
              regularMerchant2RegularMerchantDisbursementIsMaxAmountApplicable: boolean,
              regularMerchant2RegularMerchantDisbursementCollapse: boolean,
            ) =>
              !regularMerchant2RegularMerchantDisbursementIsMaxAmountApplicable &&
              regularMerchant2RegularMerchantDisbursementCollapse === true,
            then: yup.string().required(),
          },
        ),
    }
    validationSchema = {
      ...validationSchema,
      ...merchantSchema1,
      ...merchantSchema2,
      ...merchantSchema3,
    }
  }

  // customer
  if (transactionDetails?.merchant?.initiatedTransactionsList) {
    // Islamic Customer Cash In - Merchant
    const customerSchema1 = {
      ChannelCustomerCashIn: yup.string().when(["customerCashIn"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),
      customerCashInMinAmount: yup.string().when(["customerCashIn"], {
        is: true,
        then: yup.string().required(),
      }),
      customerCashInMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent.customerCashIn !== true) return true
            if (
              Number(context.parent.customerCashInMinAmount) >= Number(item) &&
              context.parent.customerCashInIsMaxAmountApplicable !== true
            )
              return false

            return true
          },
        )
        .when(["customerCashInIsMaxAmountApplicable", "customerCashIn"], {
          is: (
            customerCashInIsMaxAmountApplicable: boolean,
            customerCashIn: boolean,
          ) => !customerCashInIsMaxAmountApplicable && customerCashIn === true,
          then: yup.string().required(),
        }),
    }
    // govDisbursement
    const customerSchema2 = {
      ChannelGovDisbursement: yup.string().when(["govDisbursement"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),
      customerGovDisbursmentMinAmount: yup.string().when(["govDisbursement"], {
        is: true,
        then: yup.string().required(),
      }),
      customerGovDisbursmentMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent.govDisbursement !== true) return true
            if (
              Number(context.parent.customerGovDisbursmentMinAmount) >=
                Number(item) &&
              context.parent.customerGovDisbursmentIsMaxAmountApplicable !==
                true
            )
              return false

            return true
          },
        )
        .when(
          ["customerGovDisbursmentIsMaxAmountApplicable", "govDisbursement"],
          {
            is: (
              customerGovDisbursmentIsMaxAmountApplicable: boolean,
              govDisbursement: boolean,
            ) =>
              !customerGovDisbursmentIsMaxAmountApplicable &&
              govDisbursement === true,
            then: yup.string().required(),
          },
        ),
    }
    // Regular Customer Cash In - Merchant
    const customerSchema3 = {
      ChannelM2CMerchantType: yup.string().when(["merchantToCustomer"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),
      merchantToCustomerMinAmount: yup.string().when(["merchantToCustomer"], {
        is: true,
        then: yup.string().required(),
      }),
      merchantToCustomerMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent.merchantToCustomer !== true) return true
            if (
              Number(context.parent.merchantToCustomerMinAmount) >=
                Number(item) &&
              context.parent.merchantToCustomerIsMaxAmountApplicable !== true
            )
              return false

            return true
          },
        )
        .when(
          ["merchantToCustomerIsMaxAmountApplicable", "merchantToCustomer"],
          {
            is: (
              merchantToCustomerIsMaxAmountApplicable: boolean,
              merchantToCustomer: boolean,
            ) =>
              !merchantToCustomerIsMaxAmountApplicable &&
              merchantToCustomer === true,
            then: yup.string().required(),
          },
        ),
    }
    // refund merchant 2 islamic
    const customerSchema4 = {
      ChannelRM2ICRefund: yup
        .string()
        .when(["regularMerchant2IslamicCustomerRefundCollapse"], {
          is: true,
          then: (scheme) => scheme.required(),
        }),
      regularMerchant2IslamicCustomerRefundIsCustomerFeeBack: yup
        .boolean()
        .when(["regularMerchant2IslamicCustomerIsFeeReversal"], {
          is: true,
          then: yup
            .boolean()
            .test(
              "selectOne",
              "Please select atleast 1 of above options.",
              (_item: any, context: any) => {
                if (
                  context.parent
                    .regularMerchant2IslamicCustomerIsFeeReversal !== true
                )
                  return true
                if (
                  (context.parent
                    .regularMerchant2IslamicCustomerRefundIsCustomerFeeBack ===
                    false ||
                    context.parent
                      .regularMerchant2IslamicCustomerRefundIsCustomerFeeBack ===
                      undefined) &&
                  (context.parent
                    .regularMerchant2IslamicCustomerRefundIsMerchantFeeBack ===
                    false ||
                    context.parent
                      .regularMerchant2IslamicCustomerRefundIsMerchantFeeBack ===
                      undefined)
                )
                  return false

                return true
              },
            ),
        }),
      regularMerchant2IslamicCustomerRefundCustomerFeeBackFrom: yup
        .string()
        .when(
          [
            "regularMerchant2IslamicCustomerIsFeeReversal",
            "regularMerchant2IslamicCustomerRefundIsCustomerFeeBack",
          ],
          {
            is: (
              regularMerchant2IslamicCustomerIsFeeReversal: boolean,
              regularMerchant2IslamicCustomerRefundIsCustomerFeeBack: boolean,
            ) =>
              regularMerchant2IslamicCustomerIsFeeReversal &&
              regularMerchant2IslamicCustomerRefundIsCustomerFeeBack,
            then: yup.string().required("Please Select an option"),
          },
        ),
      // regularMerchant2IslamicCustomerRefundMinAmount: yup
      //   .string()
      //   .when(["regularMerchant2IslamicCustomerRefundCollapse"], {
      //     is: true,
      //     then: yup.string().required(),
      //   }),
      // regularMerchant2IslamicCustomerRefundMaxAmount: yup
      //   .string()
      //   .test(
      //     "greaterThanMinRange",
      //     "Maximum Balance should be greater than Minimum Balance",
      //     (item: any, context: any) => {
      //       if (
      //         context.parent.regularMerchant2IslamicCustomerRefundCollapse !==
      //         true
      //       )
      //         return true
      //       if (
      //         Number(
      //           context.parent.regularMerchant2IslamicCustomerRefundMinAmount,
      //         ) >= Number(item) &&
      //         context.parent
      //           .regularMerchant2IslamicCustomerRefundIsMaxAmountApplicable !==
      //           true
      //       )
      //         return false

      //       return true
      //     },
      //   )
      //   .when(
      //     [
      //       "regularMerchant2IslamicCustomerRefundIsMaxAmountApplicable",
      //       "regularMerchant2IslamicCustomerRefundCollapse",
      //     ],
      //     {
      //       is: (
      //         regularMerchant2IslamicCustomerRefundIsMaxAmountApplicable: boolean,
      //         regularMerchant2IslamicCustomerRefundCollapse: boolean,
      //       ) =>
      //         !regularMerchant2IslamicCustomerRefundIsMaxAmountApplicable &&
      //         regularMerchant2IslamicCustomerRefundCollapse === true,
      //       then: yup.string().required(),
      //     },
      //   ),
    }
    // refund merchant 2 regular
    const customerSchema5 = {
      ChannelRM2RCRefund: yup
        .string()
        .when(["regularMerchant2RegularCustomerRefundCollapse"], {
          is: true,
          then: (scheme) => scheme.required(),
        }),
      regularMerchant2RegularCustomerRefundIsCustomerFeeBack: yup
        .boolean()
        .when(["regularMerchant2RegularCustomerIsFeeReversal"], {
          is: true,
          then: yup
            .boolean()
            .test(
              "selectOne",
              "Please select atleast 1 of above options.",
              (_item: any, context: any) => {
                if (
                  context.parent
                    .regularMerchant2RegularCustomerIsFeeReversal !== true
                )
                  return true
                if (
                  (context.parent
                    .regularMerchant2RegularCustomerRefundIsCustomerFeeBack ===
                    false ||
                    context.parent
                      .regularMerchant2RegularCustomerRefundIsCustomerFeeBack ===
                      undefined) &&
                  (context.parent
                    .regularMerchant2RegularCustomerRefundIsMerchantFeeBack ===
                    false ||
                    context.parent
                      .regularMerchant2RegularCustomerRefundIsMerchantFeeBack ===
                      undefined)
                )
                  return false

                return true
              },
            ),
        }),
      regularMerchant2RegularCustomerRefundCustomerFeeBackFrom: yup
        .string()
        .when(
          [
            "regularMerchant2RegularCustomerIsFeeReversal",
            "regularMerchant2RegularCustomerRefundIsCustomerFeeBack",
          ],
          {
            is: (
              regularMerchant2RegularCustomerIsFeeReversal: boolean,
              regularMerchant2RegularCustomerRefundIsCustomerFeeBack: boolean,
            ) =>
              regularMerchant2RegularCustomerIsFeeReversal &&
              regularMerchant2RegularCustomerRefundIsCustomerFeeBack,
            then: yup.string().required("Please Select an option"),
          },
        ),
      // regularMerchant2RegularCustomerRefundMinAmount: yup
      //   .string()
      //   .when(["regularMerchant2RegularCustomerRefundCollapse"], {
      //     is: true,
      //     then: yup.string().required(),
      //   }),
      // regularMerchant2RegularCustomerRefundMaxAmount: yup
      //   .string()
      //   .test(
      //     "greaterThanMinRange",
      //     "Maximum Balance should be greater than Minimum Balance",
      //     (item: any, context: any) => {
      //       if (
      //         context.parent.regularMerchant2RegularCustomerRefundCollapse !==
      //         true
      //       )
      //         return true
      //       if (
      //         Number(
      //           context.parent.regularMerchant2RegularCustomerRefundMinAmount,
      //         ) >= Number(item) &&
      //         context.parent
      //           .regularMerchant2RegularCustomerRefundIsMaxAmountApplicable !==
      //           true
      //       )
      //         return false

      //       return true
      //     },
      //   )
      //   .when(
      //     [
      //       "regularMerchant2RegularCustomerRefundIsMaxAmountApplicable",
      //       "regularMerchant2RegularCustomerRefundCollapse",
      //     ],
      //     {
      //       is: (
      //         regularMerchant2RegularCustomerRefundIsMaxAmountApplicable: boolean,
      //         regularMerchant2RegularCustomerRefundCollapse: boolean,
      //       ) =>
      //         !regularMerchant2RegularCustomerRefundIsMaxAmountApplicable &&
      //         regularMerchant2RegularCustomerRefundCollapse === true,
      //       then: yup.string().required(),
      //     },
      //   ),
    }
    // m2cDisbursement
    const customerSchema6 = {
      ChannelM2CDisbursement: yup.string().when(["m2cDisbursement"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),
      // yup.string().when(["m2cDisbursement"], {
      //   is: (ChannelM2CDisbursement: string) => {
      //     return ChannelM2CDisbursement || !ChannelM2CDisbursement
      //   },

      //   then: yup
      //     .string()
      //     .nullable()
      //     .test(
      //       "channels_required",
      //       "Channel(s) is required",
      //       function (values: string | undefined | null) {
      //         if (values && values?.length > 0) {
      //           return true
      //         }
      //         return !!values
      //       },
      //     ),
      // }),

      // yup.string().when(["m2cDisbursement"], {
      //   is: true,
      //   then: (scheme) => scheme.required(),
      // }),
      m2cDisbursementGenSettingsMinAmount: yup
        .string()
        .when(["m2cDisbursement"], {
          is: true,
          then: yup.string().required(),
        })
        .nullable(),
      m2cDisbursementGenSettingsMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent.m2cDisbursement !== true) return true
            if (
              Number(context.parent.m2cDisbursementGenSettingsMinAmount) >=
                Number(item) &&
              context.parent.m2cDisbursementGenSettingsIsMaxAmountApplicable !==
                true
            )
              return false

            return true
          },
        )
        .when(
          [
            "m2cDisbursementGenSettingsIsMaxAmountApplicable",
            "m2cDisbursement",
          ],
          {
            is: (
              m2cDisbursementGenSettingsIsMaxAmountApplicable: boolean,
              m2cDisbursement: boolean,
            ) =>
              !m2cDisbursementGenSettingsIsMaxAmountApplicable &&
              m2cDisbursement === true,
            then: yup.string().required(),
          },
        )
        .nullable(),
      m2cDisStoreOps: yup.boolean().nullable(),
      m2cDisSendNotificationViaSms: yup
        .boolean()
        .when(["m2cDisStoreOps", "m2cDisSendNotificationViaEmail"], {
          is: (
            m2cDisStoreOps: boolean,
            m2cDisSendNotificationViaEmail: boolean,
          ) => m2cDisStoreOps === true && !m2cDisSendNotificationViaEmail,
          then: (instance) => {
            return instance.isTrue("SMS / E-Mail should be enabled")
          },
        }),
      m2cDisSendNotificationViaEmail: yup
        .boolean()
        .when(["m2cDisStoreOps", "m2cDisSendNotificationViaSms"], {
          is: (
            m2cDisStoreOps: boolean,
            m2cDisSendNotificationViaSms: boolean,
          ) => m2cDisStoreOps === true && !m2cDisSendNotificationViaSms,
          then: (instance) => {
            return instance.isTrue("SMS / E-Mail should be enabled")
          },
        }),
    }
    // m2cCorpDisbursement
    const customerSchema7 = {
      ChannelM2cCorpDisbursement: yup.string().when(["m2cCorpDisbursement"], {
        is: true,
        then: (scheme) => scheme.required(),
      }),
      m2cCorpDisbursementGenSettingsMinAmount: yup
        .string()
        .when(["m2cCorpDisbursement"], {
          is: true,
          then: yup.string().required(),
        }),
      m2cCorpDisbursementGenSettingsMaxAmount: yup
        .string()
        .test(
          "greaterThanMinRange",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent.m2cCorpDisbursement !== true) return true
            if (
              Number(context.parent.m2cCorpDisbursementGenSettingsMinAmount) >=
                Number(item) &&
              context.parent
                .m2cCorpDisbursementGenSettingsIsMaxAmountApplicable !== true
            )
              return false

            return true
          },
        )
        .when(
          [
            "m2cCorpDisbursementGenSettingsIsMaxAmountApplicable",
            "m2cCorpDisbursement",
          ],
          {
            is: (
              m2cCorpDisbursementGenSettingsIsMaxAmountApplicable: boolean,
              m2cCorpDisbursement: boolean,
            ) =>
              !m2cCorpDisbursementGenSettingsIsMaxAmountApplicable &&
              m2cCorpDisbursement === true,
            then: yup.string().required(),
          },
        ),
      m2cCorpDisStoreOps: yup.boolean(),
      m2cCorpDisSendNotificationViaSms: yup
        .boolean()
        .when(["m2cCorpDisStoreOps", "m2cCorpDisSendNotificationViaEmail"], {
          is: (
            m2cCorpDisStoreOps: boolean,
            m2cCorpDisSendNotificationViaEmail: boolean,
          ) =>
            m2cCorpDisStoreOps === true && !m2cCorpDisSendNotificationViaEmail,
          then: (instance) => {
            return instance.isTrue("SMS / E-Mail should be enabled")
          },
        }),
      m2cCorpDisSendNotificationViaEmail: yup
        .boolean()
        .when(["m2cCorpDisStoreOps", "m2cCorpDisSendNotificationViaSms"], {
          is: (
            m2cCorpDisStoreOps: boolean,
            m2cCorpDisSendNotificationViaSms: boolean,
          ) => m2cCorpDisStoreOps === true && !m2cCorpDisSendNotificationViaSms,
          then: (instance) => {
            return instance.isTrue("SMS / E-Mail should be enabled")
          },
        }),
    }
    // Islamic Merchant to Customer Generic
    const customerSchema8 = {
      // channelMerchantToCustomerGeneric: yup
      //   .string()
      //   .when(["merchantToCustomerGeneric"], {
      //     is: true,
      //     then: (scheme) => scheme.required(),
      //   }),
      merchantToCustomerGenericMinAmount: yup
        .string()
        .when(["merchantToCustomerGeneric"], {
          is: true,
          then: yup.string().required(),
        }),
      merchantToCustomerGenericMaxAmount: yup
        .string()
        .test(
          "merchantToCustomerGenericMinAmount",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent.merchantToCustomerGeneric !== true) return true
            if (
              Number(context.parent.merchantToCustomerGenericMinAmount) >=
                Number(item) &&
              context.parent.merchantToCustomerGenericIsMaxAmountApplicable !==
                true
            )
              return false

            return true
          },
        )
        .when(
          ["customerCashInIsMaxAmountApplicable", "merchantToCustomerGeneric"],
          {
            is: (
              customerCashInIsMaxAmountApplicable: boolean,
              merchantToCustomerGeneric: boolean,
            ) =>
              !customerCashInIsMaxAmountApplicable &&
              merchantToCustomerGeneric === true,
            then: yup.string().required(),
          },
        ),
    }
    // Regular Merchant to Customer Generic
    const customerSchema9 = {
      // ChannelMerchantToRegularCustomerGeneric: yup
      //   .string()
      //   .when(["merchantToRegularCustomerGeneric"], {
      //     is: true,
      //     then: (scheme) => scheme.required(),
      //   }),
      merchantToRegularCustomerGenericMinAmount: yup
        .string()
        .when(["merchantToRegularCustomerGeneric"], {
          is: true,
          then: yup.string().required(),
        }),
      merchantToRegularCustomerGenericMaxAmount: yup
        .string()
        .test(
          "merchantToRegularCustomerGenericMinAmount",
          "Maximum Balance should be greater than Minimum Balance",
          (item: any, context: any) => {
            if (context.parent.merchantToRegularCustomerGeneric !== true)
              return true
            if (
              Number(
                context.parent.merchantToRegularCustomerGenericMinAmount,
              ) >= Number(item) &&
              context.parent
                .merchantToRegularCustomerGenericIsMaxAmountApplicable !== true
            )
              return false

            return true
          },
        )
        .when(
          ["customerCashInIsMaxAmountApplicable", "merchantToCustomerGeneric"],
          {
            is: (
              customerCashInIsMaxAmountApplicable: boolean,
              merchantToRegularCustomerGeneric: boolean,
            ) =>
              !customerCashInIsMaxAmountApplicable &&
              merchantToRegularCustomerGeneric === true,
            then: yup.string().required(),
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
      ...customerSchema6,
      ...customerSchema7,
      ...customerSchema8,
      ...customerSchema9,
    }
  }

  return yup.object().shape(
    {
      ...validationSchema,
    },
    [
      [
        "m2cCorpDisSendNotificationViaSms",
        "m2cCorpDisSendNotificationViaEmail",
      ],
      ["ChannelM2CDisbursement", "ChannelM2CDisbursement"],
      ["m2cDisSendNotificationViaEmail", "m2cDisSendNotificationViaSms"],
    ],
  )
}

// export const slabSchema = (slabName: string, index: number) => {
//   let validationSchema = {
//     [`${slabName}[${index}]`]: yup.string().when({
//       is: true && `${slabName}[${index}].feesType` !== "",
//       then: yup.string().required(),
//     }),
//   }

//   validationSchema = {
//     ...validationSchema,
//   }
// }

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

export default merchantTypeFormSchema
