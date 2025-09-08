import { ReactElement } from "react"
import StyledButton from "../styled/StyledButton"

interface IProps {
  buttonName: string
  startIcon?: string | ReactElement<any, any>
  handleClick: () => void
}

function OutlinedButton({ buttonName, startIcon, handleClick }: IProps) {
  return (
    <StyledButton
      variant="outlined"
      type="button"
      size="small"
      onClick={handleClick}
      style={{
        textAlign: "left",
        font: "normal normal 500 12px/34px Poppins",
        letterSpacing: "0px",
        opacity: 1,
        height: "36px",
      }}
      startIcon={startIcon}
    >
      {buttonName}
    </StyledButton>
  )
}

OutlinedButton.defaultProps = {
  startIcon: "",
}

export default OutlinedButton
