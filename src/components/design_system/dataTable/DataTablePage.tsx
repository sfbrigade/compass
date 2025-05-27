import { useState, FormEvent, ReactNode, ComponentType } from "react";
import { CircularProgress, Stack } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { NextRouter, useRouter } from "next/router";

import DataTableHeader from "@/components/design_system/dataTable/DataTableHeader";
import DataTable, {
  DataTableColumn,
} from "@/components/design_system/dataTable/DataTable";
import Button from "@/components/design_system/button/Button";

export interface DataTablePageRenderProps<RecordType, NewRecordType> {
  title: string;
  addLabel?: string;
  isLoading: boolean;
  records?: RecordType[];
  record?: NewRecordType;
  onAddRecord?: () => void;
  onSubmit?: () => Promise<void>;
  columns: DataTableColumn[];
  emptyElement: ReactNode;
  renderFormRow: (
    record: NewRecordType,
    hasError: (path: string[]) => boolean,
    errors?: { path: string[] }[]
  ) => ReactNode;
  renderRow: (record: RecordType, router: NextRouter) => ReactNode;
}

export interface DataTablePageProps<RecordType, NewRecordType> {
  search?: string;
  sort?: string;
  sortAsc?: boolean;
  render: (
    props: DataTablePageRenderProps<RecordType, NewRecordType>
  ) => ReactNode;
}

export function withDataTablePage<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends DataTablePageProps<any, any>,
>(WrappedComponent: ComponentType<T>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function DataTablePage(props: Omit<T, keyof DataTablePageProps<any, any>>) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const sort = searchParams.get("sort") ?? "first_name";
    const sortAsc = (searchParams.get("sortAsc") ?? "true") === "true";

    const [errors, setErrors] = useState<{ path: string[] }[]>();

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

    async function onSubmitInternal(
      event: FormEvent<HTMLFormElement>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      record?: any,
      onSubmit?: () => Promise<void>
    ) {
      event.preventDefault();
      if (!record) return;
      try {
        if (onSubmit) {
          await onSubmit();
        }
      } catch (err) {
        setErrors(JSON.parse((err as Error).message) as { path: string[] }[]);
      }
    }

    function hasError(path: string[]): boolean {
      if (errors) {
        const pathStr = JSON.stringify(path);
        return errors.findIndex((e) => JSON.stringify(e.path) === pathStr) >= 0;
      }
      return false;
    }

    return (
      <WrappedComponent
        {...(props as T)}
        search={search}
        sort={sort}
        sortAsc={sortAsc}
        render={({
          title,
          isLoading,
          records,
          addLabel,
          onAddRecord,
          record,
          emptyElement,
          onSubmit,
          columns: COLUMNS,
          renderFormRow,
          renderRow,
        }) => (
          <>
            <DataTableHeader
              title={title}
              searchValue={search}
              onChangeSearchValue={
                (records?.length ?? 0) > 0 ? onChangeSearchValue : undefined
              }
            >
              {(records?.length ?? 0) > 0 && (
                <Button
                  sx={{ ml: "2rem" }}
                  onClick={onAddRecord}
                  disabled={!!record}
                >
                  {addLabel}
                </Button>
              )}
            </DataTableHeader>
            {isLoading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "2rem",
                }}
              >
                <CircularProgress />
              </div>
            )}
            {!isLoading && records?.length === 0 && !record && (
              <Stack
                spacing="1rem"
                sx={{ alignItems: "center", paddingTop: "4rem" }}
              >
                {emptyElement}
              </Stack>
            )}
            {!isLoading && ((records?.length ?? 0) > 0 || record) && (
              <form
                onSubmit={(event) => onSubmitInternal(event, record, onSubmit)}
              >
                <DataTable
                  columns={COLUMNS}
                  sort={sort}
                  sortAsc={sortAsc}
                  onChangeSort={onChangeSort}
                >
                  {record && renderFormRow(record, hasError, errors)}
                  {records?.map((record) => renderRow(record, router))}
                </DataTable>
              </form>
            )}
          </>
        )}
      />
    );
  }
  return DataTablePage;
}
