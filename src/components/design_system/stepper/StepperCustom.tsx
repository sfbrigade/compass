import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const steps = ["Instructional guidlines", "Data collection guidelines", ""];

export default function HorizontalLinearAlternativeLabelStepper() {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            {index !== steps.length && (
              <StepLabel StepIconComponent={CheckCircleIcon}>{label}</StepLabel>
            )}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
