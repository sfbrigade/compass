import { useRouter } from "next/router";
import { trpc } from "@/client/lib/trpc";
import { calculateSuccessRate, calcAverage } from "@/utils";
import { GoalHeader } from "@/components/goal-header/goal-header";
import {
  ChartContainer,
  ChartsXAxis,
  ChartsYAxis,
  LinePlot,
  ScatterPlot,
  ScatterValueType,
} from "@mui/x-charts";
import { DatePoint } from "@/types/global";

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

  // const createdAt: Date[] = [];
  // const successRate: (number | null)[] = [];

  const datePoints: Record<string, (number | null)[]> = {};

  const avgRate: (number | null)[] = [];
  const soloPoints: DatePoint[] = [];
  const bulkPoints: DatePoint[] = [];

  benchmark?.trials.forEach(({ created_at, success, unsuccess }) => {
    const createdAtDateString = new Date(created_at).toDateString();

    const successRate = calculateSuccessRate({ success, unsuccess });

    if (datePoints[createdAtDateString]) {
      datePoints[createdAtDateString].push(successRate);
    } else {
      datePoints[createdAtDateString] = [successRate];
    }
    // createdAt.push(new Date(createdAtDateString));
    // successRate.push(calculateSuccessRate({ success, unsuccess }));
  });

  for (const createdAtDate in datePoints) {
    const successRate = calcAverage(datePoints[createdAtDate]);
    if (
      datePoints[createdAtDate].length === 1 &&
      datePoints[createdAtDate][0] !== null
    ) {
      soloPoints.push({
        x: new Date(createdAtDate).getTime(),
        y: successRate,
        id: createdAtDate,
      });
    } else {
      bulkPoints.push({
        x: new Date(createdAtDate).getTime(),
        y: successRate,
        id: createdAtDate,
      });
    }
    avgRate.push(successRate);
  }

  const createdAtDates = Object.keys(datePoints).map((d) => new Date(d));

  console.log("soloPoints: ", soloPoints);
  console.log("bulkPoints: ", bulkPoints);

  return (
    <div>
      {benchmark?.trials.map((trial) => (
        <div key={trial.trial_data_id}>{trial.notes}</div>
      ))}
      <ChartContainer
        xAxis={[{ data: createdAtDates, scaleType: "time", id: "x-axis-id" }]}
        series={[
          {
            label: "Trend line",
            data: avgRate,
            type: "line",
          },
          {
            label: "Solo points",
            data: soloPoints as ScatterValueType[],
            type: "scatter",
          },
          {
            label: "Multi points",
            data: bulkPoints as ScatterValueType[],
            type: "scatter",
          },
        ]}
        width={500}
        height={300}
      >
        <LinePlot />
        <ChartsXAxis label="Trial date" axisId="x-axis-id" />
        <ChartsYAxis label="Success rate" />
        <ScatterPlot />
      </ChartContainer>
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
