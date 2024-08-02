import {
  Stack,
  Typography,
  Grid,
  Container,
  TextField,
  Box,
} from "@mui/material";
import { format } from "date-fns";
import $button from "@/components/design_system/button/Button.module.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import { trpc } from "@/client/lib/trpc";
import $GoalPage from "@/styles/GoalPage.module.css";
type GoalHeaderProps = {
  goalId: string;
  name: string;
  description: string;
  createdAt: string | Date;
};

export const GoalHeader = (props: GoalHeaderProps) => {
  const [editGoal, setEditGoal] = useState(false);
  const [editGoalInput, setEditGoalInput] = useState("");
  const utils = trpc.useContext();
  const showEditGoal = () => {
    setEditGoal(true);
    setEditGoalInput(props.description || "");
  };

  // TODO: modify callbacks for toast notification
  const editMutation = trpc.iep.editGoal.useMutation({
    onSuccess: () => utils.iep.getGoal.invalidate(),
    onError: (err) => console.log({ err }),
  });

  const submitEditGoal = () => {
    editMutation.mutate({
      goal_id: props.goalId,
      description: editGoalInput,
    });
    setEditGoal(false);
    setEditGoalInput("");
  };

  const cancelEditGoal = () => {
    setEditGoal(false);
    setEditGoalInput("");
  };
  return (
    <Container className={$GoalPage.goalDescriptionContainer}>
      <Grid container justifyContent="space-between">
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
        </Stack>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "start",
            justifyContent: "start",
            justifyItems: "start",
            height: "100%",
            pb: 1,
          }}
          item
        >
          {!editGoal && (
            <>
              <Button
                className={$button.tertiary}
                onClick={showEditGoal}
                style={{
                  margin: "auto",
                }}
              >
                Edit Goal
              </Button>
              <Button
                className={$button.secondary}
                onClick={() => alert("to be implemented")}
              >
                View all goals
              </Button>
            </>
          )}
          {editGoal && (
            <>
              <Button
                form="editGoalForm"
                className={$button.tertiary}
                onClick={cancelEditGoal}
              >
                Cancel
              </Button>
              <Button
                form="editGoalForm"
                className={$button.default}
                onClick={submitEditGoal}
              >
                Save
              </Button>
            </>
          )}
        </Grid>
      </Grid>
      {editGoal && (
        <>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "start",
              justifyContent: "start",
              justifyItems: "start",
              height: "100%",
            }}
            item
          ></Grid>

          <TextField
            multiline
            fullWidth
            value={editGoalInput}
            name="description"
            onChange={(e) => {
              setEditGoalInput(e.target.value);
            }}
          />
        </>
      )}

      {!editGoal && (
        <Typography variant="body1">{props.description}</Typography>
      )}
    </Container>
  );
};
