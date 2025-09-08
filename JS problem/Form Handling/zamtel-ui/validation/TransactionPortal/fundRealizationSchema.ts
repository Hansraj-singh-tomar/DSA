import * as yup from "yup"
import { object } from "yup"
import { genValidation } from "app/utils/commonFunctions"

const schemas = {
  selectWalletSchema: {
    walletFilter: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    wallet: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: true,
    }),
  },
  dateFilterSchema: {
    from: genValidation({
      type: "date",
      isRequired: true,
      isNullable: true,
    }),
    to: genValidation({
      type: "date",
      isRequired: true,
      isNullable: true,
    }),
  },
  systemDateFilterSchema: {
    dateRangeFrom: genValidation({
      type: "number",
      isRequired: true,
      isNullable: true,
    }),
    dateRangeTo: yup
      .number()
      .required()
      .nullable()
      .min(
        yup.ref("dateRangeFrom"),
        "Date range To  must be after Date Range From",
      ),
  },
  createRealizationSchema: {
    tcsaSubControl: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    tcsaBank: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    tcsaBankAccount: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    operationalBank: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    operationalBankAccount: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    requesterRemarks: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
  },
  createRealizationSchema1: {
    tcsaSubControl: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    tcsaBank: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    tcsaBankAccount: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    operationalBank: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    operationalBankAccount: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
  },
  createAmountRealizationSchema: {
    tcsaSubControl: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    tcsaBank: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    tcsaBankAccount: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    operationalBank: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    operationalBankAccount: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    amount: genValidation({
      type: "number",
      isRequired: true,
      isNullable: true,
    }),
  },
}

type TSchemas = keyof typeof schemas

function fundRealizationSchema(schema: TSchemas) {
  const validationSchema = object().shape(schemas[schema])
  return validationSchema
}

export default fundRealizationSchema
