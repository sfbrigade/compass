import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import React from "react";
import $box from "@/styles/Box.module.css";
import $button from "@/styles/Button.module.css";

const ReviewPage = () => {
  const router = useRouter();
  const { benchmark_id } = router.query;
  const { data: task, isLoading } = trpc.iep.getTaskById.useQuery(
    {
      task_id: benchmark_id as string,
    },
    {
      enabled: Boolean(benchmark_id),
    }
  );

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
        {task.first_name} completed {currentTrial.success_without_prompt}{" "}
        successful attempts and {currentTrial.success_with_prompt} with prompt
        attempts.
      </div>
      <div className={$box.default}>
        <h4>Observation Notes:</h4>
        {currentTrial.notes}
      </div>
      <button className={$button.default}>Sign and Submit</button>
    </div>
  );
};

export default ReviewPage;
