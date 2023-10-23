import React, { useCallback, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import $table from "./Table.module.css";
import $button from "@/styles/Button.module.css";
import { useRouter } from "next/router";
import { SelectableForTable } from "zapatos/schema";

export type StudentWithIep = SelectableForTable<"student"> &
  SelectableForTable<"iep">;
export type Para = SelectableForTable<"user">;

export interface HeadCell {
  id: string;
  label: string;
  hasInput: boolean;
}

export interface StudentWithIepHeadcell extends HeadCell {
  id: keyof StudentWithIep;
}

export interface ParaHeadCell extends HeadCell {
  id: keyof Para;
}

export function isStudentWithIep(
  person: StudentWithIep | Para
): person is StudentWithIep {
  return (
    (person as StudentWithIep).student_id !== undefined &&
    (person as StudentWithIep).iep_id !== undefined
  );
}

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
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
  headCells: Column[];
}

function EnhancedTableHead<Column extends HeadCell>({
  headCells,
  order,
  orderBy,
  onRequestSort,
}: EnhancedTableHeadProps<Column>) {
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead className={$table.header}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              className={$table.headerLabel}
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
  totalRows: number;
  type: "Student" | "Staff";
  onOpenInput: () => void;
  searchParam: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function EnhancedTableToolbar({
  totalRows,
  type,
  onOpenInput,
  searchParam,
  onSearch,
}: EnhancedTableToolbarProps) {
  return (
    <Toolbar
      sx={{
        pl: { xs: 0 },
        pr: { xs: 0 },
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h2 className={$table.tableTitle}>{type}</h2>
        <button onClick={onOpenInput} className={$button.default}>
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
          {`Total: ${totalRows}`}
        </Typography>
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
          value={searchParam}
          onChange={onSearch}
        />
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
              type={inputCell.id === "grade" ? "number" : "string"}
            />
          </TableCell>
        ) : null;
      })}
      <TableCell>
        <button
          type="submit"
          form="table_input_form"
          className={$button.default}
        >
          Add {type}
        </button>
      </TableCell>
      <TableCell padding="checkbox" align="center">
        <button onClick={onCloseInput} className={$table.closeButton}>
          <CloseIcon />
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
  Person extends StudentWithIep | Para,
  Column extends HeadCell
>({ people, onSubmit, headCells, type }: EnhancedTableProps<Person, Column>) {
  const router = useRouter();

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Person>("first_name");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [searchParam, setSearchParam] = useState<string>("");

  const handleOpenInput = () => {
    setShowInput(true);
  };

  const handleCloseInput = () => {
    setShowInput(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParam(event.target.value);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property as keyof Person);
  };

  const handleLinkToPage = async (link: string) => {
    await router.push(link);
  };

  const filterList = useCallback(
    (list: Person[], searchTerm: string) => {
      const filteredList = list.filter((person) => {
        for (const headCell of headCells) {
          if (
            headCell.id in person &&
            person[headCell.id as keyof Person]?.toString().includes(searchTerm)
          ) {
            return true;
          }
        }
        return false;
      });

      return filteredList;
    },
    [headCells]
  );

  const visibleRows = useMemo(() => {
    const filteredList = filterList(people, searchParam);

    return filteredList.slice().sort(getComparator(order, orderBy));
  }, [order, orderBy, people, searchParam, filterList]);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Form can't be integrated with table (can't span multiple cells), so the form is on the outside with inputs referencing its id */}
      <form onSubmit={onSubmit} id="table_input_form"></form>
      <EnhancedTableToolbar
        totalRows={people.length}
        type={type}
        onOpenInput={handleOpenInput}
        searchParam={searchParam}
        onSearch={handleSearch}
      />
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby={`Table of ${type}s`}>
          <EnhancedTableHead
            headCells={headCells}
            order={order}
            orderBy={orderBy as string}
            onRequestSort={handleRequestSort}
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
              const labelId = row.email;

              return (
                <StyledTableRow
                  hover
                  role="link"
                  tabIndex={-1}
                  key={row.email}
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    handleLinkToPage(
                      isStudentWithIep(row)
                        ? `../students/${row.student_id || ""}`
                        : `../staff/${row.user_id || ""}`
                    )
                  }
                >
                  <TableCell component="th" id={labelId} scope="row">
                    {row.first_name}
                  </TableCell>
                  <TableCell align={"left"}>{row.last_name}</TableCell>
                  <TableCell align={"left"}>{row.email}</TableCell>

                  {isStudentWithIep(row) && (
                    <>
                      <TableCell align={"left"}>{row.grade}</TableCell>
                      <TableCell align={"left"}>
                        {row.end_date?.toDateString().slice(4) || "None"}
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
