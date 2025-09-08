import { Button } from "@mui/material"
import { styled } from "@mui/material/styles"
import {
  disabledColor,
  disabledTextColor,
  greyBorderColor,
  greyColor,
} from "theme"

const StyledButtonOutlineSecondary = styled(Button)({
  "&.MuiButton-root": {
    background: "transparent",
    borderRadius: "100px",
    color: greyColor,
    fontSize: "12px",
    lineHeight: "18px",
    fontWeight: 400,
    height: "32px",
    border: `1px solid ${greyBorderColor}`,
    boxShadow: "none",
  },
  "&:hover": {
    background: "#F6F6F7",
  },
  "&:disabled": {
    background: disabledColor,
    color: disabledTextColor,
  },
}) as typeof Button

export default StyledButtonOutlineSecondary
