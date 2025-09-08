import { ReactNode } from "react"
import { ImageValueType } from "./formFields"
import { Column } from "./Table"

export type FieldNames = {
  selector: string
  label: string
  placeholder: string
  name: string
  type: string
  multiline: boolean
  xs: number
}

export type RhfFieldNames = {
  selector:
    | "textfield"
    | "numericIncDec"
    | "combobox"
    | "asyncCombobox"
    | "radio"
    | "checkbox"
    | "multiCheckbox"
    | "button"
    | "attachment"
    | "attachmentOnboarding"
    | "textarea"
    | "dragdrop"
    | "multiCombobox"
    | "date"
    | "multiCheckbox"
    | "radioButton"
    | "time"
    | "switch"
    | "multiCheckbox2"
    | "sunEditor"
    | "multiswitch"
    | "dateTime"
  labelsPlacement?: any
  labelsStyle?: any
  label: string
  placeholder?: string
  labelPlacement?: "top" | "bottom" | "end" | "start" | undefined
  name: string
  xs: number
  dropdownSelector?: string
  rows?: number
  valueType?: ImageValueType
  accept?: string
  required?: boolean
  autoComplete?: string
  isStartIconOrText?: boolean
  startIconOrText?: string
  fileSize?: string
  fieldHide?: boolean
  isHelperText?: boolean
  maxValue?: number
  helperText?: string
  xsModalPage?: number
  columns?: Column[]
  isStartIcon?: boolean
  startAdornment?: string
  isDisabled?: boolean | any
  labelType?: string
  isOnlyNumber?: boolean
  isIncrementDecrementNumber?: boolean
  isTypeNumber?: boolean
  isOnlyAlphabets?: boolean
  isEndIconOrText?: boolean
  endIconOrText?: ReactNode | string
  isAlphaNumeric?: boolean
  isNumericWithSpecialChar?: boolean
  isFloat?: boolean
  minLength?: number
  maxLength?: number
  isAPIPaginationRequired?: boolean
  onChangeFunCall?: boolean
  isInstantUpload?: boolean
  size?: number
  apiImageType?: string
  radioButtonsValueLabel?: { label: any; value: any }[]
  isRowDirection?: boolean
  isTableHidden?: boolean
  apiKeyToSend?: string
  headerLabel?: string
  handleChange?: (() => void) | undefined
  isMultiSelect?: boolean
  disableFutureDate?: boolean
  selected?: string
  dynamicOptions?: {
    isEnabled: boolean
    paramId: number
    paramOptionId: number
    paramOptionValue: string
  }[]
  isChipsRequired?: boolean
  chipSelector?: string
  isRadioButtonRequired?: boolean
  isTableRequired?: boolean
  disablePastDate?: boolean
  minDate?: string
  options?: object[]
  isEndLabel?: boolean
  endLabel?: string
  isSelectAll?: boolean
  characterLimit?: number
  externalHandleChange?: (() => void) | undefined
  hideLabel?: boolean
  defaultValue?: any
  labelSelector?: string | null | undefined
  labels?: any
  dependent?: object
  type?: string
  isCropModal?: boolean
  isSuccess?: boolean
  color?: string
  isAutoFocus?: boolean
  successHelperText?: string
  focused?: boolean
  onFocus?: () => void
  onBlur?: () => void
  onSelectCapture?: (position: number) => void
  nameSelector?: string
  text?: string
  height?: string
  isSpaceAllowed?: boolean
  maxDate?: string | Date
  disableTodayAction?: boolean
  instructionMessage?: string
  acceptedType?: object
  maxSize?: number
  isCropFile?: boolean
  buttonList?: any
  isStaticFileUpload?: boolean
  isGeneralImageUpload?: boolean
  isStaticImageUpload?: boolean
  isDocUpload?: boolean
  userCode?: string
  endIconOnClick?: () => void
  isEndIconEnabled?: boolean
  labelVariant?: "label" | "subtitle2" | undefined
  views?: Array<"hours" | "minutes" | "seconds"> | undefined
  inputFormat?: string
  disableClearable?: boolean
  isSoftDelete?: boolean
  minutesStep?: number
  customRegexExpression?: any
  isFloatLength?: boolean
  isDimensionValidate?: boolean
  imgWidth?: number
  imgHeight?: number
  tooltipMessage?: string
  isImageUpload?: boolean
  variant?: "text" | "outlined" | "contained" | "secondary"
  style?: any
  onClick?: () => void
  spaceBetweenSwitchAndLabel?: number
  isCommaSeparatedInput?: boolean
  ampm?: boolean
  properStyle?: any
  userType?: string
  fileSizeAlert?: string
  disabled?: any
  uploadToCustomSystemLiftingAPI?: boolean
  Isrequired?: boolean
  previewUrl?: object[]
  isBannerImage?: boolean
  errorVisibility?: boolean
  customError?: string
}

export type IDefaultValueObject = {
  [propertyName: string]: any
}

export type FileObject = {
  [propertyName: string]: object
}

export type FormFileObject = {
  fileName: string
  fileSize: number
  fileType: string
  base64String: string
}

export type FormImageObject = {
  fileName: string
  fileId: any
}

export type ApplicantDetails = {
  [key: string]: string
}

export type CSSStyles = {
  [key: string]: string
}

export type TabObject = {
  tab1: boolean
  tab2: boolean
  tab3: boolean
  tab4: boolean
  tab5: boolean
}

export const successResponseCode = 200
export const successResponseCode1 = 201
export const successResponseCode2 = 20000
export const successResponseCode3 = 20001

export type PolicyDropdownType = {
  policyId: number
  policyType: string
}
export interface DropdownType {
  id: number
  keyName: string
  keyValue: string
  type: string
}
