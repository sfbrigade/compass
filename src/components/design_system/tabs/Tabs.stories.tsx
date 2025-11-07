import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Box, Stack, Tab, Tabs } from "@mui/material";
import Button from "../button/Button";

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
      <Box bgcolor="var(--grey-90)" p={2}>
        <Tabs
          {...args}
          value={value}
          onChange={(e, newValue) => setValue(newValue as number)}
        >
          <Tab value={1} label="Item One" />
          <Tab value={2} label="Item Two" />
          <Tab value={3} label="Item Three" />
        </Tabs>
      </Box>
    );
  },
};

export const PrimaryWithButton: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState<number>(1);
    return (
      <Stack
        direction="row"
        bgcolor="var(--grey-90)"
        p={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Tabs
          {...args}
          value={value}
          onChange={(e, newValue) => setValue(newValue as number)}
        >
          <Tab value={1} label="Item One" />
          <Tab value={2} label="Item Two" />
          <Tab value={3} label="Item Three" />
        </Tabs>
        <Button variant="primary">Action</Button>
      </Stack>
    );
  },
};

export const Disabled: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState<number>(1);
    return (
      <Box bgcolor="var(--grey-90)" p={2}>
        <Tabs
          {...args}
          value={value}
          onChange={(e, newValue) => setValue(newValue as number)}
        >
          <Tab value={1} label="Item One" disabled />
        </Tabs>
      </Box>
    );
  },
};
