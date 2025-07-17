import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Tab, Tabs } from "@mui/material";

const meta: Meta<typeof Tabs> = {
  title: "Components/Design System/Tabs",
  component: Tabs,
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState<number>(1);
    return (
      <Tabs
        {...args}
        value={value}
        onChange={(e, newValue) => setValue(newValue as number)}
      >
        <Tab value={1} label="Item One" />
        <Tab value={2} label="Item Two" />
        <Tab value={3} label="Item Three" />
      </Tabs>
    );
  },
};

export const Disabled: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState<number>(1);
    return (
      <Tabs
        {...args}
        value={value}
        onChange={(e, newValue) => setValue(newValue as number)}
      >
        <Tab value={1} label="Item One" disabled />
      </Tabs>
    );
  },
};
