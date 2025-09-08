import { Typography } from "@mui/material"

import StyledButton from "../styled/StyledButton"

function Details({ handleClick, buttonText }: any) {
  return (
    <StyledButton variant="text" type="button" onClick={handleClick}>
      <Typography
        sx={{
          color: "#4D74EF",
          textAlign: "left",
          textDecoration: "underline",
          font: "normal normal medium 14px/21px Poppins",
          letterSpacing: "0px",

          opacity: "1",
        }}
        pr={0.5}
        pl={0.8}
      >
        {buttonText}
      </Typography>
    </StyledButton>
  )
}

export default Details
