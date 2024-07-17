import { trpc } from "@/client/lib/trpc";
import { Box, Button, Container, Modal, Stack, TextField } from "@mui/material";
import { addYears, format, parseISO, subDays } from "date-fns";
import { useRouter } from "next/router";
import { useState } from "react";
import Iep from "../../components/iep/Iep";
import noGoals from "../../public/img/no-goals-icon.png";
import Image from "next/image";
import $Image from "../../styles/Image.module.css";
import $button from "@/components/design_system/button/Button.module.css";
import $Form from "../../styles/Form.module.css";
import $input from "@/styles/Input.module.css";
import $Modal from "@/components/design_system/modal/Modal.module.css";
import $StudentPage from "../../styles/StudentPage.module.css";

import * as React from "react";
import Typography from "@mui/material/Typography";

const ViewStudentPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [createIepModal, setCreateIepModal] = useState(false);
  const [archivePrompt, setArchivePrompt] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const utils = trpc.useContext();
  const router = useRouter();
  const { student_id } = router.query;

  const handleEditState = () => {
    handleOpen();

    if (activeIep) {
      // * Populates the Edit form with iep startDate and endDate
      setStartDate(activeIep.start_date.toISOString().slice(0, 10));
      setEndDate(activeIep.end_date.toISOString().slice(0, 10));
    }
  };

  const handleMainState = () => {
    handleClose();
  };

  const { data: student, isLoading } = trpc.student.getStudentById.useQuery(
    { student_id: student_id as string },
    {
      enabled: Boolean(student_id),
      retry: false,
      onError: () => returnToStudentList(),
    }
  );

  const returnToStudentList = async () => {
    await router.push(`/students`);
  };

  const { data: activeIep } = trpc.student.getActiveStudentIep.useQuery(
    { student_id: student_id as string },
    { enabled: Boolean(student_id), retry: false }
  );

  const editMutation = trpc.case_manager.editStudent.useMutation({
    onSuccess: () => utils.student.getStudentById.invalidate(),
  });

  const editIepMutation = trpc.student.editIep.useMutation({
    onSuccess: () => utils.student.getActiveStudentIep.invalidate(),
  });

  const handleEditStudent = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (!student) {
      return; // TODO: improve error handling
    }

    editMutation.mutate({
      student_id: student.student_id,
      first_name: data.get("firstName") as string,
      last_name: data.get("lastName") as string,
      email: data.get("email") as string,
      grade: Number(data.get("grade")) || 0,
    });

    editIepMutation.mutate({
      student_id: student.student_id,
      start_date: new Date(parseISO(data.get("start_date") as string)),
      end_date: new Date(parseISO(data.get("end_date") as string)),
    });

    handleMainState();
  };

  const archiveMutation = trpc.case_manager.removeStudent.useMutation();

  const handleArchiveStudent = async () => {
    if (!student) {
      return;
    }
    await archiveMutation.mutateAsync({ student_id: student.student_id });
    await returnToStudentList();
  };

  const iepMutation = trpc.student.addIep.useMutation({
    onSuccess: () => utils.student.getActiveStudentIep.invalidate(),
  });

  const handleAutofillIepEndDate = (date: string) => {
    //new IEP generally starts on same date annually, so end date autofills to the day before one year from start date
    setStartDate(date);
    const parsedDate: Date = parseISO(date);
    const datePlusOneYear: Date = addYears(parsedDate, 1);
    const finalDate: Date = subDays(datePlusOneYear, 1);
    const formattedEndDate: string = format(finalDate, "yyyy-MM-dd");
    setEndDate(formattedEndDate);
  };

  const handleIepSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!student) {
      return; // TODO: improve error handling
    }

    iepMutation.mutate({
      student_id: student.student_id,
      start_date: new Date(parseISO(data.get("start_date") as string)),
      end_date: new Date(parseISO(data.get("end_date") as string)),
    });

    setCreateIepModal(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!student) return;

  return (
    <Stack
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={$Modal.editModalContent}>
            <p id="modal-modal-title" className={$Modal.editModalHeader}>
              Editing {student?.first_name || "Student"}&apos;s Profile
            </p>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Stack gap={0.5} sx={{ width: "100%" }}>
                <form
                  className={$Modal.editForm}
                  id="edit"
                  onSubmit={handleEditStudent}
                >
                  <Stack gap={0.5}>
                    <Container className={$Modal.editModalContainer}>
                      <TextField
                        className={$Modal.editModalTextfield}
                        label="First Name"
                        type="text"
                        name="firstName"
                        defaultValue={student?.first_name || ""}
                        required
                      />
                    </Container>
                    <Container className={$Modal.editModalContainer}>
                      <TextField
                        className={$Modal.editModalTextfield}
                        label="Last Name"
                        type="text"
                        name="lastName"
                        defaultValue={student?.last_name || ""}
                        required
                      />
                    </Container>
                    <Container className={$Modal.editModalContainer}>
                      <TextField
                        className={$Modal.editModalTextfield}
                        label="Email"
                        type="text"
                        name="email"
                        defaultValue={student?.email || ""}
                        required
                      />
                    </Container>
                    <Container className={$Modal.editModalContainer}>
                      <TextField
                        className={$Modal.editModalTextfield}
                        label="Grade"
                        type="number"
                        name="grade"
                        defaultValue={(student?.grade || 0).toString()}
                        required
                      />
                    </Container>
                    {activeIep != null && (
                      <div>
                        <Container className={$Modal.editModalContainer}>
                          <TextField
                            className={$Modal.editModalTextfield}
                            label="IEP Start Date"
                            type="date"
                            name="start_date"
                            defaultValue={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                          />
                        </Container>
                        <Container className={$Modal.editModalContainer}>
                          <TextField
                            className={$Modal.editModalTextfield}
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

                <Container className={$Modal.editModalContainerButtons}>
                  <Box className={$Modal.editModalButtonWrap}>
                    <Button
                      onClick={handleMainState}
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
      </div>
      <Container
        className={$StudentPage.studentInfoContainer}
        sx={{ marginBottom: "1rem" }}
      >
        <Box className={$StudentPage.displayBox}>
          <p className={$StudentPage.studentName}>
            {student?.first_name} {student?.last_name}
          </p>

          <Box className={$StudentPage.displayBoxGap}>
            <Button
              onClick={() => setArchivePrompt(true)}
              className={`${$button.tertiary}`}
            >
              Archive
            </Button>
            <Button
              className={`${$button.secondary}`}
              onClick={handleEditState}
            >
              Edit
            </Button>
          </Box>
        </Box>

        <Box className={$StudentPage.displayBox}>
          <Box gap={10} className={$StudentPage.infoBox}>
            <div className={$StudentPage.singleInfoArea}>
              <p>Grade</p>
              <p className={$StudentPage.centerText}>{student?.grade}</p>
            </div>
            <div className={$StudentPage.singleInfoArea}>
              <p>IEP Start Date</p>
              <p className={$StudentPage.centerText}>
                {activeIep?.start_date.toLocaleDateString() ?? "None"}
              </p>
            </div>
            <div className={$StudentPage.singleInfoArea}>
              <p>IEP End Date</p>
              <p className={$StudentPage.centerText}>
                {activeIep?.end_date.toLocaleDateString() ?? "None"}
              </p>
            </div>
            <div className={$StudentPage.singleInfoArea}>
              <p>Email ID</p>
              <p className={$StudentPage.centerText}>{student?.email}</p>
            </div>
          </Box>
        </Box>

        {!activeIep ? (
          <Container className={$StudentPage.noIepContainer}>
            <Box className={$StudentPage.noIepBox}>
              <Image
                src={noGoals}
                alt="no IEP image"
                className={$Image.fitContent}
              />
              <p className={$StudentPage.textSpacing}>
                This student does not have an active IEP. Please create one.
              </p>
              <button
                onClick={() => setCreateIepModal(true)}
                className={`${$button.default}`}
              >
                Create IEP
              </button>
            </Box>
          </Container>
        ) : (
          // Active IEP is in db
          <Iep iep_id={activeIep.iep_id} />
        )}
      </Container>

      {/* Archiving Student Modal appears when "Archive" button is pressed*/}
      <Modal
        open={archivePrompt}
        onClose={() => setArchivePrompt(false)}
        aria-labelledby="archiving-student"
        aria-describedby="archiving-current-student"
      >
        <Box className={$Modal.modalContent}>
          <p className={$StudentPage.centerText}>
            Are you sure you want to archive
          </p>
          <p className={$StudentPage.centerText}>
            <b>
              {student?.first_name} {student?.last_name}
            </b>
          </p>
          <Box className={$StudentPage.archiveOptions}>
            <button
              className={`${$button.default}`}
              onClick={() => handleArchiveStudent()}
            >
              Yes
            </button>
            <button
              className={`${$button.default}`}
              onClick={() => setArchivePrompt(false)}
            >
              No
            </button>
          </Box>
        </Box>
      </Modal>

      {/* Modal for Creating IEP */}
      <Modal
        open={createIepModal}
        onClose={() => setCreateIepModal(false)}
        aria-labelledby="create-student-iep"
        aria-describedby="modal for creating student iep"
      >
        <Box className={$Modal.modalContent}>
          <p className={$StudentPage.centerText}>Create an IEP for</p>
          <p className={$StudentPage.centerText}>
            <b>
              {student?.first_name} {student?.last_name}
            </b>
          </p>
          <form
            onSubmit={handleIepSubmit}
            className={`${$input.default} ${$Form.formPadding}`}
          >
            <div>
              <Box className={$StudentPage.displayBox}>
                <p className={$StudentPage.textLarge}>Start Date:</p>
                <input
                  type="date"
                  name="start_date"
                  placeholder="IEP start date"
                  value={startDate}
                  onChange={(e) => {
                    handleAutofillIepEndDate(e.target.value);
                  }}
                  required
                />
              </Box>
              <Box className={$StudentPage.displayBox}>
                <p className={$StudentPage.textLarge}>End Date:</p>
                <input
                  type="date"
                  name="end_date"
                  placeholder="IEP end date"
                  value={endDate}
                  required
                />
              </Box>

              <Box className={$StudentPage.displayBox}>
                <button type="submit" className={$button.default}>
                  Create IEP
                </button>
                <button
                  onClick={() => setCreateIepModal(false)}
                  className={$button.default}
                >
                  Cancel
                </button>
              </Box>
            </div>
          </form>
        </Box>
      </Modal>
    </Stack>
  );
};

export default ViewStudentPage;
