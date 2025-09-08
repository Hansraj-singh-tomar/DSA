import { IDefaultValueObject, RhfFieldNames } from "app/models/form"
import { AsyncOptionType, MnoList } from "./apiDataModel"
import { ApplicantDetails, FormFileObject, FormImageObject } from "./form"

export type CustomerAppManagementAMS = {
  activeTab: number
  homeChonologySubTab: number
  //   dealSubTab: number
  nagadInfoSubTab: number
  helpAndSupportSubTab: number
  tutorialSubTab: number
  faqSubTab: number
  dealSubTab: number
}

export type CustomerSingleRegTabDetails = {
  // customertyepeDetails: number
  basicDetailsTab: number
  basicDetailsPageNum: number
  activeStep: number
}

export type TCustomerBulkRegistration = {
  nameEn?: string | null
  customerName?: string | null
  customerAccountNumber?: string | null
  customerType?: AsyncOptionType | null
  pkycId?: string | null
  customerAccountType?: AsyncOptionType | null
  customerProfit?: AsyncOptionType | null
  customerFatherName?: string | null
  customerMotherName?: string | null
  customerSpouseName?: string | null
  customerNationality?: AsyncOptionType | null
  customerGender?: AsyncOptionType | null
  customerBloodGroup?: string | null
  customerEmail?: string | null
  customerOccupation?: string | null
  customerDOB?: string | null
  customerEmergencyName?: string | null
  customerMonthlyIncome?: AsyncOptionType | null
  customerEmergencyNo?: string | null
  customerPermanentAddress?: string | null
  customerPresentAddress?: string | null
  nomineeName?: string | null
  nomineeNid?: string | null
  nomineePhoneNo?: string | null
  nomineePercentage?: string | null
  introducerName?: string | null
  introducerMobileNo?: string | null
  introducerOccupation?: string | null
  introducerAddress?: string | null
  userAddresses?: []
  DOCUMENT?: FormFileObject
  BANK_ACCOUNT_DETAILS?: FormFileObject
  NID?: FormFileObject
  OTHER1?: FormFileObject
  OTHER2?: FormFileObject
}

type ParamOptionsType = {
  paramOptionId: number
  paramId: number
  paramOptionValue: string
  isEnabled: boolean
}

export type Details = {
  paramId: number
  paramCode: string
  paramLabelEn: string
  paramLabelBn: string
  paramPlaceholder: string
  paramColumnName: string
  paramDataType: string
  paramSection: string
  paramMinChar?: number
  paramMaxChar?: number
  paramFieldType: string
  isActionAllowed: boolean
  isMandatory: boolean
  isEnabled: boolean
  paramFileSize?: string
  paramOptions: ParamOptionsType[] | []
}

export type BankDetailsObj = {
  accountNumber: string
  bankName: string
  branch: string
  holderName: string
  routingNo: string
}

// interface Settlements {
//   minAmount?: any
//   maxAmount?: any
//   feesType?: any
//   feesCharge?: any
//   isMaxBalanceApplicable?: any
//   charge?: any
// }

