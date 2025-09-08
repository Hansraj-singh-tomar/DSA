import { TextField } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledTextarea = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    height: "auto",
  },
}) as typeof TextField

export default StyledTextarea
