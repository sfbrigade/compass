import { useRef, useState } from "react";
import { TableRow, TableCell, TextField } from "@mui/material";
import Image from "next/image";
import { z } from "zod";

import Button from "@/components/design_system/button/Button";
import { DataTableColumn } from "@/components/design_system/dataTable/DataTable";
import {
  withDataTablePage,
  DataTablePageProps,
} from "@/components/design_system/dataTable/DataTablePage";
import Dropdown from "@/components/design_system/dropdown/Dropdown";

import { sortBySchema } from "@/backend/routers/user";
import { trpc, RouterOutputs } from "@/client/lib/trpc";
import { ROLE_OPTIONS } from "@/types/auth";

import emptyState from "../../public/img/empty-state.png";

const COLUMNS: DataTableColumn[] = [
  {
    id: "first_name",
    label: "First Name",
    isSortable: true,
    width: { xs: "25%", sm: "20%" },
  },
  {
    id: "last_name",
    label: "Last Name",
    isSortable: true,
    width: { xs: "25%", sm: "20%" },
  },
  {
    id: "email",
    label: "Email",
    isSortable: true,
    width: { xs: "25%", sm: "20%" },
  },
  {
    id: "role",
    label: "Role",
    isSortable: true,
  },
];

interface NewRecordType {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

type Unpacked<T> = T extends (infer U)[] ? U : T;
type RecordType = Unpacked<RouterOutputs["user"]["getUsers"]["records"]>;

type Sort = z.infer<typeof sortBySchema>;

function Staff({
  page,
  pageSize,
  search,
  sort,
  sortAsc,
  render,
}: DataTablePageProps<RecordType, NewRecordType>) {
  const { data, isLoading } = trpc.user.getUsers.useQuery({
    page,
    pageSize,
    search,
    sort: sort as Sort,
    sortAsc,
  });

  const [record, setRecord] = useState<NewRecordType>();
  const focusRef = useRef<HTMLInputElement>();

  function onAddRecord() {
    setRecord({
      first_name: "",
      last_name: "",
      email: "",
      role: "user",
    });
    setTimeout(() => focusRef.current?.focus(), 0);
  }

  function onCancel() {
    setRecord(undefined);
  }

  const utils = trpc.useUtils();
  const addRecord = trpc.user.createUser.useMutation({
    meta: { disableGlobalOnError: true },
  });

  async function onSubmit() {
    if (!record) return;
    await addRecord.mutateAsync(record);
    await utils.user.getUsers.invalidate();
    setRecord(undefined);
  }

  return render({
    title: "Users",
    addLabel: "Add User",
    isLoading,
    record,
    records: data?.records,
    totalCount: data?.totalCount,
    onAddRecord,
    onCancel,
    onSubmit,
    columns: COLUMNS,
    emptyElement: (
      <>
        <Image src={emptyState} alt="No users image" width={250} />
        <h3>No users yet!</h3>
        <Button onClick={onAddRecord}>Add User</Button>
      </>
    ),
    renderForm: (record, hasError) => (
      <>
        <TextField
          inputRef={focusRef}
          label="First Name"
          value={record.first_name}
          onChange={(e) => setRecord({ ...record, first_name: e.target.value })}
          error={hasError(["first_name"])}
        />
        <TextField
          label="Last Name"
          value={record.last_name}
          onChange={(e) => setRecord({ ...record, last_name: e.target.value })}
          error={hasError(["last_name"])}
        />
        <TextField
          type="email"
          label="Email"
          value={record.email}
          onChange={(e) => setRecord({ ...record, email: e.target.value })}
          error={hasError(["email"])}
        />
        <Dropdown
          itemList={[...ROLE_OPTIONS]}
          selectedOption={record.role}
          setSelectedOption={(role) =>
            setRecord({ ...record, role: role as string })
          }
          label="Role"
        />
      </>
    ),
    renderRow: (record, router) => (
      <TableRow
        key={record.user_id}
        onClick={() => router.push(`/admin/${record.user_id}`)}
      >
        <TableCell>{record.first_name}</TableCell>
        <TableCell>{record.last_name}</TableCell>
        <TableCell>{record.email}</TableCell>
        <TableCell>{record.role}</TableCell>
      </TableRow>
    ),
  });
}

export default withDataTablePage(Staff);
