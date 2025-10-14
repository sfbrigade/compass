import { Chip as MuiChip } from "@mui/material";
import { SxProps, Theme } from "@mui/material";
import classes from "./Chip.module.css";
import { ReactElement } from "react";

interface ChipProps {
  clickable?: boolean;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  disabled?: boolean;
  size?: "small" | "medium";
  sx?: SxProps<Theme>;
  label?: string | number;
  variant?: "filled" | "outlined";
  icon?: ReactElement;
  className?: string;
}

function Chip({
  clickable = false,
  color,
  disabled = false,
  size,
  label,
  variant,
  icon,
  className,
  sx = [],
}: ChipProps) {
  return (
    <MuiChip
      label={label}
      clickable={clickable}
      color={color}
      disabled={disabled}
      size={size}
      variant={variant}
      icon={icon}
      className={classes[className as keyof typeof classes]}
      sx={sx}
    />
  );
}

export default Chip;
