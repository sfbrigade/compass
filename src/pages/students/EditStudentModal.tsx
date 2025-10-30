import { FormEvent } from "react";
import { Stack, TextField } from "@mui/material";

import Dialog from "@/components/design_system/dialog/Dialog";

interface EditStudentModalProps {
  // Modal control
  open: boolean;
  handleClose: () => void;

  // Student data
  student: {
    student_id: string;
    first_name: string;
    last_name: string;
    email: string | null;
    grade: number;
  } | null;

  // IEP data (optional)
  activeIep?: {
    iep_id: string;
    start_date: Date;
    end_date: Date;
  } | null;

  // Form state for IEP dates
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;

  // Form submission
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const EditStudentModal = ({
  open,
  handleClose,
  student,
  activeIep,
  startDate,
  endDate,
  setStartDate,
  onSubmit,
}: EditStudentModalProps) => {
  return (
    <Dialog
      open={open}
      title={`Editing ${student?.first_name || "Student"}'s Profile`}
      fullScreenOnMobile
      size="xs"
      confirmLabel="Save"
      cancelLabel="Cancel"
      onConfirm={onSubmit}
      onCancel={handleClose}
    >
      <Stack spacing={3}>
        <TextField
          label="First Name"
          type="text"
          name="firstName"
          defaultValue={student?.first_name || ""}
          required
        />
        <TextField
          label="Last Name"
          type="text"
          name="lastName"
          defaultValue={student?.last_name || ""}
          required
        />
        <TextField
          label="Email"
          type="text"
          name="email"
          defaultValue={student?.email || ""}
        />
        <TextField
          label="Grade"
          type="number"
          name="grade"
          defaultValue={(student?.grade || 0).toString()}
          required
        />
        {activeIep != null && (
          <>
            <TextField
              label="IEP Start Date"
              type="date"
              name="start_date"
              defaultValue={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <TextField
              label="IEP End Date"
              type="date"
              name="end_date"
              defaultValue={endDate}
              inputProps={{ min: startDate }}
              required
            />
          </>
        )}
      </Stack>
    </Dialog>
  );
};
