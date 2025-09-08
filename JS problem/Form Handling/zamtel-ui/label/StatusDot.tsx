import { Box } from "@mui/material"
import { statusClassSelector } from "app/utils/commonFunctions"

const statusColorMap = {
  green: { dot: "#21A65B" },
  yellow: { dot: "#FAAC2E" },
  red: { dot: "#ED1C24" },
  grey: { dot: "#9E9E9E" },
  blue: { dot: "#1976d2" },
}

export default function StatusDot({ status }: { status: string }) {
  const statusClass = statusClassSelector(status)
  const { dot } = statusColorMap[statusClass] || statusColorMap.grey

  return (
    <Box
      sx={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        bgcolor: dot,
      }}
    />
  )
}
