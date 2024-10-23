import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import BenchmarksContainer from "@/components/benchmarks/BenchmarksContainer";
import { GoalHeader } from "@/components/goal-header/goal-header";

const GoalPage = () => {
  const router = useRouter();
  const goal_id = (router.query?.goal_id as string) || "";
  const student_id = (router.query?.student_id as string) || "";

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

  const { data: benchmarks } = trpc.iep.getSubgoals.useQuery(
    { goal_id: goal_id },
    { enabled: Boolean(goal_id) }
  );

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

      {goal && goal_index && (
        <GoalHeader
          name={`Goal #${goal_index}`}
          description={goal.description}
          createdAt={goal.created_at}
          goalId={goal.goal_id}
        />
      )}
      {/* Benchmarks */}
      <Grid container justifyContent="space-between">
        <Grid item>
          <h2>Benchmarks</h2>
        </Grid>
      </Grid>
      <BenchmarksContainer benchmarks={benchmarks || []} />
    </Stack>
  );
};

export default GoalPage;
