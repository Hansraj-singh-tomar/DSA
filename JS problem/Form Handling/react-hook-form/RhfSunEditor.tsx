import { Box, InputLabel, FormHelperText } from "@mui/material"
import _ from "lodash"
import { Controller, useFormContext } from "react-hook-form"
import { Trans } from "react-i18next"
import SunEditor from "suneditor-react"
import Label from "app/components/zamtel-ui/label/Label"
import { TRhfSunEditorProps } from "../../../models/formFields"
import "../materialui.scss"
import "suneditor/dist/css/suneditor.min.css"

function RhfSunEditor({
  name,
  defaultValue,
  label,
  buttonList,
  isDisabled,
}: TRhfSunEditorProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const showError = !!errors[name]
  const errorMessage: any = _.has(errors, `${name}.message`)
    ? _.get(errors, `${name}.message`)
    : ""
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => (
        <>
          <InputLabel>
            <Box sx={{ pb: 0.5 }}>
              <Label label={label} isDisabled={isDisabled} />
            </Box>
          </InputLabel>
          <SunEditor
            onChange={(value: any) => {
              if (value === "<p><br></p>") {
                field.onChange("")
              } else {
                field.onChange(value)
              }
            }}
            defaultValue={field.value}
            setOptions={{
              height: "200px",
              buttonList: buttonList || [],
            }}
            setContents={field.value}
            disable={isDisabled}
          />
          <p className="textArea-end-label">
            {field?.value?.length}/200 characters
          </p>
          <FormHelperText className="ErrorTextField" error={showError}>
            <Trans
              i18nKey={errorMessage?.message || errorMessage}
              shouldUnescape
              values={{
                name: label.replace("*", ""),
                min: errorMessage?.values?.min,
                max: errorMessage?.values?.max,
              }}
            />
          </FormHelperText>
        </>
      )}
    />
  )
}
RhfSunEditor.defaultProps = {
  isDisabled: false,
}
export default RhfSunEditor
