import type { Meta, StoryObj } from "@storybook/react";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TripOriginRoundedIcon from "@mui/icons-material/TripOriginRounded";

const meta: Meta<typeof Stepper> = {
  component: Stepper,
};
export default meta;

type Story = StoryObj<typeof Stepper>;

const steps = ["Completed", "Active", "Disabled"];

export const DemoMuiStepper: Story = {
  args: {
    activeStep: 0,
  },
  /* See here about using "render" to test multiple components:
      https://storybook.js.org/docs/writing-stories#stories-for-two-or-more-components */
  render: (args) => (
    /* Mostly copied from the demo in settings.tsx, except using "activeStep" to match Stepper's props so it can be
      exposed as in "args" to Storybook */
    <Box sx={{ width: "100%" }}>
      <Stepper {...args} alternativeLabel connector={null}>
        {steps.map((label, index) => (
          <Step key={label}>
            {index !== steps.length && (
              <StepLabel
                StepIconComponent={
                  index < (args.activeStep ?? 0)
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
  ),
};