export type TMerchantSingleRegistration = {
  settlementFeeFields?: any
  manualSettlementFields?: any
  manualSettlementFeeMinAmount?: any
  manualExcludingBalance?: any
  autoSettlementFields?: any
  autoSettlementFeeMinAmount?: any
  autoExcludingBalance?: any
  settlementPolicy?: any
  settlementPolicyWeeklyDay?: any
  settlementPolicyWeeklyHours?: any
  settlementPolicyWeeklyMinutes?: any
  settlementPolicyMonthlyDay?: any
  settlementPolicyMonthlyHours?: any
  settlementPolicyMonthlyMinutes?: any
  merchantTypeSettlementPolicyDailyHours?: any
  viaLifting?: any | null
  viaBank?: any | null
  viaCard?: any | null
  viaLiftingIsMaxNotAmountApplicable?: any | null
  viaBankIsMaxNotAmountApplicable?: any | null
  viaCardIsMaxNotAmountApplicable?: any | null
  viaLiftingMaxAmount?: any | null
  viaBankMaxAmount?: any | null
  viaCardMaxAmount?: any | null
  viaLiftingMinAmount?: any | null
  viaBankMinAmount?: any | null
  viaCardMinAmount?: any | null
  autoLifting?: any | null
  autoLiftingThreshold?: any | null
  viaLiftingSelectBank?: any | null
  channels?: any | null
  mobile?: string | null
  mno?: MnoList | null
  merchantName?: string | null
  merchantEmail?: string | null
  merchantCategoryCode?: AsyncOptionType | null
  merchantOrgName?: string | null
  merchantType?: AsyncOptionType | null
  merchantOrgType?: AsyncOptionType | null
  merchantOrgAddress?: string | null
  merchantVillageArea?: AsyncOptionType | null
  merchantThanaUpazila?: AsyncOptionType | null
  merchantDistrictCity?: AsyncOptionType | null
  merchantDivision?: AsyncOptionType | null
  merchantPostOffice?: string | null
  merchantPostCode?: string | null
  applicantName?: string | null
  applicantphotoIdNumber?: string | null
  applicantContactNum?: string | null
  applicantPhotoIdFile?: FormFileObject
  applicantMerchantRelationship?: AsyncOptionType | null
  merchantAccNum?: string | null
  applicantGender?: AsyncOptionType | null
  applicantFatherName?: string | null
  applicantMotherName?: string | null
  applicantPersonalAddress?: string | null
  applicantVillageArea?: AsyncOptionType | null
  applicantThanaUpazila?: AsyncOptionType | null
  applicantDistrictCity?: AsyncOptionType | null
  applicantDivision?: AsyncOptionType | null
  applicantPostOffice?: string | null
  applicantPostCode?: string | null
  Parent1?: AsyncOptionType[]
  Parent2?: AsyncOptionType[]
  organisationMonthlyIncome?: AsyncOptionType | null
  organisationOccupation?: AsyncOptionType | null
  sourceOfFund?: AsyncOptionType | null
  tradeLicenceNumber?: AsyncOptionType | null
  idValidity?: string | null
  issuingAuthority?: string | null
  vatRegistrationNumber?: string | null
  tinNumberFile?: FormFileObject
  bankDetails?: Array<BankDetailsObj>
  merchantDocumentFile?: FormImageObject
  tradeLicenseFile?: FormFileObject
  tinDocumentFile?: FormFileObject
  otherDocument1File?: FormFileObject
  otherDocument2File?: FormFileObject
}

export type TMerchantBulkRegistration = {
  nameEn?: string | null
  merchantName?: string | null
  merchantEmail?: string | null
  merchantCategory?: AsyncOptionType | null
  merchantOrgName?: string | null
  merchantType?: AsyncOptionType | null
  merchantOrgType?: AsyncOptionType | null
  merchantOrgAddress?: string | null
  merchantVillageArea?: AsyncOptionType | null
  merchantThanaUpazila?: AsyncOptionType | null
  merchantDistrictCity?: AsyncOptionType | null
  merchantDivision?: AsyncOptionType | null
  merchantPostOffice?: string | null
  merchantPostCode?: string | null
  applicantName?: string | null
  applicantphotoIdNumber?: string | null
  applicantContactNum?: string | null
  applicantPhotoIdFile?: FormFileObject
  applicantMerchantRelationship?: AsyncOptionType | null
  merchantAccNum?: string | null
  applicantGender?: AsyncOptionType | null
  applicantFatherName?: string | null
  applicantMotherName?: string | null
  applicantPersonalAddress?: string | null
  applicantVillageArea?: AsyncOptionType | null
  applicantThanaUpazila?: AsyncOptionType | null
  applicantDistrictCity?: AsyncOptionType | null
  applicantDivision?: AsyncOptionType | null
  applicantPostOffice?: string | null
  applicantPostCode?: string | null
  Parent1?: AsyncOptionType[]
  Parent2?: AsyncOptionType[]
  organisationMonthlyIncome?: AsyncOptionType | null
  organisationOccupation?: AsyncOptionType | null
  sourceOfFund?: AsyncOptionType | null
  tradeLicenceNumber?: AsyncOptionType | null
  idValidity?: string | null
  issuingAuthority?: string | null
  vatRegistrationNumber?: string | null
  tinNumberFile?: FormFileObject
  applicantDetails?: ApplicantDetails
  bankDetails?: Array<BankDetailsObj>
  MERCHANT_DOCUMENT?: FormImageObject
  TRADE_LICENSE?: FormFileObject
  TIN?: FormFileObject
  OTHER_DOCUMENT1?: FormFileObject
  OTHER_DOCUMENT?: FormFileObject
  userAddresses?: []
  // merchantDocumentFile?: FormImageObject
  // tradeLicenseFile?: FormFileObject
  // tinDocumentFile?: FormFileObject
  // otherDocument1File?: FormFileObject
  // otherDocument2File?: FormFileObject
}

