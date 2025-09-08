import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"
import { getDateTimeEpoch } from "app/utils/dateUtils"

function schedulePriceSchema(defaultSchedulePath: boolean) {
  const defaultSchedulePrice = {
    defaultPriceCodeList: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    isDateTimeApplicable: yup.boolean(),
    effectiveDate: yup
      .number()
      .when("isDateTimeApplicable", {
        is: (data: any) => data !== true,
        then: genValidation({
          type: "number",
          isRequired: true,
          isNullable: true,
        }),
      })
      .nullable(),
    effectiveTime: yup
      .number()
      .when("isDateTimeApplicable", {
        is: (data: any) => data !== true,
        then: yup
          .number()
          .required()
          .nullable()
          .test(
            "effectiveTime",
            "Cannot pick past hours",
            (value: number | undefined | null | string, context: any) => {
              const { effectiveDate } = context.parent
              if (value) {
                const sDate = Number(effectiveDate)
                const tVal = getDateTimeEpoch(sDate, Number(value))
                const now = new Date()
                return now.getTime() <= new Date(tVal).getTime()
              }
              return false
            },
          ),
      })
      .nullable(),
    // effectiveDate: genValidation({
    //   type: "number",
    //   isRequired: true,
    //   isNullable: true,
    // }),
    // effectiveTime: yup
    //   .number()
    //   .required()
    //   .nullable()
    //   .test(
    //     "effectiveTime",
    //     "Cannot pick past hours",
    //     (value: number | undefined | null | string, context: any) => {
    //       const { effectiveDate } = context.parent
    //       if (value) {
    //         const sDate = Number(effectiveDate)
    //         const tVal = getDateTimeEpoch(sDate, Number(value))
    //         const now = new Date()
    //         return now.getTime() <= new Date(tVal).getTime()
    //       }
    //       return false
    //     },
    //   ),
  }

  const additionalSchedulePrice = {
    additionalPriceCodeList: genValidation({
      type: "multiSelectArrayOptions",
      minArraySize: 1,
    }),

    effectiveDate: genValidation({
      type: "number",
      isRequired: true,
      isNullable: true,
    }),
    isDateTimeApplicable: yup.boolean(),
    expiredDate: yup
      .number()
      .when("isDateTimeApplicable", {
        is: (isDateTimeApplicable: boolean) => isDateTimeApplicable !== true,
        then: yup
          .number()
          .required()
          .min(
            yup.ref("effectiveDate"),
            "Expired date must be after Effective date",
          )
          .nullable(),
      })
      .nullable(),
    // expiredDate: yup
    //   .number()
    //   .required()
    //   .nullable()
    //   .min(
    //     yup.ref("effectiveDate"),
    //     "Expired date must be after Effective date",
    //   ),
    effectiveTime: yup
      .number()
      .required()
      .nullable()
      .test(
        "effectiveTime",
        "Cannot pick past hours",
        (value: number | undefined | null | string, context: any) => {
          const { effectiveDate } = context.parent
          if (value) {
            const sDate = Number(effectiveDate)
            const tVal = getDateTimeEpoch(sDate, Number(value))
            const now = new Date()
            return now.getTime() <= new Date(tVal).getTime()
          }
          return false
        },
      ),
    expiredTime: yup
      .number()
      .when("isDateTimeApplicable", {
        is: (data: any) => data !== true,
        then: yup
          .number()
          .required()
          .test(
            "expiredTime",
            "Cannot pick past/same hours w.r.t effective date time",
            (value: number | undefined | null | string, context: any) => {
              const { effectiveTime, effectiveDate, expiredDate } =
                context.parent
              if (value) {
                const eTime = Number(effectiveTime)
                const eDate = Number(effectiveDate)
                const exDate = Number(expiredDate)
                const eVal = new Date(
                  getDateTimeEpoch(eDate, Number(eTime)),
                ).setMilliseconds(0)
                const exVal = new Date(
                  getDateTimeEpoch(exDate, Number(value)),
                ).setMilliseconds(0)
                if (
                  effectiveDate &&
                  expiredDate &&
                  eTime &&
                  effectiveDate <= expiredDate
                ) {
                  return exVal > eVal
                }
              }
              return true
            },
          )
          .nullable(),
      })
      .nullable(),
    // expiredTime: yup
    //   .number()
    //   .required()
    //   .nullable()
    //   .test(
    //     "expiredTime",
    //     "Cannot pick past/same hours w.r.t effective date time",
    //     (value: number | undefined | null | string, context: any) => {
    //       const { effectiveTime, effectiveDate, expiredDate } = context.parent
    //       if (value) {
    //         const eTime = Number(effectiveTime)
    //         const eDate = Number(effectiveDate)
    //         const exDate = Number(expiredDate)
    //         const eVal = new Date(
    //           getDateTimeEpoch(eDate, Number(eTime)),
    //         ).setMilliseconds(0)
    //         const exVal = new Date(
    //           getDateTimeEpoch(exDate, Number(value)),
    //         ).setMilliseconds(0)
    //         if (
    //           effectiveDate &&
    //           expiredDate &&
    //           eTime &&
    //           effectiveDate <= expiredDate
    //         ) {
    //           return exVal > eVal
    //         }
    //       }
    //       return true
    //     },
    //   ),
  }

  const defaultValidationSchema = yup.object().shape({
    ...defaultSchedulePrice,
  })

  const additionalValidationSchema = yup.object().shape({
    ...additionalSchedulePrice,
  })

  return defaultSchedulePath
    ? defaultValidationSchema
    : additionalValidationSchema
}

