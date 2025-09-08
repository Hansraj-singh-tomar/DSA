import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import { styled } from "@mui/material/styles"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { Grid, StepIconProps, StepLabel } from "@mui/material"
import { ReactNode } from "react"

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ ownerState }) => ({
    color: "#00000061",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#4D74EF",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#009943",
      width: "14px",
      height: "14px",
    },
    "& .QontoStepIcon-circle": {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  }),
)

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <CheckCircleIcon className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  )
}

interface StepperProps {
  steps: string[]
  activeStep: number
  xs: number
  isStepperEndComponent?: boolean
  StepperEndComponent?: ReactNode
}

function ProgressStepper({
  steps,
  activeStep,
  xs = 12,
  isStepperEndComponent,
  StepperEndComponent,
}: StepperProps) {
  return (
    <Grid container alignItems="center">
      <Grid item xs={xs}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <Grid item>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Grid>
            </Step>
          ))}
        </Stepper>
      </Grid>
      {isStepperEndComponent ? (
        <Grid
          item
          xs={12 - xs}
          container
          spacing={1.5}
          justifyContent="flex-end"
        >
          {isStepperEndComponent && StepperEndComponent}
        </Grid>
      ) : null}
    </Grid>
  )
}

ProgressStepper.defaultProps = {
  isStepperEndComponent: false,
  StepperEndComponent: null,
}

export default ProgressStepper
