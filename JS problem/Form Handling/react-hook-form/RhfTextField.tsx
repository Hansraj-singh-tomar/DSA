import {
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material"
import _ from "lodash"
import { Trans } from "react-i18next"

import Label from "app/components/zamtel-ui/label/Label"
import { TRhfTextFieldProps } from "app/models/formFields"
import { Controller, useFormContext } from "react-hook-form"
import "../materialui.scss"
import TextFieldIconSelector from "./TextFieldIconSelector"

const getValueSplit = (object: any, keys: string) =>
  keys.split(".").reduce((o: any, k: string | number) => (o || {})[k], object)

function RhfTextField({
  onFocus,
  name,
  defaultValue,
  label,
  placeholder,
  type,
  isModal,
  isAutoFocus,
  isStartIconOrText,
  startIconOrText,
  isEndIconOrText,
  endIconOrText,
  isEndIconEnabled,
  isDisabled,
  autoComplete,
  endIconOnClick,
  isHelperText,
  helperText,
  labelType,
  isOnlyNumber,
  isTypeNumber,
  isOnlyAlphabets,
  isAlphaNumeric,
  isNumericWithSpecialChar,
  isFloat,
  maxLength,
  externalHandleChange,
  isSuccess,
  successHelperText,
  style,
  focused,
  isSpaceAllowed,
  customRegexExpression,
  isFloatLength,
  value,
}: TRhfTextFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const showError = !!getValueSplit(errors, name)
  const errorMessage: any = _.has(errors, `${name}.message`)
    ? _.get(errors, `${name}.message`)
    : ""
  const getExtraProps = () => {
    if (isSuccess) {
      return {
        focused: true,
      }
    }
    if (focused) {
      return { focused: true }
    }
    return {}
  }

  const getColor = () => {
    if (isSuccess) {
      return "success"
    }
    if (focused && showError) {
      return "error"
    }
    return undefined
  }

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => (
        <>
          {label.length > 0 && (
            <InputLabel htmlFor={name}>
              <Box sx={{ pb: 0.5 }}>
                <Label
                  label={label}
                  labelType={labelType}
                  isDisabled={isDisabled}
                  isModal={isModal}
                />
              </Box>
            </InputLabel>
          )}
          <TextField
            {...field}
            {...getExtraProps()}
            ref={field.ref}
            id={name}
            variant="outlined"
            error={showError}
            placeholder={placeholder}
            fullWidth
            autoComplete={autoComplete}
            type={type}
            autoFocus={isAutoFocus}
            onBlur={(e) => {
              const val = e.target.value.trim().split("")
              let updatedVal = ""
              val.forEach((char, index) => {
                if (char !== " ") updatedVal += char
                else if (val[index] === " " && val[index + 1] !== " ")
                  updatedVal += char
              })
              field.onChange(updatedVal)
            }}
            onChange={(e) => {
              const val = e.target.value
              if (isOnlyNumber) {
                const re = /^[0-9]*$/
                if (val === "" || re.test(val)) {
                  if (isTypeNumber) {
                    field.onChange(val === "" ? null : Number(val))
                  } else {
                    field.onChange(val)
                  }
                } else {
                  field.onChange(field.value === null ? "" : field.value)
                }
              } else if (isFloat) {
                let re = /^\d*\.?\d{0,6}$/
                if (isFloatLength) {
                  re = /^\d*\.?\d{0,4}$/
                }
                if (val === "" || re.test(val)) {
                  field.onChange(val)
                }
              } else if (isOnlyAlphabets) {
                const re = /[^A-Za-z \u0980-\u09FF]/gi
                if (val[0] === " ") field.onChange(val.replace(re, "").trim())
                else field.onChange(val.replace(re, ""))
              } else if (isAlphaNumeric) {
                const re = isSpaceAllowed ? /[^a-zA-Z0-9 ]/g : /[^a-zA-Z\d]/g

                field.onChange(val.replace(re, ""))
              } else if (isNumericWithSpecialChar) {
                const re = /^[0-9!@#$%^&*)(?<>|+=._-]+$/g
                if (val === "" || re.test(val)) {
                  field.onChange(val)
                }
              } else if (customRegexExpression) {
                if (val === "" || customRegexExpression?.test(val)) {
                  field.onChange(val)
                  externalHandleChange(val)
                }
              } else {
                field.onChange(val)
              }
              // if (externalHandleChange) {
              //   externalHandleChange(val)
              // }
            }}
            value={value || field.value}
            inputProps={{
              sx: {
                "&::placeholder": {
                  fontSize: "normal normal normal 16px/25px Poppins",
                  color: "#00000099",
                },
              },
              maxLength,
            }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            InputProps={{
              autoComplete,
              startAdornment: isStartIconOrText ? (
                <InputAdornment position="start">
                  <TextFieldIconSelector iconName={startIconOrText} />
                </InputAdornment>
              ) : null,
              endAdornment: isEndIconOrText ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={endIconOnClick}
                    sx={{
                      pointerEvents: isEndIconEnabled ? "auto" : undefined,
                    }}
                  >
                    {endIconOrText}
                  </IconButton>
                </InputAdornment>
              ) : null,
              color: getColor(),
            }}
            disabled={isDisabled}
            style={style}
            onFocus={() => {
              if (onFocus) onFocus(name)
            }}
          />
          {isHelperText &&
            !(errorMessage?.message?.length > 0 || errorMessage.length > 0) && (
              <FormHelperText className="HelperText">
                {helperText}
              </FormHelperText>
            )}
          {isSuccess && successHelperText && (
            <FormHelperText className="HelperText" style={{ color: "green" }}>
              {successHelperText}
            </FormHelperText>
          )}
          <FormHelperText className="ErrorTextField" error={showError}>
            <Trans
              i18nKey={errorMessage?.message || errorMessage}
              shouldUnescape
              values={{
                name: label.replace("*", ""),
                min: errorMessage?.values?.min,
                max: errorMessage?.values?.max,
                interpolation: { escapeValue: false },
              }}
            />
          </FormHelperText>
        </>
      )}
    />
  )
}
RhfTextField.defaultProps = {
  defaultValue: "",
  isAutoFocus: false,
  type: "text",
  isStartIconOrText: false,
  startIconOrText: "",
  isEndIconOrText: false,
  endIconOrText: () => {},
  isEndIconEnabled: false,
  isDisabled: false,
  autoComplete: "off",
  endIconOnClick: () => {},
  isHelperText: false,
  helperText: "",
  isOnlyNumber: false,
  isTypeNumber: false,
  isOnlyAlphabets: false,
  isAlphaNumeric: false,
  isNumericWithSpecialChar: false,
  isFloat: false,
  style: {},
  isSuccess: false,
  successHelperText: "",
  focused: false,
  onFocus: () => {},
  value: "",
  // externalHandleChange: () => {},
}
export default RhfTextField
