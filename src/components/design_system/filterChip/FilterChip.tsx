import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import { ButtonBase, Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import classNames from "classnames";

import DropdownMenu, {
  DropdownMenuOption,
} from "@/components/design_system/dropdownMenu/DropdownMenu";
import classes from "./FilterChip.module.css";

interface FilterChipProps {
  className?: string;
  disabled?: boolean;
  label?: string;
  onClick?: (option?: DropdownMenuOption) => void;
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

  function onButtonClickInternal(event: MouseEvent<HTMLButtonElement>) {
    if (options) {
      setMinWidth(event.currentTarget.offsetWidth);
      setOpen(!open);
    } else if (onClick) {
      onClick?.();
    }
  }

  function onDropdownClickInternal(option: DropdownMenuOption) {
    setOpen(false);
    onClick?.(option);
  }

  let selectedOption: DropdownMenuOption | undefined;
  if (selectedValue && options) {
    selectedOption = options.find((option) => option.value === selectedValue);
  }

  return (
    <>
      <ButtonBase
        className={classNames(
          classes["filter-chip"],
          {
            [classes["filter-chip--selected"]]: selected || !!selectedOption,
            [classes["filter-chip--dropdown"]]: options,
          },
          className
        )}
        disabled={disabled}
        disableRipple={true}
        onClick={onButtonClickInternal}
        ref={buttonRef}
        sx={sx}
      >
        {(selected || !!selectedOption) && (
          <CheckIcon className={classes["filter-chip__icon"]} />
        )}
        <Typography className={classes["filter-chip__label"]} variant="button">
          {selectedOption ? selectedOption.label : label}
        </Typography>
        {options && <ExpandMoreIcon className={classes["filter-chip__icon"]} />}
      </ButtonBase>
      {options && (
        <DropdownMenu
          anchorEl={buttonRef.current}
          minWidth={minWidth}
          open={open}
          onClick={onDropdownClickInternal}
          onClose={() => setOpen(false)}
          options={options}
          selectedValue={selectedValue}
        />
      )}
    </>
  );
}

export default FilterChip;
