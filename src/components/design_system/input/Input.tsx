import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

export const TextInput = styled(TextField)<TextFieldProps>(({ theme }) => ({
  "& .MuiInputLabel-outlined": {
    color: "var(--grey-10)",
    "&.Mui-focused": {
      color: "var(--primary)",
    },
  },
  "& .MuiOutlinedInput-root": {
    color: "var(--grey-10)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--primary)",
      borderSize: "1px",
    },
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--primary)",
        borderSize: "2px",
      },
    },
    "&:hover:not(.Mui-focused)": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--grey-10)",
      },
    },
  },
}));
