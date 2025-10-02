import { useRouter } from "next/router";
import { trpc } from "@/client/lib/trpc";
import { calcAverage, groupTrialsByDate } from "@/utils";
import { GoalHeader } from "@/components/goal-header/goal-header";
import {
  ChartContainer,
  ChartsReferenceLine,
  ChartsXAxis,
  ChartsYAxis,
  LinePlot,
  ScatterPlot,
  ScatterValueType,
  ChartsLegend,
  ChartsGrid,
} from "@mui/x-charts";

import {
  Benchmark,
  BulkPoint,
  Goal,
  ProcessedTrialData,
  SoloPoint,
  Student,
  valueFormatter,
} from "@/types/global";
import { useEffect, useRef, useState } from "react";
import { CustomItemTooltip } from "@/components/benchmarks/CustomItemTooltip";
import type { NextPageWithBreadcrumbs } from "@/pages/_app";
import { useBreadcrumbsContext } from "@/components/design_system/breadcrumbs/BreadcrumbsContext";
import GoalPage from "../../../[goal_id]";
import {
  Typography,
  Card,
  CardContent,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Box,
} from "@mui/material";
import {
  Download,
  TrendingUp,
  ScatterPlot as ScatterPlotIcon,
} from "@mui/icons-material";
import Button from "@/components/design_system/button/Button";

