import * as yup from "yup"

export const roleApprovalValidation = yup.object().shape({
  approvalRemarks: yup
    .string()
    .required("Remarks is required to approve selected requests !"),
})

export const roleRejectionValidation = yup.object().shape({
  rejectionRemarks: yup
    .string()
    .required("Remarks is required to reject selected requests !"),
})

export const otherConfigApprovalValidation = yup.object().shape({
  approvalRemarks: yup
    .string()
    .required("Remarks is required to approve selected requests !"),
})

export const otherConfigRejectionValidation = yup.object().shape({
  rejectionRemarks: yup
    .string()
    .required("Remarks is required to reject selected requests !"),
})

export const rejectionRemarksValidation = yup.object().shape({
  remarks: yup
    .string()
    .required("Remarks is required to reject selected requests !"),
})
