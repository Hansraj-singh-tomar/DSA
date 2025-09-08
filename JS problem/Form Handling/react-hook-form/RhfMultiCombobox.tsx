import { useRef, useState } from "react"
import {
  Autocomplete,
  InputLabel,
  CircularProgress,
  FormHelperText,
  Box,
  Typography,
  Grid,
  Chip,
  Stack,
} from "@mui/material"
import _, { debounce } from "lodash"
import { Controller, useFormContext } from "react-hook-form"
import { Delete } from "@mui/icons-material"
import Tables from "app/components/zamtel-ui/Table/Tables"
import {
  StyledTextfield,
  StyledTextfieldClose,
} from "app/components/zamtel-ui/styled/StyledComboboxTextField"
import CheckboxDropdownLabel from "app/components/zamtel-ui/dropdownLabel/CheckboxDropdownLabel"
import Label from "app/components/zamtel-ui/label/Label"
import { TRhfMultiComboboxProps } from "../../../models/formFields"

function RhfMultiCombobox<T>({
  name,
  label,
  isLabelRequired,
  options,
  dropdownSelector,
  isModal,
  defaultValue,
  isDisabled,
  isSelectAll,
  onOpenFunCall,
  onAutocompleteClose,
  placeholder,
  handleChange,
  columns,
  isTableHidden,
  isHelperText,
  helperText,
  isAPIPaginationRequired = false,
  paginationObj,
  isChipsRequired,
  chipSelector,
  rowDataBuilder,
  errorVisibility,
}: TRhfMultiComboboxProps<T>) {
  const {
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext()
  const showError = !!_.get(errors, name)
  const errorMessage: any = _.has(errors, `${name}.message`)
    ? _.get(errors, `${name}.message`)
    : ""
  const [currentPage, setCurrentPage] = useState(0)
  const [open, setOpen] = useState(false)
  const loading: boolean = open && !showError && options.length === 0
  const [searchVal, setSearchVal] = useState("")
  const refOnChangeVal = useRef<any>([])
  const isServerError =
    showError && `${_.get(errors, `${name}.type`)}`?.toUpperCase() === "SERVER"

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value.trim())
    onOpenFunCall(e.target.value.trim(), 1)
  }
  const debouncedChangeHandler = debounce(onChangeHandle, 500)

  const chipsDeleteHandler = (
    e: React.MouseEvent,
    selectedValue: any,
    field: any,
  ) => {
    e.preventDefault()
    const { value } = field
    const updatedValue = _.without(value, selectedValue)
    field.onChange(updatedValue)
  }
  const onDeleteClick = (field: any) => {
    field.onChange([])
    if (onAutocompleteClose && !open) {
      onAutocompleteClose()
    }
  }

  const getDropdownValue = (data: any, chipLabel?: boolean) => {
    const selectorVal = chipLabel ? chipSelector : dropdownSelector
    if (selectorVal && _.isString(data[selectorVal])) {
      return data[selectorVal]
    }
    if (!_.isEmpty(data) && _.isString(data)) {
      return data
    }
    return ""
  }
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => {
        return (
          <>
            {isLabelRequired && (
              <InputLabel htmlFor={name}>
                <Box sx={{ pb: 0.5 }}>
                  {/* <Typography
                    className={
                      isDisabled ? "disabledLabel" : "MaterialUiFields-label"
                    }
                    variant={isModal ? "body1" : "label"}
                  >
                    {label}
                  </Typography> */}
                  <Label
                    label={label}
                    isDisabled={isDisabled}
                    isModal={isModal}
                  />
                </Box>
              </InputLabel>
            )}
            <Autocomplete
              sx={{ pb: 0 }}
              {...field}
              multiple
              // disableCloseOnSelect={false}
              noOptionsText={isServerError ? errorMessage : "No options"}
              open={open}
              onOpen={() => {
                setOpen(true)
                if (options.length === 0) {
                  onOpenFunCall(searchVal, currentPage)
                }
              }}
              disableCloseOnSelect
              // disablePortal={false}
              onClose={(e: any) => {
                if (
                  e.relatedTarget &&
                  e.relatedTarget.classList.contains(
                    "custom-multicombox-close-button",
                  )
                ) {
                  return
                }
                if (isServerError) clearErrors(name)
                setOpen(false)
                if (onAutocompleteClose) {
                  onAutocompleteClose()
                }
                setSearchVal("")
              }}
              onBlur={(e: any) => {
                if (
                  e.relatedTarget &&
                  e.relatedTarget.classList.contains(
                    "custom-multicombox-close-button",
                  )
                ) {
                  return
                }
                setOpen(false)
                setSearchVal("")
              }}
              ListboxProps={{
                onScroll: async (event: React.SyntheticEvent) => {
                  if (isAPIPaginationRequired) {
                    const listboxNode = event.currentTarget
                    if (
                      Math.round(
                        listboxNode.scrollTop + listboxNode.clientHeight,
                      ) === listboxNode.scrollHeight &&
                      paginationObj &&
                      paginationObj.totalElements > options.length
                    ) {
                      setCurrentPage((prevPage) => prevPage + 1)
                      await onOpenFunCall(searchVal, currentPage + 1)
                    }
                  }
                },
              }}
              loading={loading}
              onChange={(_e, data) => {
                if (isSelectAll) {
                  let dataVal: T[]
                  if (data.length === 0) {
                    dataVal = []
                  } else if (
                    getDropdownValue(data[data.length - 1]) === "Select All"
                  ) {
                    dataVal = options
                  } else if (
                    refOnChangeVal.current.length > 0 &&
                    getDropdownValue(refOnChangeVal.current[0]) === "Select All"
                  ) {
                    if (getDropdownValue(data[0]) !== "Select All") {
                      dataVal = []
                    } else {
                      dataVal = data.slice(1)
                    }
                  } else if (data.length === options.length - 1) {
                    dataVal = options
                  } else {
                    dataVal = data
                  }
                  refOnChangeVal.current = dataVal
                  field.onChange(dataVal)
                } else {
                  field.onChange(data)
                  if (handleChange) {
                    handleChange()
                  }
                }
              }}
              options={options || []}
              getOptionLabel={(option: any) => getDropdownValue(option)}
              disabled={isDisabled}
              isOptionEqualToValue={(option: T, selectedValue: T) => {
                return (
                  getDropdownValue(option) === getDropdownValue(selectedValue)
                )
              }}
              fullWidth
              renderOption={(props, option: T, { selected }) => {
                return (
                  <li {...props}>
                    <CheckboxDropdownLabel
                      label={getDropdownValue(option)}
                      selected={selected}
                    />
                  </li>
                )
              }}
              renderTags={(selected) => {
                let renderTagsValue = ""

                if (!open && field.value.length > 0) {
                  if (isSelectAll) {
                    renderTagsValue =
                      selected.length === options.length
                        ? "All Selected"
                        : `${selected.length} Selected`
                  } else {
                    renderTagsValue = `${selected.length} Selected`
                  }
                }
                return (
                  <Typography
                    style={{
                      textAlign: "center",
                      font: "normal normal normal 14px/28px Poppins",
                      letterSpacing: "0px",
                      color: "#000000DE",
                      opacity: 1,
                      marginBottom: 0,
                      lineHeight: "inherit",
                    }}
                    className={
                      isDisabled ? "disabledLabel" : "MaterialUiFields-label"
                    }
                  >
                    {renderTagsValue}
                  </Typography>
                )
              }}
              renderInput={(params) => {
                return (
                  <Grid container direction="column">
                    {open ? (
                      <StyledTextfield
                        {...params}
                        name={name}
                        placeholder={field.value.length > 0 ? "" : placeholder}
                        error={showError}
                        autoFocus
                        onChange={debouncedChangeHandler}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loading ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    ) : (
                      <StyledTextfieldClose
                        {...params}
                        name={name}
                        placeholder={field.value.length > 0 ? "" : placeholder}
                        error={showError}
                        sx={{
                          "& .MuiInputBase-input": { pointerEvents: "none" },
                        }}
                      />
                    )}
                    {field.value.length > 0 && !isTableHidden && (
                      <Grid item pt={2}>
                        <Tables
                          columns={columns}
                          isPagination={false}
                          rowData={rowDataBuilder ? rowDataBuilder() : []}
                          pageChange={() => {}}
                          isStyles
                        />
                      </Grid>
                    )}
                    {isChipsRequired && field.value.length > 0 && (
                      <Grid item pt={2}>
                        <Box sx={{ width: "100%" }}>
                          <Stack
                            direction="row"
                            flexWrap="wrap"
                            alignContent="flex-start"
                            sx={{
                              border: 1,
                              borderColor: "#00000033",
                              borderBlockWidth: "100%",
                            }}
                            p={2}
                          >
                            {field.value.map((selectedValue: any) => {
                              return (
                                <Chip
                                  label={getDropdownValue(selectedValue, true)}
                                  sx={{ margin: "5px" }}
                                  onDelete={(e) =>
                                    chipsDeleteHandler(e, selectedValue, field)
                                  }
                                />
                              )
                            })}
                          </Stack>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                )
              }}
              clearIcon={
                <Delete
                  fontSize="small"
                  onClick={() => {
                    onDeleteClick(field)
                  }}
                />
              }
              clearText="Remove Selection"
            />
            {errorVisibility && (
              <FormHelperText
                className={showError ? "ErrorTextField" : "HelperText"}
                error={showError}
                sx={{
                  minHeight: "40px", // Reserve consistent space
                  margin: "3px 14px 0",
                  visibility: showError || isHelperText ? "visible" : "hidden", // Always reserve space
                }}
              >
                {(() => {
                  if (showError) return errorMessage
                  if (isHelperText) return helperText
                  return " " // Empty space to maintain layout
                })()}
              </FormHelperText>
            )}
          </>
        )
      }}
    />
  )
}

RhfMultiCombobox.defaultProps = {
  isDisabled: false,
  defaultValue: [],
  isMultipleSelection: false,
  isTableHidden: false,
  isHelperText: false,
  isSelectAll: false,
  helperText: "",
  isChipsRequired: false,
  chipSelector: "",
  isAPIPaginationRequired: false,
  onAutocompleteClose: null,
  isLabelRequired: true,
  errorVisibility: true,
}

export default RhfMultiCombobox
