import type { Meta, StoryObj } from "@storybook/react";

import DropdownMenu from "./DropdownMenu";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/Design System/Dropdown Menu",
  component: DropdownMenu,
  decorators: [
    (Story) => (
      <>
        <div id="anchor">
          <Story />
        </div>
        <div style={{ height: "8rem" }}></div>
      </>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Unselected: Story = {
  args: {
    anchorEl: () => document.getElementById("anchor") as Element,
    backdropDisabled: true,
    open: true,
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
  },
};
