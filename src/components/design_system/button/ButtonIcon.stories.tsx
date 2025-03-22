import type { Meta, StoryObj } from "@storybook/react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

import ButtonIcon from "./ButtonIcon";

const meta: Meta<typeof ButtonIcon> = {
  title: "Components/Design System/Button Icon",
  component: ButtonIcon,
};
export default meta;

type Story = StoryObj<typeof ButtonIcon>;

export const Primary: Story = {
  args: {
    children: <AccessAlarmIcon />,
  },
};
