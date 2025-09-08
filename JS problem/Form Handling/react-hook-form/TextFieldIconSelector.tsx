import { Avatar } from "@mui/material"
import { ReactComponent as TakaIcon } from "assets/images/currency-taka.svg"
import { ReactComponent as ArrowDown } from "assets/images/arrow-down.svg"
import flag from "assets/images/flag-italy.png"

interface IProps {
  iconName?: string
}

function TextFieldIconSelector({ iconName }: IProps) {
  switch (iconName) {
    case "takaCurrency":
      return <TakaIcon />
    case "phoneNumber":
      return (
        <>
          <Avatar
            alt="UserImage"
            src={flag}
            sx={{ height: "24px", width: "24px" }}
          />
          <div style={{ paddingLeft: "5px" }}>
            <ArrowDown />
          </div>
          <div style={{ paddingLeft: "5px" }}>+ 254</div>
        </>
      )
    default:
      // eslint-disable-next-line react/jsx-no-useless-fragment
      return <>{iconName || ""}</>
  }
}

TextFieldIconSelector.defaultProps = {
  iconName: "",
}
export default TextFieldIconSelector
