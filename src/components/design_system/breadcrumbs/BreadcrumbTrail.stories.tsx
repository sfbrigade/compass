import type { Meta, StoryObj } from "@storybook/react";

import BreadcrumbTrail from "./BreadcrumbTrail";
import { Student } from "../../breadcrumbs/StatefulBreadcrumbTrailContext";

const meta = {
  component: BreadcrumbTrail,
} satisfies Meta<typeof BreadcrumbTrail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyBreadcrumbTrail: Story = {
  args: {
    fullPath: "/",
    contextData: undefined,
  },
};

export const StudentPageBreadcrumbTrail: Story = {
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

export const GoalPageBreadcrumbTrail: Story = {
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
