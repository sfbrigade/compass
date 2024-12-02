import { useState } from "react";
import { trpc } from "@/client/lib/trpc";
import {
  Box,
  Button,
  Container,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import $button from "@/components/design_system/button/Button.module.css";
import $StaffPage from "../../styles/StaffPage.module.css";
import $Modal from "@/components/design_system/modal/Modal.module.css";

const ViewParaPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //are we going to add an archive button?
  const [archiveParaPrompt, setArchiveParaPrompt] = useState(false);
  const [viewState, setViewState] = useState(0);

  const utils = trpc.useContext();
  const router = useRouter();
  const { user_id } = router.query;
  const { data: me } = trpc.user.getMe.useQuery();

  const handleEditState = () => {
    handleOpen();
  };

  const handleMainState = () => {
    handleClose();
  };

  const { data: para, isLoading } = trpc.para.getParaById.useQuery(
    { user_id: user_id as string },
    {
      enabled: Boolean(user_id),
      retry: false,
      onError: () => returnToStaffList(),
    }
  );

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
          <Box className={$StaffPage.displayBoxGap}>
            <Button
              onClick={() => setArchiveParaPrompt(true)}
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

        <Box className={$StaffPage.displayBox}>
          <Box gap={10} className={$StaffPage.infoBox}>
            <div className={$StaffPage.singleInfoArea}>
              <p>Email</p>
              <p className={$StaffPage.centerText}>{para?.email}</p>
            </div>
            <div className={$StaffPage.singleInfoArea}></div>
          </Box>
        </Box>
      </Container>

      {/* Modal for Editing Staff */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={$Modal.editModalContent}>
          <p id="modal-modal-title" className={$Modal.editModalHeader}>
            Editing {para?.first_name || "Para"}&apos;s Profile
          </p>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Stack gap={0.5} sx={{ width: "100%" }}>
              <form
                className={$Modal.editForm}
                id="edit"
                onSubmit={handleEditPara}
              >
                <Stack gap={0.5}>
                  <Container className={$Modal.editModalContainer}>
                    <TextField
                      className={$Modal.editModalTextfield}
                      label="First Name"
                      type="text"
                      name="firstName"
                      defaultValue={para?.first_name || ""}
                      required
                    />
                  </Container>
                  <Container className={$Modal.editModalContainer}>
                    <TextField
                      className={$Modal.editModalTextfield}
                      label="Last Name"
                      type="text"
                      name="lastName"
                      defaultValue={para?.last_name || ""}
                      required
                    />
                  </Container>
                  <Container className={$Modal.editModalContainer}>
                    <TextField
                      className={$Modal.editModalTextfield}
                      label="Email"
                      type="text"
                      name="email"
                      defaultValue={para?.email || ""}
                      required
                    />
                  </Container>
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
              className={`${$button.default}`}
              onClick={() => handleArchivePara()}
            >
              Yes
            </button>
            <button
              className={`${$button.default}`}
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
