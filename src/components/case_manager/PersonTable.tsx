import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { isStudent, HeadCell, Student, Para } from "./types/table";
import styles from "./styles/Table.module.css";
import Link from "next/link";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<T>(
  order: Order,
  orderBy: keyof T
): (a: T, b: T) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface EnhancedTableHeadProps<Column> {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: Column[];
}

function EnhancedTableHead<Column extends HeadCell>({
  headCells,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}: EnhancedTableHeadProps<Column>) {
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead className={styles.header}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            // possible 'none' for padding
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              className={styles.headerLabel}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  totalRows: number;
  type: "Student" | "Staff";
  onOpenInput: () => void;
}

function EnhancedTableToolbar({
  numSelected,
  totalRows,
  type,
  onOpenInput,
}: EnhancedTableToolbarProps) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 0 },
        pr: { xs: 0, sm: 0 },
        flexDirection: "column",
        ...(numSelected > 0 && {
          // Change this later
          bgcolor: "pink",
        }),
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h2 className={styles.tableTitle}>{type}</h2>
        <button onClick={onOpenInput} className={styles.addButton}>
          Add {type}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography color="inherit" variant="subtitle1" component="div">
          {numSelected > 0
            ? `Selected: ${numSelected}/${totalRows}`
            : `Total: ${totalRows}`}
        </Typography>

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <TextField
            id="search-input"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        )}
      </div>
    </Toolbar>
  );
}

interface EnhancedTableInputProps<Column> {
  inputCells: Column[];
  type: "Student" | "Staff";
  onCloseInput: () => void;
}

function EnhancedTableInput<Column extends HeadCell>({
  inputCells,
  type,
  onCloseInput,
}: EnhancedTableInputProps<Column>) {
  return (
    <TableRow>
      <TableCell padding="checkbox" align="center">
        <button onClick={onCloseInput} className={styles.closeButton}>
          <CloseIcon />
        </button>
      </TableCell>
      {inputCells.map((inputCell, idx) => {
        return inputCell.hasInput ? (
          <TableCell key={inputCell.id} align={"left"}>
            <TextField
              label={inputCell.label}
              autoFocus={idx === 0}
              required
              size="small"
              inputProps={{
                form: "table_input_form",
                name: inputCell.id,
              }}
            />
          </TableCell>
        ) : null;
      })}
      <TableCell>
        <button
          type="submit"
          form="table_input_form"
          className={styles.addButton}
        >
          Add {type}
        </button>
      </TableCell>
    </TableRow>
  );
}

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F8F9FA",
  },
  "&.MuiTableRow-hover:hover": {
    backgroundColor: "lightgray",
  },
  "&.Mui-selected": {
    backgroundColor: "lightblue",
  },
}));

interface EnhancedTableProps<Person, Column> {
  people: Person[];
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  headCells: Column[];
  type: "Student" | "Staff";
}

/**
 * exported table component built with MUI displaying either the CM's paras or students, depending on input.
 * @param people - Array of either paras or student objects
 * @param onSubmit - function ran when submitting the person creation form.
 * @param headCells - Array of headCell objects, defining columns
 * @param type - type of table: either student or staff
 */
export default function EnhancedTable<
  Person extends Student | Para,
  Column extends HeadCell
>({ people, onSubmit, headCells, type }: EnhancedTableProps<Person, Column>) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Person>("first_name");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [showInput, setShowInput] = useState<boolean>(false);

  const handleOpenInput = () => {
    setShowInput(true);
  };

  const handleCloseInput = () => {
    setShowInput(false);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property as keyof Person);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = people.map((n) => n.email);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, email: string) => {
    const selectedIndex = selected.indexOf(email);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, email);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const visibleRows = React.useMemo(() => {
    return people.slice().sort(getComparator(order, orderBy));
  }, [order, orderBy, people]);

  return (
    <Box sx={{ width: "75%" }}>
      {/* Form can't be integrated with table (can't span multiple cells), so the form is on the outside with inputs referencing its id */}
      <form onSubmit={onSubmit} id="table_input_form"></form>
      <EnhancedTableToolbar
        numSelected={selected.length}
        totalRows={people.length}
        type={type}
        onOpenInput={handleOpenInput}
      />
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby={`Table of ${type}s`}>
          <EnhancedTableHead
            headCells={headCells}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy as string}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={people.length}
          />
          <TableBody>
            {showInput && (
              <EnhancedTableInput
                inputCells={headCells}
                type={type}
                onCloseInput={handleCloseInput}
              />
            )}
            {visibleRows.map((row) => {
              const isItemSelected = isSelected(row.email);
              const labelId = row.email;

              return (
                <StyledTableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.email}
                  selected={isItemSelected}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                      onClick={(event) => handleClick(event, row.email)}
                    />
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row">
                    <Link
                      href={
                        isStudent(row)
                          ? `../students/${row.student_id || ""}`
                          : `../paras/${row.user_id || ""}`
                      }
                    >
                      {row.first_name}
                    </Link>
                  </TableCell>
                  <TableCell align={"left"}>{row.last_name}</TableCell>
                  <TableCell align={"left"}>{row.email}</TableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
