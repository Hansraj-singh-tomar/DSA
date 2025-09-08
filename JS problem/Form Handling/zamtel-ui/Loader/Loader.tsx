import { CircularProgress, Grid } from "@mui/material"

type TLoader = {
  size?: number
  paddingTop?: number
  paddingBottom?: number
  width?: number
}
function Loader({ size, paddingTop, paddingBottom, width }: TLoader) {
  return (
    <Grid
      container
      sx={{ height: "100%", width }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        item
        xs={12}
        style={{ textAlign: "center" }}
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
      >
        <CircularProgress size={size} />
      </Grid>
    </Grid>
  )
}

Loader.defaultProps = {
  size: 20,
  paddingTop: 0,
  paddingBottom: 0,
  width: "100%",
}

export default Loader
