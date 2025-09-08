import { TextField } from "@mui/material"
import { styled } from "@mui/material/styles"

export const StyledTextfield = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
}) as typeof TextField

export const StyledTextfieldClose = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
  },
  "& .MuiButtonBase-root.MuiAutocomplete-clearIndicator": {
    visibility: "visible",
  },
}) as typeof TextField
