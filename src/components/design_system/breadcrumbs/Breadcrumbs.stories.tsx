import type { Meta, StoryObj } from "@storybook/react";

import Breadcrumbs from "./Breadcrumbs";
import type { Breadcrumb } from "./Breadcrumbs";

const meta: Meta<typeof Breadcrumbs> = {
  title: "Components/Design System/Breadcrumbs",
  component: Breadcrumbs,
};
export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

const data: Breadcrumb[] = [
  {
    href: "/students",
    children: "Students",
  },
  {
    href: "/students/:student_id",
    children: "Student Name",
  },
  {
    href: "/students/:student_id/goals/:goal_id",
    children: "Goal #1",
  },
  {
    children: "Create Benchmark",
  },
];

export const Primary: Story = {
  args: {
    data,
  },
};
