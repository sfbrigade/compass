import type { Meta, StoryObj } from "@storybook/react";

import FilterChip from "./FilterChip";

const meta: Meta<typeof FilterChip> = {
  title: "Components/Design System/Filter Chip",
  component: FilterChip,
};
export default meta;

type Story = StoryObj<typeof FilterChip>;

export const Primary: Story = {
  args: {
    label: "Filter Chip",
  },
};
