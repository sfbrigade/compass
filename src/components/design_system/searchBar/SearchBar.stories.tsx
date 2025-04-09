import type { Meta, StoryObj } from "@storybook/react";

import SearchBar from "./SearchBar";

const meta: Meta<typeof SearchBar> = {
  title: "Components/Design System/Search",
  component: SearchBar,
};
export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Primary: Story = {
  args: {},
};
