import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { EditStudentModal } from "./EditStudentModal";
import { expect, userEvent, screen } from "@storybook/test";

const meta = {
  title: "Components/Student/EditStudentModal",
  component: EditStudentModal,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof EditStudentModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    open: true,
    handleClose: fn(),
    student: {
      student_id: "1",
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@school.edu",
      grade: 9,
    },
    activeIep: {
      iep_id: "1",
      start_date: new Date("2024-01-01"),
      end_date: new Date("2024-12-31"),
    },
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    setStartDate: fn(),
    onSubmit: fn(),
  },
  play: async () => {
    screen.debug(document.body);

    const firstNameInput = await screen.findByRole("textbox", {
      name: /first name/i,
    });

    await expect(firstNameInput).toBeRequired();
    await expect(firstNameInput).toHaveValue("John");

    await userEvent.clear(firstNameInput);
    await expect(firstNameInput).toBeInvalid();
  },
};
