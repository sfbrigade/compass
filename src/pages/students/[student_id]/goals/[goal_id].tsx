import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import BenchmarksContainer from "@/components/benchmarks/BenchmarksContainer";
import { GoalHeader } from "@/components/goal-header/goal-header";
import { Benchmark } from "@/types/global";
import useGoalIndex from "@/hooks/useGoalIndex";

const GoalPage = () => {
  const router = useRouter();
  const goal_id = (router.query?.goal_id as string) || "";
  const student_id = (router.query?.student_id as string) || "";

  const utils = trpc.useUtils();

  const { data: activeIep } = trpc.student.getActiveStudentIep.useQuery(
    { student_id: student_id },
    { enabled: Boolean(student_id), retry: false }
  );

  const { data: goal } = trpc.iep.getGoal.useQuery(
    { goal_id: goal_id },
    { enabled: Boolean(goal_id) }
  );

  const { data: benchmarks } = trpc.iep.getBenchmarks.useQuery(
    { goal_id: goal_id },
    { enabled: Boolean(goal_id) }
  );

  const goal_index = useGoalIndex({
    iepId: activeIep?.iep_id || "",
    goalId: goal_id,
  });

  function onUpdate(benchmark: Benchmark) {
    const newBenchmarks = [...(benchmarks ?? [])];
    const index = newBenchmarks.findIndex(
      (b) => b.benchmark_id === benchmark.benchmark_id
    );
    newBenchmarks[index] = benchmark;
    utils.iep.getBenchmarks.setData({ goal_id: goal_id }, newBenchmarks);
  }

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
      <BenchmarksContainer benchmarks={benchmarks || []} onUpdate={onUpdate} />
    </Stack>
  );
};

export default GoalPage;
