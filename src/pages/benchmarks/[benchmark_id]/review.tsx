import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import React from "react";
import $box from "@/components/design_system/box/Box.module.css";
import $button from "@/components/design_system/button/Button.module.css";

const ReviewPage = () => {
  const router = useRouter();
  const { benchmark_id } = router.query;
  const { data: task, isLoading } = trpc.iep.getSubgoalAndTrialData.useQuery(
    {
      task_id: benchmark_id as string,
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

  if (isLoading || !task) {
    return <div>Loading...</div>;
  }

  const currentTrial = task.trials[task.trials.length - 1];

  return (
    <div>
      <h2 className={`${$box.topAndBottomBorder} ${$box.flex}`}>
        Trial {task.trials.length}
      </h2>
      <div className={$box.default}>
        {task.first_name} completed {currentTrial.success} successful attempts
        and {currentTrial.unsuccess} unsuccessful attempts.
      </div>
      <div className={$box.default}>
        <h4>Observation Notes:</h4>
        {currentTrial.notes}
      </div>
      <button
        className={`${$button.default} ${$box.fullWidth}`}
        onClick={() => handleSubmit(currentTrial.trial_data_id)}
      >
        Sign and Submit
      </button>
    </div>
  );
};

export default ReviewPage;
