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
    label: "Primary Chip",
    variant: "primary",
  },
};

export const Empty: Story = {
  args: {
    label: "0%",
    variant: "secondary",
  },
};

export const Calendar: Story = {
  args: {
    label: "Oct 21st 2023",
    variant: "calendar",
  },
};

export const Task_Chip: Story = {
  args: {
    label: "1",
    variant: "task",
  },
};
