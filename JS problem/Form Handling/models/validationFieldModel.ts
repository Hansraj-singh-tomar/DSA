export interface ValidationField {
  timeValidate?: boolean
  name?: string
  type?: string
  format?: string
  isRequired?: boolean | undefined
  isNullable?: boolean | undefined
  maxLength?: number | undefined
  minLength?: number | undefined
  minArraySize?: number | undefined
  arrayObjectType?: ArraySubObjectField[] | undefined
  label?: string
  isFutureDate?: boolean
  isPastDate?: boolean
  isValidDOB?: boolean
}

export interface ArraySubObjectField {
  name?: string
  type?: string
  format?: string
  isRequired?: boolean | undefined
  isNullable?: boolean | undefined
  maxLength?: number | undefined
  minLength?: number | undefined
  minArraySize?: number | undefined
  arrayObjectType?: any | undefined
}
