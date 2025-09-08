import { TRhfNumericIncDecProps } from "app/models/formFields"
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form"
import {
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import Label from "app/components/zamtel-ui/label/Label"
import { Trans } from "react-i18next"
import _ from "lodash"

function RhfNumericIncDec({
  name,
  isDisabled,
  defaultValue,
  label,
  labelType,
  placeholder,
  maxValue,
}: TRhfNumericIncDecProps) {
  const finalMaxValue = maxValue || Number.MAX_SAFE_INTEGER
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const showError = !!errors[name]
  const errorMessage: any = _.has(errors, `${name}.message`)
    ? _.get(errors, `${name}.message`)
    : ""

  const adjustCount = (
    field: ControllerRenderProps<FieldValues, string>,
    count: any,
  ) => {
    if (field.value !== undefined) {
      if (Number(field.value) === 0 && count === -1)
        field.onChange(Number(field.value))
      else if (Number(field.value) < finalMaxValue || count < 0) {
        field.onChange(Number(field.value) + count)
      }
    } else if (field.value === undefined) {
      if (count === -1) field.onChange(0)
      else {
        field.onChange(1)
      }
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Grid container direction="column">
          <Grid item>
            <InputLabel>
              <Label
                label={label}
                labelType={labelType}
                isDisabled={isDisabled}
              />
            </InputLabel>
          </Grid>
          <Grid item>
            <TextField
              {...field}
              ref={field.ref}
              name={name}
              placeholder={placeholder}
              fullWidth
              inputProps={{
                sx: {
                  "&::placeholder": {
                    fontSize: "normal normal normal 16px/25px Poppins",
                    color: "#00000099",
                  },
                },
              }}
              onBlur={(e) => {
                const input = e.target.value
                if (input?.length && input[input.length - 1] === ".")
                  field.onChange(input.substring(0, input.length - 1))
              }}
              onChange={(e) => {
                const input = e.target.value
                if (/^[0-9]/.exec(input)) {
                  if (Number(input) <= finalMaxValue && Number(input) >= 0)
                    field.onChange(input)
                } else {
                  field.onChange("")
                }
              }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Grid container direction="column">
                      <Grid item mb={-1.8} mt={0.6}>
                        <button
                          type="button"
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => adjustCount(field, 1)}
                        >
                          <KeyboardArrowUpIcon />
                        </button>
                      </Grid>
                      <Grid item>
                        <button
                          type="button"
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => adjustCount(field, -1)}
                        >
                          <KeyboardArrowDownIcon />
                        </button>
                      </Grid>
                    </Grid>
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText className="ErrorTextField" error={showError}>
              <Trans
                i18nKey={errorMessage?.message || errorMessage}
                shouldUnescape
                values={{ name: label.replace("*", "") }}
              />
            </FormHelperText>
          </Grid>
        </Grid>
      )}
    />
  )
}

export default RhfNumericIncDec

RhfNumericIncDec.defaultProps = {
  maxValue: Number.MAX_SAFE_INTEGER,
}
