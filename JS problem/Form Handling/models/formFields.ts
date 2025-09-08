import { HTMLInputTypeAttribute, ReactNode } from "react"
import { ApiPaginationObject } from "./apiDataModel"
import { Column, Row } from "./Table"

export type IDefaultValueObject = {
  userDetails?: {
    [key: string]: any
    userTypeCategory?: string
  }
  [propertyName: string]: any
}

export type TDateTimePickerProps = {
  name: string
  isDisabled?: boolean
  defaultValue?: null | string
  label: string
  requiredType?: string
  isModal?: boolean
  disableFutureDate?: boolean
  disablePastDate?: boolean
  minDate?: string
  placeholder?: string
  maxDate?: string
  disableTodayAction: boolean
  minutesStep?: number
  inputFormat?: string
  datePickerView?:
    | Array<"day" | "hours" | "minutes" | "month" | "seconds" | "year">
    | undefined
  properStyle?: string
  showWrongDataFormatError?: boolean
  openTo?:
    | "day"
    | "hours"
    | "meridiem"
    | "minutes"
    | "month"
    | "seconds"
    | "year"
    | undefined
  dialogWidth: string // Default dialog width
  dialogHeight: string // Default dialog height
}

export type MuiTextFieldPropTypes = {
  label: string | ReactNode
  name: string
  placeholder: string
  type?: HTMLInputTypeAttribute
  isDisabled?: boolean
  isAutoFocus?: boolean
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: unknown
  isStartIconOrText?: boolean
  startIconOrText?: ReactNode | string
  isEndIconOrText?: boolean
  endIconOrText?: ReactNode | string
  isLabelStyled?: boolean
  style?: object
  onBlurFunction?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type TRhfCheckbox = {
  name: string
  headerLabel?: string
  label: string | ReactNode
  isDisabled?: boolean
  defaultValue?: boolean
  hideHeaderLabel?: boolean
  handleChange?: () => void
}

export type TRhfMultiCheckbox = {
  name: string
  headerLabel?: string
  labelSelector?: string | null | undefined
  labels: any
  isDisabled?: boolean
  defaultValue?: boolean
}

export type TRhfMultiCheckbox2 = {
  name: string
  label: string
  options: IDefaultValueObject[]
  isDisabled?: boolean
  labelSelector: string
  nameSelector: string
}

export type TMuiButtonProps = {
  text: string
  type?: "submit" | "reset" | "button"
  isDisabled?: boolean
  isStartIcon?: boolean
  startIconOrText?: ReactNode
  isEndIcon?: boolean
  endIconOrText?: ReactNode
  onClick?: (e: any) => void
  loading?: boolean
  style?: object
  height?: string
  width?: string
  variant?: "text" | "outlined" | "contained" | "secondary"
  containedSecondary?: boolean
}

export type TRhfComboboxProps<T> = {
  label: string
  name: string
  options: T[]
  defaultValue: T | null | undefined
  dropdownSelector: keyof T
  isDisabled?: boolean
  isModal?: boolean
  disableClearable?: boolean
}

export type TRhfTextFieldProps =
  | any
  | {
      onFocus?: (name: string | null | undefined) => {} // Function
      name: string
      defaultValue?: string
      label: string
      placeholder: string
      type?: HTMLInputTypeAttribute
      isModal?: boolean
      isAutoFocus?: boolean
      isStartIconOrText?: boolean
      startIconOrText?: string
      isEndIconOrText?: boolean
      endIconOrText?: ReactNode | string
      isEndIconEnabled?: boolean
      isDisabled?: boolean
      autoComplete?: string
      endIconOnClick?: () => void
      blurHandler?: (fieldName: string, value: string) => void
      isHelperText?: boolean
      helperText?: string
      labelType?: string
      isOnlyNumber?: boolean
      isTypeNumber?: boolean
      isOnlyAlphabets?: boolean
      isAlphaNumeric?: boolean
      isNumericWithSpecialChar?: boolean
      isFloat?: boolean
      maxLength?: number
      externalHandleChange?: () => void
      style?: object
      isSuccess?: boolean
      color?: string
      successHelperText?: string
      focused?: boolean
      isSpaceAllowed?: boolean
      requiredType?: string | null
      customRegexExpression?: any
      isFloatLength?: boolean
    }

export type TRhfTextWithChipsFieldProps = {
  name: string
  defaultValue?: string
  label: string
  placeholder: string
  type?: HTMLInputTypeAttribute
  isModal?: boolean
  isAutoFocus?: boolean
  isStartIconOrText?: boolean
  startIconOrText?: string
  isEndIconOrText?: boolean
  endIconOrText?: ReactNode | string
  isDisabled?: boolean
  autoComplete?: string
  endIconOnClick?: () => void
  blurHandler?: (fieldName: string, value: string) => void
  isHelperText?: boolean
  helperText?: string
  labelType?: string
  isOnlyNumber?: boolean
  isTypeNumber?: boolean
  isOnlyAlphabets?: boolean
  isAlphaNumeric?: boolean
  isNumericWithSpecialChar?: boolean
  isFloat?: boolean
  maxLength?: number
  externalHandleChange?: () => void
  style?: object
  isSuccess?: boolean
  color?: string
  successHelperText?: string
  focused?: boolean
  isSpaceAllowed?: boolean
  selectedChips: number[]
  setSeletedChips: (data: any) => void
}

export type TRhfSunEditorProps = {
  name: string
  defaultValue: string
  label: string
  buttonList: any
  isDisabled?: boolean
}

export type TRhfTextAreaProps = {
  name: string
  defaultValue?: string
  label: string
  endLabel?: string
  isEndLabel?: boolean
  isModal?: boolean
  placeholder: string
  type?: HTMLInputTypeAttribute
  isDisabled?: boolean
  autoComplete?: string
  rows: number
  isHelperText?: boolean
  helperText?: string
  maxLength?: number
  characterLimit?: number
  onFocus?: () => void
  onBlur?: () => void
  onSelectCapture?: (position: number) => void
  isSpaceAllowed?: boolean
  isAlphaNumeric?: boolean
  enumReservedKeyCodes?: number[]
  style?: object
}

export type TRhfDragDrop = {
  name: string
  label: string
  multiple?: boolean
  valueType?: ImageValueType
  instructionMessage: string
  acceptedType?: IDefaultValueObject
  requiredType?: string | null
  maxSize?: number
  apiImageType: string
  height?: string
  isGeneralImageUpload?: boolean
  isCropFile?: boolean
  disabled?: boolean
  isStaticImageUpload?: boolean
  isSoftDelete?: boolean
  addImagesToDelete?: (image: IDefaultValueObject) => void | undefined
  uploadToCustomSystemLiftingAPI?: boolean
  userCode?: string
  isDimensionValidate?: boolean
  tooltipMessage?: string
  imgWidth?: number
  imgHeight?: number
  isImageUpload?: boolean
  labelType?: string
  registrationType?: string
  hidePreview?: boolean
  isBannerImage?: boolean
}

export type ImageValueType = "bin" | "base64"

export type TRhfFileAttach = {
  name: string
  label: string
  isDisabled?: boolean
  isModal?: boolean
  valueType?: ImageValueType
  accept: string
  isHelperText?: boolean
  helperText?: string
  isInstantUpload?: boolean
  size?: number
  apiImageType?: string
  isCropModal?: boolean
  isStaticFileUpload?: boolean
  uploadToCustomSystemLiftingAPI?: boolean
  isDocUpload?: boolean
  userCode?: string
  isSoftDelete?: boolean
  addImagesToDelete?: (image: IDefaultValueObject) => void
  userType?: string
  registrationType?: string
  customError?: string
}
export type TRhfFileAttachOnbording = {
  name: string
  label: string
  isDisabled?: boolean
  isModal?: boolean
  valueType?: ImageValueType
  accept: string
  isHelperText?: boolean
  helperText?: string
  isInstantUpload?: boolean
  size?: number
  apiImageType?: string
  isCropModal?: boolean
  isStaticFileUpload?: boolean
  uploadToCustomSystemLiftingAPI?: boolean
  isDocUpload?: boolean
  userCode?: string
  isSoftDelete?: boolean
  addImagesToDelete?: (image: IDefaultValueObject) => void
  userType?: string
  registrationType?: string
}

export type TRhfAsynComboboxProps<T> = {
  label: string
  name: string
  options: T[]
  isModal?: boolean
  defaultValue?: T | null | undefined
  dropdownSelector: keyof T
  isDisabled?: boolean
  onOpenFunCall: (searchVal?: any, pageNum?: any) => void
  placeholder: string
  handleChange?: () => void
  onChangeFunCall?: boolean
  isRadioButtonRequired?: boolean
  isTableRequired?: boolean
  columns?: Column[]
  isAPIPaginationRequired?: boolean
  paginationObj?: ApiPaginationObject
  rowDataBuilder?: () => Row[]
  hideLabel?: boolean
  disableClearable?: boolean
  emptyLabel?: string
}

export type TRhfMultiComboboxProps<T> = {
  label: string
  isLabelRequired?: boolean
  name: string
  options: T[]
  isModal?: boolean
  defaultValue?: [] | null | undefined
  dropdownSelector: keyof T
  isDisabled?: boolean
  onOpenFunCall: (searchVal?: any, pageNum?: any) => void
  onAutocompleteClose: () => void
  placeholder: string
  handleChange?: () => void
  isSelectAll?: boolean
  columns: Column[]
  isTableHidden?: boolean
  isHelperText?: boolean
  helperText?: string
  isAPIPaginationRequired?: boolean
  paginationObj?: ApiPaginationObject
  isChipsRequired?: boolean
  chipSelector?: string
  rowDataBuilder?: () => Row[]
  errorVisibility?: boolean
}

export type TDatePickerProps = {
  name: string
  isDisabled?: boolean
  defaultValue?: null | string
  label: string
  requiredType?: string
  isModal?: boolean
  disableFutureDate?: boolean
  disablePastDate?: boolean
  minDate?: string
  placeholder?: string
  maxDate?: string
  disableTodayAction: boolean
  minutesStep?: number
}

export type TTimePickerProps = {
  name: string
  isDisabled?: boolean
  defaultValue?: null | string
  label: string
  views?: Array<"hours" | "minutes" | "seconds"> | undefined
  inputFormat?: string
  minutesStep?: number
}

export type TRfhSwitchProps = {
  name: string
  headerLabel?: string
  label: string | ReactNode
  labelPlacement?: "top" | "bottom" | "end" | "start" | undefined
  isHidden?: boolean
  isDisabled?: boolean
  defaultValue?: boolean
  labelVariant: "subtitle2" | "label" | undefined
}

export type TRhfNumericIncDecProps = {
  name: string
  label: string
  isDisabled?: boolean
  defaultValue?: boolean
  placeholder?: string | undefined
  labelType?: string
  maxValue?: number
}

export type TRhfRadioButtonProps = {
  name: string
  headerLabel?: string
  radioButtonsValueLabel: { label: any; value: any }[]
  handleChange?: (val: any) => void
  labelPlacement?: "top" | "bottom" | "end" | "start" | undefined
  isDisabled?: boolean
  isRowDirection?: boolean
  selected?: string
  defaultValue?: any
}
export type TRfhMultiSwitchProps = {
  name: string
  headerLabel?: string
  labels: string[] | ReactNode[]
  labelsSelector?: string | null | undefined
  labelsStyle?: Object
  labelsPlacement?: "top" | "bottom" | "end" | "start" | undefined
  isHidden?: boolean
  isDisabled?: boolean
  defaultValue?: boolean
}
