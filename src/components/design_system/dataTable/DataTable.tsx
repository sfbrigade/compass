import { ReactNode } from "react";
import {
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  Typography,
  TableFooter,
  TablePagination,
} from "@mui/material";

export interface DataTableColumn {
  id: string;
  label: string;
  isSortable: boolean;
  width?: string | { xs: string; sm: string };
}

interface DataTableProps {
  children?: ReactNode;
  columns: DataTableColumn[];
  page: number;
  pageSize: number;
  totalCount?: number;
  isMobile?: boolean;
  onChangePage?: (newPage: number) => void;
  onChangePageSize?: (newPageSize: number) => void;
  onChangeSort?: (newSort: string, newSortAsc: boolean) => void;
  sort?: string;
  sortAsc?: boolean;
  title?: string;
}

function DataTable({
  children,
  columns,
  page,
  pageSize,
  totalCount,
  isMobile = false,
  onChangePage,
  onChangePageSize,
  onChangeSort,
  sort,
  sortAsc = true,
  title,
}: DataTableProps) {
  const countLabel = `${Math.min((page - 1) * pageSize + 1, totalCount ?? 0)}-${Math.min(page * pageSize, totalCount ?? 0)} of ${totalCount ?? 0} ${title}`;

  const table = (
    <Table
      sx={{
        marginLeft: { xs: "calc(-2 * var(--mui-spacing))", sm: "auto" },
        marginRight: { xs: "calc(-2 * var(--mui-spacing))", sm: "auto" },
        tableLayout: { xs: "fixed", sm: "auto" },
        width: { xs: "calc(100% + 4 * var(--mui-spacing))", sm: "100%" },
      }}
    >
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.id} sx={{ width: column.width ?? "auto" }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                {column.isSortable && (
                  <TableSortLabel
                    active={sort === column.id}
                    direction={sortAsc ? "asc" : "desc"}
                    onClick={() =>
                      onChangeSort?.(
                        column.id,
                        sort === column.id ? !sortAsc : true
                      )
                    }
                  >
                    {column.label}
                  </TableSortLabel>
                )}
                {!column.isSortable && column.label}
              </Stack>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={columns.length}
            count={totalCount ?? 0}
            page={page - 1}
            rowsPerPage={pageSize}
            rowsPerPageOptions={[25, 50, 100]}
            onPageChange={(event, newPage) => {
              onChangePage?.(newPage + 1);
            }}
            onRowsPerPageChange={(event) => {
              onChangePageSize?.(Number(event.target.value));
            }}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );

  return isMobile ? (
    <>
      <Typography variant="body2">{countLabel}</Typography>
      {table}
    </>
  ) : (
    <TableContainer>{table}</TableContainer>
  );
}

export default DataTable;
