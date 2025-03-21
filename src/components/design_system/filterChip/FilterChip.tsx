import { useRef, useState, MouseEvent, MouseEventHandler } from "react";
import { ButtonBase, Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import classNames from "classnames";

import DropdownMenu, {
  DropdownMenuOption,
} from "@/components/design_system/dropdownMenu/DropdownMenu";
import classes from "./FilterChip.module.css";

interface FilterChipProps {
  className?: string;
  disabled?: boolean;
  label?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  options?: DropdownMenuOption[];
  selected?: boolean;
  selectedValue?: string;
  sx?: SxProps<Theme>;
}

function FilterChip({
  className,
  disabled,
  label,
  onClick,
  options,
  selected,
  selectedValue,
  sx = [],
}: FilterChipProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [minWidth, setMinWidth] = useState(0);

  function onClickInternal(event: MouseEvent<HTMLButtonElement>) {
    if (options) {
      setMinWidth(event.currentTarget.offsetWidth);
      setOpen(!open);
    } else if (onClick) {
      onClick?.(event);
    }
  }

  return (
    <>
      <ButtonBase
        className={classNames(
          classes["filter-chip"],
          { [classes["filter-chip--selected"]]: selected },
          className
        )}
        disabled={disabled}
        disableRipple={true}
        onClick={onClickInternal}
        ref={buttonRef}
        sx={sx}
      >
        {(selected || selectedValue) && (
          <CheckIcon className={classes["filter-chip__icon"]} />
        )}
        <Typography className={classes["filter-chip__label"]} variant="button">
          {label}
        </Typography>
      </ButtonBase>
      {options && (
        <DropdownMenu
          anchorEl={buttonRef.current}
          minWidth={minWidth}
          open={open}
          onClose={() => setOpen(false)}
          options={options}
        />
      )}
    </>
  );
}

export default FilterChip;
