// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from "@storybook/react";

import Chip from "./Chip";

const meta = {
  title: "Components/Design System/Chips",
  component: Chip,
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: "primary",
    size: "medium",
    label: "Primary Chip",
    variant: "filled",
  },
};

export const Empty: Story = {
  args: {
    color: "default",
    size: "medium",
    label: "Primary Chip",
    variant: "outlined",
    sx: {
      border: "1px solid",
      borderColor: "Primary",
    },
  },
};
