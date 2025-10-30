import type { Meta, StoryObj } from "@storybook/react";

import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";

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

export const PrimaryWithIcon: Story = {
  args: {
    children: "Button",
    size: "large",
    variant: "primary",
    startIcon: <ContentPasteOutlinedIcon fontSize="medium" />,
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    children: "Button",
    size: "large",
    variant: "secondary",
    startIcon: <ContentPasteOutlinedIcon fontSize="medium" />,
  },
};

export const TertiaryWithIcon: Story = {
  args: {
    children: "Button",
    size: "large",
    variant: "tertiary",
    startIcon: <ContentPasteOutlinedIcon fontSize="medium" />,
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

export const PrimarySmallWithIcon: Story = {
  args: {
    children: "Button",
    size: "small",
    variant: "primary",
    startIcon: <ContentPasteOutlinedIcon fontSize="medium" />,
  },
};

export const SecondarySmallWithIcon: Story = {
  args: {
    children: "Button",
    size: "small",
    variant: "secondary",
    startIcon: <ContentPasteOutlinedIcon fontSize="medium" />,
  },
};

export const TertiarySmallWithIcon: Story = {
  args: {
    children: "Button",
    size: "small",
    variant: "tertiary",
    startIcon: <ContentPasteOutlinedIcon fontSize="medium" />,
  },
};
