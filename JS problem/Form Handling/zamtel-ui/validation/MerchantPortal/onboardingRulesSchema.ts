import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function onboardingRulesSchema() {
  const onboardingRulesEditParams = {
    paramLabelEn: genValidation({
      type: "string",
      isRequired: true,
    }),
    paramLabelBn: genValidation({
      type: "string",
      isRequired: true,
    }),
    inputType: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    maxCharacterCount: yup.number().when("inputType", {
      is: (inputType: { keyValue: string }) =>
        inputType?.keyValue === "Text Input" ||
        inputType?.keyValue === "Numeric Input",
      then: genValidation({
        type: "number",
        isRequired: true,
      }),
      otherwise: genValidation({
        type: "number",
        isNullable: true,
      }),
    }),
    addOption: yup.array().when("inputType", {
      is: (inputType: { keyValue: string }) =>
        inputType?.keyValue === "Multiple Choice" ||
        inputType?.keyValue === "Checkboxes" ||
        inputType?.keyValue === "Dropdown",
      then: genValidation({
        type: "array",
        minArraySize: 1,
      }),
      otherwise: genValidation({
        type: "array",
      }),
    }),
    fileSize: yup.number().when("inputType", {
      is: (inputType: { keyValue: string }) =>
        inputType?.keyValue === "File Upload",
      then: yup
        .number()
        .transform((value: number) => (Number.isNaN(value) ? undefined : value))
        .required()
        .min(1),
      otherwise: genValidation({
        type: "number",
        isNullable: false,
      }),
    }),
  }

  const validationSchema = yup.object().shape({
    ...onboardingRulesEditParams,
  })
  console.log("validation schema onboarding", validationSchema)

  return validationSchema
}

export default onboardingRulesSchema
