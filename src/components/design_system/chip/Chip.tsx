import { Chip as MuiChip } from "@mui/material";
import { SxProps, Theme } from "@mui/material";
import { ReactElement } from "react";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

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
  variant?:
    | "filled"
    | "outlined"
    | "primary"
    | "secondary"
    | "calendar"
    | "task";
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
      icon={
        variant === "calendar" ? (
          <CalendarMonthOutlinedIcon style={{ color: "black" }} />
        ) : variant === "task" ? (
          <ContentPasteIcon
            style={{
              color: "black",
              width: "16px",
              gap: "8px",
            }}
          />
        ) : (
          icon
        )
      }
      className={className}
      sx={sx}
    />
  );
}

export default Chip;
