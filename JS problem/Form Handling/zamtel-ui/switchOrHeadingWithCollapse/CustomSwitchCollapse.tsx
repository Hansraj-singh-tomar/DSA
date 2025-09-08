import { ReactElement, ReactNode } from "react"
import { Collapse, Grid } from "@mui/material"
import "./CustomSwitchCollapse.scss"
import SelectDesignType from "./SelectDesignType"

type TProps = {
  name: string
  designType: string
  isSwitchButtonCheck: boolean
  tabHeading?: string | undefined
  tabLeftHeading?: string | undefined
  tabRightHeading?: string | undefined
  tabSubHeading?: string | undefined | ReactNode
  tabComponent: ReactElement | ReactElement[]
  isTabComponentRequired?: boolean
  isArrowAllowedInSwitch?: boolean
  isBorderRequired?: boolean
  isExpandedDivider?: boolean | undefined
  isEditVisible?: boolean | undefined
  isDeleteVisible?: boolean | undefined
  isLeftTextVisible?: boolean | undefined
  onClickEdit?: (() => void) | undefined
  onClickDelete?: (() => void) | undefined
  onClickLeftText?: (() => void) | undefined
  isDisabled?: boolean
  isBorderRemoved?: boolean
  isArrowIcon?: boolean
  middleComponent?: ReactElement
  blueToggle?: boolean
  filterModalStyle?: boolean
  noPadding?: boolean
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

function CustomSwitchCollapse({
  name,
  designType,
  isSwitchButtonCheck,
  isArrowAllowedInSwitch,
  tabHeading,
  tabLeftHeading,
  tabRightHeading,
  tabSubHeading,
  tabComponent,
  isBorderRequired,
  isExpandedDivider,
  isTabComponentRequired,
  isEditVisible,
  isDeleteVisible,
  isLeftTextVisible,
  onClickEdit,
  onClickDelete,
  onClickLeftText,
  isDisabled,
  isBorderRemoved,
  tabHeadingTypographyVariant,
  isArrowIcon,
  middleComponent,
  blueToggle,
  filterModalStyle,
  noPadding,
}: TProps) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      className={
        // eslint-disable-next-line no-nested-ternary
        isBorderRemoved
          ? "border-none"
          : isBorderRequired
          ? "collapse-border all-circular-edge-border"
          : "collapse-top-border"
      }
      flexWrap="nowrap"
    >
      <Grid
        item
        pl={noPadding ? 0 : 2}
        pt={noPadding ? 0 : 1}
        pb={noPadding ? 0 : 1}
        className={filterModalStyle ? "filterModalPadding" : ""}
      >
        <SelectDesignType
          name={name}
          designType={designType}
          isSwitchButtonCheck={isSwitchButtonCheck}
          tabHeading={tabHeading}
          tabLeftHeading={tabLeftHeading}
          tabRightHeading={tabRightHeading}
          tabSubHeading={tabSubHeading}
          isArrowAllowedInSwitch={isArrowAllowedInSwitch}
          isEditVisible={isEditVisible}
          isDeleteVisible={isDeleteVisible}
          isLeftTextVisible={isLeftTextVisible}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
          onClickLeftText={onClickLeftText}
          isDisabled={isDisabled}
          tabHeadingTypographyVariant={tabHeadingTypographyVariant}
          isArrowIcon={isArrowIcon}
          middleComponent={middleComponent}
          blueToggle={blueToggle}
        />
      </Grid>
      {isSwitchButtonCheck && !isBorderRemoved && isTabComponentRequired && (
        <Grid item pb={isExpandedDivider ? 1 : 1}>
          {isExpandedDivider && <hr className="hr-divider" />}
        </Grid>
      )}
      {isSwitchButtonCheck && isTabComponentRequired && (
        <Grid
          item
          px={2}
          className={filterModalStyle ? "filterModalPadding" : ""}
        >
          <Collapse in={isSwitchButtonCheck} collapsedSize="0px">
            {tabComponent}
          </Collapse>
        </Grid>
      )}
    </Grid>
  )
}

CustomSwitchCollapse.defaultProps = {
  tabHeading: "",
  tabLeftHeading: "",
  tabRightHeading: "",
  tabSubHeading: "",
  isBorderRequired: true,
  isExpandedDivider: true,
  isArrowAllowedInSwitch: false,
  isEditVisible: false,
  isDeleteVisible: false,
  isLeftTextVisible: false,
  onClickEdit: () => {},
  onClickDelete: () => {},
  onClickLeftText: () => {},
  isDisabled: false,
  isBorderRemoved: false,
  isTabComponentRequired: true,
  tabHeadingTypographyVariant: "body2",
  isArrowIcon: true,
  middleComponent: null,
  blueToggle: false,
  filterModalStyle: false,
  noPadding: false,
}

export default CustomSwitchCollapse
