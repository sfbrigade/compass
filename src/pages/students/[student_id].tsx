import { trpc } from "@/client/lib/trpc";
import $button from "@/styles/Button.module.css";
import $home from "@/styles/Home.module.css";
import $input from "@/styles/Input.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Iep from "../../components/iep/Iep";
import noGoals from "../../public/img/no-goals-icon.png";
import $Form from "../../styles/Form.module.css";
import $Modal from "../../styles/Modal.module.css";
import $StudentPage from "../../styles/StudentPage.module.css";
import $Image from "../../styles/Image.module.css";
import IepDateInput from "@/components/iep/IepDateInput";

const ViewStudentPage = () => {
  const [createIepModal, setCreateIepModal] = useState(false);
  const [archivePrompt, setArchivePrompt] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const utils = trpc.useContext();
  const router = useRouter();
  const { student_id } = router.query;

  const { data: student, isLoading } = trpc.student.getStudentById.useQuery(
    { student_id: student_id as string },
    { enabled: Boolean(student_id) }
  );

  const { data: activeIep } = trpc.student.getActiveStudentIep.useQuery(
    { student_id: student_id as string },
    { enabled: Boolean(student_id) }
  );

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

  const handleIepStartDateChange = (date: string) => {
    setStartDate(date);
    const futureDate = new Date(date);
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    futureDate.setDate(futureDate.getDate() - 1);
    const formattedEndDate = futureDate.toISOString().substring(0, 10); // Get YYYY-MM-DD parts of new date
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
      start_date: new Date(data.get("start_date") as string),
      end_date: new Date(data.get("end_date") as string),
    });

    setCreateIepModal(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container className={$StudentPage.studentInfoContainer}>
        <Box className={$StudentPage.displayBox}>
          <p className={$StudentPage.studentName}>
            {student?.first_name} {student?.last_name}
          </p>
          {/* //Todo: Modify Edit Button */}
          <Button variant="outlined">Edit</Button>
        </Box>

        <Box className={$StudentPage.displayBox}>
          <Box className={$StudentPage.infoBox}>
            <div className={$StudentPage.singleInfoArea}>
              <p>Grade:</p>
              <p className={$StudentPage.centerText}>{student?.grade}</p>
            </div>
            <div className={$StudentPage.singleInfoArea}>
              <p>IEP End Date:</p>
              <p className={$StudentPage.centerText}>
                {activeIep?.end_date.toLocaleDateString() ?? "None"}
              </p>
            </div>
          </Box>

          {/* // TODO: Extract 'Archive Student' to 'Edit' and 'Return to Student List' somewhere */}
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <button
              onClick={() => setArchivePrompt(true)}
              className={`${$button.default} ${$home.bold}`}
            >
              Archive Student
            </button>
            <Link
              href={`/students`}
              className={`${$button.default} ${$home.bold}`}
              style={{ marginLeft: "10px" }}
            >
              Return to Student List
            </Link>
          </Box>
        </Box>
      </Container>

      {/* If no IEP, prompt CM to create one  */}
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

      {/* Archiving Student Modal*/}
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
                <IepDateInput
                  name="start_date"
                  value={startDate}
                  placeholder="IEP start date"
                  onChange={handleIepStartDateChange}
                />
              </Box>
              <Box className={$StudentPage.displayBox}>
                <p className={$StudentPage.textLarge}>End Date:</p>
                <IepDateInput
                  name="end_date"
                  value={endDate}
                  placeholder="IEP end date"
                  onChange={setEndDate}
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
    </div>
  );
};

export default ViewStudentPage;
