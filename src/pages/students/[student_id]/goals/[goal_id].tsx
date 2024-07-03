import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import { useState, MouseEvent } from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import $GoalPage from "@/styles/GoalPage.module.css";
import $button from "@/components/design_system/button/Button.module.css";
import Link from "next/link";
import { GoalHeader } from "@/components/goal-header/goal-header";
import { Typography } from "@mui/material";
import Subgoals from "@/components/subgoal/Subgoal";
import Benchmarks from "@/components/benchmarks/Benchmarks";
import { subgoal } from "zapatos/schema";
import { on } from "events";

enum selectionValue {
  ALL,
  COMPLETE,
}

interface SelectableTabProps {
  text: string;
  value: selectionValue;
  handleSelect: (e: MouseEvent) => void;
  currentlySelected: selectionValue;
}

const SelectableTab = ({
  text,
  value,
  handleSelect,
  currentlySelected,
}: SelectableTabProps) => {
  return (
    <div
      className={`${$GoalPage.benchmarksTab}
        ${value === currentlySelected ? $GoalPage.benchmarksTabSelected : ""} `}
      onClick={(e) => {
        handleSelect(e);
      }}
    >
      {text}
    </div>
  );
};

const GoalPage = () => {
  const utils = trpc.useContext();

  const router = useRouter();

  const { goal_id, student_id } = router.query;
  const { data: activeIep } = trpc.student.getActiveStudentIep.useQuery(
    { student_id: student_id as string },
    { enabled: Boolean(student_id), retry: false }
  );
  const { data: goals } = trpc.iep.getGoals.useQuery({
    iep_id: activeIep?.iep_id || "",
  });
  const [editGoal, setEditGoal] = useState(false);
  const [editGoalInput, setEditGoalInput] = useState("");

  const [activeTab, setActiveTab] = useState<selectionValue>(
    selectionValue.ALL
  );

  const { data: goal } = trpc.iep.getGoal.useQuery(
    { goal_id: goal_id as string },
    { enabled: Boolean(goal_id) }
  );

  const { data: subgoals } = trpc.iep.getSubgoals.useQuery(
    { goal_id: goal_id as string },
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
      goal_id: goal_id as string,
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
                className={$button.default}
                onClick={showEditGoal}
                style={{
                  margin: "auto",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                Edit Goal
              </button>
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

      <Grid container justifyContent="space-between">
        <Grid item>
          <h2>Benchmarks</h2>
        </Grid>
      </Grid>
      <Benchmarks subgoals={subgoals || []} />
    </Stack>
  );
};

export default GoalPage;