function additionaPriceCodeStep1Schema() {
  const additionaPriceCodeStep1WithCondition2 = {
    priceCodeName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    description: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    Date: genValidation({
      type: "number",
      isRequired: true,
      isNullable: true,
    }),
    ExpiryDate: yup
      .number()
      .required()
      .nullable()
      .min(yup.ref("Date"), "Expired date must be after Effective date"),
    Time: yup
      .number()
      .required()
      .nullable()
      .test(
        "Time",
        "Cannot pick past hours",
        (value: number | undefined | null | string, context: any) => {
          const { Date: eDate } = context.parent
          if (value) {
            const sDate = Number(eDate)
            const tVal = getDateTimeEpoch(sDate, Number(value))
            const now = new Date()
            return now.getTime() <= new Date(tVal).getTime()
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
          const { Time, Date: effectiveDate, ExpiryDate } = context.parent
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
      ),
    SenderWalletType: genValidation({
      type: "multiSelectArrayOptions",
      minArraySize: 0,
    }),
    receiverWalletType: genValidation({
      type: "multiSelectArrayOptions",
      minArraySize: 0,
    }),
    tags: yup.array().when("tagsContainer", {
      is: (tagsContainer: boolean) => {
        return tagsContainer
      },
      then: genValidation({
        type: "multiSelectArrayOptions",
        minArraySize: 1,
      }),
    }),

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
      otherwise: genValidation({
        type: "object",
        isRequired: false,
        isNullable: true,
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
        otherwise: genValidation({
          type: "object",
          isRequired: false,
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

function additionaPriceCodeStep2OnAddSlabClickSchema() {
  const additionaPriceCodeStep2OnAddSlabClick = {
    contributor: genValidation({
      type: "string",
      isRequired: true,
      isNullable: false,
    }),
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
          "Maximum Amount / Transaction should greater than Minimum Amount / Transaction",
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
    priceCode: yup
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

function additionaPriceCodeStep2OnSaveClickSchema() {
  const additionaPriceCodeStep2OnSaveClick = {
    contributor: genValidation({
      type: "string",
      isRequired: true,
      isNullable: false,
    }),
    priceCode: yup
      .array()
      .min(1, "Minimum 1 slab need to created with 0 to No-Limit.")
      .of(
        yup.object().shape({
          senderChargeType: yup.object().when("contributor", {
            is: (contributor: string) => {
              return (
                contributor &&
                (contributor === "Sender" || contributor === "Both")
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
          senderCharge: yup
            .string()
            .when(["contributor", "senderChargeType"], {
              is: (contributor: string, senderChargeType: any) => {
                return (
                  contributor &&
                  (contributor === "Sender" || contributor === "Both") &&
                  senderChargeType &&
                  senderChargeType?.chargeType === "PERCENTAGE"
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
            })
            .nullable(),
          senderMinCharge: yup
            .string()
            .when(["contributor", "senderChargeType"], {
              is: (contributor: string, senderChargeType: any) => {
                return (
                  contributor &&
                  (contributor === "Sender" || contributor === "Both") &&
                  senderChargeType &&
                  senderChargeType?.chargeType === "PERCENTAGE"
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
                  "fieldValueError",
                  "Min Charge should be less than Max Charge or Equal",
                  (value: number | undefined | null | string, context: any) => {
                    const { senderMaxCharge } = context.parent
                    if (value != null && senderMaxCharge) {
                      const sMaxCharge = Number(senderMaxCharge)
                      const val = Number(value)
                      return sMaxCharge > val || sMaxCharge === val
                    }
                    return true
                  },
                ),
            })
            .nullable(),
          senderMaxCharge: yup
            .string()
            .when(["contributor", "senderChargeType"], {
              is: (contributor: string, senderChargeType: any) => {
                return (
                  contributor &&
                  (contributor === "Sender" || contributor === "Both") &&
                  senderChargeType &&
                  senderChargeType?.chargeType === "PERCENTAGE"
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
                  "fieldValueError",
                  "Max Charge should be greater than Min Charge",
                  (value: number | undefined | null | string, context: any) => {
                    const { senderMinCharge } = context.parent
                    if (value != null && senderMinCharge) {
                      const sMinCharge = Number(senderMinCharge)
                      const val = Number(value)
                      return sMinCharge < val || sMinCharge === val
                    }
                    return true
                  },
                ),
            })
            .nullable(),
          senderFixCharge: yup
            .string()
            .when(["contributor", "senderChargeType"], {
              is: (contributor: string, senderChargeType: any) => {
                return (
                  contributor &&
                  (contributor === "Sender" || contributor === "Both") &&
                  senderChargeType &&
                  senderChargeType?.chargeType === "FIXED"
                )
              },
              then: yup
                .string()
                .required()
                .test("typeError", "Specify valid number", (value: any) => {
                  if (value !== ".") return true
                  return false
                }),
            })
            .nullable(),
          senderExciseDuty: yup
            .string()
            .when(["contributor", "senderChargeType"], {
              is: (contributor: string, senderChargeType: any) => {
                return (
                  contributor &&
                  (contributor === "Sender" || contributor === "Both") &&
                  senderChargeType &&
                  senderChargeType?.chargeType === "FIXED"
                )
              },
              then: yup
                .string()
                .required()
                .test("typeError", "Specify valid number", (value: any) => {
                  if (value !== ".") return true
                  return false
                }),
            })
            .nullable(),
          senderVat: yup
            .string()
            .when(["contributor", "senderChargeType"], {
              is: (contributor: string, senderChargeType: any) => {
                return (
                  contributor &&
                  (contributor === "Sender" || contributor === "Both") &&
                  senderChargeType &&
                  (senderChargeType?.chargeType === "PERCENTAGE" ||
                    senderChargeType?.chargeType === "FIXED")
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
            })
            .nullable(),
          receiverChargeType: yup
            .object()
            .when("contributor", {
              is: (contributor: string) => {
                return (
                  contributor &&
                  (contributor === "Receiver" || contributor === "Both")
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
            })
            .nullable(),
          receiverCharge: yup
            .string()
            .when(["contributor", "receiverChargeType"], {
              is: (contributor: string, receiverChargeType: any) => {
                return (
                  contributor &&
                  (contributor === "Receiver" || contributor === "Both") &&
                  receiverChargeType &&
                  receiverChargeType?.chargeType === "PERCENTAGE"
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
            })
            .nullable(),
          receiverMinCharge: yup
            .string()
            .when(["contributor", "receiverChargeType"], {
              is: (contributor: string, receiverChargeType: any) => {
                return (
                  contributor &&
                  (contributor === "Receiver" || contributor === "Both") &&
                  receiverChargeType &&
                  receiverChargeType?.chargeType === "PERCENTAGE"
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
                  "fieldValueError",
                  "Min Charge should be less than Max Charge or Equal",
                  (value: number | undefined | null | string, context: any) => {
                    const { receiverMaxCharge } = context.parent
                    if (value != null && receiverMaxCharge) {
                      const rMaxCharge = Number(receiverMaxCharge)
                      const val = Number(value)
                      return rMaxCharge > val || rMaxCharge === val
                    }
                    return true
                  },
                ),
            })
            .nullable(),
          receiverMaxCharge: yup
            .string()
            .when(["contributor", "receiverChargeType"], {
              is: (contributor: string, receiverChargeType: any) => {
                return (
                  contributor &&
                  (contributor === "Receiver" || contributor === "Both") &&
                  receiverChargeType &&
                  receiverChargeType?.chargeType === "PERCENTAGE"
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
                  "fieldValueError",
                  "Max Charge should be greater than Min Charge",
                  (value: number | undefined | null | string, context: any) => {
                    const { receiverMinCharge } = context.parent
                    if (value != null && receiverMinCharge) {
                      const rMinCharge = Number(receiverMinCharge)
                      const val = Number(value)
                      return rMinCharge < val || rMinCharge === val
                    }
                    return true
                  },
                ),
            })
            .nullable(),
          receiverFixCharge: yup
            .string()
            .when(["contributor", "receiverChargeType"], {
              is: (contributor: string, receiverChargeType: any) => {
                return (
                  contributor &&
                  (contributor === "Receiver" || contributor === "Both") &&
                  receiverChargeType &&
                  receiverChargeType?.chargeType === "FIXED"
                )
              },
              then: yup
                .string()
                .required()
                .test("typeError", "Specify valid number", (value: any) => {
                  if (value !== ".") return true
                  return false
                }),
            })
            .nullable(),
          receiverExciseDuty: yup
            .string()
            .when(["contributor", "receiverChargeType"], {
              is: (contributor: string, receiverChargeType: any) => {
                return (
                  contributor &&
                  (contributor === "Receiver" || contributor === "Both") &&
                  receiverChargeType &&
                  receiverChargeType?.chargeType === "FIXED"
                )
              },
              then: yup
                .string()
                .required()
                .test("typeError", "Specify valid number", (value: any) => {
                  if (value !== ".") return true
                  return false
                }),
            })
            .nullable(),
          receiverVat: yup
            .string()
            .when(["contributor", "receiverChargeType"], {
              is: (contributor: string, receiverChargeType: any) => {
                return (
                  contributor &&
                  (contributor === "Receiver" || contributor === "Both") &&
                  receiverChargeType &&
                  (receiverChargeType?.chargeType === "PERCENTAGE" ||
                    receiverChargeType?.chargeType === "FIXED")
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
            })
            .nullable(),
        }),
      ),
  }

  const additionaPriceCodeStep2OnSaveClickValidationSchema = yup
    .object()
    .shape({ ...additionaPriceCodeStep2OnSaveClick })

  return additionaPriceCodeStep2OnSaveClickValidationSchema
}

function lastSlabNoLimitValidation() {
  const priceCodeLastLimitValidation = {
    priceCode: yup
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
    .shape({ ...priceCodeLastLimitValidation })

  return lastSlabNoLimitValidationSchema
}

export {
  schedulePriceSchema,
  additionaPriceCodeStep1Schema,
  additionaPriceCodeStep2OnAddSlabClickSchema,
  additionaPriceCodeStep2OnSaveClickSchema,
  lastSlabNoLimitValidation,
}
