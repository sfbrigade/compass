import { useRouter } from "next/router";
import { LineChart } from "@mui/x-charts/LineChart";
import { trpc } from "@/client/lib/trpc";
import { calculateSuccessRate } from "@/utils";

const ViewBenchmarkPage = () => {
  const router = useRouter();

  const benchmark_id = router.query?.benchmark_id as string;

  const {
    data: benchmark,
    id,
    isLoading: benchmarkIsLoading,
    isError,
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
    </div>
  );
};

export default ViewBenchmarkPage;
