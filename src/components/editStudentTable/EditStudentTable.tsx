import React, { Dispatch, SetStateAction } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import EditStudentRow from "../editStudentRow/EditStudentRow";

interface EditStudentTableProps {
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  lastName: string;
  setLastName: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  grade: string | number;
  setGrade: Dispatch<SetStateAction<number>>;
  assignCaseManagerId?: string;
}

export default function EditStudentTable({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  grade,
  setGrade,
}: EditStudentTableProps) {
  return (
    <TableContainer>
      <Table aria-label="Edit student table">
        <TableBody>
          <EditStudentRow
            label="First Name"
            value={firstName}
            handleInputChange={(e) => setFirstName(e.target.value)}
          />
          <EditStudentRow
            label="Last Name"
            value={lastName}
            handleInputChange={(e) => setLastName(e.target.value)}
          />
          <EditStudentRow
            label="Grade"
            value={grade}
            handleInputChange={(e) => setGrade(parseInt(e.target.value))}
          />
          <EditStudentRow
            label="Email Address"
            value={email}
            handleInputChange={(e) => setEmail(e.target.value)}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
