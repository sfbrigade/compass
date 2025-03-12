import { trpc } from "@/client/lib/trpc";

interface UseGoalIndexProps {
  iepId: string;
  goalId: string;
}

const useGoalIndex = ({ iepId, goalId }: UseGoalIndexProps): number => {
  const { data: goals = [] } = trpc.iep.getGoals.useQuery(
    {
      iep_id: iepId,
    },
    {
      enabled: !!iepId && !!goalId,
    }
  );

  return goals.findIndex((g) => g.goal_id === goalId) + 1;
};

export default useGoalIndex;
