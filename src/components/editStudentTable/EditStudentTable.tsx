import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";

interface StudentType {
  first_name: string;
  last_name: string;
  email: string;
  grade: number;
}

interface EditStudentTableProps {
  student: StudentType;
}

export default function EditStudentTable({ student }: EditStudentTableProps) {
  const { first_name, last_name, email, grade } = student;

  const data = [
    { label: "First Name", value: first_name },
    { label: "Last Name", value: last_name },
    { label: "Date of Birth", value: "08/18/2010" },
    { label: "Grade", value: grade },
    { label: "Email Address", value: email },
  ];

  // console.log("student in EditStudentTable: ", student);
  return (
    <TableContainer>
      <Table aria-label="Edit student table">
        <TableBody>
          {data.map((row) => (
            <TableRow
              sx={{
                display: "grid",
                gridTemplateColumns: "300px 100px 300px 1fr",
              }}
              key={row.label}
            >
              <TableCell padding="none" sx={{ padding: "1rem" }}>
                {row.label}
              </TableCell>
              <Box sx={{ width: "2px", padding: "1rem" }}>:</Box>
              <Input placeholder={row.value.toString()}></Input>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
