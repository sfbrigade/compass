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
        gridTemplateColumns: "300px 20px 300px",
      }}
      key={label}
    >
      <TableCell
        padding="none"
        sx={{ alignItems: "center", borderBottom: "none" }}
      >
        {label}
      </TableCell>
      <TableCell padding="none" sx={{ width: "16px", borderBottom: "none" }}>
        :
      </TableCell>
      <TableCell
        padding="none"
        sx={{ borderBottom: "none", paddingBottom: "none" }}
      >
        <TextField
          size="small"
          placeholder={value.toString()}
          onChange={handleInputChange}
          sx={{ paddingBottom: "0px" }}
          fullWidth
          variant="standard"
          InputProps={{ disableUnderline: true }}
        ></TextField>
      </TableCell>
    </TableRow>
  );
}
