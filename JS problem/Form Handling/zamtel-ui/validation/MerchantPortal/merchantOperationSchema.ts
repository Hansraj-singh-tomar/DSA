import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function schema() {
  const validationSchema = yup.object().shape({
    terminalName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: true,
    }),
    terminalNo: genValidation({
      type: "string",
      maxLength: 3,
      isRequired: true,
      isNullable: true,
    }),
    phoneNo: genValidation({
      type: "mobile",
      label: "Phone No.",
      isRequired: true,
      isNullable: true,
    }),
    mno: genValidation({
      type: "object",
      isRequired: true,
      isNullable: true,
    }),
    email: genValidation({
      type: "string",
      format: "email",
      isRequired: true,
      isNullable: true,
    }),
    pin: yup
      .string()
      .matches(
        /^(?!.*(\\d)\\1\\1)(?!(?:01234|12345|23456|34567|45678|56789|09876|98765|87654|76543|65432|54321|00000|11111|22222|33333|44444|55555|66666|77777|88888|99999)).{5}$/,
        "Pin is not policy compliant",
      )
      .required(),
    password: yup
      .string()
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
        "Password must contain at least 8 characters , including alphanumeric and special character",
      )
      .required(),
  })
  return validationSchema
}

export function passwordPinResetSchema(type: string) {
  const passwordValidationSchema = yup.object().shape(
    {
      oldPass: genValidation({
        type: "string",
        isRequired: true,
        isNullable: true,
      }),
      newPass: yup
        .string()
        .notOneOf(
          [yup.ref("oldPass")],
          "New Password can not be same as Old Password",
        )
        .transform((value) => (Number.isNaN(value) ? undefined : value))
        .required()
        .when("newPass", {
          is: (value: string) => value?.length,
          then: (rule) =>
            rule.matches(
              /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
              "Password must contain at least 8 characters , including alphanumeric and special character",
            ),
        }),
      confirmNewPass: yup
        .string()
        .required()
        .oneOf(
          [yup.ref("newPass")],
          "Re-Type New Password must match New Password",
        ),
    },
    [
      ["oldPass", "oldPass"],
      ["newPass", "newPass"],
    ],
  )

  const pinValidationSchema = yup.object().shape(
    {
      oldPin: genValidation({
        type: "string",
        maxLength: 100,
        minLength: 0,
        isRequired: true,
        isNullable: true,
      }),
      newPin: yup
        .string()
        .matches(
          /^(?!.*(\\d)\\1\\1)(?!(?:01234|12345|23456|34567|45678|56789|09876|98765|87654|76543|65432|54321|00000|11111|22222|33333|44444|55555|66666|77777|88888|99999)).{5}$/,
          "Pin is not policy compliant",
        )
        .notOneOf([yup.ref("oldPin")], "New Pin can not be same as Old Pin")
        .transform((value) => (Number.isNaN(value) ? undefined : value))
        .required(),
      confirmNewPin: yup
        .string()
        .required()
        .oneOf([yup.ref("newPin")], "Re-Type New Pin must match New Pin"),
    },
    [
      ["oldPin", "newPin"],
      ["newPin", "confirmNewPin"],
    ],
  )

  switch (type) {
    case "Pin":
      return pinValidationSchema
    case "Password":
      return passwordValidationSchema
    default:
      return yup.object().shape({})
  }
}

export const phoneUpdateSchema = yup.object().shape({
  mobile: genValidation({
    type: "mobile",
    label: "Phone No.",
    isRequired: true,
    isNullable: true,
  }),
  pin: genValidation({
    type: "string",
    isRequired: true,
    isNullable: true,
  }),
})

export default schema
