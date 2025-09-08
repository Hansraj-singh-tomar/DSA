import { Popper, autocompleteClasses } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledComboboxPopper = styled(Popper)({
  [`& .${autocompleteClasses.paper}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    borderRadius: "8px",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    border: "1px solid #0000001F",
  },
  [`& .${autocompleteClasses.option}`]: {
    borderBottom: "1px solid #0000001F",
    borderTop: "1px solid #0000001F",
  },
  [`& .${autocompleteClasses.option}[aria-selected="true"]`]: {
    // opacity: 0.30000001192092896,
    background: "#D9D9D9 !important",
    // color: "var(--fill-pr, #49494D) !important",
    // fontWeight: 500,
  },
  [`& .${autocompleteClasses.option}[aria-selected="true"].Mui-focused`]: {
    backgroundColor: "#D9D9D9 !important",
  },
})

export default StyledComboboxPopper
