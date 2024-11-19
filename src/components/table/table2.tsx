import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
  TableSortLabel,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import SearchIcon from "@mui/icons-material/Search";
import { TableProps, UserBase } from "./types";
import { renderTableInput, renderTableCell } from "./renderers";
import $table from "./Table.module.css";
import $button from "@/components/design_system/button/Button.module.css";

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "var(--grey-90)",
  },
  "&:hover": {
    backgroundColor: "lightgray",
    cursor: "pointer",
  },
}));

export function Table2<T extends UserBase>({
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
  onAdd,
  showAddRow = false,
}: TableProps<T>) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [newRowData, setNewRowData] = useState<Partial<T>>({});
  const [isAddingRow, setIsAddingRow] = useState(false);

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

  const handleAddRow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onAdd) {
      await onAdd(newRowData as Omit<T, "id">);
      setIsAddingRow(false);
      setNewRowData({});
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          size="small"
          placeholder={`Search ${type}`}
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />
        {showAddRow && !isAddingRow && (
          <button
            onClick={() => setIsAddingRow(true)}
            className={$button.default}
          >
            Add {type}
          </button>
        )}
      </Box>

      <TableContainer>
        <Table>
          <TableHead className={$table.header}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id.toString()}>
                  <TableSortLabel
                    active={sortBy === column.id}
                    direction={sortBy === column.id ? sortOrder : "asc"}
                    onClick={() => handleRequestSort(column.id)}
                    className={$table.headerLabel}
                  >
                    {column.label}
                    {sortBy === column.id && (
                      <Box component="span" sx={visuallyHidden}>
                        {sortOrder === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    )}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isAddingRow && (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <form onSubmit={handleAddRow}>
                    <Box
                      sx={{ display: "flex", gap: 2, alignItems: "flex-end" }}
                    >
                      {columns.map((column) => (
                        <Box key={column.id.toString()}>
                          {renderTableInput<T>(
                            column,
                            newRowData[column.id],
                            (value) =>
                              setNewRowData((prev) => ({
                                ...prev,
                                [column.id]: value,
                              }))
                          )}
                        </Box>
                      ))}
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button type="submit" variant="contained" size="small">
                          Add
                        </Button>
                        <Button
                          onClick={() => {
                            setIsAddingRow(false);
                            setNewRowData({});
                          }}
                          size="small"
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  </form>
                </TableCell>
              </TableRow>
            )}
            {data.map((row) => (
              <StyledTableRow
                key={row.id || row.email}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <TableCell key={column.id.toString()}>
                    {renderTableCell(column, row[column.id])}
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
