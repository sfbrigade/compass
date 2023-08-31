import React from "react";
import Subgoals from "../subgoal/Subgoal";
import { trpc } from "@/client/lib/trpc";
import { Goal } from "@/types/global";
import $goal from "./Goal.module.css";

interface GoalProps {
  goal: Goal;
}

const Goals = ({ goal }: GoalProps) => {
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
      instructions: data.get("instructions") as string,
      target_max_attempts: Number(data.get("target_max_attempts")) || null,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Goal</h3>
      <div>Goal ID: {goal.goal_id}</div>
      <p>Description: {goal.description}</p>
      <p>Created at: {goal.created_at.toDateString()}</p>
      <p>Category: {goal.category}</p>

      <div className={$goal.tab}>
        <ul className={$goal.listNames}>
          {subgoals?.map((subgoal) => (
            <li key={subgoal.subgoal_id}>
              <br />
              <Subgoals subgoal={subgoal} />
            </li>
          ))}
        </ul>
        <br />
        <form onSubmit={handleSubGoalSubmit} className={$goal.createInput}>
          <input
            type="text"
            name="description"
            placeholder="Subgoal description"
            required
          />
          <input type="text" name="instructions" placeholder="Instructions" />
          <input
            type="number"
            name="target_max_attempts"
            placeholder="# of attempts"
          />

          <button type="submit" className={$goal.createButton}>
            Add SubGoal
          </button>
        </form>
      </div>
    </div>
  );
};

export default Goals;
