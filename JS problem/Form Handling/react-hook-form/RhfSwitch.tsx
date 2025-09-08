/* eslint-disable @typescript-eslint/no-shadow */
import {
  Box,
  FormControlLabel,
  FormGroup,
  FormLabel,
  styled,
  Typography,
} from "@mui/material"
import CustomSwitch from "app/components/zamtel-ui/switch/CustomSwitch"
import { ReactNode } from "react"
import { Controller, useFormContext } from "react-hook-form"

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
interface TRfhSwitchPropsExtended {
  name: string
  headerLabel?: string
  label?: string | ReactNode
  labelPlacement?: "end" | "start" | "top" | "bottom"
  isHidden?: boolean
  isDisabled?: boolean
  defaultValue?: boolean
  labelVariant?:
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "label"
    | "title"
    | "placeholder"
    | "inherit"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "overline"
    | "subTitle"
    | "informationMessage"
    | "remarks"
  disableLabelClick?: boolean
}

function RhfSwitch({
  name,
  headerLabel,
  label,
  labelPlacement,
  isHidden,
  isDisabled,
  defaultValue,
  labelVariant,
  disableLabelClick = true,
}: TRfhSwitchPropsExtended) {
  const {
    control,
    // formState: { errors },
  } = useFormContext()

  return (
    <section>
      {headerLabel && headerLabel !== "" && (
        <FormLabel htmlFor={name}>
          <Box sx={{ pb: 0.5 }}>
            <Typography
              className={
                isDisabled ? "disabledCheckboxLabel" : "MaterialUiFields-label"
              }
              variant={labelVariant}
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
          <FormGroup>
            <FormControlLabel
              style={{
                marginLeft: "0px",
                ...(disableLabelClick && { pointerEvents: "none" }),
              }}
              {...field}
              defaultValue={field.value}
              componentsProps={{
                typography: {
                  style: {
                    pointerEvents: disableLabelClick ? "none" : "auto",
                    cursor: disableLabelClick ? "default" : "pointer",
                  },
                },
              }}
              control={
                <div style={{ pointerEvents: "auto" }}>
                  {isHidden ? (
                    <CustomSwitch1
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked)
                      }}
                      style={{ display: "none" }}
                      disabled={isDisabled}
                    />
                  ) : (
                    <CustomSwitch
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked)
                      }}
                      disabled={isDisabled}
                    />
                  )}
                </div>
              }
              label={
                <Typography
                  variant={labelVariant || "subtitle2"}
                  ml={1}
                  sx={{ fontWeight: 600 }}
                >
                  {label}
                </Typography>
              }
              labelPlacement={labelPlacement}
              disabled={isDisabled}
            />
          </FormGroup>
        )}
      />
    </section>
  )
}
RhfSwitch.defaultProps = {
  headerLabel: "",
  label: "",
  labelPlacement: "end",
  isHidden: false,
  isDisabled: false,
  defaultValue: false,
  labelVariant: "label",
  disableLabelClick: true,
}
export default RhfSwitch
