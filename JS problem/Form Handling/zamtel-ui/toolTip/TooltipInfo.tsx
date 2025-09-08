import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { InputLabel, Tooltip, Typography } from "@mui/material"

interface IProps {
  tooltipText: string
  labelText?: string
}

function TooltipInfo({ tooltipText, labelText }: IProps) {
  return (
    <div>
      {" "}
      <InputLabel
        sx={{
          font: "normal normal 600 12px/18px Poppins !important",
          display: "flex",
          alignItems: "center",
          height: "20px",
        }}
      >
        {labelText}
        <Tooltip
          title={
            <Typography variant="informationMessage">{tooltipText}</Typography>
          }
          arrow
        >
          <span>
            <InfoOutlinedIcon
              sx={{
                display: "flex",
                marginLeft: "5px",
                alignItems: "center",
              }}
              fontSize="small"
              color="action"
            />
          </span>
        </Tooltip>
      </InputLabel>
    </div>
  )
}

TooltipInfo.defaultProps = {
  labelText: "",
}

export default TooltipInfo
