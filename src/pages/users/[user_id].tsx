import { trpc } from "@/client/lib/trpc";
import { Box, Button, Container, Modal, Stack, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { UserType, ROLE_OPTIONS } from "@/types/auth";
import $CompassModal from "@/components/design_system/modal/CompassModal.module.css";
import $button from "@/components/design_system/button/Button.module.css";
import { getRoleLabel } from "@/types/auth";
import { Dropdown } from "@/components/design_system/dropdown/Dropdown";

interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
  role: UserType;
}

const ViewUserPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const utils = trpc.useContext();
  const router = useRouter();
  const { user_id } = router.query;

  const { data: user, isLoading } = trpc.user.getUserById.useQuery(
    { user_id: user_id as string },
    {
      enabled: Boolean(user_id),
      retry: false,
      onError: () => returnToUserList(),
    }
  );

  const returnToUserList = async () => {
    await router.push(`/admin`);
  };

  const editMutation = trpc.user.editUser.useMutation({
    onSuccess: () => utils.user.getUserById.invalidate(),
  });

  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    if (user?.role) {
      setSelectedRole(user.role.toUpperCase());
    }
  }, [user?.role]);

  const handleEditUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!user) return;

    const userData: UserFormData = {
      first_name: formData.get("firstName") as string,
      last_name: formData.get("lastName") as string,
      email: formData.get("email") as string,
      role: selectedRole as UserType,
    };

    editMutation.mutate({
      user_id: user.user_id,
      ...userData,
    });

    handleClose();
  };

  if (isLoading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <Stack spacing={2}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <h1>
            {user.first_name} {user.last_name}
          </h1>
          <Button onClick={handleOpen} className={`${$button.secondary}`}>
            Edit
          </Button>
        </Box>

        <Box sx={{ display: "grid", gap: 2 }}>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Role:</strong> {getRoleLabel(user.role)}
          </div>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={$CompassModal.editModalContent}>
            <p id="modal-modal-title" className={$CompassModal.editModalHeader}>
              Editing {user?.first_name || "User"} {user?.last_name || ""}
            </p>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              component="div"
            >
              <Stack gap={0.5} sx={{ width: "100%" }}>
                <form
                  className={$CompassModal.editForm}
                  id="edit"
                  onSubmit={handleEditUser}
                >
                  <Stack gap={0.5}>
                    <Container className={$CompassModal.editModalContainer}>
                      <TextField
                        className={$CompassModal.editModalTextfield}
                        label="First Name"
                        type="text"
                        name="firstName"
                        defaultValue={user?.first_name || ""}
                        required
                      />
                    </Container>
                    <Container className={$CompassModal.editModalContainer}>
                      <TextField
                        className={$CompassModal.editModalTextfield}
                        label="Last Name"
                        type="text"
                        name="lastName"
                        defaultValue={user?.last_name || ""}
                        required
                      />
                    </Container>
                    <Container className={$CompassModal.editModalContainer}>
                      <TextField
                        className={$CompassModal.editModalTextfield}
                        label="Email"
                        type="text"
                        name="email"
                        defaultValue={user?.email || ""}
                        required
                      />
                    </Container>
                    <Container className={$CompassModal.editModalContainer}>
                      <Dropdown
                        itemList={ROLE_OPTIONS}
                        selectedOption={selectedRole}
                        setSelectedOption={setSelectedRole}
                        label="Role *"
                        className={$CompassModal.editModalTextfield}
                        required
                      />
                    </Container>
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
      </Container>
    </Stack>
  );
};

export default ViewUserPage;
