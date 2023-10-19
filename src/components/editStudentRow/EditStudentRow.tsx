import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";

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
  );
}
