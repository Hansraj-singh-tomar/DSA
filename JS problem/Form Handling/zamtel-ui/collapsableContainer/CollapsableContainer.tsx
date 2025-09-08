import { Box, Grid, SxProps } from "@mui/material"
import { ReactNode, useState } from "react"
import CustomButton from "../button/CustomButton"

interface ICollapsableContainerProps {
  expander?: ReactNode
  collapser?: ReactNode
  children: ReactNode
  collapsedHeight?: string
  sx?: SxProps
  parentExpanded?: any
}

function CollapsableContainer({
  expander,
  collapser,
  children,
  collapsedHeight,
  sx,
  parentExpanded,
}: ICollapsableContainerProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Grid item container sx={sx}>
      <Grid
        item
        container
        height={expanded ? "auto" : collapsedHeight}
        overflow="hidden"
      >
        {children}
      </Grid>
      <Grid item>
        <Box
          onClick={() => {
            setExpanded((isExpanded) => !isExpanded)
            parentExpanded(expanded)
          }}
          py={3}
        >
          {expanded ? collapser : expander}
        </Box>
      </Grid>
    </Grid>
  )
}

CollapsableContainer.defaultProps = {
  expander: (
    <CustomButton variant="outlined" text="Expand" onClick={() => {}} />
  ),
  collapser: (
    <CustomButton variant="outlined" text="Collapse" onClick={() => {}} />
  ),
  collapsedHeight: "100px",
  sx: {},
  parentExpanded: () => {},
}

export default CollapsableContainer
