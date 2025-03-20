import { MouseEventHandler, ReactNode } from "react";
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Stack,
  Typography,
} from "@mui/material";

import Button from "../button/Button";

import classes from "./Card.module.css";

interface CardProps {
  header?: string;
  eyebrow?: string;
  children: ReactNode;
  button?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Card({ header, eyebrow, children, button, onClick }: CardProps) {
  return (
    <MuiCard className={classes.card}>
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
