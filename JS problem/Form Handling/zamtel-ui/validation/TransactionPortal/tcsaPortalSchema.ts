import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function tcsaPortalSchema(type: string): any {
  const oneToOneTscaFields = {
    fromAccountBankName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    fromAccountTcsaAccount: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    toAccountBankName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    toAccountTcsaAccount: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    fromAccountAmount: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
  }
  const oneToManytscaFields = {
    fromAccountBankName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    fromAccountTcsaAccount: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    // fromAccountAmount: genValidation({
    //   type: "string",
    //   isRequired: true,
    //   isNullable: true,
    // }),
    multipleAccounts: yup.array().of(
      yup.object().shape({
        toAccountBankName: genValidation({
          type: "string",
          isRequired: true,
          isNullable: true,
        }),
        toAccountTcsaAccount: genValidation({
          type: "object",
          isRequired: true,
          isNullable: true,
        }),
        toAccountAmount: genValidation({
          type: "string",
          isRequired: true,
          isNullable: true,
        }),
      }),
    ),
  }
  const manyToOnetscaFields = {
    toAccountBankName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    toAccountTcsaAccount: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    multipleAccounts: yup.array().of(
      yup.object().shape({
        fromAccountBankName: genValidation({
          type: "string",
          isRequired: true,
          isNullable: true,
        }),
        fromAccountTcsaAccount: genValidation({
          type: "object",
          isRequired: true,
          isNullable: true,
        }),
        fromAccountAmount: genValidation({
          type: "string",
          isRequired: true,
          isNullable: true,
        }),
      }),
    ),
  }

  const TCSAReverseRecordModal = {
    remarks: genValidation({
      type: "string",
      isRequired: true,
    }),
  }

  const newInvestmentFields = {
    investmentProfile: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    category: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    investmentBank: yup
      .mixed()
      .required("Please select a investment bank")
      .nullable(),
    branch: yup.mixed().required("Please select a branch").nullable(),
    fdrNumber: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    amount: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    investmentDate: genValidation({
      type: "date",
      isRequired: true,
      isNullable: true,
    }),
    dateOfMaturity: genValidation({
      type: "date",
      isRequired: true,
      isNullable: true,
    }),
    investmentTenure: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    profitRate: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    tcsaBank: yup.mixed().required("Please select a TCSA bank").nullable(),
  }

  const TCSACreateDraftBatch = {
    excelFile: genValidation({
      type: "uploadedFile",
      isRequired: true,
      label: "Excel file",
    }),
  }

  const LiftingAdjustmentCreateSchema = {
    transactionDate: genValidation({
      type: "date",
      isRequired: true,
      isNullable: true,
    }),
    dhOrMerchantWalletNo: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    trxnId: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    txnAmount: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    tcsaWalletName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    tcsaWalletCode: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    actualAmount: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    allowDebitInstruction: yup.boolean(),
    debitInstructionValidityInDays: yup.string().when("allowDebitInstruction", {
      is: true,
      then: genValidation({
        type: "string",
        isRequired: true,
        isNullable: true,
      }),
      otherwise: genValidation({
        type: "string",
        isRequired: false,
        isNullable: true,
      }),
    }),
  }

  const RefundAdjustmentCreateSchema = {
    transactionDate: genValidation({
      type: "date",
      isRequired: true,
      isNullable: true,
    }),
    dhOrMerchantWalletNo: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    trxnId: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    txnAmount: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    tcsaWalletCode: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    userType: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    userName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    transactionType: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    bankName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    bankAccount: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    tcsaWalletName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
  }

  const RetryFundTransferSchema = {
    userBankAccount: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    accountNumber: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
  }

  const TransactionSelectSchema = {
    transactionDate: genValidation({
      type: "date",
      isRequired: true,
      isNullable: true,
    }),
    transactionType: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    trxnId: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
  }

  const TCSALiftingCreateSchema = {
    debitAccount: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    creditAccount: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    adjustmentAmount: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    remarks: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
  }

  const TCSARefundCreateSchema = {
    debitAccount: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    creditAccount: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    adjustmentAmount: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    remarks: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
  }

  const TCSAFundTransferCreateSchemaDynamic = {
    adjustmentAmount: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    remarks: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    tcsaType: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
  }

  const TCSAFundTransferCreateSchemaStatic = {
    adjustmentAmount: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    remarks: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    tcsaType: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    debitAccount: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    creditAccount: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
  }

  let validationSchema: any = yup.object().shape({})

  switch (type.toLowerCase()) {
    case "onetoone":
      validationSchema = yup.object().shape({ ...oneToOneTscaFields })
      break
    case "onetomany":
      validationSchema = yup.object().shape({ ...oneToManytscaFields })
      break
    case "manytoone":
      validationSchema = yup.object().shape({ ...manyToOnetscaFields })
      break

    case "tcsareverserecordmodal":
      validationSchema = yup.object().shape({
        ...TCSAReverseRecordModal,
      })
      break
    case "tcsacreatedraftbatch":
      validationSchema = yup.object().shape({
        ...TCSACreateDraftBatch,
      })
      break
    case "newinvestment":
      validationSchema = yup.object().shape({
        ...newInvestmentFields,
      })
      break
    case "newliftingadjustment":
      validationSchema = yup
        .object()
        .shape({ ...LiftingAdjustmentCreateSchema })
      break
    case "newrefundadjustment":
      validationSchema = yup.object().shape({ ...RefundAdjustmentCreateSchema })
      break
    case "retryfundtransfer":
      validationSchema = yup.object().shape({ ...RetryFundTransferSchema })
      break
    case "transactionselect":
      validationSchema = yup.object().shape({ ...TransactionSelectSchema })
      break
    case "newliftingtcsaadjustment":
      validationSchema = yup.object().shape({ ...TCSALiftingCreateSchema })
      break
    case "newrefundtcsaadjustment":
      validationSchema = yup.object().shape({ ...TCSARefundCreateSchema })
      break
    case "newfundtransfertcsaadjustmentdynamic":
      validationSchema = yup
        .object()
        .shape({ ...TCSAFundTransferCreateSchemaDynamic })
      break
    case "newfundtransfertcsaadjustmentstatic":
      validationSchema = yup
        .object()
        .shape({ ...TCSAFundTransferCreateSchemaStatic })
      break
    default:
      break
  }

  return validationSchema
}

export default tcsaPortalSchema
