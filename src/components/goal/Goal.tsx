import React from "react";
import Subgoals from "../subgoal/Subgoal";
import { trpc } from "@/client/lib/trpc";
import { Goal } from "@/types/global";
import $goal from "./Goal.module.css";
import $button from "@/components/design_system/button/Button.module.css";

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

  const handleSubGoalSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      await subgoal.mutateAsync({
        goal_id: goal.goal_id,
        description: data.get("description") as string,
        instructions: data.get("instructions") as string,
        target_max_attempts: Number(data.get("target_max_attempts")) || null,
      });

      (event.target as HTMLFormElement).reset();
    } catch (err) {
      console.log("error: ", err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p className={$goal.description}>{goal.description}</p>

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
          <input
            type="text"
            name="instructions"
            placeholder="Instructions"
            required
          />
          <input
            type="number"
            name="target_max_attempts"
            placeholder="# of attempts"
            min="1"
            required
          />

          <button type="submit" className={$button.default}>
            Add SubGoal
          </button>
        </form>
      </div>
    </div>
  );
};

export default Goals;
