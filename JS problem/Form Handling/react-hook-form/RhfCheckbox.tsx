import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
  FormHelperText,
} from "@mui/material"
import { TRhfCheckbox } from "app/models/formFields"
import { Trans } from "react-i18next"
import { Controller, useFormContext } from "react-hook-form"
import _ from "lodash"

function RhfCheckbox({
  name,
  headerLabel,
  label,
  isDisabled,
  handleChange,
  defaultValue,
  hideHeaderLabel = false,
}: TRhfCheckbox) {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const showError = !!errors[name]
  const errorMessage: any = _.has(errors, `${name}.message`)
    ? _.get(errors, `${name}.message`)
    : ""

  return (
    <section className={isDisabled ? "disabledCheckboxLabel" : "checkbox"}>
      {!hideHeaderLabel && (
        <FormLabel htmlFor={name}>
          <Box sx={{ pb: 0.5 }}>
            <Typography
              className={
                isDisabled ? "disabledCheckboxLabel" : "MaterialUiFields-label"
              }
              variant="label"
            >
              {headerLabel}
            </Typography>
          </Box>
        </FormLabel>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <FormGroup sx={{ display: "inline" }}>
            <FormControlLabel
              {...field}
              control={
                <Checkbox
                  {...field}
                  // checked={!!field.value}
                  checked={field.value === undefined ? false : field.value}
                  disabled={isDisabled}
                  onChange={(e) => {
                    field.onChange(e.target.checked)
                    if (handleChange) {
                      handleChange()
                    }
                  }}
                />
              }
              label=""
              sx={{ marginRight: 0 }}
            />
            <Typography display="inline">{label}</Typography>
          </FormGroup>
        )}
      />
      <FormHelperText
        className="ErrorTextField"
        error={showError}
        style={{ marginLeft: "unset" }}
      >
        <Trans
          i18nKey={errorMessage?.message || errorMessage}
          shouldUnescape
          values={{ name: headerLabel?.replace("*", "") }}
        />
      </FormHelperText>
    </section>
  )
}
RhfCheckbox.defaultProps = {
  headerLabel: "",
  isDisabled: false,
  handleChange: () => {},
}
export default RhfCheckbox
