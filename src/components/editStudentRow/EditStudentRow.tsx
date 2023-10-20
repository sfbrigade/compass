import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

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
  );
}
