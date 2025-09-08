import { Grid, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { ReactComponent as ArrowDown } from "assets/images/arrow-down.svg"
import RhfSwitch from "app/components/material-ui/react-hook-form/RhfSwitch"
import { ReactElement, ReactNode } from "react"

interface TProps {
  name: string
  isSwitchButtonCheck: boolean
  tabHeading?: string | undefined
  middleComponent?: ReactElement | null
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
  tabSubHeading?: string | undefined | ReactNode
}
function HeadingDesign4({
  name,
  isSwitchButtonCheck,
  tabHeading,
  tabHeadingTypographyVariant,
  tabSubHeading,
  middleComponent,
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
      <Grid item xs={4}>
        <Typography variant={tabHeadingTypographyVariant}>
          {tabHeading && tabHeading !== "" ? t(tabHeading) : ""}
        </Typography>
        <Typography variant="informationMessage">
          {tabSubHeading && tabSubHeading !== "" && tabSubHeading !== null
            ? tabSubHeading
            : ""}
        </Typography>
      </Grid>
      {middleComponent && (
        <Grid item xs={7}>
          {middleComponent}
        </Grid>
      )}
      <Grid item pr={1} xs={1}>
        <RhfSwitch
          name={name}
          headerLabel=""
          label={
            <ArrowDown className={isSwitchButtonCheck ? "arrow-rotate" : ""} />
          }
          isHidden={isHidden}
        />
      </Grid>
    </Grid>
  )
}

HeadingDesign4.defaultProps = {
  tabHeading: "",
  tabHeadingTypographyVariant: "body2",
  tabSubHeading: "",
  middleComponent: null,
}

export default HeadingDesign4
