import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import React from "react";
import $box from "@/styles/Box.module.css";
import Button from "@/components/design_system/button/Button";

const ReviewPage = () => {
  const router = useRouter();
  const { benchmark_id } = router.query;
  const { data: benchmark, isLoading } =
    trpc.iep.getBenchmarkAndTrialData.useQuery(
      {
        benchmark_id: benchmark_id as string, // how does this line make sense?
      },
      {
        enabled: Boolean(benchmark_id),
      }
    );

  const updateTrialMutation = trpc.iep.updateTrialData.useMutation();

  const handleSubmit = async (trialId: string) => {
    try {
      await updateTrialMutation.mutateAsync({
        trial_data_id: trialId,
        submitted: true,
      });

      void router.push("/benchmarks");
    } catch (err) {
      //TODO: better error handling
      console.log(err);
    }
  };

  if (isLoading || !benchmark) {
    return <div>Loading...</div>;
  }

  const currentTrial = benchmark.trials[benchmark.trials.length - 1];

  return (
    <div>
      <h2 className={`${$box.topAndBottomBorder} ${$box.flex}`}>
        Trial {benchmark.trials.length}
      </h2>
      <div className={$box.default}>
        {benchmark.first_name} completed {currentTrial.success} successful
        attempts and {currentTrial.unsuccess} unsuccessful attempts.
      </div>
      <div className={$box.default}>
        <h4>Observation Notes:</h4>
        {currentTrial.notes}
      </div>
      <Button
        onClick={() => handleSubmit(currentTrial.trial_data_id)}
        sx={{ width: "100%" }}
      >
        Sign and Submit
      </Button>
    </div>
  );
};

export default ReviewPage;
