import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import $GoalPage from "../../styles/GoalPage.module.css";

const ViewGoalPage = () => {
  const router = useRouter();
  const { goal_id } = router.query;

  const { data: goal, isLoading } = trpc.iep.getGoal.useQuery({
    goal_id: goal_id as string,
  });

  console.log(goal);

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
        <Grid item>Added on {goal?.created_at.toDateString().slice(4)}</Grid>
      </Grid>
      <Container className={$GoalPage.goalDescriptionContainer}>
        {goal?.description}
      </Container>
    </Stack>
  );
};

export default ViewGoalPage;
