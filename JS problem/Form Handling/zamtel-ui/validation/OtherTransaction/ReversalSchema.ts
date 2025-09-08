import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function ReversalSchema(formStage: string, reversalDetails?: any) {
  let validationSchema = yup.object().shape({})

  const singleReversal = {
    ...(reversalDetails?.feeReversalAllowed && {
      reversalType: genValidation({
        isRequired: true,
        type: "mixed",
        isNullable: true,
      }),
    }),
    ...(reversalDetails?.commissionReversalAllowed && {
      commissionReversal: genValidation({
        isRequired: true,
        type: "mixed",
        isNullable: true,
      }),
    }),
    senderNotification: genValidation({
      isRequired: true,
      type: "mixed",
      isNullable: true,
    }),
    receiverNotification: genValidation({
      isRequired: true,
      type: "mixed",
      isNullable: true,
    }),
    supportingDoc: genValidation({
      type: "uploadedFile",
      isRequired: false,
      isNullable: true,
      label: "Document",
    }),
    remarks: genValidation({
      isRequired: true,
      type: "string",
      isNullable: true,
    }),
  }

  const batchReversal = {
    ...(reversalDetails?.feeReversalAllowed && {
      reversalType: genValidation({
        isRequired: true,
        type: "mixed",
        isNullable: true,
      }),
    }),
    ...(reversalDetails?.commissionReversal && {
      commissionReversal: genValidation({
        isRequired: true,
        type: "mixed",
        isNullable: true,
      }),
    }),
    senderNotification: genValidation({
      isRequired: true,
      type: "mixed",
      isNullable: true,
    }),
    receiverNotification: genValidation({
      isRequired: true,
      type: "mixed",
      isNullable: true,
    }),
    supportingDoc: genValidation({
      type: "uploadedFile",
      isRequired: false,
      isNullable: true,
      label: "Document",
    }),
    remarks: genValidation({
      isRequired: true,
      type: "string",
      isNullable: true,
    }),
  }

  const bulkReversal = {
    senderNotification: genValidation({
      isRequired: true,
      type: "mixed",
      isNullable: true,
    }),
    receiverNotification: genValidation({
      isRequired: true,
      type: "mixed",
      isNullable: true,
    }),
    supportingDoc: genValidation({
      type: "uploadedFile",
      isRequired: false,
      isNullable: true,
      label: "Document",
    }),
  }

  switch (formStage) {
    case "singleReversalSchema":
      validationSchema = yup.object().shape({
        ...singleReversal,
      })
      break
    case "batchReversalSchema":
      validationSchema = yup.object().shape({
        ...batchReversal,
      })
      break
    case "bulkReversalSchema":
      validationSchema = yup.object().shape({
        ...bulkReversal,
      })
      break
    default:
      validationSchema = yup.object().shape({})
      break
  }

  return validationSchema
}
export default ReversalSchema
