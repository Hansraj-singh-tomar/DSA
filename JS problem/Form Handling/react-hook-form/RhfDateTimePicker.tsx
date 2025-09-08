import { Box, FormHelperText, InputLabel, TextField } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"
import { MobileDateTimePicker } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { enGB } from "date-fns/locale"
import _ from "lodash"

import DateTimePickerAction from "app/components/zamtel-ui/dateTimePickerAction/DateTimePickerAction"
import { TDateTimePickerProps } from "app/models/formFields"
import { useTranslation } from "react-i18next"
import Label from "app/components/zamtel-ui/label/Label"

function RhfDateTimePicker({
  name,
  isDisabled,
  defaultValue,
  label,
  isModal,
  disableFutureDate,
  disablePastDate,
  minDate,
  placeholder,
  maxDate,
  disableTodayAction,
  datePickerView = ["year", "month", "day", "hours", "minutes", "seconds"],
  properStyle,
  showWrongDataFormatError,
  dialogWidth, // Default dialog width
  dialogHeight, // Default dialog height
}: TDateTimePickerProps) {
  const {
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext()
  const showError = !!errors[name]
  const errorMessage: any = _.has(errors, `${name}.message`)
    ? _.get(errors, `${name}.message`)
    : ""
  const { t } = useTranslation()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Box>
          {label && (
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
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <MobileDateTimePicker
              {...field}
              disablePast={disablePastDate}
              disableFuture={disableFutureDate}
              ref={field.ref}
              minDate={minDate}
              maxDate={maxDate}
              openTo="month"
              views={datePickerView}
              onChange={(newValue) => {
                if (newValue == null) {
                  field.onChange(defaultValue)
                } else field.onChange(new Date(newValue).getTime())
              }}
              disabled={isDisabled}
              slots={{
                textField: TextField,
                ...(disableTodayAction
                  ? {}
                  : { actionBar: DateTimePickerAction }),
              }}
              slotProps={{
                textField: {
                  placeholder: placeholder || "dd/mm/yyyy",
                  error: showError,
                  fullWidth: true,
                  ...(placeholder ? { placeholder } : {}),
                },
                mobilePaper: {
                  sx: {
                    width: dialogWidth,
                    height: dialogHeight,
                    maxWidth: "100%",
                    maxHeight: "100%",
                    marginTop: properStyle, // Apply the margin here instead
                  },
                },
                dialog: {
                  sx: {
                    "& .MuiDialog-paper": {
                      width: dialogWidth,
                      height: dialogHeight,
                      maxWidth: "100%",
                      maxHeight: "100%",
                    },
                    "& .MuiDialogActions-root .MuiButton-text": {
                      color: "#ff0000",
                    },
                    "& .MuiDialogActions-root .MuiButton-text:nth-of-type(2)": {
                      color: "#4caf50",
                    },
                  },
                },
              }}
              onError={(error) => {
                if (showWrongDataFormatError) {
                  if (error && !showError) {
                    setError(name, {
                      type: "custom",
                      message: "Invalid Date",
                    })
                  } else if (!error && showError) {
                    clearErrors(name)
                  }
                }
              }}
            />
          </LocalizationProvider>
          <FormHelperText className="ErrorTextField" error={showError}>
            {t(errorMessage?.message || errorMessage, {
              name: label.replace("*", ""),
            })}
          </FormHelperText>
        </Box>
      )}
    />
  )
}
RhfDateTimePicker.defaultProps = {
  isDisabled: false,
  defaultValue: null,
  requiredType: "O",
  disableFutureDate: false,
  disablePastDate: false,
  placeholder: "",
  disableTodayAction: false,
  views: ["day", "hours", "minutes", "month", "seconds", "year"],
  showWrongDataFormatError: false,
  maxDate: new Date(3000, 12, 31),
  dialogWidth: "400px", // Default dialog width
  dialogHeight: "600px", // Default dialog height
}
export default RhfDateTimePicker
