import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";

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
    <Table>
      <TableRow
        sx={{
          display: "grid",
          gridTemplateColumns: "300px 20px 300px",
          alignItems: "center",
        }}
        key={label}
      >
        <TableCell
          padding="none"
          sx={{ verticalAlign: "center", borderBottom: "none" }}
        >
          {label}
        </TableCell>
        <TableCell padding="none" sx={{ borderBottom: "none" }}>
          :
        </TableCell>
        <TableCell padding="none" sx={{ borderBottom: "none" }}>
          <TextField
            size="small"
            defaultValue={value.toString()}
            onChange={handleInputChange}
            sx={{ paddingBottom: "0px" }}
            fullWidth
            variant="standard"
            InputProps={{ disableUnderline: true }}
          ></TextField>
        </TableCell>
      </TableRow>
    </Table>
  );
}
