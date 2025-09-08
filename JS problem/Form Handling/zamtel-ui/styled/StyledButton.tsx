import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"

const StyledButton = styled(Button)({
  "&.MuiButton-root": {
    textAlign: "center",
    textTransform: "none",
    font: "normal normal medium 12px/18px Poppins",
    letterSpacing: "0px",
    // border: "1px solid #4D74EF", // default transparent border to prevent layout shift
  },
  // "&.MuiButton-root:hover": {
  //   // color: "#4D74EF",
  //   background: "#b9c8f9",
  //   boxShadow: "none",
  //   // border: "1px solid #4D74EF", // border on hover
  // },
  "&.Mui-disabled": {
    color: "#00000038",
  },
}) as typeof Button

export default StyledButton
