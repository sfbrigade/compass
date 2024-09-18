import type { Meta, StoryObj } from "@storybook/react";

import BenchmarkStepper from "./stepper";

const meta = {
  component: BenchmarkStepper,
} satisfies Meta<typeof BenchmarkStepper>;

export default meta;

type Story = StoryObj<typeof meta>;

const STEPS = ["Instructional Guidelines", "Data Collection Guidelines"];

export const DefaultBenchmarkStepper: Story = {
  args: {
    steps: STEPS,
  },
};
