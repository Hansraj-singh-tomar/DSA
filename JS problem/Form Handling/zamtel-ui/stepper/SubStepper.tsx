import { Grid, Typography } from "@mui/material"

interface SubStepperProps {
  subStepper: { title: string; value: string | undefined }[]
  // belowGreySpaceNotRequired?: boolean
  marginLeft?: string
}

function SubStepper({
  subStepper,
  // belowGreySpaceNotRequired,
  marginLeft,
}: SubStepperProps) {
  return (
    <Grid container direction="column" className="subStepper-styles">
      <Grid item container direction="row" display="flex">
        {subStepper.map((subStepperItem, i) => {
          return (
            <Grid
              key={Math.random()}
              item
              height="2.7rem"
              textAlign="center"
              mt={2.2}
              fontFamily="poppins"
              fontSize="0.93rem"
              fontWeight="540"
              justifyContent="space-between"
              ml={3}
            >
              <Grid container mr={1.8} spacing={1}>
                <Grid item sx={{ color: "#939598" }} mt={0.3}>
                  <Typography variant="subtitle2">
                    {subStepperItem.title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid item textAlign="center">
                    {subStepperItem.value}
                    {i + 1 !== subStepper.length && (
                      <span
                        style={{
                          marginLeft,
                          color: "#ccc",
                        }}
                      >
                        |
                      </span>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )
        })}
      </Grid>
      {/* {!belowGreySpaceNotRequired && (
        <Grid item height="15px" style={{ backgroundColor: "#f2f2f2" }} />
      )} */}
    </Grid>
  )
}

SubStepper.defaultProps = {
  // belowGreySpaceNotRequired: false,
  marginLeft: "1.8rem",
}
export default SubStepper
