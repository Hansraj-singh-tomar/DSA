// import { values } from "lodash"
import * as yup from "yup"

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().min(4).max(32).required(),
})

const merchantTest = yup.object().shape({
  phoneNumber: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .required(),
  mnoName: yup.object().required(),
})

const merchantRegStep1 = yup.object().shape(
  {
    phoneNumber: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? undefined : value))
      .required(),
    mnoName: yup.object().required(),
    merchantName: yup.string().required(),
    merchantEmail: yup.string().email().required(),
    merchantCategory: yup.string().nullable(),
    merchantOrgName: yup.string().nullable(),
    merchantType: yup.string().nullable(),
    merchantOrgType: yup.string().nullable(),
    merchantOrgAddress: yup.string().nullable(),
    merchantVillageArea: yup.string().nullable(),
    merchantThanaUpazila: yup.string().nullable(),
    merchantDistrictCity: yup.string().nullable(),
    merchantDivision: yup.string().nullable(),
    merchantPostOffice: yup.string().nullable(),
    merchantPostCode: yup
      .string()
      .transform((value) => (Number.isNaN(value) ? undefined : value))
      .when("merchantPostCode", {
        is: (value: string) => value?.length,
        then: (rule) => rule.min(3).max(10),
      })
      .nullable(),
    applicantName: yup.string().required(),
    applicantphotoIdNumber: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? undefined : value))
      .required(),
    applicantContactNo: yup.number(),
    applicantMerchantRelationship: yup.object().nullable(),
    merchantAccNum: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? undefined : value))
      .required(),
    applicantGender: yup.object().required().nullable(true),
    fatherName: yup.string(),
    motherName: yup.string(),
    personalAddress: yup.string().nullable(),
    applicantVillageArea: yup.object().nullable(),
    applicantThanaUpazila: yup.object().nullable(),
    applicantDistrictCity: yup.object().nullable(),
    applicantDivision: yup.object().nullable(),
    applicantPostOffice: yup.string(),
    applicantPostCode: yup
      .string()
      .transform((value) => (Number.isNaN(value) ? undefined : value))
      .when("applicantPostCode", {
        is: (value: string) => value?.length,
        then: (rule) => rule.min(3).max(10),
      }),
  },
  [
    ["applicantPostCode", "applicantPostCode"],
    ["merchantPostCode", "merchantPostCode"],
  ],
)

const merchantRegStep2 = yup.object({
  Parent1: yup.string().nullable(),
  Parent2: yup.string().nullable(),
})

const merchantRegStep3 = yup.object({
  organisationMonthlyIncome: yup.string().nullable(),
  organisationOccupation: yup.string().nullable(),
  sourceOfFund: yup.string().nullable(),
  tradeLicenceNumber: yup.string().nullable(),
  day: yup.string().nullable(),
  month: yup.string().nullable(),
  year: yup.string().nullable(),
  issuingAuthority: yup.string().required().nullable(),
  vatRegistrationNumber: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .required(),
  accountHolderName: yup.string().nullable(),
  accountNumber: yup.string().nullable(),
  bankName: yup.string().nullable(),
  branch: yup.string().nullable(),
  routingNumber: yup.string().nullable(),
  newAccountHolderName: yup.string().nullable(),
  newAccountNumber: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .required(),
  newBankName: yup.string().nullable(),
  newBranch: yup.string().nullable(),
  newRoutingNumber: yup.string().nullable(),
  details1: yup.string().nullable(),
  details2: yup.string().nullable(),
  details3: yup.string().nullable(),
  details4: yup.string().nullable(),
})

const agentBulkUploadValidationSchema = yup.object({
  agentBulkexcelFile: yup.object().required().nullable(),
  agentBulkzipFile: yup.object().required().nullable(),
})

const agentHistoryDetailsRegStep1BasicDetailsSchema = yup.object({
  // parentDso: yup.object().required().nullable(),
})

const agentHistoryDetailsRegStep1PersonalDetailsSchema = yup.object({
  // applicantName: yup.string().required(),
  // fathersName: yup.string().required(),
  // nationality: yup.object().required(),
  // mothersName: yup.string().required(),
  // gender: yup.object().required(),
  // occupation: yup.object().required(),
  // dateOfBirth: yup.object().required(),
  // houseFlatShopNum: yup.string().required(),
  // bazarMarket: yup.string().required(),
  // villageArea: yup.string().required(),
  // postOffice: yup.string().required(),
  // unionWard: yup.string().required(),
  // division: yup.object().required(),
  // district: yup.object().required(),
  // thana: yup.object().required(),
  // subthana: yup.object().required(),
})

