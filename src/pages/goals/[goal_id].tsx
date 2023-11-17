import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import $GoalPage from "../../styles/GoalPage.module.css";

// const ACTIVE = "ACTIVE";
// const COMPLETED = "COMPLETED";
// const DRAFTS = "DRAFTS";

enum selectionValue {
  ACTIVE,
  COMPLETED,
  DRAFTS,
}

interface SelectableTabProps {
  text: string;
  value: selectionValue;
  handleSelect: (e: React.MouseEvent) => void;
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

const ViewGoalPage = () => {
  const router = useRouter();
  const { goal_id } = router.query;

  const { data: goal, isLoading } = trpc.iep.getGoal.useQuery({
    goal_id: goal_id as string,
  });

  const [activeTab, setActiveTab] = useState<selectionValue>(
    selectionValue.ACTIVE
  );

  console.log(goal);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Grid container justifyContent="space-between">
        <Grid item>
          <h2>Goal</h2>
        </Grid>
        {/* <Grid item>
          Added on {goal?.created_at.toDateString().slice(4)}
        </Grid> */}
      </Grid>

      {/* Goal Description */}
      <Container className={$GoalPage.goalDescriptionContainer}>
        {goal?.description}
      </Container>

      <Grid container justifyContent="space-between">
        <Grid item>
          <h2>Benchmarks</h2>
        </Grid>
      </Grid>

      {/* Benchmarks */}
      <Stack sx={{ width: 1 }}>
        {/* tabs */}
        <Box className={$GoalPage.benchmarksBox} justifyContent="flex-start">
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
            value={selectionValue.COMPLETED}
            handleSelect={() => {
              setActiveTab(selectionValue.COMPLETED);
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

        {/* Benchmarks container */}
        <Grid container className={$GoalPage.benchmarksContainer}>
          <Grid item>
            <List>{/*  */}</List>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default ViewGoalPage;
