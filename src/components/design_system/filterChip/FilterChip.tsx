import { MouseEventHandler } from "react";
import { ButtonBase, Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import classNames from "classnames";

import classes from "./FilterChip.module.css";

interface FilterChipProps {
  className?: string;
  disabled?: boolean;
  label?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  selected?: boolean;
  sx?: SxProps<Theme>;
}

function FilterChip({
  className,
  disabled,
  label,
  onClick,
  selected,
  sx = [],
}: FilterChipProps) {
  return (
    <ButtonBase
      className={classNames(
        classes["filter-chip"],
        { [classes["filter-chip--selected"]]: selected },
        className
      )}
      disabled={disabled}
      disableRipple={true}
      onClick={onClick}
      sx={sx}
    >
      {selected && <CheckIcon className={classes["filter-chip__icon"]} />}
      <Typography className={classes["filter-chip__label"]} variant="button">
        {label}
      </Typography>
    </ButtonBase>
  );
}

export default FilterChip;
