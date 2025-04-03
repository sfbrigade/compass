import { useRouter } from "next/router";

import BenchmarkForm from "@/components/benchmarks/BenchmarkForm";
import type { NextPageWithBreadcrumbs } from "@/pages/_app";
import GoalPage from "@/pages/students/[student_id]/goals/[goal_id]";

const EditBenchmarkPage: NextPageWithBreadcrumbs = () => {
  const router = useRouter();

  const benchmarkId = router.query?.benchmark_id as string;

  return <BenchmarkForm benchmark_id={benchmarkId || ""} />;
};

EditBenchmarkPage.getBreadcrumbs = function getBreadcrumbs() {
  return GoalPage.getBreadcrumbs?.() ?? [];
};

export default EditBenchmarkPage;
