import type { Meta, StoryObj } from "@storybook/react";

import BreadcrumbsNav from "./Breadcrumbs";

const meta = {
  component: BreadcrumbsNav,
} satisfies Meta<typeof BreadcrumbsNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultBreadcrumbsNav: Story = {
  parameters: {
    nextjs: {
      // appDirectory: true,
      router: {
        basePath: "/",
      },
    },
  },
};
