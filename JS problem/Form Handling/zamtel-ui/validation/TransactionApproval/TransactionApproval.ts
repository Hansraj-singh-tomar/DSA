import { genValidation } from "app/utils/commonFunctions"
import * as yup from "yup"

const rejectedRemarkValidation = yup.object().shape({
  rejected_remarks: yup.string().required("Remarks is a required field"),
})

export const approvalLiftingRemarkValidation = yup.object().shape({
  approved_remarks: yup.string(),
})

export const approvalRefundWithTcsaValidation = yup.object().shape({
  approved_remarks: yup.string(),
  approvedSelectTCSABank: yup
    .object()
    .required("Select TCSA Bank is a required field.")
    .nullable(),
})

export const rejectModalValidation = yup.object().shape({
  rejected_remarks: genValidation({
    type: "string",
    isRequired: true,
  }),
})

export const approvalRefundWithoutTcsaValidation = yup.object().shape({
  approved_remarks: yup.string(),
})

export const approvedRemarkValidation = yup.object().shape({
  approved_remarks: yup.string().required("Remarks is a required field"),
})

export const refundPriorityUploadDocument = yup.object().shape({
  priorityUserUploadDocument: genValidation({
    type: "uploadedFile",
    isRequired: true,
    label: "Excel file",
  }),
})

export default rejectedRemarkValidation
