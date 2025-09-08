import { Typography } from "@mui/material"
import "../../material-ui/materialui.scss"
import MuiLabelWithStar from "app/components/material-ui/MuiLabelWithStar"

interface LabelProps {
  label: string
  labelType?: string
  isDisabled?: boolean
  isModal?: boolean
  style?: object
}

function Label({ label, labelType, isDisabled, isModal, style }: LabelProps) {
  switch (labelType) {
    case "normal":
      return (
        <Typography
          className={isDisabled ? "disabledLabel" : "MaterialUiFields-label"}
          variant={isModal ? "body1" : "label"}
          style={style}
        >
          {label.split("*")}
          {label.endsWith(" *") && <MuiLabelWithStar />}
        </Typography>
      )
    case "normalForDisabled":
      return (
        <Typography
          className="MaterialUiFields-label"
          variant={isModal ? "body1" : "label"}
          style={style}
        >
          {label.split("*")}
          {label.endsWith(" *") && <MuiLabelWithStar />}
        </Typography>
      )
    case "slashSeparated":
      return (
        <>
          <Typography
            display="inline"
            className="MaterialUiFields-label"
            variant={isModal ? "body1" : "label"}
            style={style}
          >
            {label.split("/")[0]}

            {label.endsWith(" *") && <MuiLabelWithStar />}
          </Typography>
          <Typography
            display="inline"
            variant={isModal ? "body1" : "label"}
            sx={{ color: "#00000061" }}
            style={style}
          >
            {`/${label.split("/")[1]}`}

            {label.endsWith(" *") && <MuiLabelWithStar />}
          </Typography>
        </>
      )
    case "roundBracketSeperated":
    case "bracketSeparated":
      return (
        <>
          <Typography
            display="inline"
            className="MaterialUiFields-label"
            variant={isModal ? "body1" : "label"}
            style={style}
          >
            {label.split("(")[0]}

            {label.endsWith(" *") && <MuiLabelWithStar />}
          </Typography>
          <Typography
            display="inline"
            variant={isModal ? "body1" : "label"}
            sx={{ color: "#00000061" }}
            style={style}
          >
            {`(${label.split("(")[1]}`}

            {label.endsWith(" *") && <MuiLabelWithStar />}
          </Typography>
        </>
      )

    default:
      return null
  }
}

Label.defaultProps = {
  labelType: "normal",
  isDisabled: false,
  isModal: false,
  style: {},
}

export default Label
