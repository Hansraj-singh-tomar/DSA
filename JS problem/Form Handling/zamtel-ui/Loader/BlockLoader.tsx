import { Box } from "@mui/material"
import GlobalLoader from "./GlobalLoader"

function BlockLoader() {
  return (
    <Box
      px="20px"
      width="80%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <GlobalLoader />
    </Box>
  )
}

export default BlockLoader
