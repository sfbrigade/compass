import React from "react";
import Subgoals from "./Subgoal";
import { trpc } from "@/client/lib/trpc";
import styles from "@/styles/Goal.module.css";

interface GoalProps {
  goal: Goal;
}

interface Goal {
  goal_id: string;
  description: string | null;
}

const Goals: React.FC<GoalProps> = ({ goal }) => {
  const utils = trpc.useContext();
  const { data: subgoals, isLoading } = trpc.iep.getSubgoals.useQuery({
    goal_id: goal.goal_id,
  });

  const subgoal = trpc.iep.addSubgoal.useMutation({
    onSuccess: () => utils.iep.getSubgoals.invalidate(),
  });

  const handleSubGoalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    subgoal.mutate({
      goal_id: goal.goal_id,
      description: data.get("description") as string,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.tab}>
        <ul className={styles.listNames}>
          {subgoals?.map((subgoal) => (
            <li key={subgoal.subgoal_id}>
              <br />
              <Subgoals subgoal={subgoal} />
            </li>
          ))}
        </ul>
        <br />
        <form onSubmit={handleSubGoalSubmit} className={styles.createInput}>
          <input
            type="text"
            name="description"
            placeholder="Subgoal description"
            required
          />
          <button type="submit" className={styles.createButton}>
            Add SubGoal
          </button>
        </form>
      </div>
    </div>
  );
};

export default Goals;
