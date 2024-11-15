import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import $dropdown from "../dropdown/Dropdown.module.css";

// Both are strings to simplify the data processing.
// If numbers are used, use them as strings instead.
interface MenuItemProp {
  value: string;
  label: string;
}

// selectedOption states are needed to define the chosen item
// [OPTIONAL] labels, classNames, disable for customizations
interface DropdownProps {
  itemList: MenuItemProp[];
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  label?: string;
  className?: string;
  formDisabled?: boolean;
  optionDisabled?: string[];
}

export const Dropdown = ({
  itemList,
  selectedOption,
  setSelectedOption,
  label,
  className,
  formDisabled,
  optionDisabled,
}: DropdownProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value);
  };

  return (
    // Minimum styles used. More can be defined in className.
    <Box sx={{ minWidth: 120, maxWidth: "fit-content" }} className={className}>
      <FormControl fullWidth>
        <InputLabel id="dropdown-label">{label}</InputLabel>
        <Select
          labelId="dropdown-label"
          id="dropdown-select"
          value={selectedOption}
          label={label}
          onChange={handleChange}
          // Allow disabling of form
          disabled={formDisabled}
        >
          {itemList?.map((item) => (
            <MenuItem
              key={item.value}
              value={item.value}
              className={`${
                selectedOption === item.value ? $dropdown.selected : ""
              } ${$dropdown.default}`}
              // Allow disabling of named keys used as an array of strings
              disabled={optionDisabled?.includes(item.value)}
            >
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;
