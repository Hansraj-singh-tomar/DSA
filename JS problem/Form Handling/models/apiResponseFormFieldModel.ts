export interface ResponseFormField {
  isActionAllowed: boolean
  isEnabled: boolean
  isMandatory: boolean
  paramColumnName: string
  paramDataType: string
  paramDateFormat: string
  paramFieldType: string
  paramFileSize: number
  paramId: number
  paramLabelBn: string
  paramLabelEn: string
  paramMaxChar: number
  paramMinChar: number
  paramOptions: {
    isEnabled: boolean
    paramId: number
    paramOptionId: number
    paramOptionValue: string
  }[]
  paramPlaceholder: string
  paramPrefix: string
  paramSection: string
}

export interface DynamicMerchantFieldsBody {
  merchantCategoryCode: string
  paramDataType: string
  paramFieldType: string
  paramSection: string
}
