import {
  Grid,
  Box,
  FormControlLabel,
  FormLabel,
  styled,
  Typography,
  FormHelperText,
} from "@mui/material"
import CustomSwitch from "app/components/zamtel-ui/switch/CustomSwitch"
import { Trans } from "react-i18next"
import { TRfhMultiSwitchProps } from "app/models/formFields"
import { Controller, useFormContext } from "react-hook-form"
import _ from "lodash"

const CustomSwitch1 = styled(CustomSwitch)(({ theme }) => ({
  "& .MuiSwitch-track": {
    backgroundColor:
      theme.palette.mode === "dark" ? "rgba(0,0,0,0)" : "rgba(0,0,0,0)",
  },
  "& .MuiSwitch-switchBase": {
    "&.Mui-checked": {
      "& + .MuiSwitch-track": {
        backgroundColor:
          theme.palette.mode === "dark" ? "rgba(0,0,0,0)" : "rgba(0,0,0,0)",
      },
    },
  },
})) as typeof CustomSwitch
function RhfSwitch({
  name,
  headerLabel,
  labels,
  labelsSelector,
  labelsPlacement,
  labelsStyle,
  isHidden,
  isDisabled,
}: TRfhMultiSwitchProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const showError = !!errors[name]
  const errorMessage: any = _.has(errors, `${name}.message`)
    ? _.get(errors, `${name}.message`)
    : ""

  return (
    <Grid>
      {headerLabel && headerLabel !== "" && (
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
      <Grid container>
        {labels.map((labelValue: any) => {
          const label = labelsSelector ? labelValue[labelsSelector] : labelValue
          const labelName = `${name}.${label.replace(" ", "")}`
          return (
            <Controller
              name={labelName}
              key={labelName}
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  sx={{ pl: 1 }}
                  style={labelsStyle}
                  control={
                    isHidden ? (
                      <CustomSwitch1
                        {...field}
                        name={labelName}
                        checked={!!field.value}
                        disabled={isDisabled}
                        onChange={(_e, item) => {
                          field.onChange(item)
                        }}
                        style={{ display: "none" }}
                      />
                    ) : (
                      <CustomSwitch
                        {...field}
                        name={labelName}
                        checked={!!field.value}
                        disabled={isDisabled}
                        onChange={(_e, item) => {
                          field.onChange(item)
                        }}
                      />
                    )
                  }
                  label={label}
                  labelPlacement={labelsPlacement}
                  disabled={isDisabled}
                />
              )}
            />
          )
        })}
      </Grid>
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
    </Grid>
  )
}
RhfSwitch.defaultProps = {
  headerLabel: "",
  labelPlacement: "end",
  isHidden: false,
  isDisabled: false,
}
export default RhfSwitch
