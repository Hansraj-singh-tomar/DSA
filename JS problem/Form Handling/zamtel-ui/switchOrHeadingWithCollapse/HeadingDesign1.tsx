import { Grid, Typography, Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import { ReactComponent as HorizontalDoubleSideArrow } from "assets/images/horizontal-double-side-arrow.svg"
import { ReactComponent as ArrowDown } from "assets/images/arrow-down.svg"
import { ReactNode } from "react"
import { useFormContext } from "react-hook-form"

interface TProps {
  name: string
  isSwitchButtonCheck: boolean
  tabLeftHeading?: string | undefined
  tabRightHeading?: string | undefined
  tabSubHeading?: string | undefined | ReactNode
  isDisabled?: boolean
}
function HeadingDesign1({
  name,
  isSwitchButtonCheck,
  tabLeftHeading,
  tabRightHeading,
  tabSubHeading,
  isDisabled,
}: TProps) {
  const { t } = useTranslation()
  const { setValue, watch } = useFormContext()
  const currentValue = watch(name, isSwitchButtonCheck)

  const handleArrowClick = () => {
    if (!isDisabled) {
      setValue(name, !currentValue)
    }
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      display="flex"
    >
      <Grid item>
        <Grid container direction="row" spacing={1} alignItems="center">
          <Grid item>
            <Typography variant="body2">
              {tabLeftHeading && tabLeftHeading !== "" ? t(tabLeftHeading) : ""}
            </Typography>
          </Grid>
          <Grid item>
            <HorizontalDoubleSideArrow />
          </Grid>
          <Grid item>
            <Typography variant="body2">
              {tabRightHeading && tabRightHeading !== ""
                ? t(tabRightHeading)
                : ""}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="informationMessage">
            {tabSubHeading && tabSubHeading !== "" && tabSubHeading !== null
              ? tabSubHeading
              : ""}
          </Typography>
        </Grid>
      </Grid>
      <Grid item pr={2}>
        <Box
          onClick={handleArrowClick}
          sx={{
            cursor: isDisabled ? "default" : "pointer",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <ArrowDown className={currentValue ? "arrow-rotate" : ""} />
        </Box>
      </Grid>
    </Grid>
  )
}

HeadingDesign1.defaultProps = {
  tabLeftHeading: "",
  tabRightHeading: "",
  tabSubHeading: "",
  isDisabled: false,
}

export default HeadingDesign1
