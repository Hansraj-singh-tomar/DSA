import { Grid, GridDirection } from "@mui/material"
import RhfSelector from "app/components/material-ui/react-hook-form/RhfSelector"
import { ApiPaginationObject } from "app/models/apiDataModel"
import { IDefaultValueObject, RhfFieldNames } from "app/models/form"
import { Row } from "app/models/Table"
import requiredCheck from "app/utils/requiredCheck"
import { useTranslation } from "react-i18next"

type TProps<T> = {
  fieldDetails?: RhfFieldNames[]
  options?: (fieldName: string) => T[]
  onOpenFunCall?: (
    fieldName: string,
  ) => (searchVal?: any, pageNum?: any) => void
  onAutocompleteClose?: () => void
  column?: GridDirection
  isWrapRequired?: boolean
  isDisabled?: boolean
  isIndex?: boolean
  previndexName?: any
  lastindexName?: any
  handleChange?: (fieldName: any) => (searchVal?: any, pageNum?: any) => void
  paginationObj?: (fieldName: string) => ApiPaginationObject | undefined
  labelTypes?: string
  rowDataSelector?: (fieldName: any) => () => Row[]
  isLabel?: boolean
  labelName?: string | null | undefined
  externalHandleChange?: (fieldName: any, val: any) => void
  onAutocompleteClear?: () => void
  addImagesToDelete?: (image: IDefaultValueObject) => void
  // onchange?: (fieldName: any, val: any) => void
  value?: any
  onBlurFunCall?: () => void
  registrationType?: "customer" | "agent" | "merchant"
  errorVisibility?: boolean
}
function FieldsRender<T>({
  fieldDetails,
  options,
  onOpenFunCall,
  onAutocompleteClose,
  onAutocompleteClear,
  column = "column",
  isWrapRequired,
  isDisabled,
  isIndex,
  handleChange,
  previndexName,
  lastindexName,
  paginationObj,
  labelTypes,
  rowDataSelector,
  isLabel,
  labelName,
  externalHandleChange,
  addImagesToDelete,
  value,
  onBlurFunCall,
  registrationType,
  errorVisibility,
}: TProps<T>) {
  const { t } = useTranslation()
  return (
    <Grid
      container
      direction={column}
      style={{ flexWrap: isWrapRequired ? "wrap" : "nowrap" }}
      columnSpacing={2}
    >
      {fieldDetails?.map((field) => {
        return (
          <Grid
            item
            key={`${field.xs}-${field.name}`}
            columns={field.xs}
            mb={1}
            xs={field.xs}
            style={{ width: `calc(100%/12*${field.xs})` }}
            flexShrink="0"
          >
            {!field.fieldHide && (
              <RhfSelector
                selector={field.selector}
                rest={{
                  ...field,
                  registrationType,
                  errorVisibility: errorVisibility || field?.errorVisibility,
                  isDisabled: isDisabled || field.isDisabled,

                  options:
                    (field.selector === "asyncCombobox" ||
                      field.selector === "multiCombobox" ||
                      field.selector === "multiCheckbox2" ||
                      field.selector === "multiCheckbox" ||
                      field.selector === "radioButton") &&
                    options &&
                    !Array.isArray(options)
                      ? options(field.name)
                      : field.options || [],
                  handleChange:
                    (field.selector === "asyncCombobox" ||
                      field.selector === "multiCombobox" ||
                      field.selector === "checkbox" ||
                      field.selector === "radioButton") &&
                    handleChange
                      ? handleChange(field.name)
                      : () => {},

                  externalHandleChange:
                    field.selector === "textfield" && externalHandleChange
                      ? (val: any) => {
                          externalHandleChange(field.name, val)
                        }
                      : () => {},
                  value,
                  onOpenFunCall:
                    (field.selector === "asyncCombobox" ||
                      field.selector === "multiCombobox") &&
                    onOpenFunCall
                      ? onOpenFunCall(field.name)
                      : () => {},
                  onAutocompleteClose:
                    field.selector === "multiCombobox" && onAutocompleteClose
                      ? onAutocompleteClose
                      : () => {},
                  rowDataBuilder:
                    field.selector === "asyncCombobox" && rowDataSelector
                      ? rowDataSelector(field.name)
                      : () => [],
                  ...(field.selector === "multiCombobox" && onAutocompleteClear
                    ? {
                        onAutocompleteClear,
                      }
                    : {}),
                  paginationObj: paginationObj
                    ? paginationObj(field.name)
                    : paginationObj,
                  placeholder: t(field.placeholder ? field.placeholder : ""),
                  // eslint-disable-next-line no-nested-ternary
                  label: field.required
                    ? requiredCheck(
                        isLabel ? t(labelName || "") : t(field.label),
                        field.required,
                      )
                    : isLabel
                    ? t(labelName || "")
                    : t(field.label),
                  headerLabel:
                    field?.required && field?.headerLabel
                      ? requiredCheck(t(field.headerLabel), field.required)
                      : field?.headerLabel || "",
                  name: isIndex
                    ? previndexName + field.name + lastindexName
                    : field.name,
                  isStartIconOrText: field.isStartIconOrText,
                  startIconOrText: field.startIconOrText,
                  labelType: labelTypes || field.labelType,
                  isTableHidden: field.isTableHidden,
                  addImagesToDelete:
                    field.selector === "dragdrop" ||
                    field.selector === "attachment"
                      ? addImagesToDelete
                      : undefined,
                  blurHandler:
                    field.selector === "textfield" && onBlurFunCall
                      ? onBlurFunCall
                      : () => {},
                }}
              />
            )}
          </Grid>
        )
      })}
    </Grid>
  )
}
FieldsRender.defaultProps = {
  fieldDetails: [],
  options: [],
  column: "column",
  isWrapRequired: true,
  onOpenFunCall: () => () => {},
  onAutocompleteClose: () => {},
  onAutocompleteClear: null,
  isDisabled: false,
  isIndex: false,
  previndexName: "",
  lastindexName: "",
  handleChange: () => () => {},
  paginationObj: () => {},
  labelTypes: "",
  rowDataSelector: () => () => [],
  isLabel: false,
  labelName: "",
  externalHandleChange: () => () => {},
  addImagesToDelete: () => {},
  value: "",
  onBlurFunCall: () => {},
  registrationType: "customer",
  // onchange: () => {},
  errorVisibility: true,
}

export default FieldsRender
