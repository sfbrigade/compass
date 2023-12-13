import { useState } from "react";
import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import $home from "@/styles/Home.module.css";
import $button from "@/components/button/Button.module.css";
import $StaffPage from "../../styles/StaffPage.module.css";
import $Modal from "../../styles/Modal.module.css";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";

const ViewParaPage = () => {
  const [archiveParaPrompt, setArchiveParaPrompt] = useState(false);
  const [viewState, setViewState] = useState(0);

  const utils = trpc.useContext();
  const router = useRouter();
  const { user_id } = router.query;
  const { data: me } = trpc.user.getMe.useQuery();

  const VIEW_STATES = { MAIN: 0, EDIT: 1 };

  const handleEditState = () => {
    setViewState(VIEW_STATES.EDIT);
  };

  const handleMainState = () => {
    setViewState(VIEW_STATES.MAIN);
  };

  const { data: para, isLoading } = trpc.para.getParaById.useQuery(
    { user_id: user_id as string },
    {
      enabled: Boolean(user_id),
      retry: false,
      onError: () => returnToStaffList(),
    }
  );

  const buttonSX = {
    "&:hover": {
      background: "#3023B8",
    },
  };

  const editMutation = trpc.case_manager.editPara.useMutation({
    onSuccess: () => utils.para.getParaById.invalidate(),
  });

  const handleEditPara = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (!para) {
      return; // TODO: improve error handling
    }
    await editMutation.mutateAsync({
      para_id: para.user_id,
      first_name: data.get("firstName") as string,
      last_name: data.get("lastName") as string,
      email: data.get("email") as string,
    });
    handleMainState();
  };

  const archivePara = trpc.case_manager.removePara.useMutation({
    onError: (error) => console.log(error.message),
  });

  const returnToStaffList = async () => {
    await router.push(`/staff`);
  };

  const handleArchivePara = async () => {
    if (!para) return;
    if (para.user_id === me?.user_id) alert("You cannot archive yourself!");

    await archivePara.mutateAsync({ para_id: para.user_id });
    await router.push(`/staff`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!para) return;

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
      <Container
        className={$StaffPage.staffInfoContainer}
        sx={{ marginBottom: "1rem" }}
      >
        <Box className={$StaffPage.displayBox}>
          <p className={$StaffPage.staffName}>
            {para?.first_name} {para?.last_name}
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
            <Box className={$StaffPage.displayBoxGap}>
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
                form="edit"
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
          <Box className={$StaffPage.displayBox}>
            <Box gap={10} className={$StaffPage.infoBox}>
              <div className={$StaffPage.singleInfoArea}>
                <p>Email</p>
                <p className={$StaffPage.centerText}>{para?.email}</p>
              </div>
              <div className={$StaffPage.singleInfoArea}></div>
            </Box>
          </Box>
        )}
      </Container>

      {viewState === VIEW_STATES.EDIT && (
        <Stack gap={0.5} sx={{ width: "100%" }}>
          <form
            className={$StaffPage.editForm}
            id="edit"
            onSubmit={handleEditPara}
          >
            <Stack gap={0.5}>
              <Container
                className={$StaffPage.staffEditContainer}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "200px 30px 300px",
                }}
              >
                <label>First Name</label>
                <p>:</p>
                <input
                  type="text"
                  name="firstName"
                  defaultValue={para?.first_name || ""}
                  required
                />
              </Container>
              <Container
                className={$StaffPage.staffEditContainer}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "200px 30px 300px",
                }}
              >
                <label>Last Name</label>
                <p>:</p>
                <input
                  type="text"
                  name="lastName"
                  defaultValue={para?.last_name || ""}
                  required
                />
              </Container>
              <Container
                className={$StaffPage.staffEditContainer}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "200px 30px 300px",
                }}
              >
                <label>Email</label>
                <p>:</p>
                <input
                  type="text"
                  name="email"
                  defaultValue={para?.email || ""}
                  required
                />
              </Container>
            </Stack>
          </form>

          <Container sx={{ marginTop: "2rem" }}>
            <Box textAlign="center">
              <Button
                onClick={() => setArchiveParaPrompt(true)}
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
                Archive {para?.first_name} {para?.last_name}
              </Button>
            </Box>
          </Container>
        </Stack>
      )}

      {/* Archiving Staff Modal appears when "Archive" button is pressed*/}
      <Modal
        open={archiveParaPrompt}
        onClose={() => setArchiveParaPrompt(false)}
        aria-labelledby="archiving-student"
        aria-describedby="archiving-current-student"
      >
        <Box className={$Modal.modalContent}>
          <p className={$StaffPage.centerText}>
            Are you sure you want to archive
          </p>
          <p className={$StaffPage.centerText}>
            <b>
              {para?.first_name} {para?.last_name}
            </b>
          </p>
          <Box className={$StaffPage.archiveOptions}>
            <button
              className={`${$button.default} ${$home.bold}`}
              onClick={() => handleArchivePara()}
            >
              Yes
            </button>
            <button
              className={`${$button.default} ${$home.bold}`}
              onClick={() => setArchiveParaPrompt(false)}
            >
              No
            </button>
          </Box>
        </Box>
      </Modal>
    </Stack>
  );
};

export default ViewParaPage;
