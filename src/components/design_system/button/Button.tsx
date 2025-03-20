import { MouseEventHandler, ReactNode } from "react";
import { Button as MuiButton } from "@mui/material";
import classNames from "classnames";

import classes from "./Button.module.css";

type ButtonType = "primary" | "secondary" | "tertiary";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type: ButtonType;
}

function Button({
  children,
  className,
  onClick,
  type = "primary",
}: ButtonProps) {
  return (
    <MuiButton
      className={classNames(
        classes.button,
        classes[`button--${type}`],
        className
      )}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
}

export default Button;
