import { Autocomplete, Box, InputLabel } from "@mui/material"
import _ from "lodash"
import { TRhfComboboxProps } from "app/models/formFields"
import { Controller, useFormContext } from "react-hook-form"
import Label from "app/components/zamtel-ui/label/Label"
import StyledComboboxPopper from "app/components/zamtel-ui/styled/StyledComboboxPopper"
import DropdownLabel from "app/components/zamtel-ui/dropdownLabel/DropdownLabel"
import { StyledTextfield } from "app/components/zamtel-ui/styled/StyledComboboxTextField"
import React from "react"
// import { useTranslation } from "react-i18next"

function RhfCombobox<T>({
  name,
  label,
  options,
  dropdownSelector,
  defaultValue,
  isDisabled,
  isModal,
}: TRhfComboboxProps<T>) {
  const { control } = useFormContext()

  const uploadRef = React.createRef<HTMLInputElement>()
  // console.log("defaultValue--> ", defaultValue)
  // const { t } = useTranslation()
  const selectHandler = async () => {
    // console.log("onClick check")
  }

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => (
        <>
          <InputLabel htmlFor={name}>
            <Box sx={{ pb: 0.5 }}>
              {/* <Typography className="MaterialUiFields-label" variant="label">
                {label}
              </Typography> */}
              <Label label={label} isDisabled={isDisabled} isModal={isModal} />
            </Box>
          </InputLabel>
          <Autocomplete<T>
            {...field}
            onChange={(_e, data) => field.onChange(data)}
            options={options}
            getOptionLabel={(option: any) =>
              _.isString(option[dropdownSelector])
                ? option[dropdownSelector]
                : ""
            }
            disabled={isDisabled}
            isOptionEqualToValue={(option: T, selectedValue: T) =>
              option[dropdownSelector] === selectedValue[dropdownSelector]
            }
            PopperComponent={StyledComboboxPopper}
            fullWidth
            renderOption={(props, option: T, { selected }) => {
              return (
                <li {...props}>
                  <DropdownLabel
                    label={option[dropdownSelector]}
                    selected={selected}
                  />
                </li>
              )
            }}
            renderInput={(params) => (
              <StyledTextfield
                {...params}
                placeholder={name}
                fullWidth
                ref={uploadRef}
                autoComplete="off"
                onClick={selectHandler}
              />
            )}
          />
        </>
      )}
    />
  )
}

RhfCombobox.defaultProps = {
  isDisabled: false,
}

export default RhfCombobox