export type TMerchantSingleRegistrationDynamicFields = {
  basicDetails: RhfFieldNames[]
  businessDetails: RhfFieldNames[]
  advancedDetails: RhfFieldNames[]
  documents: RhfFieldNames[]
}

export type TAgentSingleRegFormDetails = {
  mobile?: number | null
  agentType?: String | null
  agent?: String | null
  firstName?: string | null
  surName?: string | null
  userNationality?: AsyncOptionType | null
  msisdn?: string | null
  gender?: AsyncOptionType | null
  idType?: AsyncOptionType | null
  dateOfBirth?: string | null
  idNo?: string | null
  completeAddress?: string | null
  province?: string | null
  msisdn2?: string | null
  regDate?: string | null
  email?: string | null
  approvalStatus?: string | null
  approvalDate?: string | null
  agentDetails?: string | null
  orgName?: string | null
  orgMobileNo?: string | null
  orgEmail?: string | null
  orgAddress?: string | null
  agentCode?: string | null
  taxType?: AsyncOptionType | null
  agentDocument?: FormFileObject
  tradeLicense?: FormFileObject
  tin?: FormFileObject
  companyType?: FormFileObject
  other?: FormFileObject
  other2?: FormFileObject
  bankDetails?: Array<any>
  otherDetails?: IDefaultValueObject
}
export type TMerchantSingleRegFormDetails = {
  mobile?: number | null
  agentType?: String | null
  agent?: String | null
  firstName?: string | null
  surName?: string | null
  userNationality?: AsyncOptionType | null
  msisdn?: string | null
  gender?: AsyncOptionType | null
  idType?: AsyncOptionType | null
  dateOfBirth?: string | null
  idNo?: string | null
  completeAddress?: string | null
  province?: string | null
  msisdn2?: string | null
  regDate?: string | null
  email?: string | null
  approvalStatus?: string | null
  approvalDate?: string | null
  agentDetails?: string | null
  orgName?: string | null
  orgMobileNo?: string | null
  orgEmail?: string | null
  orgAddress?: string | null
  agentCode?: string | null
  taxType?: AsyncOptionType | null
  agentDocument?: FormFileObject
  tradeLicense?: FormFileObject
  tin?: FormFileObject
  companyType?: FormFileObject
  other?: FormFileObject
  other2?: FormFileObject
  bankDetails?: Array<any>
  otherDetails?: IDefaultValueObject
}

export type TAgentBulkRegFormDetails = {
  versionJson?: {
    kyc?: IDefaultValueObject
    otherDetails?: IDefaultValueObject
    documents?: IDefaultValueObject
  }
  distributor?: AsyncOptionType | null
  parentDso?: AsyncOptionType | null
  applicantName?: string | null
  applicantDetails?: IDefaultValueObject | null
  fathersName?: string | null
  nationality?: AsyncOptionType | null
  mothersName?: string | null
  gender?: AsyncOptionType | null
  occupation?: AsyncOptionType | null
  agentType?: string | null
  dateOfBirth?: string | null
  houseFlatShopNum?: string | null
  bazarMarket?: string | null
  roadNumName?: string | null
  villageArea?: string | null
  postOffice?: string | null
  unionWard?: string | null
  division?: AsyncOptionType | null
  district?: AsyncOptionType | null
  thana?: AsyncOptionType | null
  subthana?: AsyncOptionType | null
  postalCode?: string | null
  organizationName?: string | null
  organizationType?: AsyncOptionType | null
  organizationbusinessType?: AsyncOptionType | null
  organizationAgentTinNum?: string | null
  organizationVatRegNum?: string | null
  organizationTradeLicenseNum?: string | null
  tradeLicenseValidity?: string | null
  tradeLicenseIssuingAuthority?: string | null
  organizationHouseFlatShopNum?: string | null
  organizationBazarMarket?: string | null
  organizationRoadNumName?: string | null
  organizationVillageArea?: string | null
  organizationPostOffice?: string | null
  organizationUnionWard?: string | null
  organizationDivision?: AsyncOptionType | null
  organizationDistrict?: AsyncOptionType | null
  organizationThana?: AsyncOptionType | null
  organizationSubthana?: AsyncOptionType | null
  organizationPostalCode?: string | null
  uploadID?: FormFileObject | null
  photoIDNum?: string | null
  idValidity?: string | null
  advanceContactNumber?: string | null
  advanceEmailID?: string | null
  advanceEmergencyContactNumber?: string | null
  advanceCluster?: AsyncOptionType | null
  advanceRegion?: AsyncOptionType | null
  advanceArea?: AsyncOptionType | null
  advanceTerritory?: AsyncOptionType | null
  advanceDistrict?: AsyncOptionType | null
  advanceThana?: AsyncOptionType | null
  agentDocument?: FormFileObject
  tradeLicense?: FormFileObject
  tin?: FormFileObject
  companyType?: FormFileObject
  other?: FormFileObject
  other2?: FormFileObject
}

