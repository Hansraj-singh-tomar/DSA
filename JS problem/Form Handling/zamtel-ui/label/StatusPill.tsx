import { Box, Typography } from "@mui/material"
import {
  statusClassSelector,
  capitalizeStatusString,
} from "app/utils/commonFunctions"

const statusColorMap = {
  green: { bg: "#DFF6EA", dot: "#21A65B", text: "#222" },
  yellow: { bg: "#FFF7E0", dot: "#FAAC2E", text: "#222" },
  red: { bg: "#FDEAEA", dot: "#ED1C24", text: "#222" },
  grey: { bg: "#F5F5F5", dot: "#9E9E9E", text: "#222" },
  blue: { bg: "#E3F0FF", dot: "#1976d2", text: "#222" },
}

export default function StatusPill({
  status,
  sx,
  borderBg,
}: {
  status: string
  sx?: Object
  borderBg?: boolean
}) {
  const statusClass = statusClassSelector(status)
  const { bg, dot, text } = statusColorMap[statusClass] || statusColorMap.grey
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        minWidth: "60px",
        height: "30px",
        borderRadius: "100px",
        backgroundColor: borderBg ? bg : null,
        padding: "8px ",
        gap: "10px",
        ...sx,
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          bgcolor: dot,
        }}
      />
      <Typography
        variant="body2"
        fontWeight={500}
        fontSize={16}
        color={text}
        sx={{ lineHeight: 18 }}
      >
        {capitalizeStatusString(status)}
      </Typography>
    </Box>
  )
}

StatusPill.defaultProps = {
  sx: () => {},
  borderBg: () => true,
}
