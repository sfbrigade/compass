import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
<<<<<<< HEAD
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
=======
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
>>>>>>> 1f29e03 (Refactor EditStudentTable - remove row logic and make into separate component EditStudentRow. Create state for each input item in student_id.tsx. Create types for all props in EditStudentTable and EditStudentRow.)

interface EditStudentRowProps {
  label: string;
  value: string | number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EditStudentRow({
  label,
  value,
  handleInputChange,
}: EditStudentRowProps) {
  return (
<<<<<<< HEAD
    <Table>
      <TableBody>
        <TableRow
          sx={{
            display: "grid",
            gridTemplateColumns: "200px 30px 300px",
            padding: "8px 0px",
          }}
          key={label}
        >
          <TableCell
            padding="none"
            sx={{ alignItems: "center", borderBottom: "none" }}
          >
            {label}
          </TableCell>
          <TableCell
            padding="none"
            sx={{ width: "16px", borderBottom: "none" }}
          >
            :
          </TableCell>
          <TableCell
            padding="none"
            sx={{ borderBottom: "none", paddingBottom: "none" }}
          >
            <input
              placeholder={value.toString()}
              style={{
                border: "none",
                borderBottom: "none",
                width: "100%",
                outline: "none",
                fontSize: "16px",
              }}
              onChange={handleInputChange}
            ></input>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
=======
    <TableRow
      sx={{
        display: "grid",
        gridTemplateColumns: "300px 100px 300px 1fr",
      }}
      key={label}
    >
      <TableCell padding="none" sx={{ padding: "1rem" }}>
        {label}
      </TableCell>
      <Box sx={{ width: "2px", padding: "1rem" }}>:</Box>
      <Input
        placeholder={value.toString()}
        onChange={handleInputChange}
      ></Input>
    </TableRow>
>>>>>>> 1f29e03 (Refactor EditStudentTable - remove row logic and make into separate component EditStudentRow. Create state for each input item in student_id.tsx. Create types for all props in EditStudentTable and EditStudentRow.)
  );
}
