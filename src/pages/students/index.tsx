import { useRef, useState, useEffect } from "react";
import { format } from "date-fns";
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

import z from "zod";

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
    id: "grade",
    label: "Grade",
    isSortable: true,
    width: { xs: "20%", sm: "10%" },
  },
  {
    id: "end_date",
    label: "IEP End Date",
    isSortable: true,
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
  RouterOutputs["case_manager"]["getMyStudentsAndIepInfo"]["records"]
>;

interface FormError {
  error: boolean;
  errorMessage: string;
}

function Students({
  page,
  pageSize,
  search,
  sort,
  sortAsc,
  render,
}: DataTablePageProps<RecordType, NewRecordType>) {
  const { data, isLoading } =
    trpc.case_manager.getMyStudentsAndIepInfo.useQuery({
      page,
      pageSize,
      search,
      sort,
      sortAsc,
    });

  const [record, setRecord] = useState<NewRecordType>();
  const [formError, setFormError] = useState<FormError>({
    error: false,
    errorMessage: "",
  });
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

  function onCancel() {
    setRecord(undefined);
  }

  const utils = trpc.useUtils();
  const addRecord = trpc.case_manager.addStudent.useMutation({
    meta: { disableGlobalOnError: true },
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (formError.error) {
      timeoutId = setTimeout(() => {
        setFormError({
          error: false,
          errorMessage: "",
        });
      }, 3000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [formError]);
  async function onSubmit() {
    if (!record) return;
    console.log(record);

    const recordSchema = z.object({
      first_name: z.string().regex(/^[a-zA-Z\s-]+$/),
      last_name: z.string().regex(/^[a-zA-Z\s-]+$/),
      email: z.string().email().nullable().optional(),
      grade: z.number().min(0).max(12),
      end_date: z.string().date().optional(),
    });

    try {
      recordSchema.parse({
        ...record,
        grade: Number(record.grade),
      });
      await addRecord.mutateAsync({
        ...record,
        grade: Number(record.grade),
      });
      await utils.case_manager.getMyStudentsAndIepInfo.invalidate();
      setRecord(undefined);
    } catch {
      setFormError({
        error: true,
        errorMessage:
          "Only letters, spaces, and hyphens allowed, left blanked or number is out of range(must be between 1 and 12).",
      });
    }
  }

  return render({
    title: "Students",
    addLabel: "Add Student",
    isLoading,
    record,
    records: data?.records,
    onAddRecord,
    onCancel,
    onSubmit,
    columns: COLUMNS,
    emptyElement: (
      <>
        <Image src={emptyState} alt="No students image" width={250} />
        <h3>No students yet!</h3>
        <Button onClick={onAddRecord}>Add Student</Button>
      </>
    ),
    totalCount: data?.totalCount,
    renderForm: (record) => (
      <>
        <TextField
          inputRef={focusRef}
          label="First Name"
          value={record.first_name}
          onChange={(e) => setRecord({ ...record, first_name: e.target.value })}
          error={formError.error}
          helperText={formError.errorMessage}
        />
        <TextField
          label="Last Name"
          value={record.last_name}
          onChange={(e) => setRecord({ ...record, last_name: e.target.value })}
          error={formError.error}
          helperText={formError.errorMessage}
        />
        <TextField
          label="Grade"
          type="number"
          value={record.grade}
          onChange={(e) => setRecord({ ...record, grade: e.target.value })}
          error={formError.error}
          helperText={formError.errorMessage}
        />
        <TextField
          label="IEP End Date"
          type="date"
          value={record.end_date}
          onChange={(e) => setRecord({ ...record, end_date: e.target.value })}
          error={formError.error}
          helperText={formError.errorMessage}
        />
      </>
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
      </TableRow>
    ),
  });
}

export default withDataTablePage(Students);
