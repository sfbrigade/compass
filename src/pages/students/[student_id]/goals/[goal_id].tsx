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

enum selectionValue {
  ALL,
  ACTIVE,
  COMPLETE,
  DRAFTS,
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
  const { goal_id } = router.query;

  const [editGoal, setEditGoal] = useState(false);
  const [editGoalInput, setEditGoalInput] = useState("");

  const [activeTab, setActiveTab] = useState<selectionValue>(
    selectionValue.ACTIVE
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
      <Grid container justifyContent="space-between">
        <Grid item>
          {goal && (
            <GoalHeader
              name="[placeholder] 1st Goal"
              description={goal.description}
              createdAt={goal.created_at}
              goalId={goal.goal_id}
            />
          )}
        </Grid>
      </Grid>

      {/* Goal Description */}
      <Container className={$GoalPage.goalDescriptionContainer}>
        {!editGoal && (
          <>
            <p>{goal?.description}</p>
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
          </>
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

      {/* Benchmarks */}
      <Stack sx={{ width: 1 }}>
        {/* tabs */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            justifyContent: "space-between",
          }}
        >
          <Box className={$GoalPage.benchmarksBox} justifyContent="flex-start">
            <SelectableTab
              text="All"
              value={selectionValue.ALL}
              handleSelect={() => {
                setActiveTab(selectionValue.ALL);
              }}
              currentlySelected={activeTab}
            />
            <SelectableTab
              text="Active"
              value={selectionValue.ACTIVE}
              handleSelect={() => {
                setActiveTab(selectionValue.ACTIVE);
              }}
              currentlySelected={activeTab}
            />
            <SelectableTab
              text="Completed"
              value={selectionValue.COMPLETE}
              handleSelect={() => {
                setActiveTab(selectionValue.COMPLETE);
              }}
              currentlySelected={activeTab}
            />
            <SelectableTab
              text="Drafts"
              value={selectionValue.DRAFTS}
              handleSelect={() => {
                setActiveTab(selectionValue.DRAFTS);
              }}
              currentlySelected={activeTab}
            />
          </Box>
          <br />
          <Box>
            <Link className={$button.default} href={`${router.asPath}/create`}>
              Add benchmark
            </Link>
          </Box>
        </Box>
        {/* TODO: Populate Benchmarks container */}
        <Grid container className={$GoalPage.benchmarksContainer}>
          <Grid sx={{ width: "100%", background: "white" }} item>
            {subgoals?.length === 0 ? (
              <Grid
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                item
              >
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  No subgoals
                </Typography>
              </Grid>
            ) : (
              <>
                {(() => {
                  const tabMapping = {
                    [selectionValue.ALL]: {
                      status: "All",
                      message: "No benchmarks",
                    },
                    [selectionValue.ACTIVE]: {
                      status: "In Progress",
                      message: "No active benchmarks",
                    },
                    //Status text must match the status in the database
                    [selectionValue.COMPLETE]: {
                      status: "Complete",
                      message: "No completed benchmarks",
                    },
                    [selectionValue.DRAFTS]: {
                      status: "Draft",
                      message: "No drafts",
                    },
                  };

                  const { status, message } = tabMapping[activeTab];

                  const filteredSubgoals =
                    (status === "All"
                      ? subgoals
                      : subgoals?.filter(
                          (subgoal) => subgoal.status === status
                        )) || [];
                  return filteredSubgoals.length === 0 ? (
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                      {message}
                    </Typography>
                  ) : (
                    filteredSubgoals.map((subgoal) => (
                      <Subgoals key={subgoal.subgoal_id} subgoal={subgoal} />
                    ))
                  );
                })()}
              </>
            )}
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default GoalPage;
