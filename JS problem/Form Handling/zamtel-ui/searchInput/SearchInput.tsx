import { FormControl, InputAdornment, OutlinedInput } from "@mui/material"

import SearchIcon from "@mui/icons-material/Search"

interface IProps {
  placeholder: string
}

function SearchInput({ placeholder }: IProps) {
  return (
    <FormControl fullWidth variant="outlined">
      <OutlinedInput
        id="outlined-adornment-weight"
        placeholder={placeholder}
        onChange={() => {}}
        endAdornment={
          <InputAdornment style={{ cursor: "pointer" }} position="end">
            <SearchIcon />
          </InputAdornment>
        }
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
          "aria-label": "weight",
        }}
        sx={{ fontSize: "0.75rem" }}
      />
    </FormControl>
  )
}

export default SearchInput
