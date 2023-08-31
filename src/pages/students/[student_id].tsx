import { useState } from "react";
import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import Link from "next/link";
import $home from "@/styles/Home.module.css";
import $button from "@/styles/Button.module.css";
import $input from "@/styles/Input.module.css";
import Iep from "../../components/Iep";
import { Box, Button, Container, Stack } from "@mui/material";

const ViewStudentPage = () => {
  const [archivePrompt, setArchivePrompt] = useState(false);
  const [createIepModal, setCreateIepModal] = useState(false);
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
        {/* <Stack> */}
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
            {activeIep && (
              <Stack
                spacing={1}
                sx={{
                  padding: "1rem",
                }}
              >
                <div>IEP End Date:</div>{" "}
                <div style={{ alignSelf: "center" }}>
                  {new Date(activeIep.end_date ?? "").toLocaleDateString()}
                </div>
              </Stack>
            )}
          </Box>

          {/* // TODO: Extract 'Archive Student' to 'Edit' and 'Return to Student List' somewhere */}
          <Box
            sx={{ padding: "1rem", display: "flex", alignItems: "flex-start" }}
          >
            <button
              className={`${$button.default} ${$home.bold} `}
              onClick={() => setArchivePrompt(true)}
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
        {/* </Stack> */}
      </Container>

      {archivePrompt ? (
        <div>
          <p>
            Are you sure you want to archive {student?.first_name}&nbsp;
            {student?.last_name}?
          </p>
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
        </div>
      ) : null}
      <br />
      <br />

      {/*//? If no active IEP, prompt cm to create one  */}
      {!activeIep?.is_active ? (
        <>
          <h3>This student does not have an active IEP. Please create one.</h3>
          <button
            onClick={() => setCreateIepModal(true)}
            className={$button.default}
          >
            Create IEP
          </button>
          {createIepModal && (
            <>
              <div>Create IEP:</div>
              <div>
                <form onSubmit={handleIepSubmit} className={$input.default}>
                  <input
                    type="date"
                    name="start_date"
                    placeholder="IEP start date"
                    required
                  />
                  <input
                    type="date"
                    name="end_date"
                    placeholder="IEP end date"
                    required
                  />
                  <button type="submit" className={$button.default}>
                    Create IEP
                  </button>
                  <button
                    onClick={() => setCreateIepModal(false)}
                    className={$button.default}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </>
          )}
        </>
      ) : (
        <Container sx={{ backgroundColor: "#ffffff", borderRadius: "10px" }}>
          <div>
            <Iep iep_id={activeIep.iep_id} />
          </div>
        </Container>
      )}
    </div>
  );
};

export default ViewStudentPage;
