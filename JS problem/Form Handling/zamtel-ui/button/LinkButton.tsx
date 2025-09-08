import { Chip } from "@mui/material"
import { JSXElementConstructor, ReactElement } from "react"

interface IProps {
  label: string
  handleClick: () => void
  color?: "primary" | "success"
  startIcon?: ReactElement<any, string | JSXElementConstructor<any>> | undefined
  endIcon?: ReactElement<any, string | JSXElementConstructor<any>> | undefined
}

function LinkButton({ label, handleClick, color, startIcon, endIcon }: IProps) {
  return (
    <Chip
      sx={{
        // color: "#4D74EF",
        border: "none",
        textDecoration: "underline",
        cursor: "pointer",
        fontWeight: 500,
      }}
      variant="outlined"
      color={color}
      size="medium"
      label={label}
      clickable
      icon={startIcon}
      deleteIcon={endIcon}
      onDelete={endIcon ? handleClick : undefined}
      onClick={handleClick}
    />
  )
}

LinkButton.defaultProps = {
  color: "primary",
  startIcon: undefined,
  endIcon: undefined,
}

export default LinkButton
