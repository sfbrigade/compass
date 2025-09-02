import type { Meta, StoryObj } from "@storybook/react";

import Dialog from "./Dialog";

const meta: Meta<typeof Dialog> = {
  title: "Components/Design System/Dialog",
  component: Dialog,
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    open: true,
    size: "sm",
    title: "Dialog Test",
    children: <p style={{ width: "100%" }}>Testing, testing testing</p>,
    cancelLabel: "Cancel",
    confirmLabel: "Save",
    fullScreenOnMobile: true,
  },
};
