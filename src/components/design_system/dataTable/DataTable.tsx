import { ReactNode } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
} from "@mui/material";

export interface DataTableColumn {
  id: string;
  label: string;
  isSortable: boolean;
  width?: string;
}

interface DataTableProps {
  children?: ReactNode;
  columns: DataTableColumn[];
}

function DataTable({ children, columns }: DataTableProps) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} sx={{ width: column.width ?? "auto" }}>
                {column.isSortable && (
                  <TableSortLabel>{column.label}</TableSortLabel>
                )}
                {!column.isSortable && column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
