import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
  FormHelperText,
  Grid,
} from "@mui/material"
import { TRhfMultiCheckbox2 } from "app/models/formFields"
import { Trans } from "react-i18next"
import { Controller, useFormContext } from "react-hook-form"
import _ from "lodash"

function RhfMultiCheckbox2({
  name,
  label,
  options,
  isDisabled,
  labelSelector,
  nameSelector,
}: TRhfMultiCheckbox2) {
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
      <FormLabel htmlFor={name}>
        <Box sx={{ pb: 0.5 }}>
          <Typography
            className={
              isDisabled ? "disabledCheckboxLabel" : "MaterialUiFields-label"
            }
            variant="label"
          >
            {label}
          </Typography>
        </Box>
      </FormLabel>
      <Grid container direction="row">
        {options?.map((option) => (
          <Grid item key={option.name}>
            <Controller
              name={option[nameSelector]}
              control={control}
              render={({ field }) => {
                return (
                  <FormGroup>
                    <FormControlLabel
                      {...field}
                      control={
                        <Checkbox
                          {...field}
                          // checked={!!field.value}

                          checked={
                            field.value === undefined ? false : field.value
                          }
                          disabled={isDisabled}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label={option[labelSelector]}
                    />
                  </FormGroup>
                )
              }}
            />
          </Grid>
        ))}
      </Grid>
      <FormHelperText
        className="ErrorTextField"
        error={showError}
        style={{ marginLeft: "unset" }}
      >
        <Trans
          i18nKey={errorMessage?.message || errorMessage}
          shouldUnescape
          values={{ name: label?.replace("*", "") }}
        />
      </FormHelperText>
    </section>
  )
}
RhfMultiCheckbox2.defaultProps = {
  label: "",
  isDisabled: false,
}
export default RhfMultiCheckbox2
