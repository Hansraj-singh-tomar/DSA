import { Box } from "@mui/material"

interface TabPanelProps {
  children: React.ReactNode
  index: number
  value: number
  isTabReRenderRequired: boolean
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, isTabReRenderRequired, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {isTabReRenderRequired ? (
        value === index && <Box>{children}</Box>
      ) : (
        <Box>{children}</Box>
      )}
    </div>
  )
}

export default TabPanel