export type TDsoSingleRegFormDetails = {
  mobile?: string | null
  mno?: AsyncOptionType | null
  dsoType?: IDefaultValueObject
  organisationName?: string | null
  organisationType?: AsyncOptionType | null
}

export type TDsoBulkRegFormDetails = {
  tradeLicenseExpiryDate?: any
  distributor?: AsyncOptionType | null
  parentDso?: AsyncOptionType | null
  applicantName?: string | null
  applicantDetails?: IDefaultValueObject | null
  fathersName?: string | null
  nationality?: AsyncOptionType | null
  mothersName?: string | null
  gender?: AsyncOptionType | null
  occupation?: AsyncOptionType | null
  agentType?: string | null
  dateOfBirth?: string | null
  houseFlatShopNum?: string | null
  bazarMarket?: string | null
  roadNumName?: string | null
  villageArea?: string | null
  postOffice?: string | null
  unionWard?: string | null
  division?: AsyncOptionType | null
  district?: AsyncOptionType | null
  thana?: AsyncOptionType | null
  subthana?: AsyncOptionType | null
  postalCode?: string | null
  organizationName?: string | null
  organizationType?: AsyncOptionType | null
  organizationbusinessType?: AsyncOptionType | null
  organizationAgentTinNum?: string | null
  organizationVatRegNum?: string | null
  organizationTradeLicenseNum?: string | null
  tradeLicenseValidity?: string | null
  tradeLicenseIssuingAuthority?: string | null
  organizationHouseFlatShopNum?: string | null
  organizationBazarMarket?: string | null
  organizationRoadNumName?: string | null
  organizationVillageArea?: string | null
  organizationPostOffice?: string | null
  organizationUnionWard?: string | null
  organizationDivision?: AsyncOptionType | null
  organizationDistrict?: AsyncOptionType | null
  organizationThana?: AsyncOptionType | null
  organizationSubthana?: AsyncOptionType | null
  organizationPostalCode?: string | null
  dsoOfficeAddressCopy?: boolean
  organizationRegisteredHouseFlatShopNum?: string | null
  organizationRegisteredBazarMarket?: string | null
  organizationRegisteredRoadNumName?: string | null
  organizationRegisteredVillageArea?: string | null
  organizationRegisteredPostOffice?: string | null
  organizationRegisteredUnionWard?: string | null
  organizationRegisteredDivision?: AsyncOptionType | null
  organizationRegisteredDistrict?: AsyncOptionType | null
  organizationRegisteredThana?: AsyncOptionType | null
  organizationRegisteredSubthana?: AsyncOptionType | null
  organizationRegisteredPostalCode?: AsyncOptionType | null
  uploadID?: FormFileObject | null
  photoIDNum?: string | null
  idValidity?: string | null
  advanceContactNumber?: string | null
  advanceEmailID?: string | null
  advanceEmergencyContactNumber?: string | null
  advanceCluster?: AsyncOptionType | null
  advanceRegion?: AsyncOptionType | null
  advanceArea?: AsyncOptionType | null
  advanceTerritory?: AsyncOptionType | null
  advanceDistrict?: AsyncOptionType | null
  advanceThana?: AsyncOptionType | null
  DOCUMENT?: FormFileObject
  TRADE_LICENSE?: FormFileObject
  TIN?: FormFileObject
  VAT_REGISTRATION_COPY?: FormFileObject
  OTHER1?: FormFileObject
  OTHER2?: FormFileObject
  userAddresses?: []
  // agentDocument?: FormFileObject
  // tradeLicense?: FormFileObject
  // tin?: FormFileObject
  // companyType?: FormFileObject
  // other?: FormFileObject
  // other2?: FormFileObject
}