const ViewBenchmarkPage: NextPageWithBreadcrumbs = () => {
  const { setBreadcrumbs } = useBreadcrumbsContext();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [chartView, setChartView] = useState<"combined" | "line" | "scatter">(
    "combined"
  );
  const [explodedPoints, setExplodedPoints] = useState<ScatterValueType[]>([]);

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

  const { data: benchmark } = trpc.iep.getBenchmarkAndTrialData.useQuery(
    { benchmark_id },
    { enabled: Boolean(benchmark_id) }
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

  const datePoints: Record<string, ProcessedTrialData[]> = groupTrialsByDate(
    benchmark?.trials || []
  );

  const avgRate: number[] = [];
  const soloPoints: SoloPoint[] = [];
  const bulkPoints: BulkPoint[] = [];

  const allTrials: Array<{
    trial_id: string;
    date: Date;
    successRate: number;
    staffName: string;
    success: number;
    numberOfAttempts: number;
  }> = [];

  for (const createdAtDate in datePoints) {
    const successRate = calcAverage(datePoints[createdAtDate]);
    const staffNames = new Set(
      datePoints[createdAtDate].map(({ staffName }) => staffName)
    );

    datePoints[createdAtDate].forEach((trial, idx) => {
      allTrials.push({
        trial_id: trial.trial_data_id || `${createdAtDate}-${idx}`,
        date: new Date(createdAtDate),
        successRate: trial.successRate,
        staffName: trial.staffName,
        success: trial.success,
        numberOfAttempts: trial.numberOfAttempts,
      });
    });

    if (datePoints[createdAtDate].length === 1) {
      const staffName = Array.from(staffNames)[0];

      const { success, numberOfAttempts } = datePoints[createdAtDate][0];

      soloPoints.push({
        x: new Date(createdAtDate).getTime(),
        y: successRate ?? 0,
        id: createdAtDate,
        staffName,
        success,
        numberOfAttempts,
      });
    } else {
      bulkPoints.push({
        x: new Date(createdAtDate).getTime(),
        y: successRate ?? 0,
        id: createdAtDate,
        staffNames: Array.from(staffNames),
        numberOfTrials: datePoints[createdAtDate].length,
      });
    }
    avgRate.push(successRate ?? 0);
  }

  const createdAtDates = Object.keys(datePoints).map((d) => new Date(d));

  const exportReportMutation = trpc.iep.exportReport.useMutation();

  const handleExportReport = async () => {
    if (!benchmark_id || !goal_id || !student_id) return;

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    try {
      const result = await exportReportMutation.mutateAsync({
        benchmark_id,
        goal_id,
        student_id,
        clientTimeZone: timeZone,
      });

      const response = await fetch(
        `data:application/pdf;base64,${result.pdfBuffer}`
      );
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = result.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting report:", error);

      // TODO: show a toast notification here
    }
  };

  // Build series based on selected view
  const series = [];

  if (
    chartView === "combined" ||
    chartView === "line" ||
    chartView === "scatter"
  ) {
    if (chartView !== "scatter") {
      series.push({
        label: "Trend line",
        data: avgRate,
        type: "line" as const,
        color: "#5347D7",
        id: "average-line",
      });
    }

    if (chartView !== "line") {
      series.push(
        {
          label: "Single Trial",
          data: soloPoints as ScatterValueType[],
          type: "scatter" as const,
          id: "solo-points",
          color: "#9B93F1",
          valueFormatter: (v: ScatterValueType) =>
            valueFormatter(v as SoloPoint),
        },
        {
          label: "Multiple Trials",
          data: bulkPoints as ScatterValueType[],
          type: "scatter" as const,
          id: "multi-points",
          color: "#20159E",
          valueFormatter: (v: ScatterValueType) =>
            valueFormatter(v as BulkPoint),
        }
      );

      const rangeMarkers: { x: number; y: number; id: string }[] = [];
      for (let i = 0; i < createdAtDates.length; i++) {
        const dateKey = Object.keys(datePoints)[i];
        const trialsForDate = datePoints[dateKey];

        if (trialsForDate.length > 1) {
          const rates = trialsForDate.map((trial) => trial.successRate);
          const minRate = Math.min(...rates);
          const maxRate = Math.max(...rates);
          const dateTime = createdAtDates[i].getTime();

          rangeMarkers.push(
            { x: dateTime, y: minRate, id: `min-${dateKey}` },
            { x: dateTime, y: maxRate, id: `max-${dateKey}` }
          );
        }
      }

      if (rangeMarkers.length > 0) {
        series.push({
          data: rangeMarkers,
          type: "scatter" as const,
          color: "#78909C",
          id: "range-markers",
          markerSize: 4,
          valueFormatter: (v: ScatterValueType) => `${v.y?.toFixed(1)}%`,
        });
      }
    }
  }

  return (
    <Stack spacing={4}>
      <Typography variant="h1">
        Viewing Data for {student?.first_name} {student?.last_name}
      </Typography>
      <Card>
        <CardContent ref={ref}>
          <Stack spacing={2}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="space-between"
              alignItems={{ xs: "stretch", sm: "center" }}
              sx={{ pt: 2 }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <ToggleButtonGroup
                  value={chartView}
                  exclusive
                  onChange={(
                    _: React.MouseEvent<HTMLElement>,
                    newView: "combined" | "line" | "scatter" | null
                  ) => {
                    if (
                      newView === "combined" ||
                      newView === "line" ||
                      newView === "scatter"
                    ) {
                      setChartView(newView);
                    }
                  }}
                  size="small"
                >
                  <ToggleButton value="combined">Combined</ToggleButton>
                  <ToggleButton value="line">
                    <TrendingUp sx={{ mr: 1 }} />
                    Trend
                  </ToggleButton>
                  <ToggleButton value="scatter">
                    <ScatterPlotIcon sx={{ mr: 1 }} />
                    Points
                  </ToggleButton>
                </ToggleButtonGroup>

                {explodedPoints.length > 0 && (
                  <Chip
                    label="Individual trials visible"
                    color="secondary"
                    size="small"
                    onDelete={() => setExplodedPoints([])}
                  />
                )}
              </Stack>

              <Button
                onClick={handleExportReport}
                disabled={
                  exportReportMutation.isLoading ||
                  !student ||
                  !goal ||
                  !benchmark
                }
              >
                {exportReportMutation.isLoading
                  ? "Generating..."
                  : "Data Report"}
                {!exportReportMutation.isLoading && (
                  <Download sx={{ ml: 1, verticalAlign: "middle" }} />
                )}
              </Button>
            </Stack>
            <ChartContainer
              className="benchmark-chart"
              sx={{ margin: "auto", display: "block", maxWidth: "100%" }}
              xAxis={[
                {
                  data: createdAtDates,
                  scaleType: "point",
                  id: "x-axis-id",
                  valueFormatter: (value: string | number | Date) => {
                    if (!value) return "";
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  },
                },
              ]}
              yAxis={[
                {
                  min: 0,
                  max: 100,
                  valueFormatter: (value: number) => `${value}%`,
                },
              ]}
              series={series}
              width={width || 300}
              height={400}
            >
              <ChartsGrid horizontal />

              {chartView !== "scatter" && <LinePlot />}
              <ScatterPlot />

              <ChartsXAxis
                label={`Trial Date (${new Date(createdAtDates[0]).getFullYear()})`}
                axisId="x-axis-id"
              />
              <ChartsYAxis label="Success rate" />

              {targetLevel && (
                <ChartsReferenceLine
                  y={targetLevel}
                  label={`Target Level: ${targetLevel}%`}
                  lineStyle={{ strokeDasharray: "10 5", stroke: "#568200B2" }}
                  labelStyle={{ fontSize: "12", lineHeight: 1.2 }}
                  labelAlign="end"
                />
              )}

              <CustomItemTooltip datePoints={datePoints} />
              <ChartsLegend
                direction="row"
                position={{ vertical: "top", horizontal: "left" }}
                slotProps={{
                  legend: {
                    labelStyle: { fontSize: 14 },
                  },
                }}
              />
            </ChartContainer>

            {avgRate.length > 0 && (
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                sx={{ pt: 2 }}
              >
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Average Success Rate
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {(
                      avgRate.reduce((a, b) => a + b, 0) / avgRate.length
                    ).toFixed(1)}
                    %
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Latest Average Success Rate
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {avgRate[avgRate.length - 1]?.toFixed(1)}%
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Trials
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {benchmark?.trials?.length || 0}
                  </Typography>
                </Box>
              </Stack>
            )}
          </Stack>
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
