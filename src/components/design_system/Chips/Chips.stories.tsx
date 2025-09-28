// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from "@storybook/react";

import Chips from "./Chips";

const meta = {
  title: "Components/Design System/Chips",
  component: Chips,
} satisfies Meta<typeof Chips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const primary: Story = {
  args: {
    color: "primary",
    size: "medium",
    label: "Primary Chip",
  },
};

export const empty: Story = {
  args: {
    color: "default",
    size: "medium",
    label: "Primary Chip",
    sx: {
      border: "1px solid",
      borderColor: "Primary",
    },
  },
};