/* export type TMerchantBulkRegistration = {
  excelFile: FormFileObject
  zipFile: FormFileObject
} */

export type TAgentBulkFileDetails = {
  agentBulkexcelFile: FormFileObject
  agentBulkzipFile: FormFileObject
}

export type TDsoBulkFileDetails = {
  dsoBulkexcelFile: FormFileObject
}

export type TabValuePageNumObject = {
  basicDetailsTab: number
  additionalBankCounter: number
  advancedDetailsTab: number
  parentSelection: boolean
  liftingFunctionality: boolean
  settlementFunctionality: boolean
  autoSettlementCheck: boolean
  manualSettlementCheck: boolean
  activeStep: number
  merchantCategoryCode: string | null
}

export type PriceCodeTabPageNumObject = {
  activeStep: number
}
export type TransactionDetailsType = {
  isActive: boolean
  transactionTypeName: string
  transactionTypeDisplayName: string
  transactionTypeNotificationName: string
  sourceWalletType: string
  sourceUserType: string
  sourceUserSubType: string
  destinationWalletType: string
  destinationUserType: string
  destinationUserSubType: string
  channel: string
  transactionCode: string
  userType: string
  category: string
  playersReceivingCommission?: string
  senderTitle: string
}
export type MerchantBulkRegTabDetails = {
  basicDetailsTab: number
  basicDetailsTabPrevious: number
  basicDetailsPageNum: number
  additionalBankDetails: boolean
  parentSelection: boolean
  liftingFunctionality: boolean
  settlementFunctionality: boolean
  autoSettlementCheck: boolean
  manualSettlementCheck: boolean
  activeStep: number
  activeStepPrevious: number
  merchantCategoryCode: string | null
}

export type TDistributorSingleRegFormValues = {
  BUSINESS_HIERARCHY?: IDefaultValueObject | null
  ORG_REGISTERED?: IDefaultValueObject | null
  OFFICE?: IDefaultValueObject | null
  PERMANENT?: IDefaultValueObject | null
  mobile?: string | null
  mno?: AsyncOptionType | null
  applicantName?: string | null
  fatherName?: string | null
  nationality?: string | null
  mothersName?: string | null
  gender?: AsyncOptionType | null
  occupation?: string | null
  agentType?: string | null
  dateOfBirth?: string | null
  houseFlatShopNum?: string | null
  bazarMarket?: string | null
  roadNumName?: string | null
  villageArea?: string | null
  postOffice?: string | null
  unionWard?: string | null
  bankDetails?: Array<BankDetailsObj>
  division?: AsyncOptionType | null
  district?: AsyncOptionType | null
  thana?: AsyncOptionType | null
  subthana?: AsyncOptionType | null
  postalCode?: string | null
  Parent1?: AsyncOptionType[] | null
  organizationName?: string | null
  organizationType?: AsyncOptionType | null
  tinNumDistributor?: string | null
  VatRegistrationNum?: string | null
  tradeLicenseNum?: string | null
  tradeLicenseValidity?: string | null
  tradeLicenseIssuingAuthority?: string | null
  officeHouseFlatShopNum?: string | null
  officeBazarMarket?: string | null
  officeRoadNumName?: string | null
  officeVillageArea?: string | null
  officePostOffice?: string | null
  officeUnionWard?: string | null
  officeDivision?: AsyncOptionType | null
  officeDistrict?: AsyncOptionType | null
  officeThana?: AsyncOptionType | null
  officeSubthana?: AsyncOptionType | null
  officePostalCode?: string | null
  officeAddressCopy?: boolean | null
  registeredHouseFlatShopNum?: string | null
  registeredBazarMarket?: string | null
  registeredRoadNumName?: string | null
  registeredVillageArea?: string | null
  registeredPostOffice?: string | null
  registeredUnionWard?: string | null
  registeredDivision?: AsyncOptionType | null
  registeredDistrict?: AsyncOptionType | null
  registeredThana?: AsyncOptionType | null
  registeredSubthana?: AsyncOptionType | null
  registeredPostalCode?: string | null
  uploadId?: FormFileObject | null
  photoIDNum?: string | null
  idValidity?: string | null
  contactNumber?: string | null
  emergencyContactName?: string | null
  emergencyContactNum?: string | null
  emailId?: string | null
  faxNum?: string | null
  advanceCluster?: AsyncOptionType | null
  advanceRegion?: AsyncOptionType | null
  advanceArea?: AsyncOptionType | null
  advanceTerritory?: AsyncOptionType | null
  advanceDistrict?: AsyncOptionType | null
  advanceThana?: AsyncOptionType | null
  distributorDocumentFile?: FormFileObject
  tradeLicenseFile?: FormFileObject
  tinDocumentFile?: FormFileObject
  companyTypeFile?: FormFileObject
  otherDocument1File?: FormFileObject
  otherDocument2File?: FormFileObject
}

