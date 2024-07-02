import type { Meta, StoryObj } from "@storybook/react";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

/*
const meta: Meta<typeof List> = {
  component: List,
  subcomponents: { ListItem }, //👈 Adds the ListItem component as a subcomponent
};
export default meta;
*/

/*
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
*/
// : Meta<typeof Stepper>
const meta = {
  title: "Components/MuiStepper",
  component: Stepper,
  subcomponents: { Step }, //👈 Adds the ListItem component as a subcomponent
  args: {
    key: "foo",
  },
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    //layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    //backgroundColor: { control: "color" },
  },
};
// satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    activeStep: 1,
    alternativeLabel: true,
    connector: null,
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
/*
export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};

export const Warning: Story = {
  args: {
    primary: true,
    label: "Delete now",
    backgroundColor: "red",
  },
};
*/
