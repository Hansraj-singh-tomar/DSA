import * as yup from "yup"

function schema(formStage: string) {
  const entityValidation = yup.mixed().nullable().required("Entity is required")

  const walletTypeValidation = yup
    .mixed()
    .nullable()
    .required("Wallet Type is required")

  const msisdnValidation = yup
    .string()
    .nullable()
    .required("MSISDN is required")

  const amountValidation = yup
    .string()
    .required("Amount is required")
    .test("positive", "Amount must be greater than 0", (value) => {
      const numValue = parseFloat(value || "0")
      return numValue > 0
    })

  const purposeValidation = yup
    .string()
    .required("Purpose is required")
    .min(5, "Purpose must be at least 5 characters")

  const commentValidation = yup
    .string()
    .required("Comment is required")
    .min(5, "Comment must be at least 5 characters")

  switch (formStage) {
    case "debitParty":
      return yup.object().shape({
        debitParty: yup.object().shape({
          entity: entityValidation,
          walletType: walletTypeValidation,
          msisdn: msisdnValidation,
          amount: amountValidation,
          purpose: purposeValidation,
          comment: commentValidation,
        }),
      })

    case "creditParty":
      return yup.object().shape({
        creditParty: yup.object().shape({
          entity: entityValidation,
          walletType: walletTypeValidation,
          msisdn: msisdnValidation,
        }),
      })

    case "preview":
      return yup.object().shape({
        debitParty: yup.object().shape({
          entity: entityValidation,
          walletType: walletTypeValidation,
          msisdn: msisdnValidation,
          amount: amountValidation,
          purpose: purposeValidation,
          comment: commentValidation,
        }),
        creditParty: yup.object().shape({
          entity: entityValidation,
          walletType: walletTypeValidation,
          msisdn: msisdnValidation,
        }),
      })

    default:
      return yup.object().shape({})
  }
}

export default schema
