import type { Meta, StoryObj } from "@storybook/react";

import BreadcrumbsDesign from "./Breadcrumbs";
import { Student } from "./useBreadcrumbContext";

const meta = {
  component: BreadcrumbsDesign,
} satisfies Meta<typeof BreadcrumbsDesign>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyBreadcrumbsDesign: Story = {
  args: {
    fullPath: "/",
    contextData: undefined,
  },
};

export const StudentPageBreadcrumbsDesign: Story = {
  args: {
    fullPath: "/students/student-id",
    contextData: {
      person: {
        first_name: "Alia",
        last_name: "Atreides",
      } as Student,
    },
  },
};

export const GoalPageBreadcrumbsDesign: Story = {
  args: {
    fullPath: "/students/student-id/goals/goal-id",
    contextData: {
      person: {
        first_name: "Alia",
        last_name: "Atreides",
      } as Student,
    },
  },
};
