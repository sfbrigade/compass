import BenchmarkForm from "@/components/benchmarks/BenchmarkForm";

import type { NextPageWithBreadcrumbs } from "@/pages/_app";

const CreateBenchmarkPage: NextPageWithBreadcrumbs = () => {
  return <BenchmarkForm />;
};

CreateBenchmarkPage.getBreadcrumbs = function getBreadcrumbs() {
  return [{ href: "/students", children: "Students" }];
};

export default CreateBenchmarkPage;
