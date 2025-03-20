import { MouseEventHandler, ReactNode } from "react";
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Stack,
  Typography,
} from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import classNames from "classnames";

import Button from "../button/Button";

import classes from "./Card.module.css";

interface CardProps {
  button?: string;
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  header?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  sx?: SxProps<Theme>;
}

function Card({
  button,
  children,
  className,
  eyebrow,
  header,
  onClick,
  sx = [],
}: CardProps) {
  return (
    <MuiCard className={classNames(classes.card, className)} sx={sx}>
      <MuiCardContent sx={{ paddingBottom: "1rem !important" }}>
        <Stack direction="row" className={classes.card__header}>
          <Typography
            component="h4"
            variant="h4"
            className={classes.card__title}
          >
            {header ?? ""}
          </Typography>
          <Typography variant="caption" className={classes.card__eyebrow}>
            {eyebrow ?? ""}
          </Typography>
        </Stack>
        <Typography variant="body2" className={classes.card__body}>
          {children}
        </Typography>
        {button && (
          <Button
            type="primary"
            className={classes.card__button}
            onClick={onClick}
          >
            {button}
          </Button>
        )}
      </MuiCardContent>
    </MuiCard>
  );
}

export default Card;
