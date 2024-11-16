import { requiresAdminAuth } from "@/client/lib/protected-page";
import { trpc } from "@/client/lib/trpc";
import { Table2, Column, BaseEntity } from "@/components/table/table2";
import { useRouter } from "next/router";
import { useState } from "react";
import { ROLE_OPTIONS } from "@/types/auth";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { getRoleLabel } from "@/types/auth";
import { sortBySchema, sortOrderSchema } from "@/backend/routers/user";
import { z } from "zod";

interface User extends BaseEntity {
  user_id: string;
  role: string;
}

type SortBy = z.infer<typeof sortBySchema>;
type SortOrder = z.infer<typeof sortOrderSchema>;

const AdminHome: React.FC = () => {
  const utils = trpc.useContext();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("first_name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 2;

  const { data, isLoading } = trpc.user.getUsers.useQuery({
    page,
    pageSize,
    sortBy,
    sortOrder,
    search: searchTerm,
  });

  const createUserMutation = trpc.user.createUser.useMutation({
    onSuccess: async () => {
      await utils.user.getUsers.invalidate();
    },
  });

  const handleAddUser = async (userData: Omit<User, "id">) => {
    try {
      await createUserMutation.mutateAsync({
        ...userData,
        role: userData.role || "PARA",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (newSortBy: SortBy, newSortOrder: SortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    setPage(1); // Reset to first page when searching
  };

  if (isLoading) return <div>Loading...</div>;

  const columns: Column<User>[] = [
    {
      id: "first_name",
      label: "First Name",
      renderInput: (value, onChange) => (
        <TextField
          size="small"
          label="First Name"
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      ),
    },
    {
      id: "last_name",
      label: "Last Name",
      renderInput: (value, onChange) => (
        <TextField
          size="small"
          label="Last Name"
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      ),
    },
    {
      id: "email",
      label: "Email",
      renderInput: (value, onChange) => (
        <TextField
          size="small"
          label="Email"
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      ),
    },
    {
      id: "role",
      label: "Role",
      renderCell: (value) => getRoleLabel(value as string),
      renderInput: (value, onChange) => (
        <FormControl size="small">
          <InputLabel>Role</InputLabel>
          <Select
            value={(value as string)?.toUpperCase() || ""}
            label="Role"
            onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
            sx={{ minWidth: 120 }}
            MenuProps={{
              PaperProps: {
                elevation: 1,
              },
            }}
          >
            {ROLE_OPTIONS.map(({ label, value }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    },
  ];

  const handleRowClick = async (user: User) => {
    await router.push(`/users/${user.user_id}`);
  };

  return (
    <div>
      <Table2<User>
        data={data?.users ?? []}
        columns={columns}
        type="Users"
        onRowClick={handleRowClick}
        page={page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={setPage}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        onAdd={handleAddUser}
        showAddRow={true}
      />
    </div>
  );
};

export default requiresAdminAuth(AdminHome);
