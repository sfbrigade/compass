import BenchmarkForm from "@/components/benchmarks/BenchmarkForm";
import { useSearchParams } from "next/navigation";

const EditBenchmarkPage = () => {
  const searchParams = useSearchParams();

  const benchmarkId = searchParams.get("benchmark_id");

  return <BenchmarkForm benchmark_id={benchmarkId || ""} />;
};

export default EditBenchmarkPage;
