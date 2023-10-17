import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";

const data = [
  { label: "First Name", value: "David" },
  { label: "Last Name", value: "Belinda" },
  { label: "Date of Birth", value: "08/18/2010" },
  { label: "Grade", value: "5" },
  { label: "Email Address", value: "abc@gmail.com" },
];

export default function EditStudentTable() {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.label}
              // sx={{
              //   padding: "8px"
              // }}
            >
              <TableCell padding="none" sx={{ padding: "1rem" }}>
                {row.label}
              </TableCell>
              <Box sx={{ width: "2px", padding: "1rem" }}>:</Box>
              <TableCell padding="none" sx={{ padding: "1rem" }}>
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
