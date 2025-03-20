import { ReactNode } from "react";
import {
  Card as MuiCard,
  CardActions as MuiCardActions,
  CardContent as MuiCardContent,
  Stack,
  Typography,
} from "@mui/material";

import classes from "./Card.module.css";

interface CardProps {
  header: string;
  eyebrow: string;
  children: ReactNode;
  button: string;
}

function Card({ header, eyebrow, children, button }: CardProps) {
  return (
    <MuiCard className={classes.card}>
      <MuiCardContent>
        <Stack direction="row" className={classes.card__header}>
          <Typography variant="h4" className={classes.card__title}>
            {header}
          </Typography>
          <Typography variant="caption" className={classes.card__eyebrow}>
            {eyebrow}
          </Typography>
        </Stack>
        <Typography variant="body2" className={classes.card__body}>
          {children}
        </Typography>
      </MuiCardContent>
      <MuiCardActions>
        <button>{button}</button>
      </MuiCardActions>
    </MuiCard>
  );
}

export default Card;
