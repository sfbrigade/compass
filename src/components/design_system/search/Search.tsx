import { InputBase, InputBaseProps } from "@mui/material";
import { Clear as ClearIcon, Search as SearchIcon } from "@mui/icons-material";

import classNames from "classnames";

import classes from "./Search.module.css";

const Search = ({ className, ...inputBaseProps }: InputBaseProps) => {
  inputBaseProps.placeholder = inputBaseProps.placeholder || "Search";
  inputBaseProps.slotProps = {
    ...inputBaseProps.slotProps,
    input: {
      ...inputBaseProps.slotProps?.input,
      className: classes.search__input,
      size: 8,
    },
  };
  inputBaseProps.startAdornment = inputBaseProps.startAdornment || (
    <SearchIcon className={classes.search__icon} />
  );
  if (inputBaseProps.value) {
    const onClick = () => {
      if (inputBaseProps.onChange) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
        inputBaseProps.onChange({ target: { value: "" } } as any);
      }
    };
    inputBaseProps.endAdornment = inputBaseProps.endAdornment || (
      <ClearIcon className={classes.search__icon} onClick={onClick} />
    );
  }
  return (
    <InputBase
      className={classNames(classes.search, className)}
      {...inputBaseProps}
    />
  );
};

export default Search;
