/** DESIGN SYSTEM COMPONENT PLACEHOLDER
 * 1) Make a local branch for organizing your component (e.g. "design-systems-button")
 * 2) Replace this file and the corresponding css file(s) with your component file(s), cleaning up any duplicate files that are outside of the design components folder.
 * 3) Search and find all use cases for your component (likely linting will tell you where they are) and update the import paths
 * 4) Check code for errors and delete this comment
 * 5) Push code to branch and do a PR referencing the specific issue task you took for issue # 255.
 * NOTE: If you want a css.d.ts file to be generated or updated to help with any type issues, you can run `npm run type-css`
 * */
// export {};

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

// Both are strings to simplify the data processing.
// If numbers are used, use them as strings instead.
interface MenuItemProp {
  value: string;
  label: string;
}

// optional labels and classNames for customizations
interface DropdownProps {
  selectItems: MenuItemProp[];
  label?: string;
  className?: string;
}

const Dropdown = ({ selectItems, label, className }: DropdownProps) => {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, maxWidth: "fit-content" }} className={className}>
      <FormControl fullWidth>
        <InputLabel id="dropdown-label">{label}</InputLabel>
        <Select
          labelId="dropdown-label"
          id="dropdown-select"
          value={age}
          label={label}
          onChange={handleChange}
        >
          {selectItems?.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;
