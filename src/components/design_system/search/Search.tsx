import { InputBase, InputBaseProps } from '@mui/material';
import { Search as SearchIcon } from "@mui/icons-material";

import classNames from 'classnames';

import classes from './Search.module.css';

interface SearchProps extends InputBaseProps {

}

const Search = ({ className, ...inputBaseProps}: SearchProps) => {
  inputBaseProps.placeholder = inputBaseProps.placeholder || 'Search';
  inputBaseProps.slotProps = { ...inputBaseProps.slotProps, input: { ...inputBaseProps.slotProps?.input, className: classes.search__input, size: 8 } };
  inputBaseProps.startAdornment = inputBaseProps.startAdornment || <SearchIcon className={classes.search__icon} />;
  return <InputBase className={classNames(classes.search, className)} {...inputBaseProps} />
}

export default Search;
