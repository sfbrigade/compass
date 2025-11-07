import { MouseEventHandler, ReactNode } from "react";
import { Button as MuiButton } from "@mui/material";
import { SxProps, Theme } from "@mui/material";
import classNames from "classnames";

import classes from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  form?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: "small" | "large";
  sx?: SxProps<Theme>;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "tertiary";
  startIcon?: ReactNode;
}

function Button({
  children,
  className,
  disabled,
  form,
  onClick,
  size = "large",
  sx = [],
  type,
  variant = "primary",
  startIcon,
}: ButtonProps) {
  return (
    <MuiButton
      className={classNames(
        classes.button,
        classes[`button--${size}`],
        classes[`button--${variant}`],
        className
      )}
      disabled={disabled}
      form={form}
      onClick={onClick}
      sx={sx}
      type={type}
      startIcon={startIcon}
    >
      {children}
    </MuiButton>
  );
}

export default Button;
