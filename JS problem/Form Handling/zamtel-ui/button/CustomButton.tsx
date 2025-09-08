import { Button, CircularProgress } from "@mui/material"
import { TMuiButtonProps } from "app/models/formFields"
import _ from "lodash"
import "./Button.scss"

function CustomButton({
  text,
  type,
  isDisabled,
  height,
  width,
  isEndIcon,
  endIconOrText,
  isStartIcon,
  startIconOrText,
  onClick,
  loading,
  style,
  variant,
  containedSecondary,
}: TMuiButtonProps) {
  return (
    <Button
      fullWidth
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      style={
        !_.isEmpty(style)
          ? style
          : {
              height: height !== "" ? height : "",
              width: width !== "" ? width : "",
              minWidth: "max-content",
              whiteSpace: "nowrap",
            }
      }
      variant={variant}
      endIcon={isEndIcon && endIconOrText}
      startIcon={isStartIcon && startIconOrText}
      color={containedSecondary ? "secondary" : "error"}
    >
      {!loading ? (
        text
      ) : (
        <>
          {text} &nbsp;&nbsp;
          <CircularProgress size={20} />
        </>
      )}
    </Button>
  )
}

CustomButton.defaultProps = {
  type: "button",
  isDisabled: false,
  isEndIcon: false,
  isStartIcon: false,
  endIconOrText: () => {},
  onClick: () => {},
  loading: false,
  style: {},
  height: "",
  variant: "primary",
  containedSecondary: false,
}

export default CustomButton
