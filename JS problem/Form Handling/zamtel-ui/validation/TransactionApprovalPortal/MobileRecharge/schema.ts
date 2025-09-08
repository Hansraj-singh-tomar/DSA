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

  switch (formStage) {
    case "RescheduleModal":
      validationSchema = yup.object().shape({ ...RescheduleModal })
      break
    case "RejectModal":
      validationSchema = yup.object().shape({ ...RejectModal })
      break
    default:
      validationSchema = yup.object().shape({})
      break
  }
  return validationSchema
}

export default schema
