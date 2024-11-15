import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  TextField,
  Button,
  TableSortLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import styles from "./Table.module.css";
import { visuallyHidden } from "@mui/utils";
import SearchIcon from "@mui/icons-material/Search";

export interface BaseEntity {
  id?: string | number;
  first_name: string;
  last_name: string;
  email: string;
  [key: string]: string | number | undefined;
}

export interface Column<T> {
  id: keyof T;
  label: string;
  hasInput?: boolean;
}

interface TableProps<T extends BaseEntity> {
  data: T[];
  columns: Column<T>[];
  type: "Students" | "Staff" | "Users";
  onRowClick?: (row: T) => void;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  sortBy: keyof T;
  sortOrder: "asc" | "desc";
  onSort: (sortBy: keyof T, sortOrder: "asc" | "desc") => void;
  onSearch?: (search: string) => void;
  searchTerm?: string;
}

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "var(--grey-90)",
  },
  "&:hover": {
    backgroundColor: "lightgray",
    cursor: "pointer",
  },
}));

export function Table2<T extends BaseEntity>({
  data,
  columns,
  type,
  onRowClick,
  page = 1,
  totalPages = 1,
  onPageChange,
  sortBy,
  sortOrder,
  onSort,
  onSearch,
  searchTerm = "",
}: TableProps<T>) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch?.(localSearchTerm);
    }
  };

  const handleRequestSort = (property: keyof T) => {
    const isAsc = sortBy === property && sortOrder === "asc";
    onSort(property, isAsc ? "desc" : "asc");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
        <h3>{type}</h3>
        <TextField
          size="small"
          placeholder="Search..."
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead className={styles.header}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id.toString()}
                  align="left"
                  sortDirection={sortBy === column.id ? sortOrder : false}
                >
                  <TableSortLabel
                    active={sortBy === column.id}
                    direction={sortBy === column.id ? sortOrder : "asc"}
                    onClick={() => handleRequestSort(column.id)}
                    className={styles.headerLabel}
                  >
                    {column.label}
                    {sortBy === column.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {sortOrder === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <StyledTableRow
                key={row.id || index}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <TableCell key={column.id.toString()}>
                    {row[column.id]}
                  </TableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {onPageChange && (
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
            Previous
          </Button>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            Page {page} of {totalPages}
          </Box>
          <Button
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
}
