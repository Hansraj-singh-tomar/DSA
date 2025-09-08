import React from "react"
import { Button } from "@mui/material"
import "./Button.scss"

interface IProps {
  children: React.ReactNode
  type?: "submit" | "button" | "reset"
  cssClasses: string
  variant: "contained" | "outlined" | "text" | undefined
  disabled: boolean
  onClick: () => void
}
function CustomButton({
  children,
  cssClasses,
  variant,
  disabled,
  onClick,
  type,
}: IProps) {
  return (
    <Button
      className={cssClasses}
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
      variant={variant}
      disabled={disabled}
      fullWidth
    >
      {children}
    </Button>
  )
}

CustomButton.defaultProps = {
  type: "button",
}

export default CustomButton
