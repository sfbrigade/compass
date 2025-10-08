import { Chip as MuiChip } from "@mui/material";
import { SxProps, Theme } from "@mui/material";
import { ReactElement } from "react";

interface ChipsProps {
  clickable?: boolean;
  color:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  disabled?: boolean;
  size: "small" | "medium";
  sx?: SxProps<Theme>;
  label?: string | number;
  variant?: "filled" | "outlined";
  icon?: ReactElement;
}

function Chips({
  clickable = false,
  color,
  disabled = false,
  size,
  label,
  variant,
  icon,
  sx = [],
}: ChipsProps) {
  return (
    <MuiChip
      label={label}
      clickable={clickable}
      color={color}
      disabled={disabled}
      size={size}
      variant={variant}
      icon={icon}
      sx={sx}
    />
  );
}

export default Chips;