const agentHistoryDetailsRegStep2AdvanceDetailsSchema = yup.object({
  // oranizationName: yup.string().required(),
  // organizationType: yup.object().required(),
  // organizationbusinessType: yup.object().required(),
  // organizationTradeLicenseNum: yup.string().required(),
  // tradeLicenseValidity: yup.string().required(),
  // tradeLicenseIssuingAuthority: yup.string().required(),
  // organizationHouseFlatShopNum: yup.string().required(),
  // organizationBazarMarket: yup.string().required(),
  // organizationVillageArea: yup.string().required(),
  // organizationPostOffice: yup.string().required(),
  // organizationUnionWard: yup.string().required(),
  // organizationDivision: yup.object().required(),
  // organizationDistrict: yup.object().required(),
  // organizationThana: yup.object().required(),
  // organizationSubthana: yup.object().required(),
})

const agentHistoryDetailsRegStep2OtherDetailsSchema = yup.object({
  // uploadID: yup.object().required(),
  // photoIDNum: yup.string().required(),
  // idValidity: yup.string().required(),
  // advanceContactNumber: yup.string().required(),
  // advanceCluster: yup.object().required(),
  // advanceRegion: yup.object().required(),
  // advanceArea: yup.object().required(),
  // advanceTerritory: yup.object().required(),
  // advanceDistrict: yup.object().required(),
  // advanceThana: yup.object().required(),
})

const documentsFormSchema = yup.object()

const revenueConfigurationFormSchema = yup.object().shape({
  revenueRate: yup.string().required().nullable(),
})

const specialCharacterRegex = /(?=.*[@#$%^&+=]).*$/
const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required()
    .min(8, "Password should be at least 8 characters long")
    .max(20, "Password should be of maximum 8 characters long")
    .matches(
      specialCharacterRegex,
      "Password should contain at least on special character",
    ),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Both Passwords should match"),
})

const resetPinSchema = yup.object({
  pin: yup
    .string()
    .required()
    .min(4, "Pin should be 4 characters long")
    .test(
      "no-continuous-numbers",
      "PIN must not be continuous numbers",
      (value) => {
        if (!value) return true // Skip validation if no value is present

        const pinArray = value.split("").map(Number)
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i < pinArray.length; i++) {
          if (pinArray[i - 1] === pinArray[i] - 1) {
            return false // Found continuous numbers
          }
        }
        return true // No continuous numbers found
      },
    ),
  confirmPin: yup
    .string()
    .required()
    .oneOf([yup.ref("pin"), null], "Both Pin should match"),
})

const pinSetupSchema = yup.object({
  otp: yup.string().required().length(6),
  pin: yup
    .string()
    .required()
    .min(4, "Pin should be 4 characters long")
    .test(
      "no-continuous-numbers",
      "PIN must not be continuous numbers",
      (value) => {
        if (!value) return true // Skip validation if no value is present

        const pinArray = value.split("").map(Number)
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i < pinArray.length; i++) {
          if (pinArray[i - 1] === pinArray[i] - 1) {
            return false // Found continuous numbers
          }
          if (pinArray[i - 1] === pinArray[i] + 1) {
            return false // Found continuous numbers
          }
          if (pinArray[i - 1] === pinArray[i]) {
            return false // Found continuous numbers
          }
        }
        return true // No continuous numbers found
      },
    ),
  confirmPin: yup
    .string()
    .required()
    .oneOf([yup.ref("pin"), null], "Both Pin should match"),
})

export {
  merchantTest,
  merchantRegStep1,
  merchantRegStep2,
  merchantRegStep3,
  documentsFormSchema,
  validationSchema,
  agentBulkUploadValidationSchema,
  agentHistoryDetailsRegStep1BasicDetailsSchema,
  agentHistoryDetailsRegStep1PersonalDetailsSchema,
  agentHistoryDetailsRegStep2AdvanceDetailsSchema,
  agentHistoryDetailsRegStep2OtherDetailsSchema,
  revenueConfigurationFormSchema,
  resetPasswordSchema,
  resetPinSchema,
  pinSetupSchema,
}
