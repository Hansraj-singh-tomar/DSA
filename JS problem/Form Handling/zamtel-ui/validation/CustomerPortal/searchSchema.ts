import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function searchSchema(formStage: string) {
  let validationSchema

  const changeType = {
    changeProfileCategoryReason: genValidation({
      type: "object",
      isNullable: true,
      isRequired: true,
    }),
    ChangeProfileReason: genValidation({
      type: "string",
      isRequired: true,
    }),
  }

  const ChangeStatusSchema1 = {
    customerStatus: genValidation({
      type: "object",
      isNullable: true,
      isRequired: true,
    }),
    customerStatusTextbo: genValidation({
      type: "string",
      isRequired: true,
    }),
  }
  const ChangeStatusSchema2 = {
    customerStatusTextbo: genValidation({
      type: "string",
      isRequired: true,
    }),
  }

  const DeWhitelist = {
    deWhiteList: genValidation({
      type: "string",
      isRequired: true,
    }),
  }

  const ResendNoti = {
    channel: yup.string().required("Please Select an option"),
  }

  const ActiveUser = {
    ActiveUserReason: genValidation({
      type: "string",
      isRequired: true,
    }),
  }

  const SuspendAccount = {
    reason: yup.string().nullable().required("Please Select an option"),
  }

  const SuspendAccount1 = {
    otherReasonArea: genValidation({
      type: "string",
      isRequired: true,
    }),
  }

  const changeMerchantType = {
    merchantType: genValidation({
      type: "object",
      isNullable: true,
      isRequired: true,
    }),
    ChangeProfieReason: genValidation({
      type: "string",
      isRequired: true,
    }),
  }

  const changeMerchantCategory = {
    merchantCategory: genValidation({
      type: "object",
      isNullable: true,
      isRequired: true,
    }),
    ChangeMerchantCategoryReason: genValidation({
      type: "string",
      isRequired: true,
    }),
  }

  const advanceSearchRegDate = {
    startDateReg: yup.number().nullable(),
    endDateReg: yup
      .number()
      .nullable()
      .min(yup.ref("startDateReg"), "End date must be after Start date"),
  }
  const kycInfoStartEndDate = {
    regStartDate: yup.number().nullable(),
    regEndDate: yup
      .number()
      .nullable()
      .min(yup.ref("regStartDate"), "End date must be after Start date"),
  }
  const transactionHistoryStartEndDate = {
    registrationDateFrom: yup.number().nullable(),
    registrationDateTo: yup
      .number()
      .nullable()
      .min(
        yup.ref("registrationDateFrom"),
        "End date must be after Start date",
      ),
  }
  const tokenizationInfoStartEndDate = {
    registrationDateFrom: yup.number().nullable(),
    registrationDateTo: yup
      .number()
      .nullable()
      .min(
        yup.ref("registrationDateFrom"),
        "End date must be after Start date",
      ),
  }

  const ChangeStatusAgentSchema = {
    customerStatus: genValidation({
      type: "object",
      isNullable: true,
      isRequired: true,
    }),
  }

  switch (formStage) {
    case "ChangeStatusSchema1":
      validationSchema = yup.object().shape({
        ...ChangeStatusSchema1,
      })
      break
    case "ChangeStatusAgentSchema":
      validationSchema = yup.object().shape({
        ...ChangeStatusAgentSchema,
        ...ChangeStatusSchema2,
      })
      break
    case "ChangeStatusSchema2":
      validationSchema = yup.object().shape({
        ...ChangeStatusSchema2,
      })
      break
    case "ActivateUser":
      validationSchema = yup.object().shape({
        ...ActiveUser,
      })
      break
    case "DeWhitelist":
      validationSchema = yup.object().shape({
        ...DeWhitelist,
      })
      break
    case "ResendNoti":
      validationSchema = yup.object().shape({
        ...ResendNoti,
      })
      break
    case "SuspendAccount":
      validationSchema = yup.object().shape({
        ...SuspendAccount,
      })
      break
    case "SuspendAccount1":
      validationSchema = yup.object().shape({
        ...SuspendAccount1,
      })
      break
    case "ChangeMerchantType":
      validationSchema = yup.object().shape({
        ...changeMerchantType,
      })
      break
    case "ChangeMerchantCategory":
      validationSchema = yup.object().shape({
        ...changeMerchantCategory,
      })
      break
    case "advanceSearchRegDate":
      validationSchema = yup.object().shape({
        ...advanceSearchRegDate,
      })
      break
    case "kycInfoStartEndDate":
      validationSchema = yup.object().shape({
        ...kycInfoStartEndDate,
      })
      break
    case "transactionHistoryStartEndDate":
      validationSchema = yup.object().shape({
        ...transactionHistoryStartEndDate,
      })
      break
    case "tokenizationInfoStartEndDate":
      validationSchema = yup.object().shape({
        ...tokenizationInfoStartEndDate,
      })
      break
    case "ChangeType":
      validationSchema = yup.object().shape({
        ...changeType,
      })
      break
    default:
      break
  }
  return validationSchema
}

export default searchSchema
