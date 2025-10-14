// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from "@storybook/react";

import ContentPasteIcon from "@mui/icons-material/ContentPasteOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Chip from "./Chip";

const meta = {
  title: "Components/Design System/Chips",
  component: Chip,
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const calendarChip:Story = {
//   args:{
//     className:"calandar-chip"
//   }
// }
export const Primary: Story = {
  args: {
    label: "Primary Chip",
    className: "data-chip",
  },
};

export const Empty: Story = {
  args: {
    label: "0%",
    className: "empty-chip",
  },
};

export const Calendar: Story = {
  args: {
    icon: <CalendarMonthOutlinedIcon style={{ color: "black" }} />,
    label: "Oct 21st 2023",
    className: "calendar-chip",
  },
};

export const Task_Chip: Story = {
  args: {
    icon: <ContentPasteIcon style={{ color: "black" }} />,
    label: "1",
    className: "task-chip",
  },
};

// export const DateChip:Story = {
//   args:{
//     color:"#FFFFFF",

//   }
// }
