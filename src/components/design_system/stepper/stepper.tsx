import { CheckCircle, TripOriginRounded } from "@mui/icons-material";
import { Step, StepLabel, Stepper, StepIconProps } from "@mui/material";

export const BenchmarkStepperIcon = (stepIconProps: StepIconProps) => {
  const { completed = false } = stepIconProps;

  if (completed) {
    return <CheckCircle />;
  } else {
    return <TripOriginRounded />;
  }
};

export interface BenchmarkStepperProps {
  activeStep?: number;
  steps: string[];
}

const BenchmarkStepper = ({ activeStep, steps }: BenchmarkStepperProps) => {
  return (
    <Stepper activeStep={activeStep} alternativeLabel connector={null}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={BenchmarkStepperIcon}>
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
export default BenchmarkStepper;
