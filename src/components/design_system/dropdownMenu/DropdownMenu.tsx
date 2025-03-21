import {
  Menu,
  MenuItem,
  PopoverVirtualElement,
  Typography,
} from "@mui/material";
import classNames from "classnames";

import classes from "./DropdownMenu.module.css";

export interface DropdownMenuOption {
  label: string;
  value: string;
}

interface DropdownMenuProps {
  anchorEl?:
    | Element
    | (() => Element)
    | PopoverVirtualElement
    | (() => PopoverVirtualElement)
    | null
    | undefined;
  backdropDisabled?: boolean;
  className?: string;
  minWidth?: number;
  onClose?: ({
    event,
    reason,
  }: {
    event: unknown;
    reason: "escapeKeyDown" | "backdropClick" | "tabKeyDown";
  }) => void;
  open: boolean;
  options: DropdownMenuOption[];
}

function DropdownMenu({
  anchorEl,
  backdropDisabled = false,
  className,
  minWidth = 0,
  onClose,
  open,
  options,
}: DropdownMenuProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      disableScrollLock={backdropDisabled}
      hideBackdrop={backdropDisabled}
      open={open}
      onClose={onClose}
      slotProps={{
        list: { className: classNames(classes["dropdown-menu"], className) },
        paper: {
          elevation: 1,
          sx: { mt: "2px", pointerEvents: "auto", minWidth },
        },
        root: { sx: { pointerEvents: backdropDisabled ? "none" : "auto" } },
      }}
    >
      {options.map((option) => (
        <MenuItem className={classes["dropdown-menu__item"]} key={option.value}>
          <Typography variant="button">{option.label}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default DropdownMenu;
