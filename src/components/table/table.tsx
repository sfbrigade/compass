import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  Toolbar,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Typography,
  TextField,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";

import CloseIcon from "@mui/icons-material/Close";
import $table from "./Table.module.css";
import { useRouter } from "next/router";
import { SelectableForTable } from "zapatos/schema";
import emptyState from "../../public/img/empty-state.png";
import Container from "@mui/material/Container";
import Image from "next/image";

import Search from "../design_system/search/Search";

import Button from "@/components/design_system/button/Button";

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
              className={`${$table.headerLabel}`}
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
  type: "Students" | "Staff";
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
    <>
      {totalRows === 0 && type === "Students" ? (
        <h2 className={$table.tableTitle}>{type}</h2>
      ) : (
        <Toolbar
          sx={{
            pl: { xs: 0 },
            pr: { xs: 0 },
            mb: "0.625rem",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "4rem",
            }}
          >
            <h3 className={$table.tableTitle}>{type}</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Search
                id="search-input"
                value={searchParam}
                onChange={onSearch}
                sx={{ mr: "2rem" }}
              />
              <Button onClick={onOpenInput}>Add {type}</Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              color="var(--grey-30)"
              variant="subtitle1"
              component="div"
            >
              {`Added ${type}: ${totalRows}`}
            </Typography>
          </div>
        </Toolbar>
      )}
    </>
  );
}

interface EnhancedTableInputProps<Column> {
  inputCells: Column[];
  type: "Students" | "Staff";
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
              slotProps={{
                htmlInput: {
                  form: "table_input_form",
                  name: inputCell.id,
                },
              }}
              type={inputCell.id === "grade" ? "number" : "string"}
            />
          </TableCell>
        ) : null;
      })}
      <TableCell>
        <Button type="submit" form="table_input_form">
          Add {type}
        </Button>
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
    backgroundColor: "var(--grey-90)",
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
  type: "Students" | "Staff";
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
  Column extends HeadCell,
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
      {people.length === 0 && !showInput && type === "Students" && (
        <Container sx={{ marginTop: "4rem" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            gap={1.5}
          >
            <Image src={emptyState} alt="empty roster" width={250} />
            <p>You have no {type.toLowerCase()} yet</p>
            <p style={{ color: "var(--grey-20)", textAlign: "center" }}>
              Start building your roster by adding a {type.toLocaleLowerCase()}.
            </p>
            <Button onClick={() => setShowInput(true)}>Add {type}</Button>
          </Box>
        </Container>
      )}

      {(people.length || showInput || type === "Staff") && (
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
                      {/* This condition ONLY refers to case managers assuming
                      that case manager object has 2 less keys than a para.
                      Can change as needed*/}
                      {!isStudentWithIep(row) &&
                        Object.keys(row).length < 9 &&
                        " (me)"}
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
      )}
    </Box>
  );
}
