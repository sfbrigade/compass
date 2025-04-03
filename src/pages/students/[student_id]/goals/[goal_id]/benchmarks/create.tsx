import BenchmarkForm from "@/components/benchmarks/BenchmarkForm";

import type { NextPageWithBreadcrumbs } from "@/pages/_app";
import GoalPage from "@/pages/students/[student_id]/goals/[goal_id]";

const CreateBenchmarkPage: NextPageWithBreadcrumbs = () => {
  return <BenchmarkForm />;
};

CreateBenchmarkPage.getBreadcrumbs = function getBreadcrumbs() {
  return GoalPage.getBreadcrumbs?.() ?? [];
};

export default CreateBenchmarkPage;
