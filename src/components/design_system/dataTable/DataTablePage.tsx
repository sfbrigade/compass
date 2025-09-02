import { useState, ReactNode, ComponentType } from "react";
import { useTheme } from "@mui/material/styles";
import { CircularProgress, Stack, useMediaQuery } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { NextRouter, useRouter } from "next/router";

import DataTableHeader from "@/components/design_system/dataTable/DataTableHeader";
import DataTable, {
  DataTableColumn,
} from "@/components/design_system/dataTable/DataTable";
import Button from "@/components/design_system/button/Button";
import Dialog from "@/components/design_system/dialog/Dialog";

export interface DataTablePageRenderProps<RecordType, NewRecordType> {
  title: string;
  addLabel?: string;
  isLoading: boolean;
  record?: NewRecordType;
  records?: RecordType[];
  onAddRecord?: () => void;
  onCancel?: () => void;
  onSubmit?: () => Promise<void>;
  columns: DataTableColumn[];
  emptyElement: ReactNode;
  renderCount?: () => ReactNode;
  renderForm: (
    record: NewRecordType,
    hasError: (path: string[]) => boolean,
    errors?: { path: string[] }[]
  ) => ReactNode;
  renderRow: (record: RecordType, router: NextRouter) => ReactNode;
}

export interface DataTablePageProps<RecordType, NewRecordType> {
  page: number;
  pageSize: number;
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const router = useRouter();
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page") ?? "1");
    const pageSize = Number(searchParams.get("pageSize") ?? "25");
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      record?: any,
      onSubmit?: () => Promise<void>
    ) {
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
        page={page}
        pageSize={pageSize}
        search={search}
        sort={sort}
        sortAsc={sortAsc}
        render={({
          title,
          isLoading,
          record,
          records,
          addLabel,
          onAddRecord,
          onCancel,
          emptyElement,
          onSubmit,
          columns: COLUMNS,
          renderCount,
          renderForm,
          renderRow,
        }) => (
          <>
            <DataTableHeader
              title={title}
              searchValue={search}
              onChangeSearchValue={
                (records?.length ?? 0) > 0 || search
                  ? onChangeSearchValue
                  : undefined
              }
            >
              {((records?.length ?? 0) > 0 || search) && (
                <Button
                  size={isMobile ? "small" : "large"}
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
            {!isLoading && records?.length === 0 && !search && (
              <Stack
                spacing="1rem"
                sx={{ alignItems: "center", paddingTop: "4rem" }}
              >
                {emptyElement}
              </Stack>
            )}
            {!isLoading && ((records?.length ?? 0) > 0 || search) && (
              <DataTable
                columns={COLUMNS}
                countLabel={renderCount?.()}
                isMobile={isMobile}
                sort={sort}
                sortAsc={sortAsc}
                onChangeSort={onChangeSort}
              >
                {records?.map((record) => renderRow(record, router))}
              </DataTable>
            )}
            {record && (
              <Dialog
                title={addLabel}
                confirmLabel="Save"
                cancelLabel="Cancel"
                open={!!record}
                onConfirm={() => onSubmitInternal(record, onSubmit)}
                onCancel={() => onCancel?.()}
                fullScreenOnMobile
                size="xs"
              >
                <Stack spacing={3} sx={{ paddingTop: ".25rem" }}>
                  {renderForm(record, hasError, errors)}
                </Stack>
              </Dialog>
            )}
          </>
        )}
      />
    );
  }
  return DataTablePage;
}
