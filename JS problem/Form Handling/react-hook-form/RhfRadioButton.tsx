import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material"
import { TRhfRadioButtonProps } from "app/models/formFields"
import { uuid } from "app/utils/commonFunctions"
import { Controller, useFormContext } from "react-hook-form"
import { Trans } from "react-i18next"
import _ from "lodash"
import Label from "app/components/zamtel-ui/label/Label"

function RhfRadioButton({
  name,
  headerLabel,
  radioButtonsValueLabel,
  handleChange,
  labelPlacement,
  isDisabled,
  isRowDirection,
  defaultValue,
}: TRhfRadioButtonProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const showError = !!errors[name]
  const errorMessage: any = _.has(errors, `${name}.message`)
    ? _.get(errors, `${name}.message`)
    : ""

  return (
    <section>
      <FormControl>
        {headerLabel && headerLabel !== "" && (
          <FormLabel htmlFor={name}>
            <Box sx={{ pb: 0.5 }}>
              <Typography
                className={
                  isDisabled
                    ? "disabledCheckboxLabel"
                    : "MaterialUiFields-label"
                }
                variant="label"
              >
                <Label label={headerLabel} isDisabled={isDisabled} />
                {/* {headerLabel} */}
              </Typography>
            </Box>
          </FormLabel>
        )}
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue || null}
          rules={{ required: true }}
          render={({ field }) => (
            <RadioGroup
              {...field}
              row={isRowDirection}
              aria-labelledby={name}
              name={name}
              value={field.value}
              defaultValue={defaultValue || null}
              onChange={(e) => {
                field.onChange(e.target.value)
                if (handleChange) {
                  handleChange(e.target.value)
                }
              }}
            >
              {radioButtonsValueLabel?.map((element) => {
                return (
                  <FormControlLabel
                    key={uuid()}
                    disabled={isDisabled}
                    value={element.value}
                    control={<Radio />}
                    label={element.label}
                    labelPlacement={labelPlacement}
                  />
                )
              })}
            </RadioGroup>
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
      </FormControl>
    </section>
  )
}
RhfRadioButton.defaultProps = {
  headerLabel: "",
  labelPlacement: "end",
  isDisabled: false,
  isRowDirection: false,
  handleChange: () => {},
}
export default RhfRadioButton
