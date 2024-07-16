import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import { useState, MouseEvent } from "react";
import Container from "@mui/material/Container";
import $GoalPage from "@/styles/GoalPage.module.css";
import { Grid } from "@mui/material";
import $button from "@/components/design_system/button/Button.module.css";
import Link from "next/link";
import { GoalHeader } from "../goal-header/goal-header";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "@/backend/routers/_app";
type GoalsType = inferProcedureOutput<AppRouter["iep"]["getGoals"]>;
type GoalType = inferProcedureOutput<AppRouter["iep"]["getGoal"]>;
const BenchmarkGoalHeader = ({
  goal_id,
  goal,
  goals,
}: {
  goal_id: string;
  goal: GoalType;
  goals: GoalsType;
}) => {
  const router = useRouter();
  const [editGoal, setEditGoal] = useState(false);
  const [editGoalInput, setEditGoalInput] = useState("");
  const utils = trpc.useContext();
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
      goal_id: goal_id ,
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
      {!editGoal && (
        <Grid container justifyContent="space-between">
          <Grid item>
            {goal && goals && (
              <GoalHeader
                name={`Goal #${
                  goals.findIndex((e) => e.goal_id === goal.goal_id) + 1 || 0
                }`}
                description={goal.description}
                createdAt={goal.created_at}
                goalId={goal.goal_id}
              />
            )}
          </Grid>
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
              onClick={showEditGoal}
              style={{
                margin: "auto",
              }}
            >
              Edit Goal
            </button>
            <Link
              href={
                router.query.student_id
                  ? `/students/${router.query.student_id.toString()}`
                  : ""
              }
            >
              <button className={$button.secondary}>View all goals</button>
            </Link>
          </Grid>
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
  );
};
export default BenchmarkGoalHeader;
