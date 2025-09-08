import { genValidation } from "app/utils/commonFunctions"
import * as yup from "yup"

function schema(formStage: string) {
  let validationSchema
  const RescheduleModal = {
    rescheduledDate: yup.string().when({
      is: (rescheduledDate: string) =>
        rescheduledDate === undefined || rescheduledDate === null,
      then: genValidation({
        type: "string",
        isRequired: true,
        isNullable: true,
      }),
      otherwise: genValidation({
        type: "date",
        isRequired: true,
        isFutureDate: true,
      }),
    }),
    rescheduledTime: genValidation({
      type: "number",
      isRequired: true,
      isNullable: true,
    }),
  }

  const RejectModal = {
    rejectRemarks: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
  }

  const filter = {
    amountMax: yup
      .number()
      .nullable()
      .transform((_, val) => (val === Number(val) ? val : null))
      .min(
        yup.ref("amountMin"),
        "Maximum amount should be greater than Minimum amount",
      ),
    submissionDateFrom: yup.string().when({
      is: (submissionDateFrom: string) =>
        submissionDateFrom === undefined || submissionDateFrom === null,
      then: genValidation({
        type: "string",
        isNullable: true,
      }),
      otherwise: genValidation({
        type: "date",
      }),
    }),
    submissionDateTo: yup
      .string()
      .when({
        is: (submissionDateTo: string) =>
          submissionDateTo === undefined || submissionDateTo === null,
        then: genValidation({
          type: "string",
          isNullable: true,
        }),
        otherwise: genValidation({
          type: "date",
        }),
      })
      .nullable(),
  }

  switch (formStage) {
    case "RescheduleModal":
      validationSchema = yup.object().shape({ ...RescheduleModal })
      break
    case "RejectModal":
      validationSchema = yup.object().shape({ ...RejectModal })
      break
    case "filter":
      validationSchema = yup.object().shape({ ...filter })
      break
    default:
      validationSchema = yup.object().shape({})
      break
  }
  return validationSchema
}

export default schema
