import { Grid, ListItemText } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

type DropdownSelectorProps = {
  label: any
  selected: boolean
}

function CheckboxDropdownLabel({ label, selected }: DropdownSelectorProps) {
  console.log(selected)
  return (
    <Grid
      container
      spacing={1}
      // justifyContent="space-between"
      alignItems="center"
      flexWrap="nowrap"
    >
      <Grid item mr={-1}>
        <AddIcon />
      </Grid>
      <Grid item>
        <ListItemText primary={label} />
      </Grid>
    </Grid>
  )
}

export default CheckboxDropdownLabel
