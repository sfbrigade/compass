import ParaNav from "@/components/paraNav/ParaNav";
import React from "react";
import $box from "@/styles/Box.module.css";
import $button from "@/components/design_system/button/Button.module.css";
import $typo from "@/styles/Typography.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "@/client/lib/trpc";

const InstructionsPage = () => {
  const router = useRouter();
  const { benchmark_id } = router.query;
  const { data: subgoal, isLoading } = trpc.iep.getSubgoalAndTrialData.useQuery(
    { task_id: benchmark_id as string },
    { enabled: Boolean(benchmark_id) },
  );

  if (isLoading || !subgoal) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ParaNav />
      <div className={$box.default}>
        <h4>Goal:</h4>
        <p>{subgoal.description}</p>
      </div>
      <div className={$box.default}>
        <h4>Frequency:</h4>
        <p>*insert frequency here*</p>
      </div>
      <div className={$box.default}>
        <h4>Materials:</h4>
        <ol className={$typo.orderList}>
          <li>insert</li>
          <li>materials</li>
          <li>here</li>
        </ol>
      </div>
      <div className={$box.default}>
        <h4>Set-up:</h4>
        <p>{subgoal.instructions}</p>
      </div>
      <Link
        href={`/benchmarks/${benchmark_id as string}`}
        className={`${$button.default} ${$button.fixedToBottom}`}
      >
        Collect data
      </Link>
    </div>
  );
};

export default InstructionsPage;
