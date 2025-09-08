import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined"
import { Box, FormHelperText, InputLabel } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import DatePickerAction from "app/components/zamtel-ui/datepickerAction/DatePickerAction"
import Label from "app/components/zamtel-ui/label/Label"
import { TDatePickerProps } from "app/models/formFields"
import _ from "lodash"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

function RhfDatePicker({
  name,
  isDisabled,
  defaultValue,
  label,
  isModal,
  disableFutureDate,
  disablePastDate,
  minDate,
  // placeholder,
  maxDate,
  disableTodayAction,
}: TDatePickerProps) {
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              {...field}
              sx={{ width: "100% " }}
              disablePast={disablePastDate}
              disableFuture={disableFutureDate}
              ref={field.ref}
              minDate={minDate}
              maxDate={maxDate}
              slots={{
                openPickerIcon: CalendarTodayOutlinedIcon,
              }}
              openTo="year"
              views={["year", "month", "day"]}
              format="dd/MM/yyyy"
              onChange={(newValue) => {
                if (newValue == null) {
                  field.onChange(defaultValue)
                } else field.onChange(new Date(newValue).getTime())
              }}
              disabled={isDisabled}
              // renderInput={(params: any) => {
              //   let newinputProps = params.inputProps
              //   newinputProps = {
              //     ...newinputProps,
              //     placeholder: placeholder || "dd/mm/yyyy",
              //   }
              //   const newParams = { ...params, inputProps: newinputProps }
              //   return <TextField error={showError} fullWidth {...newParams} />
              // }}
              components={
                disableTodayAction
                  ? {}
                  : {
                      ActionBar: DatePickerAction,
                    }
              }
              componentsProps={
                disableTodayAction
                  ? {}
                  : {
                      actionBar: { actions: ["today"] },
                    }
              }
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
RhfDatePicker.defaultProps = {
  isDisabled: false,
  defaultValue: null,
  requiredType: "O",
  disableFutureDate: false,
  disablePastDate: false,
  placeholder: "",
  disableTodayAction: false,
}
export default RhfDatePicker
