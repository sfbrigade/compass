import { Chip } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
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
  icon?: ReactElement;
}

function Chips({
  clickable = false,
  color,
  disabled = false,
  size,
  label,
  icon,
  sx = [],
}: ChipsProps) {
  return (
    <Chip
      label={label}
      clickable={clickable}
      color={color}
      disabled={disabled}
      size={size}
      icon={icon}
      sx={sx}
    />
  );
}

export default Chips;
