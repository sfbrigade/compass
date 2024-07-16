import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TripOriginRoundedIcon from "@mui/icons-material/TripOriginRounded";

const Settings = () => {
  // TODO? make sure settings displayed reflect the specific logged-in user

  const currentStep = 1;
  const steps = ["Completed", "Active", "Disabled"];

  return (
    <div>
      <p>🚧 Under Construction! 🚧</p>
      <br />
      <p>Demonstration of Stepper</p>
      <p>{`(to be deleted later)`}</p>
      <br />

      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={currentStep} alternativeLabel connector={null}>
          {steps.map((label, index) => (
            <Step key={label}>
              {index !== steps.length && (
                <StepLabel
                  StepIconComponent={
                    index < currentStep
                      ? CheckCircleIcon
                      : TripOriginRoundedIcon
                  }
                >
                  {label}
                </StepLabel>
              )}
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
};

export default Settings;
