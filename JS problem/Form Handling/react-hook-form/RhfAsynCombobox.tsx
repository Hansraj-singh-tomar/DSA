import { useState } from "react"
import {
  Autocomplete,
  InputLabel,
  CircularProgress,
  FormHelperText,
  Box,
  Grid,
  TextField,
} from "@mui/material"
import _, { debounce } from "lodash"
import { Controller, useFormContext } from "react-hook-form"
import { Trans } from "react-i18next"
import Label from "app/components/zamtel-ui/label/Label"
import Tables from "app/components/zamtel-ui/Table/Tables"
import DropdownLabel from "app/components/zamtel-ui/dropdownLabel/DropdownLabel"
import StyledComboboxPopper from "app/components/zamtel-ui/styled/StyledComboboxPopper"
import { TRhfAsynComboboxProps } from "../../../models/formFields"

const getLabel = (
  option: any,
  emptyText: string,
  dropdownSelector?: string | number | symbol,
) => {
  const primitives = ["bigint", "string", "boolean", "number"]
  if (primitives.includes(typeof option)) return option.toString()
  if (
    typeof option === "object" &&
    option !== null &&
    dropdownSelector !== undefined
  ) {
    const label = option[dropdownSelector]
    if (primitives.includes(typeof label)) return label.toString()
  }
  return emptyText
}

function RhfAsynCombobox<T>({
  name,
  label,
  options,
  dropdownSelector,
  isModal,
  defaultValue,
  isDisabled,
  onOpenFunCall,
  placeholder,
  handleChange,
  onChangeFunCall,
  isRadioButtonRequired,
  isTableRequired,
  columns,
  isAPIPaginationRequired,
  paginationObj,
  rowDataBuilder,
  hideLabel,
  disableClearable,
  emptyLabel = "-",
}: TRhfAsynComboboxProps<T>) {
  const {
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext()
  const showError = !!errors[name]
  const errorMessage: any = _.has(errors, `${name}.message`)
    ? _.get(errors, `${name}.message`)
    : ""
  const [currentPage, setCurrentPage] = useState(0)
  const [searchVal, setSearchVal] = useState("")
  const [open, setOpen] = useState(false)
  const [apiLoading, setApiLoading] = useState(false)
  const loading: boolean = open && !showError && apiLoading

  const onChangeHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiLoading(true)
    setSearchVal(e.target.value.trim())
    await onOpenFunCall(e.target.value.trim(), 1)
    setApiLoading(false)
  }

  const debouncedChangeHandler = debounce(onChangeHandle, 500)

  const isServerError =
    showError && `${_.get(errors, `${name}.type`)}`?.toUpperCase() === "SERVER"
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => {
        return (
          <>
            {!hideLabel && (
              <InputLabel htmlFor={name}>
                <Box sx={{ pb: 0.5 }}>
                  <Label
                    label={label}
                    isDisabled={isDisabled}
                    isModal={isModal}
                  />
                </Box>
              </InputLabel>
            )}
            <Autocomplete
              autoComplete
              noOptionsText={isServerError ? errorMessage : "No options"}
              open={open}
              disableClearable={disableClearable}
              onOpen={async () => {
                clearErrors(field.name)
                setOpen(true)
                if (options.length === 0 || onChangeFunCall) {
                  setApiLoading(true)
                  await onOpenFunCall(searchVal, currentPage)
                  setApiLoading(false)
                }
              }}
              onClose={() => {
                if (isServerError) clearErrors(name)
                setOpen(false)
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
              PopperComponent={StyledComboboxPopper}
              loading={loading}
              {...field}
              onChange={(_e, data) => {
                // if (isMultipleSelection) field.onChange([...field.value, data])
                field.onChange(data)
                if (handleChange) {
                  handleChange()
                }
              }}
              options={options ?? []}
              getOptionLabel={(option: any) =>
                getLabel(option, emptyLabel, dropdownSelector)
              }
              disabled={isDisabled}
              isOptionEqualToValue={(option: T, selectedValue: T) => {
                return dropdownSelector
                  ? option[dropdownSelector] === selectedValue[dropdownSelector]
                  : option === selectedValue
              }}
              fullWidth
              renderOption={(props, option: T, { selected }) => {
                return (
                  <li {...props}>
                    <DropdownLabel
                      label={getLabel(option, emptyLabel, dropdownSelector)}
                      isRadioButtonRequired={isRadioButtonRequired}
                      selected={selected}
                    />
                  </li>
                )
              }}
              renderInput={(params) => {
                return (
                  <Grid container direction="column">
                    <Grid item>
                      {open ? (
                        <TextField
                          {...params}
                          name={name}
                          placeholder={placeholder}
                          onChange={debouncedChangeHandler}
                          InputProps={{
                            ...params.InputProps,
                            // type: "search",
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
                        <TextField
                          {...params}
                          name={name}
                          placeholder={placeholder}
                          InputProps={{
                            ...params.InputProps,
                            // type: "search",
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
                      )}
                    </Grid>
                    {field.value !== null && isTableRequired && (
                      <Grid item pt={2}>
                        <Tables
                          columns={columns || []}
                          isPagination={false}
                          rowData={rowDataBuilder ? rowDataBuilder() : []}
                          pageChange={() => {}}
                          isStyles
                        />
                      </Grid>
                    )}
                  </Grid>
                )
              }}
            />
            <FormHelperText className="ErrorTextField" error={showError}>
              {!isServerError && (
                <Trans
                  i18nKey={errorMessage?.message || errorMessage}
                  shouldUnescape
                  values={{ name: label.replace("*", "") }}
                />
              )}
            </FormHelperText>
          </>
        )
      }}
    />
  )
}

RhfAsynCombobox.defaultProps = {
  isDisabled: false,
  defaultValue: null,
  isMultipleSelection: false,
  onChangeFunCall: false,
  isRadioButtonRequired: false,
  isTableRequired: false,
  columns: [],
  isAPIPaginationRequired: false,
  hideLabel: false,
  disableClearable: false,
}

export default RhfAsynCombobox
