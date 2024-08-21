import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

export const SearchBar = styled(TextField)<TextFieldProps>(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    color: "var(--grey-30)",
    marginRight: "10px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "30px",
      borderColor: "var(--primary)",
      borderSize: "1px",
      height: "56px",
      color: "var(--primary)",
    },
    "&:hover:not(.Mui-focused)": {
      color: "var(--primary)",

      borderColor: "var(--primary)",
      backgroundColor: "var(--primary-99)",
      borderRadius: "30px",
    },
    "&.Mui-focused": {
      color: "var(--grey-30)",
      backgroundColor: "var(--primary-99)",
      borderRadius: "30px",
      borderColor: "var(--primary)",
    },
  },
}));
