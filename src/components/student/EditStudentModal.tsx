import { Box, Button, Container, Modal, Stack, TextField } from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import $CompassModal from "../design_system/modal/CompassModal.module.css";
import $button from "@/components/design_system/button/Button.module.css";

interface EditStudentModalProps {
  // Modal control
  open: boolean;
  handleClose: () => void;

  // Student data
  student: {
    student_id: string;
    first_name: string;
    last_name: string;
    email: string;
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
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={$CompassModal.editModalContent}>
        <p id="modal-modal-title" className={$CompassModal.editModalHeader}>
          Editing {student?.first_name || "Student"}&apos;s Profile
        </p>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} component="div">
          <Stack gap={0.5} sx={{ width: "100%" }}>
            <form
              className={$CompassModal.editForm}
              id="edit"
              onSubmit={onSubmit}
            >
              <Stack gap={0.5}>
                <Container className={$CompassModal.editModalContainer}>
                  <TextField
                    className={$CompassModal.editModalTextfield}
                    label="First Name"
                    type="text"
                    name="firstName"
                    defaultValue={student?.first_name || ""}
                    required
                  />
                </Container>
                <Container className={$CompassModal.editModalContainer}>
                  <TextField
                    className={$CompassModal.editModalTextfield}
                    label="Last Name"
                    type="text"
                    name="lastName"
                    defaultValue={student?.last_name || ""}
                    required
                  />
                </Container>
                <Container className={$CompassModal.editModalContainer}>
                  <TextField
                    className={$CompassModal.editModalTextfield}
                    label="Email"
                    type="text"
                    name="email"
                    defaultValue={student?.email || ""}
                    required
                  />
                </Container>
                <Container className={$CompassModal.editModalContainer}>
                  <TextField
                    className={$CompassModal.editModalTextfield}
                    label="Grade"
                    type="number"
                    name="grade"
                    defaultValue={(student?.grade || 0).toString()}
                    required
                  />
                </Container>
                {activeIep != null && (
                  <div>
                    <Container className={$CompassModal.editModalContainer}>
                      <TextField
                        className={$CompassModal.editModalTextfield}
                        label="IEP Start Date"
                        type="date"
                        name="start_date"
                        defaultValue={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                      />
                    </Container>
                    <Container className={$CompassModal.editModalContainer}>
                      <TextField
                        className={$CompassModal.editModalTextfield}
                        label="IEP End Date"
                        type="date"
                        name="end_date"
                        defaultValue={endDate}
                        inputProps={{ min: startDate }}
                        required
                      />
                    </Container>
                  </div>
                )}
              </Stack>
            </form>

            <Container className={$CompassModal.editModalContainerButtons}>
              <Box className={$CompassModal.editModalButtonWrap}>
                <Button
                  onClick={handleClose}
                  className={`${$button.secondary}`}
                >
                  Cancel
                </Button>
                <Button
                  className={`${$button.default}`}
                  type="submit"
                  form="edit"
                >
                  Save
                </Button>
              </Box>
            </Container>
          </Stack>
        </Typography>
      </Box>
    </Modal>
  );
};
