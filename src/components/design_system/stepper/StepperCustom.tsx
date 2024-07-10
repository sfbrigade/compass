import { SxProps, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TripOriginRoundedIcon from "@mui/icons-material/TripOriginRounded";

const steps = ["Completed", "Active", "Disabled"];

/*
// TODO: cross-reference colors below w/`theme.ts` and update both that file and references herein accordingly

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
          <Step
            key={label}
            sx={{
              padding: 0,
              marginRight: index < steps.length - 1 ? "16px" : 0,
              "&.Mui-disabled": {
                //TODO: broken b/c MUI does not add this className as described in MUI docs
              },
              "&.Mui-active": {
                //TODO: broken b/c MUI does not add this className as described in MUI docs
              },
              "&.Mui-completed": {
                //TODO: this works, but the others are broken b/c MUI does not add their classNames as described in MUI docs; once fixed, we can move the purple border-top styling here instead
              },
            }}
          >
            {index !== steps.length && (
              <StepLabel
                StepIconComponent={
                  index < currentStep ? CheckCircleIcon : TripOriginRoundedIcon
                }
                sx={(theme) => ({
                  /*"&:after": {
                    content: `"index, currentStep: ${
                      index + "," + currentStep
                    }"`,
                    
                  },*/
                  "& .MuiStepLabel-iconContainer": {
                    position: "absolute",
                    left: 0,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
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
                  "& .MuiStepLabel-labelContainer .MuiStepLabel-alternativeLabel":
                    {
                      marginTop: 0,
                      textAlign: "left",
                    },
                  "& .MuiStepLabel-label": {
                    marginTop: 0,
                    padding: "9px",
                    paddingLeft: "32px",
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
