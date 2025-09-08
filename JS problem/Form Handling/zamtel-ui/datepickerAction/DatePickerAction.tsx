import { Box } from "@mui/material"
import { PickersActionBarProps } from "@mui/x-date-pickers/PickersActionBar"
import StyledButton from "../styled/StyledButton"

function DatePickerAction(props: PickersActionBarProps) {
  const { onSetToday } = props
  const handleTodayClick = () => {
    onSetToday()
  }
  return (
    <Box
      sx={{ textAlign: "center", pb: 0.1, borderTop: "1px solid #00000033" }}
    >
      <StyledButton
        onClick={handleTodayClick}
        style={{ boxShadow: "none", textTransform: "none" }}
      >
        Today
      </StyledButton>
    </Box>
  )
}

export default DatePickerAction
