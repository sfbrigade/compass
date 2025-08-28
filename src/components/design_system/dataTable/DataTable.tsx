import { ReactNode } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  Typography,
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
  countLabel?: ReactNode;
  isMobile?: boolean;
  onChangeSort?: (newSort: string, newSortAsc: boolean) => void;
  sort?: string;
  sortAsc?: boolean;
}

function DataTable({
  children,
  columns,
  countLabel,
  isMobile = false,
  onChangeSort,
  sort,
  sortAsc = true,
}: DataTableProps) {
  const table = (
    <Table
      sx={{
        marginLeft: { xs: "calc(-2 * var(--mui-spacing))", sm: "auto" },
        marginRight: { xs: "calc(-2 * var(--mui-spacing))", sm: "auto" },
        tableLayout: { xs: "fixed", sm: "auto" },
        width: { xs: "calc(100% + 4 * var(--mui-spacing))", sm: "auto" },
      }}
    >
      <TableHead>
        <TableRow>
          {columns.map((column, i) =>
            !isMobile || i < columns.length - 1 ? (
              <TableCell key={column.id} sx={{ width: column.width ?? "auto" }}>
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
                {i === columns.length - 1 && countLabel && (
                  <Typography sx={{ textAlign: "right" }}>
                    {countLabel}
                  </Typography>
                )}
              </TableCell>
            ) : (
              <></>
            )
          )}
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
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
