import { trpc } from "@/client/lib/trpc";
import { Box, Button, Container, Modal, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { UserType, ROLE_OPTIONS } from "@/types/auth";
import $CompassModal from "@/components/design_system/modal/CompassModal.module.css";
import $button from "@/components/design_system/button/Button.module.css";
import $Form from "@/styles/Form.module.css";
import $input from "@/styles/Input.module.css";
import { getRoleLabel } from "@/types/auth";

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

  const handleEditUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!user) return;

    const role = formData.get("role") as string;
    const userData: UserFormData = {
      first_name: formData.get("firstName") as string,
      last_name: formData.get("lastName") as string,
      email: formData.get("email") as string,
      role: role as UserType,
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
          <Button onClick={handleOpen}>Edit User</Button>
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
          aria-labelledby="edit-user-modal"
        >
          <Box className={$CompassModal.modalContent}>
            <h2>Edit User</h2>
            <form onSubmit={handleEditUser} className={$Form.formPadding}>
              <div className={$input.default}>
                <input
                  type="text"
                  name="firstName"
                  defaultValue={user.first_name}
                  placeholder="First Name"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  defaultValue={user.last_name}
                  placeholder="Last Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  defaultValue={user.email}
                  placeholder="Email"
                  required
                />
                <select
                  name="role"
                  defaultValue={user.role.toUpperCase()}
                  required
                >
                  {ROLE_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-end",
                  mt: 2,
                }}
              >
                <button type="submit" className={$button.default}>
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className={$button.default}
                >
                  Cancel
                </button>
              </Box>
            </form>
          </Box>
        </Modal>
      </Container>
    </Stack>
  );
};

export default ViewUserPage;