export type TDistributorBulkRegFormValues = {
  parent?: any
  applicantName?: string | null
  applicantDetails?: IDefaultValueObject | null
  fatherName?: string | null
  nationality?: string | null
  mothersName?: string | null
  gender?: AsyncOptionType | null
  occupation?: string | null
  bankDetails?: Array<BankDetailsObj>
  agentType?: string | null
  dateOfBirth?: string | null
  houseFlatShopNum?: string | null
  bazarMarket?: string | null
  roadNumName?: string | null
  villageArea?: string | null
  postOffice?: string | null
  unionWard?: string | null
  division?: AsyncOptionType | null
  district?: AsyncOptionType | null
  thana?: AsyncOptionType | null
  subthana?: AsyncOptionType | null
  postalCode?: string | null
  Parent1?: AsyncOptionType[] | null
  organizationName?: string | null
  organizationType?: AsyncOptionType | null
  tinNumDistributor?: string | null
  VatRegistrationNum?: string | null
  tradeLicenseNum?: string | null
  tradeLicenseValidity?: string | null
  tradeLicenseIssuingAuthority?: string | null
  officeHouseFlatShopNum?: string | null
  officeBazarMarket?: string | null
  officeRoadNumName?: string | null
  officeVillageArea?: string | null
  officePostOffice?: string | null
  officeUnionWard?: string | null
  officeDivision?: AsyncOptionType | null
  officeDistrict?: AsyncOptionType | null
  officeThana?: AsyncOptionType | null
  officeSubthana?: AsyncOptionType | null
  officePostalCode?: string | null
  registeredHouseFlatShopNum?: string | null
  registeredBazarMarket?: string | null
  registeredRoadNumName?: string | null
  registeredVillageArea?: string | null
  registeredPostOffice?: string | null
  registeredUnionWard?: string | null
  registeredDivision?: AsyncOptionType | null
  registeredDistrict?: AsyncOptionType | null
  registeredThana?: AsyncOptionType | null
  registeredSubthana?: AsyncOptionType | null
  registeredPostalCode?: string | null
  uploadId?: FormFileObject | null
  photoIDNum?: string | null
  idValidity?: string | null
  contactNumber?: string | null
  emergencyContactName?: string | null
  emergencyContactNum?: string | null
  emailId?: string | null
  faxNum?: string | null
  advanceCluster?: AsyncOptionType | null
  advanceRegion?: AsyncOptionType | null
  advanceArea?: AsyncOptionType | null
  advanceTerritory?: AsyncOptionType | null
  advanceDistrict?: AsyncOptionType | null
  advanceThana?: AsyncOptionType | null
  distributorDocumentFile?: FormFileObject
  tradeLicenseFile?: FormFileObject
  tinDocumentFile?: FormFileObject
  companyTypeFile?: FormFileObject
  otherDocument1File?: FormFileObject
  otherDocument2File?: FormFileObject
  userAddresses?: []
}

