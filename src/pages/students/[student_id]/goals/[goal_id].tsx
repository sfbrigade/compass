import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import $button from "@/components/design_system/button/Button.module.css";
import Link from "next/link";
import { GoalHeader } from "@/components/goal-header/goal-header";

const GoalPage = () => {
  const router = useRouter();
  const { goal_id } = router.query;

  const { data: goal } = trpc.iep.getGoal.useQuery(
    { goal_id: goal_id as string },
    { enabled: Boolean(goal_id) }
  );

  return (
    <div>
      {goal && (
        <GoalHeader
          name="[placeholder] 1st Goal"
          description={goal.description}
          createdAt={goal.created_at}
          goalId={goal.goal_id}
        />
      )}

      <Link className={$button.default} href={`${router.asPath}/create`}>
        Add benchmark
      </Link>
    </div>
  );
};

export default GoalPage;
