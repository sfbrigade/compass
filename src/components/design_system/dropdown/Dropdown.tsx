import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// Both are strings to simplify the data processing.
// If numbers are used, use them as strings instead.
interface MenuitemClass {
  value: string;
  label: string;
}

// selectedOption states are needed to define the chosen item
// optional labels and classNames for customizations
interface DropdownProps {
  itemList: MenuitemClass[];
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  label?: string;
  className?: string;
  disabled?: boolean;
}

const Dropdown = ({
  itemList,
  selectedOption,
  setSelectedOption,
  label,
  className,
  disabled,
}: DropdownProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, maxWidth: "fit-content" }} className={className}>
      <FormControl fullWidth>
        <InputLabel id="dropdown-label">{label}</InputLabel>
        <Select
          labelId="dropdown-label"
          id="dropdown-select"
          value={selectedOption}
          label={label}
          onChange={handleChange}
          disabled={disabled}
        >
          {itemList?.map((item) => (
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
