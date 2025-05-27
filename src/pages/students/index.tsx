import { useRef, useState } from "react";
import { format } from "date-fns";
import { Stack, TableRow, TableCell, TextField } from "@mui/material";
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
    width: "15%",
  },
  {
    id: "last_name",
    label: "Last Name",
    isSortable: true,
    width: "15%",
  },
  {
    id: "grade",
    label: "Grade",
    isSortable: true,
    width: "15%",
  },
  {
    id: "end_date",
    label: "IEP End Date",
    isSortable: true,
    width: "15%",
  },
  {
    id: "actions",
    label: "",
    isSortable: false,
  },
];

interface NewRecordType {
  first_name: string;
  last_name: string;
  grade: string;
  end_date: string;
}

type Unpacked<T> = T extends (infer U)[] ? U : T;
type RecordType = Unpacked<
  RouterOutputs["case_manager"]["getMyStudentsAndIepInfo"]
>;

function Students({
  search,
  sort,
  sortAsc,
  render,
}: DataTablePageProps<RecordType, NewRecordType>) {
  const { data: records, isLoading } =
    trpc.case_manager.getMyStudentsAndIepInfo.useQuery({
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
      grade: "",
      end_date: "",
    });
    setTimeout(() => focusRef.current?.focus(), 0);
  }

  const utils = trpc.useUtils();
  const addRecord = trpc.case_manager.addStudent.useMutation({
    meta: { disableGlobalOnError: true },
  });

  async function onSubmit() {
    if (!record) return;
    await addRecord.mutateAsync({
      ...record,
      grade: Number(record.grade),
    });
    await utils.case_manager.getMyStudentsAndIepInfo.invalidate();
    setRecord(undefined);
  }

  return render({
    title: "Students",
    addLabel: "Add Student",
    isLoading,
    record,
    records,
    onAddRecord,
    onSubmit,
    columns: COLUMNS,
    emptyElement: (
      <>
        <Image src={emptyState} alt="No students image" width={250} />
        <h3>No students yet!</h3>
        <Button onClick={onAddRecord}>Add Student</Button>
      </>
    ),
    renderFormRow: (record, hasError) => (
      <TableRow>
        <TableCell>
          <TextField
            inputRef={focusRef}
            label="First Name"
            value={record.first_name}
            onChange={(e) =>
              setRecord({ ...record, first_name: e.target.value })
            }
            error={hasError(["first_name"])}
          />
        </TableCell>
        <TableCell>
          <TextField
            label="Last Name"
            value={record.last_name}
            onChange={(e) =>
              setRecord({ ...record, last_name: e.target.value })
            }
            error={hasError(["last_name"])}
          />
        </TableCell>
        <TableCell>
          <TextField
            label="Grade"
            type="number"
            value={record.grade}
            onChange={(e) => setRecord({ ...record, grade: e.target.value })}
            error={hasError(["grade"])}
          />
        </TableCell>
        <TableCell>
          <TextField
            label="IEP End Date"
            type="date"
            value={record.end_date}
            onChange={(e) => setRecord({ ...record, end_date: e.target.value })}
            error={hasError(["end_date"])}
          />
        </TableCell>
        <TableCell>
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: "flex-end" }}
          >
            <Button type="submit">Save</Button>
            <Button variant="secondary" onClick={() => setRecord(undefined)}>
              Cancel
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
    ),
    renderRow: (record, router) => (
      <TableRow
        key={record.student_id}
        onClick={() => router.push(`/students/${record.student_id}`)}
      >
        <TableCell>{record.first_name}</TableCell>
        <TableCell>{record.last_name}</TableCell>
        <TableCell>{record.grade}</TableCell>
        <TableCell>
          {record.end_date && format(new Date(record.end_date), "MM/dd/yyyy")}
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
    ),
  });
}

export default withDataTablePage(Students);
