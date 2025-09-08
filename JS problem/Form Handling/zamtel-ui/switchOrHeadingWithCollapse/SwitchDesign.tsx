import { Grid, Typography } from "@mui/material"
import RhfSwitch from "app/components/material-ui/react-hook-form/RhfSwitch"
import { useTranslation } from "react-i18next"
import { ReactComponent as ArrowDown } from "assets/images/arrow-down.svg"

interface TProps {
  name: string
  isSwitchButtonCheck: boolean
  tabHeading?: string | undefined
  tabLeftHeading?: string | undefined
  isArrowAllowedInSwitch?: boolean | undefined
  isDisabled?: boolean
  blueToggle?: boolean
}
function SwitchDesign({
  name,
  isSwitchButtonCheck,
  tabHeading,
  tabLeftHeading,
  isArrowAllowedInSwitch,
  isDisabled,
  blueToggle,
}: TProps) {
  const { t } = useTranslation()
  return (
    <Grid
      container
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item>
        <Grid container direction="row" spacing={1} alignItems="center">
          {tabLeftHeading && tabLeftHeading !== "" && (
            <Grid item>
              <Typography
                variant="label"
                fontSize={12}
                fontWeight={500}
                display="inline-flex"
              >
                {tabLeftHeading}
              </Typography>
            </Grid>
          )}
          <Grid item className={`switchBtn ${!blueToggle && "toggleGreen"}`}>
            <RhfSwitch
              name={name}
              headerLabel=""
              label=""
              isDisabled={isDisabled}
            />
          </Grid>
          {tabHeading && tabHeading !== "" && (
            <Grid item>
              <Typography variant="body2">{t(tabHeading)}</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
      {isArrowAllowedInSwitch && isSwitchButtonCheck && (
        <Grid item>
          <ArrowDown className={isSwitchButtonCheck ? "arrow-rotate" : ""} />
        </Grid>
      )}
    </Grid>
  )
}

SwitchDesign.defaultProps = {
  tabHeading: "",
  tabLeftHeading: "",
  isArrowAllowedInSwitch: false,
  isDisabled: false,
  blueToggle: false,
}
export default SwitchDesign
