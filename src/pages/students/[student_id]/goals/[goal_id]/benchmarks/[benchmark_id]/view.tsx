import { useRouter } from "next/router";
import { LineChart } from "@mui/x-charts/LineChart";
import { trpc } from "@/client/lib/trpc";
import { calculateSuccessRate } from "@/utils";
import { GoalHeader } from "@/components/goal-header/goal-header";

const ViewBenchmarkPage = () => {
  const router = useRouter();

  const benchmark_id = router.query?.benchmark_id as string;

  const goal_id = router.query?.goal_id as string;

  const { data: goal } = trpc.iep.getGoal.useQuery(
    { goal_id: goal_id },
    { enabled: Boolean(goal_id) }
  );

  const {
    data: benchmark,
    // id,
    // isLoading: benchmarkIsLoading,
    // isError,
  } = trpc.iep.getBenchmarkAndTrialData.useQuery(
    {
      benchmark_id: benchmark_id, // how does this line make sense?
    },
    {
      enabled: Boolean(benchmark_id),
    }
  );

  const createdAt: Date[] = [];
  const successRate: (number | null)[] = [];

  benchmark?.trials.forEach(({ created_at, success, unsuccess }) => {
    createdAt.push(new Date(created_at));
    successRate.push(calculateSuccessRate({ success, unsuccess }));
  });

  console.log(createdAt);

  return (
    <div>
      {benchmark?.trials.map((trial) => (
        <div key={trial.trial_data_id}>{trial.notes}</div>
      ))}
      <LineChart
        xAxis={[{ data: createdAt, scaleType: "time" }]}
        series={[
          {
            data: successRate,
            label: "linear",
          },
        ]}
        width={500}
        height={300}
      />
      {goal && (
        <GoalHeader
          name={`Goal #${goal.number}`}
          description={goal.description}
          createdAt={goal.created_at}
          goalId={goal.goal_id}
          editable={false}
        />
      )}
    </div>
  );
};

export default ViewBenchmarkPage;
