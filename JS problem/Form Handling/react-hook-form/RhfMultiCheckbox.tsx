import {
  Box,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Typography,
  FormHelperText,
} from "@mui/material"
import { TRhfMultiCheckbox } from "app/models/formFields"
import { Trans } from "react-i18next"
import { Controller, useFormContext } from "react-hook-form"
import _ from "lodash"

function RhfMultiCheckbox({
  name,
  headerLabel,
  labelSelector,
  labels,
  isDisabled,
  defaultValue,
}: TRhfMultiCheckbox) {
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
            {headerLabel}
          </Typography>
        </Box>
      </FormLabel>

      {labels.map((labelValue: any) => {
        const label = labelSelector ? labelValue[labelSelector] : labelValue
        const labelName = `${name}.${label.replace(" ", "")}`
        return (
          <Controller
            name={labelName}
            key={labelName}
            defaultValue={defaultValue}
            control={control}
            render={({ field }) => (
              <FormControlLabel
                sx={{ width: "fit-content" }}
                control={
                  <Checkbox
                    {...field}
                    name={labelName}
                    // checked={!!field.value}
                    checked={field.value === undefined ? false : field.value}
                    disabled={isDisabled}
                    onChange={(_e, item) => {
                      field.onChange(item)
                    }}
                  />
                }
                label={label}
              />
            )}
          />
        )
      })}
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
RhfMultiCheckbox.defaultProps = {
  headerLabel: "",
  isDisabled: false,
}
export default RhfMultiCheckbox
