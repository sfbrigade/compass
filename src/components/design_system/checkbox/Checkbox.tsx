/** DESIGN SYSTEM COMPONENT PLACEHOLDER
 * 1) Make a local branch for organizing your component (e.g. "design-systems-button")
 * 2) Replace this file and the corresponding css file(s) with your component file(s), cleaning up any duplicate files that are outside of the design components folder.
 * 3) Search and find all use cases for your component (likely linting will tell you where they are) and update the import paths
 * 4) Check code for errors and delete this comment
 * 5) Push code to branch and do a PR referencing the specific issue task you took for issue # 255.
 * NOTE: If you want a css.d.ts file to be generated or updated to help with any type issues, you can run `npm run type-css`
 * */

import { Checkbox } from "@mui/material";
import { alpha, styled } from "@mui/material";
// import React from "react";
import $checkbox from "./Checkbox.module.css";

const DSCheckbox = styled(Checkbox)(() => ({
  color: "#20159e",
  "&.Mui-indeterminate": {
    backgroundColor: "#c2bdf9",
  },
  "&.Mui-pressed": {},
  "&.Mui-checked": {
    color: "#20159e",
  },
}));

export default DSCheckbox;
