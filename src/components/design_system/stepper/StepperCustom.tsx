import { SxProps, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AdjustIcon from "@mui/icons-material/Adjust";

const steps = ["Completed", "Active", "Disabled"];

/*
const InvisibleConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.root}`]: {
    display: "none",
  },
  [`& .${stepConnectorClasses.line}`]: {
    display: "none",
  },
}));
*/

/*
const PreAboveConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.root}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));
*/

/*
const sxPropCSS = {
  backgroundColor: 'lightgreen',
  [theme.breakpoints.up('xs')]: {
    backgroundColor: 'orange',
  },
}
*/

/*
colors

not started
text gray 20 #2A333C
icon gray 50 #A2ACB3
line gray 50 #A2ACB3

in progress
text gray 20 #2A333C
icon primary 20 #9B93F1
line primary 20 #9B93F1

complete
text primary 50 #3023B8
icon primary 50 #3023B8
line primary 50 #3023B8
*/
const currentStep = 1;

export default function HorizontalLinearAlternativeLabelStepper() {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={currentStep} alternativeLabel connector={null}>
        {steps.map((label, index) => (
          <Step key={label}>
            {index !== steps.length && (
              <StepLabel
                StepIconComponent={
                  index < currentStep ? CheckCircleIcon : AdjustIcon
                }
                sx={(theme) => ({
                  /*"&:after": {
                    content: `"index, currentStep: ${
                      index + "," + currentStep
                    }"`,
                    position: "absolute",
                  },*/
                  "& .MuiStepLabel-iconContainer": {
                    //backgroundColor: "pink",
                    "&.Mui-disabled": {
                      color: "#A2ACB3",
                    },
                    "&.Mui-active": {
                      color: "#9B93F1",
                    },
                    "&.Mui-completed": {
                      color: "#3023B8",
                    },
                  },
                  "& .MuiStepLabel-label": {
                    "&.Mui-disabled": {
                      color: "#2A333C",
                      borderTop: `4px solid #A2ACB3`,
                    },
                    "&.Mui-active": {
                      color: "#2A333C",
                      borderTop: `4px solid ${theme.palette.primary.light}`,
                    },
                    "&.Mui-completed": {
                      color: "#3023B8",
                      borderTop: `4px solid ${theme.palette.primary.main}`,
                    },
                  },
                })}
              >
                {label}
              </StepLabel>
            )}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
