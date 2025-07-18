import { useRouter } from "next/router";
import { trpc } from "@/client/lib/trpc";
import { calculateSuccessRate, calcAverage } from "@/utils";
import { GoalHeader } from "@/components/goal-header/goal-header";
import {
  ChartContainer,
  ChartsReferenceLine,
  ChartsXAxis,
  ChartsYAxis,
  LinePlot,
  ScatterPlot,
  ScatterValueType,
} from "@mui/x-charts";

import {
  Benchmark,
  BulkPoint,
  DatePoint,
  Goal,
  SoloPoint,
  Student,
  TrialData,
  valueFormatter,
} from "@/types/global";
import { useEffect, useRef, useState } from "react";
import { CustomItemTooltip } from "@/components/benchmarks/CustomItemTooltip";
import type { NextPageWithBreadcrumbs } from "@/pages/_app";
import { useBreadcrumbsContext } from "@/components/design_system/breadcrumbs/BreadcrumbsContext";
import GoalPage from "../../../[goal_id]";
import { Typography, Card, CardContent, Stack } from "@mui/material";

const ViewBenchmarkPage: NextPageWithBreadcrumbs = () => {
  const { setBreadcrumbs } = useBreadcrumbsContext();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  function handleResize() {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const benchmark_id = router.query?.benchmark_id as string;

  const goal_id = router.query?.goal_id as string;
  const student_id = (router.query?.student_id as string) || "";

  const { data: goal } = trpc.iep.getGoal.useQuery(
    { goal_id: goal_id },
    { enabled: Boolean(goal_id) }
  );

  const [explodedPoints, setExplodedPoints] = useState<ScatterValueType[]>([]);

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

  const { data: student } = trpc.student.getStudentById.useQuery(
    { student_id },
    { enabled: Boolean(student_id), retry: false }
  );

  useEffect(() => {
    if (student && goal && benchmark) {
      setBreadcrumbs(
        ViewBenchmarkPage.getBreadcrumbs?.({ student, goal, benchmark })
      );
    }
  }, [student, goal, benchmark, setBreadcrumbs]);

  const targetLevel = benchmark?.target_level ? benchmark.target_level : null;

  // const createdAt: Date[] = [];
  // const successRate: (number | null)[] = [];

  const datePoints: Record<string, TrialData[]> = {};

  const avgRate: number[] = [];
  const soloPoints: SoloPoint[] = [];
  const bulkPoints: BulkPoint[] = [];

  benchmark?.trials.forEach(
    ({ created_at, success, unsuccess, first_name, last_name }) => {
      const createdAtDateString = new Date(created_at).toDateString();

      const successRate = calculateSuccessRate({ success, unsuccess });

      if (successRate === null) {
        return;
      }

      const trialData = {
        successRate,
        success,
        staffName: `${first_name} ${last_name}`,
        numberOfAttempts: success + unsuccess,
      };

      if (datePoints[createdAtDateString]) {
        datePoints[createdAtDateString].push(trialData);
      } else {
        datePoints[createdAtDateString] = [trialData];
      }
      // createdAt.push(new Date(createdAtDateString));
      // successRate.push(calculateSuccessRate({ success, unsuccess }));
    }
  );

  const getDateFromPtNumber = (
    pointNumber: number,
    pointArray: DatePoint[]
  ) => {
    return new Date(pointArray[pointNumber].x).toDateString();
  };

  for (const createdAtDate in datePoints) {
    const successRate = calcAverage(datePoints[createdAtDate]);
    const staffNames = new Set(
      datePoints[createdAtDate].map(({ staffName }) => staffName)
    );

    if (datePoints[createdAtDate].length === 1) {
      const staffName = Array.from(staffNames)[0];

      const { success, numberOfAttempts } = datePoints[createdAtDate][0];

      soloPoints.push({
        x: new Date(createdAtDate).getTime(),
        y: successRate,
        id: createdAtDate,
        staffName,
        success,
        numberOfAttempts,
      });
    } else {
      bulkPoints.push({
        x: new Date(createdAtDate).getTime(),
        y: successRate,
        id: createdAtDate,
        staffNames: Array.from(staffNames),
        numberOfTrials: datePoints[createdAtDate].length,
      });
    }
    avgRate.push(successRate);
  }

  const createdAtDates = Object.keys(datePoints).map((d) => new Date(d));

  console.log("soloPoints: ", soloPoints);

  console.log("bulkPoints: ", bulkPoints);

  console.log("avgRate", avgRate);

  console.log("createdAtDates", createdAtDates);

  return (
    <Stack spacing={4}>
      <Typography variant="h1">Viewing Data for [Student name]</Typography>

      <Card>
        <CardContent ref={ref}>
          {benchmark?.trials.map((trial) => (
            <div key={trial.trial_data_id}>{trial.notes}</div>
          ))}
          <ChartContainer
            className="benchmark-chart"
            sx={{ margin: "auto", display: "block" }}
            xAxis={[
              { data: createdAtDates, scaleType: "time", id: "x-axis-id" },
              {
                data: [createdAtDates[2], createdAtDates[3]],
                scaleType: "time",
                id: "2nd-x-axis",
              },
            ]}
            yAxis={[
              {
                min: 0,
                max: 100,
                valueFormatter: (value: number) => `${value}%`,
              },
            ]}
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
                id: "solo-points",
                valueFormatter: (v) =>
                  valueFormatter(v as BulkPoint | SoloPoint),
              },
              {
                label: "Multi points",
                data: bulkPoints as ScatterValueType[],
                type: "scatter",
                id: "multi-points",
                valueFormatter: (v) =>
                  valueFormatter(v as BulkPoint | SoloPoint),
              },
              {
                label: "Single Date points",
                data: explodedPoints,
                type: "scatter",
                id: "exploded-points",
                valueFormatter: (v) =>
                  valueFormatter(v as BulkPoint | SoloPoint),
              },
            ]}
            width={Math.min(720, width)}
            height={300}
          >
            <LinePlot />
            <ChartsXAxis label="Trial date" axisId="x-axis-id" />
            <ChartsYAxis label="Success rate" />
            <ScatterPlot
              onItemClick={(_, d) => {
                if (d.seriesId === "multi-points") {
                  if (explodedPoints.length === 0) {
                    const dateKey = getDateFromPtNumber(
                      d.dataIndex,
                      bulkPoints
                    );
                    const explodedDatePoints = datePoints[dateKey].map(
                      (trialData, idx) => ({
                        x: new Date(dateKey).getTime(),
                        y: trialData.successRate,
                        id: `${dateKey} ${idx}`,
                        staffName: trialData.staffName,
                        success: trialData.success,
                        numberOfAttempts: trialData.numberOfAttempts,
                      })
                    );
                    setExplodedPoints([...explodedDatePoints]);
                  } else {
                    setExplodedPoints([]);
                  }
                }
              }}
            />
            {targetLevel && (
              <ChartsReferenceLine
                y={targetLevel}
                label={`Target Level: ${targetLevel}%`}
                lineStyle={{ strokeDasharray: "10 5" }}
                labelStyle={{ fontSize: "12", lineHeight: 1.2 }}
                labelAlign="end"
              />
            )}
            <CustomItemTooltip />
          </ChartContainer>
        </CardContent>
      </Card>

      {goal && (
        <Card>
          <CardContent>
            <GoalHeader
              name={`Goal #${goal.number}`}
              description={goal.description}
              createdAt={goal.created_at}
              goalId={goal.goal_id}
              editable={false}
            />
          </CardContent>
        </Card>
      )}
    </Stack>
  );
};

interface GetBreadcrumbsProps {
  student?: Student;
  goal?: Goal;
  benchmark?: Benchmark;
}

ViewBenchmarkPage.getBreadcrumbs = function getBreadcrumbs({
  student,
  goal,
  benchmark,
}: GetBreadcrumbsProps = {}) {
  const breadcrumbs =
    GoalPage.getBreadcrumbs?.({ student, goal, isLinked: true }) ?? [];

  if (student && goal && benchmark) {
    breadcrumbs.push({
      href: undefined,
      children: `Collecting Data for Benchmark #${benchmark.number}`,
    });
  }
  return breadcrumbs;
};

export default ViewBenchmarkPage;
