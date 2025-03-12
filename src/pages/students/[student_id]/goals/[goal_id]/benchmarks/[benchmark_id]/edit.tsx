import BenchmarkForm from "@/components/benchmarks/BenchmarkForm";
import { useRouter } from "next/router";

const EditBenchmarkPage = () => {
  const router = useRouter();

  const benchmarkId = router.query?.benchmark_id as string;

  return <BenchmarkForm benchmark_id={benchmarkId || ""} />;
};

export default EditBenchmarkPage;
