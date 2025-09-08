import { Box } from "@mui/material"
import { PickersActionBarProps } from "@mui/x-date-pickers/PickersActionBar"
import StyledButton from "../styled/StyledButton"

function DateTimePickerAction(props: PickersActionBarProps) {
  const { onAccept, onCancel } = props

  const handleOnAccept = () => {
    onAccept()
  }

  const handleOnCancel = () => {
    onCancel()
  }
  return (
    <Box
      sx={{
        textAlign: "right",
        pb: 0.1,
        borderTop: "1px solid #00000033",
        gridColumn: 2,
        gridRow: 3,
        padding: "8px",
      }}
    >
      <StyledButton
        onClick={handleOnCancel}
        style={{ boxShadow: "none", textTransform: "none", marginRight: "8px" }}
      >
        Cancel
      </StyledButton>
      <StyledButton
        onClick={handleOnAccept}
        style={{ boxShadow: "none", textTransform: "none" }}
      >
        OK
      </StyledButton>
    </Box>
  )
}

export default DateTimePickerAction
