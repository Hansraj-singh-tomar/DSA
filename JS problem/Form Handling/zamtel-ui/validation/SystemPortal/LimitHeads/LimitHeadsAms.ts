import { genValidation } from "app/utils/commonFunctions"
import * as yup from "yup"

const rejectedRemarkSchema: any = yup.object().shape({
  rejected_remarks: genValidation({
    type: "string",
    isRequired: true,
  }),
})

export default rejectedRemarkSchema
