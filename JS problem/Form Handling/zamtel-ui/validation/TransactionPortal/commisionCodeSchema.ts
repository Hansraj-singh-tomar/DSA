import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"
import {
  convertEpochTimestampToDDMMYYYYhhmmAMPM,
  getDateTimeEpoch,
} from "app/utils/dateUtils"

function scheduleCCSchema(defaultSchedulePath: boolean) {
  const defaultScheduleCC = {
    defaultCCList: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    startDate: genValidation({
      type: "number",
      isRequired: true,
      isNullable: true,
    }),
    startTime: yup
      .number()
      .required()
      .nullable()
      .test(
        "startTime",
        "Cannot pick past hours",
        (value: number | undefined | null | string, context: any) => {
          const { startDate } = context.parent
          if (value) {
            const sDate = Number(startDate)
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
        (value: string | undefined | null | number) => {
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
  }
  const additionalScheduleCC = {
    additionalCCList: genValidation({
      type: "multiSelectArrayOptions",
      minArraySize: 1,
      isNullable: true,
    }),

    startDate: genValidation({
      type: "number",
      isRequired: true,
      isNullable: true,
    }),
    expiredDate: yup
      .number()
      .when("isExpiryApplicable", {
        is: (isExpiryApplicable: boolean) => {
          return !isExpiryApplicable
        },
        then: genValidation({
          type: "number",
          isRequired: true,
          isNullable: true,
        }),
        otherwise: genValidation({
          type: "number",
          isRequired: false,
          isNullable: true,
        }),
      })
      .nullable()
      .min(yup.ref("startDate"), "Expired date must be after Effective date"),
    startTime: yup
      .number()
      .required()
      .nullable()
      .test(
        "startTime",
        "Cannot pick past hours",
        (value: number | undefined | null | string, context: any) => {
          const { startDate } = context.parent
          if (value) {
            const sDate = Number(startDate)
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
        (value: string | undefined | null | number) => {
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
    expiredTime: yup.number().when("isExpiryApplicable", {
      is: (isExpiryApplicable: boolean) => {
        return !isExpiryApplicable
      },
      then: yup
        .number()
        .required()
        .nullable()
        .test(
          "expiredTime",
          "Cannot pick past/same hours w.r.t start date time",
          (value: number | undefined | null | string, context: any) => {
            const { startTime, startDate, expiredDate } = context.parent
            if (value) {
              const eTime = Number(startTime)
              const eDate = Number(startDate)
              const exDate = Number(expiredDate)
              const eVal = new Date(
                getDateTimeEpoch(eDate, Number(eTime)),
              ).setMilliseconds(0)
              const exVal = new Date(
                getDateTimeEpoch(exDate, Number(value)),
              ).setMilliseconds(0)
              if (
                startDate &&
                expiredDate &&
                eTime &&
                startDate <= expiredDate
              ) {
                return exVal > eVal
              }
            }
            return true
          },
        )
        .test(
          "min_end_time_gap",
          "Cannot pick time other than gap of 15 mins",
          (value: string | undefined | null | number) => {
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
      otherwise: genValidation({
        type: "number",
        isRequired: false,
        isNullable: true,
      }),
    }),
  }
  const defaultValidationSchema = yup.object().shape({
    ...defaultScheduleCC,
  })
  const additionalValidationSchema = yup.object().shape({
    ...additionalScheduleCC,
  })

  return defaultSchedulePath
    ? defaultValidationSchema
    : additionalValidationSchema
}
function additionaCommisionCodeStep1Schema() {
  const additionaPriceCodeStep1WithCondition2 = {
    commisionCodename: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    description: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    date: genValidation({
      type: "number",
      isRequired: true,
      isNullable: true,
    }),
    ExpiryDate: yup
      .number()
      .required()
      .nullable()
      .min(yup.ref("date"), "Expired date must be after Effective date"),
    Time: yup
      .number()
      .required()
      .nullable()
      .test(
        "Time",
        "Cannot pick past hours",
        (value: number | undefined | null | string, context: any) => {
          const { date: eDate } = context.parent
          if (value) {
            const sDate = Number(eDate)
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
        (value: string | undefined | null | number) => {
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
    ExpiryTime: yup
      .number()
      .required()
      .nullable()
      .test(
        "ExpiryTime",
        "Cannot pick past/same hours w.r.t effective date time",
        (value: number | undefined | null | string, context: any) => {
          const { Time, date: effectiveDate, ExpiryDate } = context.parent
          if (value) {
            const eTime = Number(Time)
            const eDate = Number(effectiveDate)
            const exDate = Number(ExpiryDate)
            const eVal = new Date(
              getDateTimeEpoch(eDate, Number(eTime)),
            ).setMilliseconds(0)
            const exVal = new Date(
              getDateTimeEpoch(exDate, Number(value)),
            ).setMilliseconds(0)
            if (
              effectiveDate &&
              ExpiryDate &&
              eTime &&
              effectiveDate <= ExpiryDate
            ) {
              return exVal > eVal
            }
          }
          return true
        },
      )
      .test(
        "min_end_time_gap",
        "Cannot pick time other than gap of 15 mins",
        (value: string | undefined | null | number) => {
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
    SenderWalletType: genValidation({
      type: "multiSelectArrayOptions",
      minArraySize: 0,
    }),
    receiverWalletType: genValidation({
      type: "multiSelectArrayOptions",
      minArraySize: 0,
    }),
    // tags: yup.array().when("tagsContainer", {
    //   is: (tagsContainer: boolean) => {
    //     return tagsContainer
    //   },
    //   then: genValidation({
    //     type: "multiSelectArrayOptions",
    //     minArraySize: 1,
    //   }),
    // }),
    // initiatorTags: yup.array().when("tagsContainer", {
    //   is: (tagsContainer: boolean) => {
    //     return tagsContainer
    //   },
    //   then: genValidation({
    //     type: "multiSelectArrayOptions",
    //     minArraySize: 1,
    //   }),
    // }),

    limitHead: yup.object().when("ConfigureLH", {
      is: (ConfigureLH: boolean) => {
        return ConfigureLH
      },
      then: yup
        .object()
        .nullable()
        .test("default", "Select LH is required", (value) => {
          if (value === null) {
            return false
          }
          return true
        }),
    }),
    ChildLH: yup
      .object()
      .nullable()
      .when("limitHead", {
        is: (limitHead: any) => {
          return limitHead?.childLimitHead?.length > 0
        },
        then: genValidation({
          type: "object",
          isRequired: true,
          isNullable: true,
        }),
      }),

    condition2: yup.array().of(
      yup.object().shape({
        weekDaysField: yup.array().when("dayAndTimeContainer", {
          is: (dayAndTimeContainer: boolean) => dayAndTimeContainer,
          then: genValidation({
            type: "multiSelectArrayOptions",
            minArraySize: 1,
          }),
        }),
        startEndTime: yup.array().when("dayAndTimeContainer", {
          is: (dayAndTimeContainer: boolean) => dayAndTimeContainer,
          then: yup.array().of(
            yup.object().shape({
              slabStartTime: genValidation({
                type: "number",
                isRequired: true,
                isNullable: true,
              }),
              slabEndTime: yup
                .number()
                .required()
                .nullable()
                .min(
                  yup.ref("slabStartTime"),
                  "End time must be after Start Time",
                ),
            }),
          ),
        }),
      }),
    ),
  }

  const additionaPriceCodeStep1lValidationSchemaWithCondition2 = yup
    .object()
    .shape({
      ...additionaPriceCodeStep1WithCondition2,
    })

  return additionaPriceCodeStep1lValidationSchemaWithCondition2
}

function additionaCommissionCodeStep2OnAddSlabClickSchema() {
  const additionaPriceCodeStep2OnAddSlabClick = {
    minAmount: genValidation({
      type: "number",
      isRequired: true,
      isNullable: false,
    }),
    maxAmount: yup.mixed().when("isMaxBalanceApplicable", {
      is: (isMaxBalanceApplicable: boolean) => {
        return !isMaxBalanceApplicable
      },
      then: yup
        .string()
        .test(
          "min",
          "Maximum Amount / Transaction should be greater than Minimum Amount / Transaction",
          (value, context) => {
            console.log(
              "error => ",
              value,
              context.parent.minAmount,
              value && +value > +context.parent.minAmount,
            )
            if (value && +value > +context.parent.minAmount) return true
            return false
          },
        )
        .test("typeError", "Specify valid number", (value: any) => {
          if (value === ".") return false
          return true
        })
        .required(
          "Either enter the Maximum Amount / Transaction or check the Maximum Balance Not Applicable",
        ),
    }),
    //   is: (isMaxBalanceApplicable: boolean) => {
    //     console.log("maxAmount", yup.ref("minAmount"))
    //     return !isMaxBalanceApplicable
    //   },
    //   then: yup
    //     .number()
    //     .min(
    //       yup.ref("minAmount"),
    //       "Maximum Amount / Transaction should greater than Minimum Amount / Transaction",
    //     )
    //     // .test(
    //     //   "min",
    //     //   "Maximum Amount / Transaction should greater than Minimum Amount / Transaction",
    //     //   (value, context) => {
    //     //     console.log(
    //     //       "error => ",
    //     //       value,
    //     //       context,
    //     //       value && +value > +context.parent.minAmount,
    //     //     )
    //     //     if (value && +value > +context.parent.minAmount) return true
    //     //     return false
    //     //   },
    //     // )
    //     .test("typeError", "Specify valid number", (value: any) => {
    //       if (value === ".") return false
    //       return true
    //     })
    //     .required(
    //       "Either enter the Maximum Amount / Transaction or check the Maximum Balance Not Applicable",
    //     ),
    // }),
    commissionCode: yup
      .array()
      .test("noLimit", "Slab with no limit already added.", (value) => {
        const length: number = value?.length || 0
        return length > 0 && value
          ? !(value[length - 1]?.isMaxBalanceApplicable === true)
          : true
      }),
  }

  const additionaPriceCodeStep2OnAddSlabClickValidationSchema = yup
    .object()
    .shape({
      ...additionaPriceCodeStep2OnAddSlabClick,
    })

  return additionaPriceCodeStep2OnAddSlabClickValidationSchema
}

function additionaCommissionCodeStep2OnSaveClickSchema(player: any) {
  console.log(player, "schema")
  const validObj = {}
  // eslint-disable-next-line array-callback-return
  if (player && player.length > 0) {
    // eslint-disable-next-line array-callback-return
    player.map((item: any) => {
      Object.assign(validObj, {
        [`${item.keyValue}disbursementPolicy`]: genValidation({
          type: "object",
          isRequired: true,
          isNullable: true,
        }),
        [`${item.keyValue}disbursementApproval`]: yup
          .object()
          .when([`${item.keyValue}disbursementPolicy`], {
            is: (disbursementPolicy: any) => {
              return (
                disbursementPolicy &&
                disbursementPolicy.keyName === "Pre-Defined Time"
              )
            },
            then: genValidation({
              type: "object",
              isRequired: true,
              isNullable: true,
            }),
            otherwise: genValidation({
              type: "object",
              isRequired: false,
              isNullable: true,
            }),
          }),
        [`${item.keyValue}thresholdAmount`]: yup
          .number()
          .when([`${item.keyValue}disbursementApproval`], {
            is: (disbursementApproval: any) => {
              return (
                disbursementApproval && disbursementApproval.keyName === "Yes"
              )
            },
            then: genValidation({
              type: "number",
              isRequired: true,
              isNullable: true,
            }),
            otherwise: genValidation({
              type: "number",
              isRequired: false,
              isNullable: true,
            }),
          }),
      })
    })
  }
  const commissionCodeObj = {}
  if (player && player.length > 0) {
    // eslint-disable-next-line array-callback-return
    player.map((item: any) => {
      Object.assign(commissionCodeObj, {
        [`${item.keyValue}ChargeType`]: genValidation({
          type: "object",
          isRequired: true,
          isNullable: true,
        }),
        [`${item.keyValue}Charge`]: yup
          .string()
          .when(`${item.keyValue}ChargeType`, {
            is: (ChargeType: any) => {
              return ChargeType && ChargeType?.chargeType === "PERCENTAGE"
            },
            then: yup
              .string()
              .required()
              .test("typeError", "Specify valid number", (value: any) => {
                if (value !== ".") return true
                return false
              })
              .test(
                "valueSize",
                "Charge value cannot be greater than 100%",
                (value: number | undefined | null | string) => {
                  if (value != null) {
                    const val = Number(value)
                    return val <= 100
                  }
                  return true
                },
              ),
          }),
        [`${item.keyValue}MinCharge`]: yup
          .string()
          .when([`${item.keyValue}ChargeType`], {
            is: (ChargeType: any) => {
              return ChargeType && ChargeType?.chargeType === "PERCENTAGE"
            },
            then: yup
              .string()
              .required()
              .test("typeError", "Specify valid number", (value: any) => {
                if (value !== ".") return true
                return false
              })
              .test(
                "fieldValueError",
                "Min Charge should be less than Max Charge",
                (value: number | undefined | null | string, context: any) => {
                  const MaxCharge = context.parent[`${item.keyValue}MaxCharge`]
                  if (value != null && MaxCharge) {
                    const sMaxCharge = Number(MaxCharge)
                    const val = Number(value)
                    return sMaxCharge > val
                  }
                  return true
                },
              )
              .test(
                "fieldValueError",
                "Min Charge should be less than Slab Max Range",
                (value: number | undefined | null | string, context: any) => {
                  const MaxCharge = context.parent.slabMaxRange
                  if (value != null && MaxCharge) {
                    const sMaxCharge = Number(MaxCharge)
                    const val = Number(value)
                    return val <= sMaxCharge
                  }
                  return true
                },
              ),
          }),
        [`${item.keyValue}MaxCharge`]: yup
          .string()
          .when([`${item.keyValue}ChargeType`], {
            is: (ChargeType: any) => {
              return ChargeType && ChargeType?.chargeType === "PERCENTAGE"
            },
            then: yup
              .string()
              .required()
              .test("typeError", "Specify valid number", (value: any) => {
                if (value !== ".") return true
                return false
              })
              .test(
                "fieldValueError",
                "Max Charge should be greater than Min Charge ",
                (value: number | undefined | null | string, context: any) => {
                  const MinCharge = context.parent[`${item.keyValue}MinCharge`]
                  if (value != null && MinCharge) {
                    const sMinCharge = Number(MinCharge)
                    const val = Number(value)
                    return sMinCharge < val
                  }
                  return true
                },
              )
              .test(
                "fieldValueError",
                "Max Charge should be  Less than Slab Max Range",
                (value: number | undefined | null | string, context: any) => {
                  const MaxCharge = context.parent.slabMaxRange
                  if (value != null && MaxCharge) {
                    const sMaxCharge = Number(MaxCharge)
                    const val = Number(value)
                    return val <= sMaxCharge
                  }
                  return true
                },
              ),
          }),
        [`${item.keyValue}FixCharge`]: yup
          .string()
          .when([`${item.keyValue}ChargeType`], {
            is: (ChargeType: any) => {
              return ChargeType && ChargeType?.chargeType === "FIXED"
            },
            then: yup
              .string()
              .required()
              .test(
                "typeError",
                "Specify valid number less than Slab Max Range",
                (value: any, context: any) => {
                  console.log(context)
                  if (value !== ".") {
                    if (context.parent.slabMaxRange) {
                      return value <= context.parent.slabMaxRange
                    }

                    return true
                  }

                  return false
                },
              ),
          }),
        [`${item.keyValue}Vat`]: yup
          .string()
          .when([`${item.keyValue}ChargeType`], {
            is: (ChargeType: any) => {
              return (
                ChargeType &&
                (ChargeType?.chargeType === "PERCENTAGE" ||
                  ChargeType?.chargeType === "FIXED")
              )
            },
            then: yup
              .string()
              .required()
              .test("typeError", "Specify valid number", (value: any) => {
                if (value !== ".") return true
                return false
              })
              .test(
                "vatSize",
                "Charge value cannot be greater than 15%",
                (value: number | undefined | null | string) => {
                  if (value != null) {
                    const val = Number(value)
                    return val <= 15
                  }
                  return true
                },
              ),
          }),
      })
    })
  }
  const additionaPriceCodeStep2OnSaveClick = {
    playerSelection: genValidation({
      type: "array",
      minArraySize: 1,
    }),

    commissionCode: yup
      .array()
      .min(1, "Minimum 1 slab need to created with 0 to No-Limit.")
      .of(
        yup.object().shape({
          ...commissionCodeObj,
        }),
      ),
  }

  const additionaPriceCodeStep2OnSaveClickValidationSchema = yup
    .object()
    .shape({ ...additionaPriceCodeStep2OnSaveClick, ...validObj })

  return additionaPriceCodeStep2OnSaveClickValidationSchema
}

function lastSlabNoLimitValidation() {
  const commissionCodeLastLimitValidation = {
    commissionCode: yup
      .array()
      .test(
        "noLimit",
        "Maximum amount should not be applicable for the last slab",
        (value) => {
          const length: number = value?.length || 0
          return length > 0 && value
            ? value[length - 1]?.isMaxBalanceApplicable === true
            : false
        },
      ),
  }

  const lastSlabNoLimitValidationSchema = yup
    .object()
    .shape({ ...commissionCodeLastLimitValidation })

  return lastSlabNoLimitValidationSchema
}

export {
  scheduleCCSchema,
  additionaCommisionCodeStep1Schema,
  additionaCommissionCodeStep2OnSaveClickSchema,
  lastSlabNoLimitValidation,
  additionaCommissionCodeStep2OnAddSlabClickSchema,
}
