import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";

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
        gridTemplateColumns: "300px 10px 300px 1fr",
      }}
      key={label}
    >
      <TableCell padding="none" sx={{ padding: "0.5rem" }}>
        {label}
      </TableCell>
      <TableCell padding="none" sx={{ width: "2px" }}>
        :
      </TableCell>
      <TableCell padding="none">
        <TextField
          placeholder={value.toString()}
          onChange={handleInputChange}
          fullWidth
          variant="standard"
          InputProps={{ disableUnderline: true }}
        ></TextField>
      </TableCell>
    </TableRow>
  );
}
