import { Grid, Typography } from "@mui/material"
import styles from "./GlobalLoader.module.scss"

function GlobalLoader() {
  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item md={2} sm={4} xs={4}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          className={styles.container}
          direction="column"
        >
          <Grid item>
            <Typography variant="subtitle2" className={styles.typographyText}>
              Please wait...
            </Typography>
          </Grid>
          <Grid
            item
            className={styles.loading}
            style={{ color: "#4D74EF", transform: "scale(3)" }}
          >
            <span>.</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default GlobalLoader
