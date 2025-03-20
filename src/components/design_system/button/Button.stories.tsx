import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Design System/Button",
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Button",
    type: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Button",
    type: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    children: "Button",
    type: "tertiary",
  },
};
