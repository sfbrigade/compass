import { useRef, useState, FormEvent } from "react";

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
    id: "email",
    label: "Email",
    isSortable: true,
    width: "15%",
  },
  {
    id: "actions",
    label: "",
    isSortable: false,
  },
];

interface NewStaff {
  first_name: string;
  last_name: string;
  email: string;
}

function Staff() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "first_name";
  const sortAsc = (searchParams.get("sortAsc") ?? "true") === "true";

  const { data: records, isLoading } = trpc.case_manager.getMyParas.useQuery({
    search,
    sort,
    sortAsc,
  });

  const [record, setRecord] = useState<NewStaff>();
  const [error, setError] = useState<{ path: string[] }[]>();
  const focusRef = useRef<HTMLInputElement>();

  function onAddRecord() {
    setRecord({
      first_name: "",
      last_name: "",
      email: "",
    });
    setTimeout(() => focusRef.current?.focus(), 0);
  }

  const utils = trpc.useUtils();
  const addRecord = trpc.case_manager.addStaff.useMutation({
    meta: { disableGlobalOnError: true },
  });
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!record) return;
    try {
      await addRecord.mutateAsync(record);
      await utils.case_manager.getMyParas.invalidate();
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
        title="Staff"
        searchValue={search}
        onChangeSearchValue={
          (records?.length ?? 0) > 0 ? onChangeSearchValue : undefined
        }
      >
        {(records?.length ?? 0) > 0 && (
          <Button sx={{ ml: "2rem" }} onClick={onAddRecord} disabled={!!record}>
            Add Staff
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
      {!isLoading && records?.length === 0 && !record && (
        <Stack spacing="1rem" sx={{ alignItems: "center", paddingTop: "4rem" }}>
          <Image src={emptyState} alt="No students image" width={250} />
          <h3>No staff yet!</h3>
          <Button onClick={onAddRecord}>Add Staff</Button>
        </Stack>
      )}
      {!isLoading && ((records?.length ?? 0) > 0 || record) && (
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
                    label="Email"
                    value={record.email}
                    onChange={(e) =>
                      setRecord({ ...record, email: e.target.value })
                    }
                    error={hasError(["email"])}
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
                key={record.para_id}
                onClick={() => router.push(`/staff/${record.para_id}`)}
              >
                <TableCell>{record.first_name}</TableCell>
                <TableCell>{record.last_name}</TableCell>
                <TableCell>{record.email}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </DataTable>
        </form>
      )}
    </>
  );
}

export default Staff;
