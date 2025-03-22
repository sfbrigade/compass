import { Avatar, ButtonBase } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";

import classes from "./ButtonIcon.module.css";

interface ButtonIconProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  sx?: SxProps<Theme>;
}

function ButtonIcon({
  children,
  className,
  disabled,
  onClick,
  sx,
}: ButtonIconProps) {
  return (
    <ButtonBase
      className={classNames(classes["button-icon"], className)}
      disabled={disabled}
      disableRipple={true}
      onClick={onClick}
      sx={sx}
    >
      <Avatar className={classes["button-icon__background"]}>{children}</Avatar>
    </ButtonBase>
  );
}

export default ButtonIcon;
