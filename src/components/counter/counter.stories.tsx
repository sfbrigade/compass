import type { Meta, StoryObj } from "@storybook/react";

import Counter from "./counter";

const meta: Meta<typeof Counter> = {
  component: Counter,
};
export default meta;

type Story = StoryObj<typeof Counter>;

export const Basic: Story = {};
