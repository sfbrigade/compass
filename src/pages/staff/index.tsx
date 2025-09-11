import { useRef, useState } from "react";
import { TableRow, TableCell, TextField } from "@mui/material";
import Image from "next/image";

import Button from "@/components/design_system/button/Button";
import { DataTableColumn } from "@/components/design_system/dataTable/DataTable";
import {
  withDataTablePage,
  DataTablePageProps,
} from "@/components/design_system/dataTable/DataTablePage";

import emptyState from "../../public/img/empty-state.png";

import { trpc, RouterOutputs } from "@/client/lib/trpc";

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
  },
];

interface NewRecordType {
  first_name: string;
  last_name: string;
  email: string;
}

type Unpacked<T> = T extends (infer U)[] ? U : T;
type RecordType = Unpacked<
  RouterOutputs["case_manager"]["getMyParas"]["records"]
>;

function Staff({
  search,
  sort,
  sortAsc,
  render,
}: DataTablePageProps<RecordType, NewRecordType>) {
  const { data, isLoading } = trpc.case_manager.getMyParas.useQuery({
    search,
    sort,
    sortAsc,
  });

  const [record, setRecord] = useState<NewRecordType>();
  const focusRef = useRef<HTMLInputElement>();

  function onAddRecord() {
    setRecord({
      first_name: "",
      last_name: "",
      email: "",
    });
    setTimeout(() => focusRef.current?.focus(), 0);
  }

  function onCancel() {
    setRecord(undefined);
  }

  const utils = trpc.useUtils();
  const addRecord = trpc.case_manager.addStaff.useMutation({
    meta: { disableGlobalOnError: true },
  });

  async function onSubmit() {
    if (!record) return;
    await addRecord.mutateAsync(record);
    await utils.case_manager.getMyParas.invalidate();
    setRecord(undefined);
  }

  return render({
    title: "Staff",
    addLabel: "Add Staff",
    isLoading,
    record,
    records: data?.records ?? [],
    onAddRecord,
    onCancel,
    onSubmit,
    columns: COLUMNS,
    totalCount: data?.totalCount ?? 0,
    emptyElement: (
      <>
        <Image src={emptyState} alt="No staff image" width={250} />
        <h3>No staff yet!</h3>
        <Button onClick={onAddRecord}>Add Staff</Button>
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
      </>
    ),
    renderRow: (record, router) => (
      <TableRow
        key={record.user_id}
        onClick={() => router.push(`/staff/${record.user_id}`)}
      >
        <TableCell>{record.first_name}</TableCell>
        <TableCell>{record.last_name}</TableCell>
        <TableCell>{record.email}</TableCell>
      </TableRow>
    ),
  });
}

export default withDataTablePage(Staff);
