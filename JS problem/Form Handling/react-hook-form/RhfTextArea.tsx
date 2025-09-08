import { Box, FormHelperText, InputLabel } from "@mui/material"
import _ from "lodash"
import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Trans } from "react-i18next"
import Label from "app/components/zamtel-ui/label/Label"
import StyledTextarea from "../../zamtel-ui/styled/StyledTextArea"
import { TRhfTextAreaProps } from "../../../models/formFields"
import "../materialui.scss"

function RhfTextArea({
  name,
  defaultValue,
  label,
  endLabel,
  isEndLabel,
  isModal,
  placeholder,
  type,
  isDisabled,
  rows,
  isHelperText,
  helperText,
  maxLength,
  characterLimit,
  enumReservedKeyCodes,
  onFocus,
  onBlur,
  onSelectCapture,
  isAlphaNumeric,
  isSpaceAllowed,
  style,
}: TRhfTextAreaProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const showError = !!errors[name]
  const errorMessage: any = _.has(errors, `${name}.message`)
    ? _.get(errors, `${name}.message`)
    : ""

  const [pressedKey, setPressedKey] = useState<number>(-1)
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => (
        <>
          <InputLabel htmlFor={name}>
            <Box sx={{ pb: 0.5 }}>
              {/* <Typography
                className="MaterialUiFields-label"
                variant={isModal ? "body1" : "label"}
              >
                {label}
              </Typography> */}
              <Label
                label={label}
                isDisabled={isDisabled}
                isModal={isModal}
                style={style}
              />
            </Box>
          </InputLabel>
          <StyledTextarea
            {...field}
            onFocus={onFocus}
            onSelectCapture={(e: any) => {
              if (onSelectCapture) onSelectCapture(e.target.selectionStart)
            }}
            ref={field.ref}
            id={name}
            variant="outlined"
            error={showError}
            placeholder={placeholder}
            fullWidth
            onBlur={(e) => {
              const val = e.target.value.trim().split("")
              let updatedVal = ""
              val.forEach((char, index) => {
                if (char !== " ") updatedVal += char
                else if (val[index] === " " && val[index + 1] !== " ")
                  updatedVal += char
              })
              field.onChange(updatedVal)
              if (onBlur) onBlur()
            }}
            helperText={
              characterLimit
                ? `${field?.value?.length}/${characterLimit} character`
                : ""
            }
            FormHelperTextProps={{
              style: { textAlign: "end" },
            }}
            autoComplete="off"
            multiline
            rows={rows}
            type={type}
            onKeyDown={(e: any) => setPressedKey(e.keyCode)}
            onChange={(e) => {
              const val = e.target.value
              if (val[0] === " ") field.onChange(val.trim())
              if (isAlphaNumeric) {
                const re = isSpaceAllowed ? /[^a-zA-Z0-9 ]/g : /[^a-zA-Z\d]/g

                field.onChange(val.replace(re, ""))
              } else if (
                Array.isArray(enumReservedKeyCodes) &&
                enumReservedKeyCodes.length !== 0
              ) {
                if (!enumReservedKeyCodes.includes(pressedKey)) {
                  field.onChange(val)
                }
              } else {
                field.onChange(val)
              }
            }}
            inputProps={{
              sx: {
                "&::placeholder": {
                  fontSize: "normal normal normal 16px/25px Poppins",
                  color: "#00000099",
                },
              },
              maxLength,
            }}
            disabled={isDisabled}
          />
          {isEndLabel && (
            <p className="textArea-end-label">{endLabel} character</p>
          )}
          {isHelperText &&
            !(errorMessage?.message?.length > 0 || errorMessage.length > 0) && (
              <FormHelperText className="HelperText">
                {helperText}
              </FormHelperText>
            )}
          <FormHelperText className="ErrorTextField" error={showError}>
            <Trans
              i18nKey={errorMessage?.message || errorMessage}
              shouldUnescape
              values={{ name: label.replace("*", "") }}
            />
          </FormHelperText>
        </>
      )}
    />
  )
}
RhfTextArea.defaultProps = {
  defaultValue: "",
  isAutoFocus: false,
  type: "text",
  isStartIconOrText: false,
  startIconOrText: () => {},
  isEndIconOrText: false,
  endIconOrText: () => {},
  isDisabled: false,
  autoComplete: "off",
  endLable: "",
  isEndLabel: false,
  height: "",
  enumReservedKeyCodes: [],
  onBlur: () => {},
  onFocus: () => {},
  onSelectCapture: () => {},
  isSpaceAllowed: true,
}
export default RhfTextArea
