import { trpc } from "@/client/lib/trpc";
import $button from "@/styles/Button.module.css";
import $home from "@/styles/Home.module.css";
import $input from "@/styles/Input.module.css";
import {
  Box,
  Button,
  Container,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Iep from "../../components/Iep";
import noGoals from "../../public/img/no-goals-icon.png";

const modalStyle = {
  position: "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ViewStudentPage = () => {
  const [createIepModal, setCreateIepModal] = useState(false);
  const [archivePrompt, setArchivePrompt] = useState(false);

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
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container sx={{ backgroundColor: "#ffffff", borderRadius: "10px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem",
          }}
        >
          <h1>
            {student?.first_name} {student?.last_name}
          </h1>
          <Button variant="outlined">Edit</Button>
        </Box>

        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Stack
              spacing={1}
              sx={{
                padding: "1rem",
              }}
            >
              <div>Grade:</div>
              <div style={{ alignSelf: "center" }}>{student?.grade}</div>
            </Stack>
            <Stack
              spacing={1}
              sx={{
                padding: "1rem",
              }}
            >
              <div>IEP End Date:</div>{" "}
              <div style={{ alignSelf: "center" }}>
                {activeIep ? (
                  <>{new Date(activeIep.end_date ?? "").toLocaleDateString()}</>
                ) : (
                  <>None</>
                )}
              </div>
            </Stack>
          </Box>

          {/* // TODO: Extract 'Archive Student' to 'Edit' and 'Return to Student List' somewhere */}
          <Box
            sx={{ padding: "1rem", display: "flex", alignItems: "flex-start" }}
          >
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

      {/* If no active IEP, prompt CM to create one  */}
      {!activeIep?.is_active ? (
        <Container
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            marginTop: "2rem",
            height: "620px",
          }}
        >
          <Box
            sx={{
              position: "relative",
              top: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              src={noGoals}
              alt="no IEP image"
              style={{ width: "600px", height: "auto" }}
            />
            <h3 style={{ marginBottom: "1rem" }}>
              This student does not have an active IEP. Please create one.
            </h3>
            <button
              onClick={() => setCreateIepModal(true)}
              className={`${$button.default}`}
              style={{ width: "fit-content", alignSelf: "center" }}
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
        <Box sx={modalStyle}>
          <Typography id="archiving-student" variant="h6" component="h2">
            Are you sure you want to archive {student?.first_name}{" "}
            {student?.last_name}?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              paddingTop: "2rem",
            }}
          >
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
        <Box sx={modalStyle}>
          <Typography id="create-student-iep" variant="h6" component="h2">
            Create an IEP for{" "}
            <b>
              {student?.first_name} {student?.last_name}
            </b>
          </Typography>
          <form
            onSubmit={handleIepSubmit}
            className={$input.default}
            style={{ marginTop: "2rem", padding: "1rem" }}
          >
            <Stack spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "larger" }}>Start Date:</Typography>
                <input
                  type="date"
                  name="start_date"
                  placeholder="IEP start date"
                  required
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "larger" }}>End Date:</Typography>
                <input
                  type="date"
                  name="end_date"
                  placeholder="IEP end date"
                  required
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewStudentPage;
