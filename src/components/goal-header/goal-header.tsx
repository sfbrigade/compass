import { Stack, Typography } from "@mui/material";
import { format } from "date-fns";

type GoalHeaderProps = {
  goalId: string;
  name: string;
  description: string;
  createdAt: string | Date;
};

export const GoalHeader = (props: GoalHeaderProps) => {
  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="h3" color="var(--primary-40)">
          {props.name}
        </Typography>
        <Typography variant="h3">|</Typography>
        <Typography variant="h3" color="#788591">
          Added: {format(new Date(props.createdAt), "MM/dd/yyyy")}
        </Typography>
      </Stack>

      <Typography variant="body1">{props.description}</Typography>
    </Stack>
  );
};
