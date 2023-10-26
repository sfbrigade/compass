import { trpc } from "@/client/lib/trpc";
import EditStudentTable from "@/components/editStudentTable/EditStudentTable";
import $button from "@/styles/Button.module.css";
import $home from "@/styles/Home.module.css";
import $input from "@/styles/Input.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import { addYears, format, parseISO, subDays } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Iep from "../../components/iep/Iep";
import noGoals from "../../public/img/no-goals-icon.png";
import $Form from "../../styles/Form.module.css";
import $Image from "../../styles/Image.module.css";
import $Modal from "../../styles/Modal.module.css";
import $StudentPage from "../../styles/StudentPage.module.css";

const ViewStudentPage = () => {
  const [createIepModal, setCreateIepModal] = useState(false);
  const [archivePrompt, setArchivePrompt] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [viewState, setViewState] = useState(0);

  const utils = trpc.useContext();
  const router = useRouter();
  const { student_id } = router.query;

  const VIEW_STATES = { MAIN: 0, EDIT: 1 };

  const handleEditState = () => {
    setViewState(VIEW_STATES.EDIT);
  };

  const handleMainState = () => {
    setViewState(VIEW_STATES.MAIN);
  };

  const { data: student, isLoading } = trpc.student.getStudentById.useQuery(
    { student_id: student_id as string },
    { enabled: Boolean(student_id) }
  );

  const buttonSX = {
    "&:hover": {
      background: "#5347d7",
    },
  };

  const [firstName, setFirstName] = useState(student?.first_name || "");
  const [lastName, setLastName] = useState(student?.last_name || "");
  const [email, setEmail] = useState(student?.email || "");
  const [grade, setGrade] = useState(student?.grade || 0);

  const { data: activeIep } = trpc.student.getActiveStudentIep.useQuery(
    { student_id: student_id as string },
    { enabled: Boolean(student_id) }
  );

  const editMutation = trpc.case_manager.editStudent.useMutation();

  const handleEditStudent = async () => {
    if (!student) {
      return; // TODO: improve error handling
    }
    await editMutation.mutateAsync({
      student_id: student.student_id,
      first_name: firstName,
      last_name: lastName,
      email: email,
      grade: grade,
    });
    handleMainState();
    document.location.reload();
  };

  const archiveMutation = trpc.case_manager.removeStudent.useMutation();

  const handleArchiveStudent = async () => {
    if (!student) {
      return;
    }
    await archiveMutation.mutateAsync({ student_id: student.student_id });
    await router.push(`/students`);
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

  return (
    <Stack spacing={2}>
      <Container className={$StudentPage.studentInfoContainer}>
        <Box className={$StudentPage.displayBox}>
          <p className={$StudentPage.studentName}>
            {student?.first_name} {student?.last_name}
          </p>

          {/* Edit button only to be shown when view state is set to MAIN */}
          {viewState === VIEW_STATES.MAIN && (
            <Button
              className={`${$button.default} ${$home.bold}`}
              variant="outlined"
              sx={{
                color: "#5347d7",
                borderColor: "#5347d7",
                borderRadius: "8px",
                fontFamily: "Quicksand",
                fontSize: "1em",
                textTransform: "capitalize",
              }}
              onClick={handleEditState}
            >
              Edit
            </Button>
          )}

          {/* Save and Cancel buttons only to be shown when view state is set to EDIT */}
          {viewState === VIEW_STATES.EDIT && (
            <Box className={$StudentPage.displayBoxGap}>
              <Button
                onClick={handleMainState}
                className={`${$button.default} ${$home.bold}`}
                variant="outlined"
                sx={{
                  color: "#5347d7",
                  borderColor: "#5347d7",
                  borderRadius: "8px",
                  fontFamily: "Quicksand",
                  textTransform: "capitalize",
                  fontSize: "1em",
                }}
              >
                Cancel
              </Button>
              <Button
                className={`${$button.default} ${$home.bold}`}
                sx={[
                  {
                    backgroundColor: "#5347d7",
                    borderRadius: "8px",
                    border: "none",
                    color: "#ffffff",
                    fontFamily: "Quicksand",
                    textTransform: "capitalize",
                    fontSize: "1em",
                  },
                  buttonSX,
                ]}
                type="submit"
                onClick={handleEditStudent}
                variant="contained"
              >
                Save
              </Button>
            </Box>
          )}
        </Box>

        {/* if view state is "EDIT" then show the edit version of the student page */}
        {viewState === VIEW_STATES.EDIT && <h3>Edit Profile</h3>}

        {viewState === VIEW_STATES.MAIN && (
          <Box className={$StudentPage.displayBox}>
            <Box gap={10} className={$StudentPage.infoBox}>
              <div className={$StudentPage.singleInfoArea}>
                <p>Grade</p>
                <p className={$StudentPage.centerText}>{student?.grade}</p>
              </div>
              <div className={$StudentPage.singleInfoArea}>
                <p>Next IEP</p>
                <p className={$StudentPage.centerText}>
                  {activeIep?.end_date.toLocaleDateString() ?? "None"}
                </p>
              </div>
            </Box>
          </Box>
        )}
      </Container>

      {viewState === VIEW_STATES.EDIT ? (
        <Stack gap={4} sx={{ justifyContent: "center" }}>
          <Container className={$StudentPage.studentInfoContainer}>
            <Box gap={10} className={$StudentPage.infoBox}>
              <EditStudentTable
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                grade={grade}
                setGrade={setGrade}
              />
            </Box>
          </Container>
          <Container>
            <Box textAlign="center">
              <Button
                onClick={() => setArchivePrompt(true)}
                className={`${$button.default} ${$home.bold}`}
                variant="outlined"
                sx={{
                  color: "#5347d7",
                  borderColor: "#5347d7",
                  borderRadius: "8px",
                  fontFamily: "Quicksand",
                  textTransform: "capitalize",
                  fontSize: "1em",
                }}
              >
                Archive {student?.first_name} {student?.last_name}
              </Button>
            </Box>
          </Container>
        </Stack>
      ) : !activeIep ? (
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
              className={`${$button.default} ${$home.bold}`}
              onClick={() => handleArchiveStudent()}
            >
              Yes
            </button>
            <button
              className={`${$button.default} ${$home.bold}`}
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
