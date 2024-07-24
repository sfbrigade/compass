import { Stack, Typography, Container, Grid } from "@mui/material";
import { format } from "date-fns";
import $button from "@/components/design_system/button/Button.module.css";
type GoalHeaderProps = {
  goalId: string;
  name: string;
  description: string;
  createdAt: string | Date;
  showEditGoal: () => void;
};

export const GoalHeader = (props: GoalHeaderProps) => {
  return (
    <>
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
      <Grid
        sx={{
          display: "flex",
          flexDirection: "start",
          justifyContent: "start",
          justifyItems: "start",
          height: "100%",
        }}
        item
      >
        <button
          className={$button.tertiary}
          onClick={props.showEditGoal}
          style={{
            margin: "auto",
          }}
        >
          Edit Goal
        </button>
        <button
          className={$button.secondary}
          onClick={() => alert("to be implemented")}
        >
          View all goals
        </button>
      </Grid>
    </>
  );
};