export type TDistributorSingleRegTabValues = {
  basicDetailsTab: number
  advanceDetailsTab: number
  parentSelection: boolean
  activeStep: number
  advanceDetailsAddressCopy: boolean
  additionalBankCounter: number
  distributorCategoryCode: string | null
}

export type TDistributorBulkRegTabDetails = {
  basicDetailsTab: number
  advanceDetailsTab: number
  advanceDetailsTabPrevious: number
  parentSelection: boolean
  activeStep: number
  activeStepPrevious: number
  advanceDetailsAddressCopy: boolean
  distributorCategoryCode: string | null
}

export type TCustomerSingleRegistration = {
  mobile?: string | null
  mno?: MnoList | null
  idName?: string | null
  idNo?: string | null
  bankDetails?: FormFileObject
}

export type CustomerBulkRegTabDetails = {
  activeStep: number
  activeStepPrevious: number
}

export type AgentTabPageValueObject = {
  basicDetailsPageNum: number
  advanceDetailsPageNum: number
  activeStep: number
}

export type TAgentSingleRegTabDetails = {
  activeStep: number
  basicDetailsTab: number
  advancedDetailsTab: number
  additionalBankCounter: number
}

export type TAgentBulkRegTabDetails = {
  activeStep: number
  basicDetailsTab: number
  advancedDetailsTab: number
  basicDetailsTabPrevious: number
  advancedDetailsTabPrevious: number
  activeStepPrevious: number
}

export type TDsoSingleRegTabDetails = {
  activeStep: number
  activeStepPrevious: number
  basicDetailsTab: number
  otherDetailsTabCheck: number
  advancedDetailsTab: number
  advancedDetailsTabPrevious: number
}

export type TDsoBulkRegTabDetails = {
  activeStep: number
  basicDetailsTab: number
  advancedDetailsTab: number
  activeStepPrevious: number
  advancedDetailsTabPrevious: number
}

export type TransactionApprovalLifting = {
  activeTab: number
  activeSubTab: number
  isViewVisited: boolean
  activeTabBeforeViewVisited: number
  activeSubTabBeforeViewVisited: number
}

export type TotalRecords = {
  totalListElementCount: number
}

export type CategoryApproval = {
  activeTab: number
  categoryName: string
  categoryType: CategoryType[]
  categoryUserType: string
  basicDetailsParams: Details[]
  basicAdditionalDetailsParams: Details[]
  advancedDetailsParams: Details[]
  documentsParams: Details[]
}
export type CategoryDetails = {
  createdBy: string
  createdOn: string
  mappedType: string[]
  noDynamicParameter: number
  taggedDefaultType: string
  approvalCode: string
  approverUserType: string
  approverLevel: string
  approverUserCode: string
  status: string
  approvedBy: string
  approvedOn: string
  lastActionTakenOn: string
  lastActionTakenBy: string
}
export type TransactionApprovalLiftingDistributor = {
  activeStep: number
  basicDetailsTab: number
}

export type TransactionApprovalRefund = {
  activeTab: number
  activeSubTab: number
  isViewVisited: boolean
  activeTabBeforeViewVisited: number
  activeSubTabBeforeViewVisited: number
}

export type MerchantCategory = {
  parameterId: number
  parameterKey: string
  parameterType: string
  type: string
  section: string
  isReqiured: boolean
}

export type CategoryType = {
  merchantType: string
  merchantTypeCode: string
  merchantTypeDefaultFlag: boolean
}

export type MerchantCategoryPreview = {
  parameterId: number
  parameterKey: string
  parameterLabelEN: string
  parameterLabelBGL: string
  parameterType: string
  parameterInputType: string
  type: string
  section: string
  isReqiured: boolean
  isEnabled: boolean
  parameterProps?: {
    maxChar?: number
    parameterInputTypeValues?: [
      {
        value: string
      },
    ]
    otherEnabled?: boolean
    fileSize?: string
    dateFormat?: string
  }
}

export type TOnboardingRulesParameterDetails = {
  parameterId: number
  parameterKey: string
  parameterLabelEN: string
  parameterLabelBGL: string
  parameterInputType: string
  isEnabled: boolean
  parameterType: string
  parameterProps?: {
    maxChar?: number
    parameterInputTypeValues?: [
      {
        value: string
      },
    ]
    otherEnabled?: boolean
    fileSize?: string
    dateFormat?: string
  }
}

