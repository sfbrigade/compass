import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Input, InputBase, InputBaseProps } from "@mui/material";

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
      color: "var(--grey-30)",
      borderColor: "var(--primary)",

      borderRadius: "30px",
    },
    "&.Mui-focused": {
      color: "var(--primary)",

      borderRadius: "30px",
      borderColor: "var(--primary)",
      "& .MuiInputAdornment-outlined": {
        color: "var(--primary)",
        zIndex: 10,
      },
      "& > fieldset": {
        background: "var(--primary-99)",
      },
      "& .MuiOutlinedInput-input": {
        zIndex: 10,
      },
    },
    "&:hover": {
      "& > fieldset": {
        background: "var(--primary-99)",
      },
      "& .MuiOutlinedInput-input": {
        zIndex: 10,
      },
      "& .MuiInputAdornment-outlined": {
        zIndex: 10,
      },
    },
  },
}));
