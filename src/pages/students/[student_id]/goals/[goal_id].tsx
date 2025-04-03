import { useEffect } from "react";
import { useRouter } from "next/router";
import { Grid, Stack } from "@mui/material";

import { trpc } from "@/client/lib/trpc";
import BenchmarksContainer from "@/components/benchmarks/BenchmarksContainer";
import { GoalHeader } from "@/components/goal-header/goal-header";
import { Benchmark } from "@/types/global";

import type { NextPageWithBreadcrumbs } from "@/pages/_app";
import { useBreadcrumbsContext } from "@/components/design_system/breadcrumbs/BreadcrumbsContext";

const GoalPage: NextPageWithBreadcrumbs = () => {
  const { setBreadcrumbs } = useBreadcrumbsContext();

  const router = useRouter();
  const goal_id = (router.query?.goal_id as string) || "";
  const student_id = (router.query?.student_id as string) || "";

  const utils = trpc.useUtils();

  const { data: student } = trpc.student.getStudentById.useQuery(
    { student_id },
    { enabled: Boolean(student_id), retry: false }
  );

  const { data: goal } = trpc.iep.getGoal.useQuery(
    { goal_id: goal_id },
    { enabled: Boolean(goal_id) }
  );

  useEffect(() => {
    const breadcrumbs = GoalPage.getBreadcrumbs?.() ?? [];
    if (student) {
      breadcrumbs.push({
        href: `/students/${student.student_id}`,
        children: `${student.first_name} ${student.last_name}`,
      });
      if (goal) {
        breadcrumbs.push({ children: `Goal #${goal.number}` });
      }
      setBreadcrumbs(breadcrumbs);
    }
  }, [student, goal, setBreadcrumbs]);

  const { data: benchmarks } = trpc.iep.getBenchmarks.useQuery(
    { goal_id: goal_id },
    { enabled: Boolean(goal_id) }
  );

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

      {goal && (
        <GoalHeader
          name={`Goal #${goal.number}`}
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

GoalPage.getBreadcrumbs = function getBreadcrumbs() {
  return [{ href: "/students", children: "Students" }];
};

export default GoalPage;
