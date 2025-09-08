import { AppBar, Toolbar, styled, Typography } from "@mui/material"
import { ReactNode } from "react"
import ProgressStepper from "app/components/zamtel-ui/stepper/ProgressStepper.tsx"
// import ProgressStepper from "../Stepper/ProgressStepper"

const CustomAppbar = styled(AppBar)({
  width: "100%",
  borderRadius: "9px",
  // height: "50px",
  display: "flex",
  justifyContent: "center",
})

const CustomToolbar = styled(Toolbar)({
  display: "flex",
  position: "relative",
  width: "100%",
  borderRadius: "6px",
})

const CustomToolbar2 = styled(Toolbar)({
  display: "flex",
  width: "100%",
  height: "20px",
  minHeight: "20px",
  background: "#F2F2F2",
})

type TProps = {
  isHeaderText: string
  headerSteps: string[]
  activeStep: number
  stepperWidth: number
  isStepperEndComponent?: boolean
  StepperEndComponent?: ReactNode
  isSuccessPage: boolean
  hideStepper?: boolean
}
function ElevateAppbar({
  headerSteps,
  activeStep,
  stepperWidth,
  isHeaderText,
  isSuccessPage,
  isStepperEndComponent,
  StepperEndComponent,
  hideStepper,
}: TProps) {
  return (
    <>
      <CustomAppbar position="sticky" color="secondary" elevation={0}>
        {isHeaderText !== "" ? (
          <Typography
            pt={2.5}
            pl={4.2}
            pb={hideStepper ? 2.5 : 4}
            variant="body2"
          >
            {isHeaderText}
          </Typography>
        ) : null}
        {!hideStepper && (
          <CustomToolbar variant="regular">
            <ProgressStepper
              steps={headerSteps}
              activeStep={isSuccessPage ? headerSteps.length + 1 : activeStep}
              xs={stepperWidth}
              isStepperEndComponent={isStepperEndComponent}
              StepperEndComponent={StepperEndComponent}
            />
          </CustomToolbar>
        )}
      </CustomAppbar>
      <CustomToolbar2 variant="dense" />
    </>
  )
}

ElevateAppbar.defaultProps = {
  isStepperEndComponent: false,
  StepperEndComponent: null,
  hideStepper: false,
}

export default ElevateAppbar
