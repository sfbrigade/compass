import { useEffect } from "react";
import { useRouter } from "next/router";
import { Stack, Box } from "@mui/material";

import { trpc } from "@/client/lib/trpc";
import GoalCard from "@/components/data-entry/GoalCard";
import { GoalHeader } from "@/components/goal-header/goal-header";
import type { Benchmark, Goal, Student } from "@/types/global";

import type { NextPageWithBreadcrumbs } from "@/pages/_app";
import { useBreadcrumbsContext } from "@/components/design_system/breadcrumbs/BreadcrumbsContext";
import ViewStudentPage from "../../../../../[student_id]";

const GoalPage: NextPageWithBreadcrumbs = () => {
  const { setBreadcrumbs } = useBreadcrumbsContext();

  const router = useRouter();
  const goal_id = (router.query?.goal_id as string) || "";
  const student_id = (router.query?.student_id as string) || "";

  const { data: student } = trpc.student.getStudentById.useQuery(
    { student_id },
    { enabled: Boolean(student_id), retry: false }
  );
  const { data: benchmarks } = trpc.iep.getBenchmarks.useQuery(
    { goal_id: goal_id },
    { enabled: Boolean(goal_id) }
  );
  const { data: goal } = trpc.iep.getGoal.useQuery(
    { goal_id: goal_id },
    { enabled: Boolean(goal_id) }
  );
  const benchmarkId = (router.query?.benchmark_id as string) || "";
  const filteredBenchmark = benchmarks?.find(
    (e: Benchmark) => e.benchmark_id === benchmarkId
  );
  useEffect(() => {
    if (student && goal) {
      setBreadcrumbs(
        GoalPage.getBreadcrumbs?.({ student, goal, filteredBenchmark })
      );
    }
  }, [student, goal, filteredBenchmark, setBreadcrumbs]);

  return (
    <>
      <Box sx={{ textAlign: "left" }}>
        <h1>Data Entry</h1>
        <h1
          style={{
            fontFamily: "quicksand",
            fontWeight: 600,
            fontStyle: "semibold",
            lineHeight: "100%",
            fontSize: "20px",
            letterSpacing: "0%",
            color: "var(--primary)",
            marginTop: "5px",
            marginBottom: "30px",
          }}
        >
          {student?.first_name} {student?.last_name}
        </h1>
      </Box>
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
        {goal && (
          <GoalHeader
            name={`Goal ${goal.number}`}
            description={goal.description}
            createdAt={goal.created_at}
            goalId={goal.goal_id}
          />
        )}
        <GoalCard benchmarks={filteredBenchmark} />
      </Stack>
    </>
  );
};

interface GetBreadcrumbsProps {
  student?: Student;
  goal?: Goal;
  filteredBenchmark?: Benchmark;
  isLinked?: boolean;
}

GoalPage.getBreadcrumbs = function getBreadcrumbs({
  student,
  goal,
  filteredBenchmark,
}: GetBreadcrumbsProps = {}) {
  const breadcrumbs =
    ViewStudentPage.getBreadcrumbs?.({ student, isLinked: true }) ?? [];
  if (student && goal && filteredBenchmark) {
    breadcrumbs.push({
      href: `/students/${student.student_id}/goals/${goal.goal_id}`,
      children: `Goal #${goal.number}`,
    });
    breadcrumbs.push({
      href: `/students/${student.student_id}/goals/${goal.goal_id}/benchmarks/${filteredBenchmark.benchmark_id}`,
      children: `Benchmark #${filteredBenchmark.number}`,
    });
    breadcrumbs.push({
      children: "Data Entry",
    });
  }
  // if (filteredBenchmark) {
  //   breadcrumbs.push({
  //     children: `Benchmark #${filteredBenchmark.number}`,
  //   });
  // }
  return breadcrumbs;
};

export default GoalPage;
