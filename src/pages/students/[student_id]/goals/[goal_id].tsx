import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import BenchmarksContainer from "@/components/benchmarks/BenchmarksContainer";
import { GoalHeader } from "@/components/goal-header/goal-header";
import { useState } from "react";
import $GoalPage from "@/styles/GoalPage.module.css";
import { Container } from "@mui/material";
import $button from "@/components/design_system/button/Button.module.css";

const GoalPage = () => {
  const router = useRouter();
  const goal_id = (router.query?.goal_id as string) || "";
  const student_id = (router.query?.student_id as string) || "";
  const [editGoal, setEditGoal] = useState(false);
  const [editGoalInput, setEditGoalInput] = useState("");
  const utils = trpc.useContext();

  const { data: activeIep } = trpc.student.getActiveStudentIep.useQuery(
    { student_id: student_id },
    { enabled: Boolean(student_id), retry: false }
  );
  const { data: goals = [] } = trpc.iep.getGoals.useQuery({
    iep_id: activeIep?.iep_id || "",
  });

  const { data: goal } = trpc.iep.getGoal.useQuery(
    { goal_id: goal_id },
    { enabled: Boolean(goal_id) }
  );

  const { data: subgoals } = trpc.iep.getSubgoals.useQuery(
    { goal_id: goal_id },
    { enabled: Boolean(goal_id) }
  );

  const showEditGoal = () => {
    setEditGoal(true);
    setEditGoalInput(goal?.description || "");
  };

  // TODO: modify callbacks for toast notification
  const editMutation = trpc.iep.editGoal.useMutation({
    onSuccess: () => utils.iep.getGoal.invalidate(),
    onError: (err) => console.log({ err }),
  });

  const submitEditGoal = () => {
    editMutation.mutate({
      goal_id: goal.goal_id,
      description: editGoalInput,
    });
    setEditGoal(false);
    setEditGoalInput("");
  };

  const cancelEditGoal = () => {
    setEditGoal(false);
    setEditGoalInput("");
  };
  const goal_index = goals.findIndex((g) => g.goal_id === goal?.goal_id) + 1;
  return (
    <Stack
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      {/* Goal Description */}
      <Container className={$GoalPage.goalDescriptionContainer}>
        {!editGoal && (
          <Grid container justifyContent="space-between">
            {goal && goal_index && (
              <GoalHeader
                name={`Goal #${goal_index}`}
                description={goal.description}
                createdAt={goal.created_at}
                goalId={goal.goal_id}
                showEditGoal={showEditGoal}
              />
            )}
          </Grid>
        )}
        {editGoal && (
          <form style={{ marginTop: "1rem" }} onSubmit={submitEditGoal}>
            <textarea
              value={editGoalInput}
              name="description"
              onChange={(e) => {
                setEditGoalInput(e.target.value);
              }}
              className={$GoalPage.editGoalFormTextArea}
            />
            <Grid
              container
              justifyContent="space-around"
              marginY={2}
              md={6}
              marginX="auto"
            >
              <Grid item>
                <button className={$button.secondary} onClick={cancelEditGoal}>
                  Cancel
                </button>
              </Grid>
              <Grid item>
                <button className={$button.default} type="submit">
                  Save
                </button>
              </Grid>
            </Grid>
          </form>
        )}
      </Container>
      {/* Benchmarks */}
      <Grid container justifyContent="space-between">
        <Grid item>
          <h2>Benchmarks</h2>
        </Grid>
      </Grid>
      <BenchmarksContainer subgoals={subgoals || []} />
    </Stack>
  );
};

export default GoalPage;
