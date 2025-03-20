import React from "react";
import $box from "@/styles/Box.module.css";
import { useRouter } from "next/router";
import { trpc } from "@/client/lib/trpc";
import Button from "@/components/design_system/button/Button";

const InstructionsPage = () => {
  const router = useRouter();
  const { benchmark_id } = router.query;
  const { data: benchmark, isLoading } =
    trpc.iep.getBenchmarkAndTrialData.useQuery(
      { benchmark_id: benchmark_id as string },
      { enabled: Boolean(benchmark_id) }
    );

  if (isLoading || !benchmark) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className={$box.default}>
        <h4>Goal:</h4>
        <p>{benchmark.description}</p>
      </div>
      <div className={$box.default}>
        <h4>Frequency:</h4>
        <p>{benchmark.frequency}</p>
      </div>
      <div className={$box.default}>
        <h4>Materials:</h4>
        <p>{benchmark.materials}</p>
      </div>
      <div className={$box.default}>
        <h4>Set-up:</h4>
        <p>{benchmark.instructions}</p>
      </div>
      <Button
        onClick={() => router.push(`/benchmarks/${benchmark_id as string}`)}
        sx={{ width: "100%" }}
      >
        Collect Data
      </Button>
    </div>
  );
};

export default InstructionsPage;
