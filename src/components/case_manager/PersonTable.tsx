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
import Link from "next/link";
import { HeadCell, Para, Student, UserKeys } from "./types/table";
import styles from "./styles/Table.module.css";

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

function getComparator(
  order: Order,
  orderBy: UserKeys
): (a: Student | Para, b: Student | Para) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableHeadProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: UserKeys) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell[];
}

function EnhancedTableHead({
  headCells,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}: EnhancedTableHeadProps) {
  const createSortHandler =
    (property: UserKeys) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead
      sx={{
        backgroundColor: "lightgray",
      }}
    >
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
        <h2>{type}</h2>
        <button onClick={onOpenInput}>Add {type}</button>
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

interface EnhancedTableInputProps {
  inputCells: HeadCell[];
  type: "Student" | "Staff";
  onCloseInput: () => void;
}

function EnhancedTableInput({
  inputCells,
  type,
  onCloseInput,
}: EnhancedTableInputProps) {
  return (
    <TableRow>
      <TableCell padding="checkbox">
        <button onClick={onCloseInput}>x</button>
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
        <button type="submit" form="table_input_form">
          Add {type}
        </button>
      </TableCell>
    </TableRow>
  );
}

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "gray",
  },
  "&.MuiTableRow-hover:hover": {
    backgroundColor: "lightgray",
  },
  "&.Mui-selected": {
    backgroundColor: "lightblue",
  },
}));

interface EnhancedTableProps {
  people: Student[] | Para[];
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  headCells: HeadCell[];
  type: "Student" | "Staff";
}

/**
 * exported table component built with MUI displaying either the CM's paras or students, depending on input.
 * @param people - Array of either paras or student objects
 * @param onSubmit - function ran when submitting the person creation form.
 */
export default function EnhancedTable({
  people,
  onSubmit,
  headCells,
  type,
}: EnhancedTableProps) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<UserKeys>("first_name");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [showInput, setShowInput] = useState<boolean>(false);
  // const [page, setPage] = React.useState(0);
  // const [dense, setDense] = React.useState(false);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleOpenInput = () => {
    setShowInput(true);
  };

  const handleCloseInput = () => {
    setShowInput(false);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: UserKeys
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDense(event.target.checked);
  // };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () => stableSort(people, getComparator(order, orderBy)),
    [order, orderBy, people]
  );

  return (
    <Box sx={{ width: "75%" }}>
      <form onSubmit={onSubmit} id="table_input_form"></form>
      <EnhancedTableToolbar
        numSelected={selected.length}
        totalRows={people.length}
        type={type}
        onOpenInput={handleOpenInput}
      />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby={`Table of ${"students/paras"}`}
        >
          <EnhancedTableHead
            headCells={headCells}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={people.length}
          />
          <TableBody>
            {showInput && (
              <EnhancedTableInput
                inputCells={headCells.slice(0, -1)}
                type={type}
                onCloseInput={handleCloseInput}
              />
            )}
            {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(row.email);
              const labelId = `enhanced-table-checkbox-${index}`;

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
                        type === "Student"
                          ? `../students/${row.student_id || ""}`
                          : `../paras/${row.user_id || ""}`
                      }
                    >
                      {row.first_name}
                    </Link>
                  </TableCell>
                  <TableCell align={"left"}>{row.last_name}</TableCell>
                  <TableCell align={"left"}>{row.email}</TableCell>

                  <TableCell align={"left"}>{"temp date"}</TableCell>
                  {type === "Staff" && (
                    <>
                      <TableCell align={"left"}>
                        {row.active_benchmarks || "temp"}
                      </TableCell>
                      <TableCell align={"left"}>
                        {row.last_update || "temp2"}
                      </TableCell>
                      <TableCell align={"left"}>
                        {row.dateAdded || "temp3"}
                      </TableCell>
                    </>
                  )}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
