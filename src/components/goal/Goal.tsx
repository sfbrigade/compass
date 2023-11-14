import React, { useRef } from "react";
import Subgoals from "../subgoal/Subgoal";
import { trpc } from "@/client/lib/trpc";
import { Goal } from "@/types/global";
import $goal from "./Goal.module.css";

interface GoalProps {
  goal: Goal;
}

const Goals = ({ goal }: GoalProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const utils = trpc.useContext();
  const { data: subgoals, isLoading } = trpc.iep.getSubgoals.useQuery({
    goal_id: goal.goal_id,
  });

  const subgoal = trpc.iep.addSubgoal.useMutation({
    onSuccess: () => utils.iep.getSubgoals.invalidate(),
  });

  const handleSubGoalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const description = formData.get("description") as string;
      const instructions = formData.get("instructions") as string;
      const target_max_attempts =
        Number(formData.get("target_max_attempts")) || null;

      subgoal.mutate({
        goal_id: goal.goal_id,
        description,
        instructions,
        target_max_attempts,
      });

      (
        formRef.current.elements.namedItem("description") as HTMLInputElement
      ).value = "";
      (
        formRef.current.elements.namedItem("instructions") as HTMLInputElement
      ).value = "";
      (
        formRef.current.elements.namedItem(
          "target_max_attempts"
        ) as HTMLInputElement
      ).value = "";
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
        <form
          ref={formRef}
          onSubmit={handleSubGoalSubmit}
          className={$goal.createInput}
        >
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

          <button type="submit" className={$goal.createButton}>
            Add SubGoal
          </button>
        </form>
      </div>
    </div>
  );
};

export default Goals;
