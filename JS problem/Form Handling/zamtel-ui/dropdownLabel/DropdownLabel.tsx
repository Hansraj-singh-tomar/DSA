import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Radio,
  Typography,
} from "@mui/material"

type DropdownSelectorProps = {
  label: any
  selected?: boolean
  isRadioButtonRequired?: boolean
}

function DropdownLabel({
  label,
  selected,
  isRadioButtonRequired,
}: DropdownSelectorProps) {
  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <List disablePadding>
              <ListItem disablePadding>
                <ListItemText
                  primary={
                    <Typography variant="body2" fontWeight="normal">
                      {label}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Grid>
          {isRadioButtonRequired && (
            <Grid item>
              <Radio checked={selected} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

DropdownLabel.defaultProps = {
  selected: false,
  isRadioButtonRequired: false,
}

export default DropdownLabel
