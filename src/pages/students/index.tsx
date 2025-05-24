import { useRef, useState, FormEvent } from "react";
import { format } from "date-fns";
import {
  CircularProgress,
  Stack,
  TableRow,
  TableCell,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

import DataTableHeader from "@/components/design_system/dataTable/DataTableHeader";
import DataTable, {
  DataTableColumn,
} from "@/components/design_system/dataTable/DataTable";
import Button from "@/components/design_system/button/Button";

import emptyState from "../../public/img/empty-state.png";

import { trpc } from "@/client/lib/trpc";

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

interface NewStudent {
  first_name: string;
  last_name: string;
  grade: string;
  end_date: string;
}

function Students() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "first_name";
  const sortAsc = (searchParams.get("sortAsc") ?? "true") === "true";

  const { data: records, isLoading } =
    trpc.case_manager.getMyStudentsAndIepInfo.useQuery({
      search,
      sort,
      sortAsc,
    });

  const [record, setRecord] = useState<NewStudent>();
  const [error, setError] = useState<{ path: string[] }[]>();
  const focusRef = useRef<HTMLInputElement>();
  function onAddStudent() {
    setRecord({
      first_name: "",
      last_name: "",
      grade: "",
      end_date: "",
    });
    setTimeout(() => focusRef.current?.focus(), 0);
  }

  const utils = trpc.useUtils();
  const addStudent = trpc.case_manager.addStudent.useMutation({
    meta: { disableGlobalOnError: true },
  });
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!record) return;
    try {
      await addStudent.mutateAsync({
        ...record,
        grade: Number(record.grade),
      });
      await utils.case_manager.getMyStudentsAndIepInfo.invalidate();
      setRecord(undefined);
    } catch (err) {
      setError(JSON.parse((err as Error).message) as { path: string[] }[]);
    }
  }

  async function onChangeSearchValue(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    const queryString = params.toString();
    return router.push(
      `${router.pathname}${queryString ? "?" : ""}${queryString}`
    );
  }

  async function onChangeSort(newSort: string, newSortAsc: boolean) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    params.set("sortAsc", newSortAsc.toString());
    const queryString = params.toString();
    return router.push(
      `${router.pathname}${queryString ? "?" : ""}${queryString}`
    );
  }

  function hasError(path: string[]): boolean {
    if (error) {
      const pathStr = JSON.stringify(path);
      return error.findIndex((e) => JSON.stringify(e.path) === pathStr) >= 0;
    }
    return false;
  }

  return (
    <>
      <DataTableHeader
        title="Students"
        searchValue={search}
        onChangeSearchValue={
          (records?.length ?? 0) > 0 ? onChangeSearchValue : undefined
        }
      >
        {(records?.length ?? 0) > 0 && (
          <Button sx={{ ml: "2rem" }} onClick={onAddStudent}>
            Add Student
          </Button>
        )}
      </DataTableHeader>
      {isLoading && (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "2rem" }}
        >
          <CircularProgress />
        </div>
      )}
      {!isLoading && records?.length === 0 && (
        <Stack spacing="1rem" sx={{ alignItems: "center", paddingTop: "4rem" }}>
          <Image src={emptyState} alt="No students image" width={250} />
          <h3>No students yet!</h3>
          <Button onClick={onAddStudent}>Add Student</Button>
        </Stack>
      )}
      {!isLoading && (records?.length ?? 0) > 0 && (
        <form onSubmit={onSubmit}>
          <DataTable
            columns={COLUMNS}
            sort={sort}
            sortAsc={sortAsc}
            onChangeSort={onChangeSort}
          >
            {record && (
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
                    onChange={(e) =>
                      setRecord({ ...record, grade: e.target.value })
                    }
                    error={hasError(["grade"])}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label="IEP End Date"
                    type="date"
                    value={record.end_date}
                    onChange={(e) =>
                      setRecord({ ...record, end_date: e.target.value })
                    }
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
                    <Button
                      variant="secondary"
                      onClick={() => setRecord(undefined)}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            )}
            {records?.map((record) => (
              <TableRow
                key={record.student_id}
                onClick={() => router.push(`/students/${record.student_id}`)}
              >
                <TableCell>{record.first_name}</TableCell>
                <TableCell>{record.last_name}</TableCell>
                <TableCell>{record.grade}</TableCell>
                <TableCell>
                  {record.end_date &&
                    format(new Date(record.end_date), "MM/dd/yyyy")}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </DataTable>
        </form>
      )}
    </>
  );
}

export default Students;
