import type { Meta, StoryObj } from "@storybook/react";

import BreadcrumbsDesign from "./Breadcrumbs";
import { Student } from "./usePersonData";

const meta = {
  component: BreadcrumbsDesign,
} satisfies Meta<typeof BreadcrumbsDesign>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyBreadcrumbsDesign: Story = {
  args: {
    fullPath: "/",
    personData: undefined,
  },
};

export const StudentPageBreadcrumbsDesign: Story = {
  args: {
    fullPath: "/students/studentId",
    personData: {
      first_name: "Alia",
      last_name: "Atreides",
    } as Student,
  },
};

export const GoalPageBreadcrumbsDesign: Story = {
  args: {
    fullPath: "/students/studentId/goals/goal-id",
    personData: {
      first_name: "Alia",
      last_name: "Atreides",
    } as Student,
  },
};
