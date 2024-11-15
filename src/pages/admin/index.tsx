import { requiresAdminAuth } from "@/client/lib/protected-page";
import { trpc } from "@/client/lib/trpc";
import { Table2, Column, BaseEntity } from "@/components/table/table2";
import { useRouter } from "next/router";
import { useState } from "react";

interface User extends BaseEntity {
  user_id: string;
  role: string;
}

const AdminHome: React.FC = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<keyof User>("first_name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const pageSize = 10;

  const { data, isLoading } = trpc.user.getUsers.useQuery({
    page,
    pageSize,
    sortBy,
    sortOrder,
    search: debouncedSearchTerm,
  });

  const handleSort = (newSortBy: keyof User, newSortOrder: "asc" | "desc") => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleSearch = (search: string) => {
    setDebouncedSearchTerm(search);
    setPage(1); // Reset to first page when searching
  };

  if (isLoading) return <div>Loading...</div>;

  const columns: Column<User>[] = [
    { id: "first_name", label: "First Name" },
    { id: "last_name", label: "Last Name" },
    { id: "email", label: "Email" },
    { id: "role", label: "Role" },
  ];

  const handleRowClick = async (user: User) => {
    await router.push(`/staff/${user.user_id}`);
  };

  return (
    <div>
      <h3>Admin Utilities</h3>
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
      />
    </div>
  );
};

export default requiresAdminAuth(AdminHome);
