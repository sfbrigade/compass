import {
  Stack,
  Typography,
  Grid,
  Container,
  TextareaAutosize,
} from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";

import Button from "@/components/design_system/button/Button";
import { trpc } from "@/client/lib/trpc";
import $GoalPage from "@/styles/GoalPage.module.css";
type GoalHeaderProps = {
  goalId: string;
  name: string;
  description: string;
  createdAt: string | Date;
  editable?: boolean;
};

export const GoalHeader = ({
  goalId,
  name,
  description,
  createdAt,
  editable = true,
}: GoalHeaderProps) => {
  const [editGoal, setEditGoal] = useState(false);
  const [editGoalInput, setEditGoalInput] = useState("");
  const utils = trpc.useContext();
  const showEditGoal = () => {
    setEditGoal(true);
    setEditGoalInput(description || "");
  };

  // TODO: modify callbacks for toast notification
  const editMutation = trpc.iep.editGoal.useMutation({
    onSuccess: () => utils.iep.getGoal.invalidate(),
    onError: (err) => console.log({ err }),
  });

  const submitEditGoal = () => {
    editMutation.mutate({
      goal_id: goalId,
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
        <Stack spacing={2} sx={{ marginBottom: "28px" }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h3" color="var(--primary-40)">
              {name}
            </Typography>
            <Typography variant="h3">|</Typography>
            <Typography variant="h3" color="#788591">
              Added: {format(new Date(createdAt), "MM/dd/yyyy")}
            </Typography>
          </Stack>
        </Stack>
        {editable && (
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
                  variant="tertiary"
                  onClick={showEditGoal}
                  sx={{
                    margin: "auto",
                  }}
                >
                  Edit Goal
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => alert("to be implemented")}
                >
                  View all goals
                </Button>
              </>
            )}
            {editGoal && (
              <>
                <Button
                  variant="tertiary"
                  form="editGoalForm"
                  onClick={cancelEditGoal}
                >
                  Cancel
                </Button>
                <Button form="editGoalForm" onClick={submitEditGoal}>
                  Save
                </Button>
              </>
            )}
          </Grid>
        )}
      </Grid>
      {editGoal && editable && (
        <TextareaAutosize
          className={$GoalPage.editGoalFormTextArea}
          value={editGoalInput}
          name="description"
          onChange={(e) => {
            setEditGoalInput(e.target.value);
          }}
        />
      )}

      {!editGoal && <Typography variant="body1">{description}</Typography>}
    </Container>
  );
};