export type TemplateAssignment = {
  id: number
  templateCode: string
  templateName: string
  templateText: string
  templateMessage: string
  templateAction: string
  isDefault: string
  accountStatus: string
  assignedProfileType: string
  status: string
  isEnabled: boolean
  ussdJourneyDesign: string
  ussdTemplateAccountStatusMapping: []
  ussdTemplateProfileTypeMapping: []
}

export type TemplateAssignmentFormData = {
  user: ""
  profile: ""
}

export type GeneralDetailsViewData = {
  batchId: string | null
  amount: string
  priceCode: string
  disbursementType: string
  location: string
  noOfEntries: string
  errorEntry: string
  totalSuccessTransaction: string
  totalFailedTranstation: string
  createdBy: string
  submittedOn: string
  scheduledOn: string
  completedOn: string
  dmtap: string
  totalFee: string
  createdTimestamp: string
  batchStatus: string
  disbursementstatus: string
  approvalstatus: string
  totalEntries: string
  validEntries: string
  errorEntries: string
  countOfDMTAP: number
  amountOFDMTAP: string
  disbursementPriceCode: string
  approvalCode: string
  boApprovalLevel: string | null
  disbursementTotalFee: string
  boApproverUserType?: string | null
  nextApproverUserType?: string | null
  disbursementStatus?: string | null
  cancelledByEmail?: string | null
  cancelledBy?: string | null
  cancelledOn?: string
  cancellationRemarks?: string | null
  cancelledByUserType?: string | null
  isDMTAPAllowed?: boolean
}

export type GererationBulkData = {
  batchId: string | null
  createdBy: string
  createdOn: string
  batchStatus: string
  executionStatus: string
  validation: string
}

export type CCTabPagenumObject = {
  activeStep: number
}

export type TDistributorSingleRegistrationDynamicFields = {
  basicDetails: RhfFieldNames[]
  businessDetails: RhfFieldNames[]
  advancedDetails: RhfFieldNames[]
  documents: RhfFieldNames[]
}

export type LimitHeadsAMS = {
  activeTab: number
}
export type TagsManagementAMS = {
  activeTab: number
}
export type ServiceCommissionConfig = {
  activeStep: number
}

export type ServiceCommategory = {
  activeTab: number
}
export type ServiceFeeCommategory = {
  activeTab: number
}

export type ServiceFeeConfig = {
  activeTab: number
}

export type ReplenishmentOperational = {
  activeTab: number
}

export type ReplenishmentTCSAReceivable = {
  activeTab: number
}
export type TCSAAdjustmentAMS = {
  activeTab: number
}

export type DHAppManagementAMS = {
  activeTab: number
  homeChonologySubTab: number
  dealSubTab: number
  nagadInfoSubTab: number
  helpAndSupportSubTab: number
  tutorialSubTab: number
  faqSubTab: number
}

export type DSOAppManagementAMS = {
  activeTab: number
  homeChonologySubTab: number
  dealSubTab: number
  nagadInfoSubTab: number
  helpAndSupportSubTab: number
  tutorialSubTab: number
  faqSubTab: number
}

export type MerchantAppManagementAMS = {
  activeTab: number
  homeChonologySubTab: number
  dealSubTab: number
  drawerMenuSubTab: number
  nagadInfoSubTab: number
  helpAndSupportSubTab: number
  tutorialSubTab: number
  faqSubTab: number
}

export type AgentAppManagementAMS = {
  activeTab: number
  homeChonologySubTab: number
  dealSubTab: number
  drawerMenuSubTab: number
  nagadInfoSubTab: number
  helpAndSupportSubTab: number
  tutorialSubTab: number
  faqSubTab: number
}

export type IslamicCustomerAppManagementAMS = {
  activeTab: number
  homeChonologySubTab: number
  dealSubTab: number
  nagadInfoSubTab: number
  helpAndSupportSubTab: number
  tutorialSubTab: number
  faqSubTab: number
}

export type SuperDHAppManagementAMS = {
  activeTab: number
  homeChonologySubTab: number
  dealSubTab: number
  nagadInfoSubTab: number
  helpAndSupportSubTab: number
  tutorialSubTab: number
  faqSubTab: number
}
