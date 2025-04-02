import { useState } from "react";
import { useRouter } from "next/router";
import { z } from "zod";

import { sortBySchema, sortOrderSchema } from "@/backend/routers/user";
import { requiresAdminAuth } from "@/client/lib/protected-page";
import { trpc } from "@/client/lib/trpc";
import { PaginatedTable } from "@/components/table/PaginatedTable";
import { ColumnDefinition, UserBase } from "@/components/table/types";
import { ROLE_OPTIONS, Roles } from "@/types/auth";
import { getRoleLabel } from "@/types/auth";

import { NextPageWithLayout } from "../_app";

interface User extends UserBase {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: Roles;
}

type SortBy = z.infer<typeof sortBySchema>;
type SortOrder = z.infer<typeof sortOrderSchema>;

const AdminHome = () => {
  const utils = trpc.useContext();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] =
    useState<Omit<keyof User, "user_id">>("first_name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;

  const { data, isLoading } = trpc.user.getUsers.useQuery({
    page,
    pageSize,
    sortBy: sortBy as SortBy,
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
        role: userData.role || "para",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (newSortBy: keyof User, newSortOrder: SortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    setPage(1);
  };

  const handleRowClick = async (user: User) => {
    await router.push(`/admin/${user.user_id}`);
  };

  const columns: ColumnDefinition<User>[] = [
    {
      id: "first_name",
      label: "First Name",
      type: "text",
    },
    {
      id: "last_name",
      label: "Last Name",
      type: "text",
    },
    {
      id: "email",
      label: "Email",
      type: "text",
    },
    {
      id: "role",
      label: "Role",
      type: "select",
      options: [...ROLE_OPTIONS],
      customRender: (value) => (value ? getRoleLabel(value as string) : ""),
    },
  ];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <PaginatedTable<User>
        data={(data?.users as User[]) ?? []}
        columns={columns}
        type="Users"
        onRowClick={handleRowClick}
        page={page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={setPage}
        sortBy={sortBy as SortBy}
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

const wrappedAdminHome = requiresAdminAuth(AdminHome) as NextPageWithLayout;

wrappedAdminHome.getBreadcrumbs = function getBreadcrumbs() {
  return undefined;
};

export default wrappedAdminHome;
