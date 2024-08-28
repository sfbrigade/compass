import type { Meta, StoryObj } from "@storybook/react";

import BreadcrumbsNav from "./Breadcrumbs";

const meta = {
  component: BreadcrumbsNav,
} satisfies Meta<typeof BreadcrumbsNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyBreadcrumbsNav: Story = {
  parameters: {
    nextjs: {
      router: {
        basePath: "",
      },
    },
  },
};

export const StudentPageBreadcrumbsNav: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: "/students/studentId",
        asPath: "/students/studentId",
      },
    },
  },
};
