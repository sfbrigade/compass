import { MouseEventHandler, ReactNode } from "react";
import { Button as MuiButton } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import classNames from "classnames";

import classes from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  form?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  sx?: SxProps<Theme>;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "tertiary";
}

function Button({
  children,
  className,
  disabled,
  form,
  onClick,
  sx = [],
  type,
  variant = "primary",
}: ButtonProps) {
  return (
    <MuiButton
      className={classNames(
        classes.button,
        classes[`button--${variant}`],
        className
      )}
      disabled={disabled}
      form={form}
      onClick={onClick}
      sx={sx}
      type={type}
    >
      {children}
    </MuiButton>
  );
}

export default Button;
