import { Grid, IconButton, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { ReactComponent as ArrowDown } from "assets/images/arrow-down.svg"
import RhfSwitch from "app/components/material-ui/react-hook-form/RhfSwitch"

interface TProps {
  name: string
  isSwitchButtonCheck: boolean
  tabHeading?: string | undefined
  isArrowIcon?: boolean
  tabHeadingTypographyVariant?:
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "label"
    | "title"
    | "placeholder"
    | "inherit"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "overline"
    | "subTitle"
    | "informationMessage"
    | "remarks"
}
function HeadingDesign3({
  name,
  isSwitchButtonCheck,
  tabHeading,
  tabHeadingTypographyVariant,
  isArrowIcon,
}: TProps) {
  const { t } = useTranslation()
  const isHidden = true
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      display="flex"
    >
      <Grid item>
        <Typography variant={tabHeadingTypographyVariant}>
          {tabHeading && tabHeading !== "" ? t(tabHeading) : ""}
        </Typography>
      </Grid>
      {/* <Grid item container xs={2} justifyContent="flex-end"> */}
      <Grid item>
        <IconButton
          style={{
            borderRadius: 0,
            color: "white",
            backgroundColor: "transparent",
          }}
        >
          <RhfSwitch
            name={name}
            headerLabel=""
            label={
              isArrowIcon ? (
                <ArrowDown
                  className={isSwitchButtonCheck ? "arrow-rotate" : ""}
                />
              ) : (
                ""
              )
            }
            isHidden={isHidden}
            disableLabelClick={false}
          />
        </IconButton>
      </Grid>
      {/* </Grid> */}
    </Grid>
  )
}

HeadingDesign3.defaultProps = {
  tabHeading: "",
  tabHeadingTypographyVariant: "body2",
  isArrowIcon: true,
}

export default HeadingDesign3
