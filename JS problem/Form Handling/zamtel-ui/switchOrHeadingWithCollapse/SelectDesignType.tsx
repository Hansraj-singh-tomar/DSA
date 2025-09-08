import { ReactElement, ReactNode } from "react"
import HeadingDesign1 from "./HeadingDesign1"
import HeadingDesign2 from "./HeadingDesign2"
import HeadingDesign3 from "./HeadingDesign3"
import HeadingDesign4 from "./HeadingDesign4"
import SwitchDesign from "./SwitchDesign"

interface TProps {
  name: string
  designType: string
  isSwitchButtonCheck: boolean
  tabHeading?: string | undefined
  tabLeftHeading?: string | undefined
  tabRightHeading?: string | undefined
  tabSubHeading?: string | undefined | ReactNode
  isArrowAllowedInSwitch?: boolean | undefined
  isEditVisible?: boolean | undefined
  isDeleteVisible?: boolean | undefined
  isLeftTextVisible?: boolean | undefined
  onClickEdit?: (() => void) | undefined
  onClickDelete?: (() => void) | undefined
  onClickLeftText?: (() => void) | undefined
  isDisabled?: boolean
  isArrowIcon?: boolean
  middleComponent?: ReactElement
  blueToggle: boolean
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
function SelectDesignType({
  name,
  designType,
  isSwitchButtonCheck,
  isArrowAllowedInSwitch,
  tabHeading,
  tabLeftHeading,
  tabRightHeading,
  tabSubHeading,
  isEditVisible,
  isDeleteVisible,
  isLeftTextVisible,
  onClickEdit,
  onClickDelete,
  onClickLeftText,
  isDisabled,
  tabHeadingTypographyVariant,
  isArrowIcon,
  middleComponent,
  blueToggle,
}: TProps) {
  const getTabDesign = () => {
    if (designType === "switch")
      return (
        <SwitchDesign
          name={name}
          isSwitchButtonCheck={isSwitchButtonCheck}
          tabHeading={tabHeading}
          tabLeftHeading={tabLeftHeading}
          isArrowAllowedInSwitch={isArrowAllowedInSwitch}
          isDisabled={isDisabled}
          blueToggle={blueToggle}
        />
      )
    // if (designType === "heading1")
    //   return (
    //     <HeadingDesign1
    //       name={name}
    //       isSwitchButtonCheck={isSwitchButtonCheck}
    //       tabLeftHeading={tabLeftHeading}
    //       tabRightHeading={tabRightHeading}
    //       tabSubHeading={tabSubHeading}
    //       isDisabled={isDisabled}
    //     />
    //   )

    if (designType === "heading1")
      return (
        <HeadingDesign1
          name={name}
          isSwitchButtonCheck={isSwitchButtonCheck}
          tabLeftHeading={tabLeftHeading}
          tabRightHeading={tabRightHeading}
          tabSubHeading={tabSubHeading}
          isDisabled={isDisabled}
        />
      )
    if (designType === "heading3")
      return (
        <HeadingDesign3
          name={name}
          isSwitchButtonCheck={isSwitchButtonCheck}
          tabHeading={tabHeading}
          tabHeadingTypographyVariant={tabHeadingTypographyVariant}
          isArrowIcon={isArrowIcon}
        />
      )
    if (designType === "heading4")
      return (
        <HeadingDesign4
          name={name}
          isSwitchButtonCheck={isSwitchButtonCheck}
          tabHeading={tabHeading}
          tabHeadingTypographyVariant={tabHeadingTypographyVariant}
          tabSubHeading={tabSubHeading}
          middleComponent={middleComponent}
        />
      )
    return (
      <HeadingDesign2
        name={name}
        tabLeftHeading={tabLeftHeading}
        tabRightHeading={tabRightHeading}
        tabSubHeading={tabSubHeading}
        isEditVisible={isEditVisible}
        isDeleteVisible={isDeleteVisible}
        isLeftTextVisible={isLeftTextVisible}
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
        onClickLeftText={onClickLeftText}
      />
    )
  }
  return getTabDesign()
}

SelectDesignType.defaultProps = {
  tabHeading: "",
  tabLeftHeading: "",
  tabRightHeading: "",
  tabSubHeading: "",
  isArrowAllowedInSwitch: false,
  isEditVisible: false,
  isDeleteVisible: false,
  isLeftTextVisible: false,
  onClickEdit: () => {},
  onClickDelete: () => {},
  onClickLeftText: () => {},
  isDisabled: false,
  middleComponent: null,
  tabHeadingTypographyVariant: "body2",
  isArrowIcon: true,
  blueToggle: false,
}

export default SelectDesignType
