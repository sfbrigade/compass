import type { Meta, StoryObj } from "@storybook/react";

import FilterChip from "./FilterChip";

const meta: Meta<typeof FilterChip> = {
  title: "Components/Design System/Filter Chip",
  component: FilterChip,
};
export default meta;

type Story = StoryObj<typeof FilterChip>;

export const Unselected: Story = {
  args: {
    label: "Filter Chip",
  },
};

export const UnselectedDisabled: Story = {
  args: {
    disabled: true,
    label: "Filter Chip",
  },
};

export const Selected: Story = {
  args: {
    label: "Filter Chip",
    selected: true,
  },
};

export const SelectedDisabled: Story = {
  args: {
    disabled: true,
    label: "Filter Chip",
    selected: true,
  },
};

export const UnselectedDropDown: Story = {
  args: {
    label: "Filter Chip",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3 With Longer Label", value: "option3" },
    ],
  },
};

export const UnselectedDropDownDisabled: Story = {
  args: {
    disabled: true,
    label: "Filter Chip",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3 With Longer Label", value: "option3" },
    ],
  },
};

export const SelectedDropDown: Story = {
  args: {
    label: "Filter Chip",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3 With Longer Label", value: "option3" },
    ],
    selectedValue: "option2",
  },
};

export const SelectedDropDownDisabled: Story = {
  args: {
    disabled: true,
    label: "Filter Chip",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3 With Longer Label", value: "option3" },
    ],
    selectedValue: "option2",
  },
};
