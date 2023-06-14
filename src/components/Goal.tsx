import React from "react";
import Subgoals from "./Subgoal";
import { trpc } from "client/lib/trpc";
import Link from "next/link";
import styles from "../styles/Home.module.css";

interface GoalProps {
  goal: Goal;
}

interface Goal {
  goal_id: string;
  description: string | null;
}

const Goals: React.FC<GoalProps> = ({ goal }) => {
  const utils = trpc.useContext();
  const { data: subgoals, isLoading } = trpc.student.getSubgoals.useQuery({
    goal_id: goal.goal_id,
  });

  const subgoal = trpc.student.addSubgoal.useMutation({
    onSuccess: () => utils.student.getGoalsFromIep.invalidate(),
  });

  const handleSubGoalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    //Possible future error handling here

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
      {/* <div>Individual Goal Page</div> */}

      <div>
        <form onSubmit={handleSubGoalSubmit} className={styles.createInput}>
          <input
            type="text"
            name="description"
            placeholder="description stuff"
            required
          />
          <button type="submit" className={styles.createButton}>
            Add SubGoal
          </button>
        </form>
      </div>

      <ul className={styles.listNames}>
        {subgoals?.map((subgoal) => (
          <li key={subgoal.subgoal_id}>
            <Subgoals subgoal={subgoal} />
          </li>
        ))}
      </ul>
    </div>
    // <SubGoals />
  );
};

export default Goals;
