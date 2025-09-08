import * as yup from "yup"

export default function rejectionSchema() {
  const validationSchema = {
    rejectionReason: yup
      .mixed()
      .transform((v) => (!v ? undefined : v))
      .required()
      .nullable(),
  }

  return yup.object().shape({ ...validationSchema })
}
