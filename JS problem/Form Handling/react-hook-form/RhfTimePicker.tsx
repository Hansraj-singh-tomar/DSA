import { Box, FormHelperText, InputLabel } from "@mui/material"
import { TimePicker } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import Label from "app/components/zamtel-ui/label/Label"
import { TTimePickerProps } from "app/models/formFields"
import _ from "lodash"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

function RhfTimePicker({
  name,
  isDisabled,
  defaultValue,
  views,
  inputFormat,
  label,
  minutesStep,
}: TTimePickerProps) {
  const {
    control,
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
          <InputLabel htmlFor={name}>
            <Box sx={{ pb: 0.5 }}>
              <Label label={label} isDisabled={isDisabled} />
            </Box>
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              {...field}
              ref={field.ref}
              ampm={false}
              minutesStep={minutesStep || 1}
              onChange={(newValue) =>
                field.onChange(new Date(newValue).getTime())
              }
              format={inputFormat}
              views={views && [...views]}
              disabled={isDisabled}
              // renderInput={(params: any) => (
              //   <TextField error={showError} fullWidth {...params} />
              // )}
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
RhfTimePicker.defaultProps = {
  isDisabled: false,
  defaultValue: null,
  inputFormat: "HH:mm",
  views: ["hours", "minutes"],
}
export default RhfTimePicker
