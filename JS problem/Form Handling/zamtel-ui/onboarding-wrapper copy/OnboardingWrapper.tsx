import { Container, Grid } from "@mui/material"
import { ReactElement, ReactNode } from "react"
import ElevateAppbar from "./ElevateAppbar"

type TProps = {
  isHeaderText: string
  isHeader: boolean
  headerSteps: string[]
  isBody: boolean
  isFooter: boolean
  activeStep: number
  stepperWidth: number
  BodyComponent: ReactElement
  FooterComponent: ReactElement
  isStepperEndComponent?: boolean
  StepperEndComponent?: ReactNode
  isSuccessPage: boolean
  hideStepper?: boolean
}

function OnBoardingWrapper({
  isHeaderText,
  isHeader,
  isBody,
  headerSteps,
  activeStep,
  isFooter,
  stepperWidth,
  BodyComponent,
  FooterComponent,
  isStepperEndComponent,
  StepperEndComponent,
  isSuccessPage,
  hideStepper,
}: TProps) {
  return (
    <Container
      maxWidth={false}
      style={{
        height: "100%",
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      {isHeader && (
        <ElevateAppbar
          headerSteps={headerSteps}
          activeStep={activeStep}
          stepperWidth={stepperWidth}
          isHeaderText={isHeaderText}
          isSuccessPage={isSuccessPage}
          isStepperEndComponent={isStepperEndComponent}
          StepperEndComponent={StepperEndComponent}
          hideStepper={hideStepper}
        />
      )}
      <Container
        maxWidth={false}
        style={{
          height: "86%",
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          style={{ height: "100%", flexWrap: "nowrap" }}
        >
          <Grid item>{isBody && BodyComponent}</Grid>
          <Grid item>{isFooter && FooterComponent}</Grid>
        </Grid>
      </Container>
    </Container>
  )
}

OnBoardingWrapper.defaultProps = {
  isStepperEndComponent: false,
  StepperEndComponent: null,
  hideStepper: false,
}

export default OnBoardingWrapper
