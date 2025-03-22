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
    size: "large",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Button",
    size: "large",
    variant: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    children: "Button",
    size: "large",
    variant: "tertiary",
  },
};

export const PrimarySmall: Story = {
  args: {
    children: "Button",
    size: "small",
    variant: "primary",
  },
};

export const SecondarySmall: Story = {
  args: {
    children: "Button",
    size: "small",
    variant: "secondary",
  },
};

export const TertiarySmall: Story = {
  args: {
    children: "Button",
    size: "small",
    variant: "tertiary",
  },
};
