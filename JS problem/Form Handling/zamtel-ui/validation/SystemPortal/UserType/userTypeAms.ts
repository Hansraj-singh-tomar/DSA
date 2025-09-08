import * as yup from "yup"

// eslint-disable-next-line import/prefer-default-export
export const requestRejectionValidation = yup.object().shape({
  rejectionRemarks: yup
    .string()
    .required("Remarks is required to reject selected requests !"),
})
