import React from "react";
import Subgoals from "../subgoal/Subgoal";
import { trpc } from "@/client/lib/trpc";
import { Goal } from "@/types/global";
import $goal from "./Goal.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface GoalProps {
  goal: Goal;
}

const Goals = ({ goal }: GoalProps) => {
  const utils = trpc.useContext();
  const router = useRouter();

  // per current design, subgoals not currently showing in this component.
  // trpc method, state for subgoals are here should that change, can be moved
  // to different page/component as needed
  const { data: subgoals, isLoading } = trpc.iep.getSubgoals.useQuery({
    goal_id: goal.goal_id,
  });

  const subgoal = trpc.iep.addSubgoal.useMutation({
    onSuccess: () => utils.iep.getSubgoals.invalidate(),
  });

  const [expandSubgoals, setExpandSubgoals] = useState(false);

  const hideSubgoals = () => {
    setExpandSubgoals(false);
  };

  const showSubgoals = () => {
    setExpandSubgoals(true);
  };

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
    <div className={$goal.goal}>
      <div className={$goal.textContainer}>
        <p className={$goal.description}>{goal?.description}</p>

        {!expandSubgoals && (
          <div
            style={{
              marginTop: "8px",
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div className={$goal.subgoalCountBadge}>
              <div className={$goal.subgoalCount}>
                {subgoals?.length} active benchmark
                {subgoals?.length !== 1 && "s"}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                height: "40px",
                padding: "10px 24px",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <button
                // standin for tertiary button style
                style={{
                  display: "inline-flex",
                  height: "40px",
                  padding: "10px 24px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  flexShrink: "0",
                  fontSize: "14px",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  color: "#20159E",
                  border: "none",
                }}
                onClick={async (e) => {
                  e.stopPropagation();
                  await router.push(`/goals/${goal.goal_id}/addSubgoal`);
                }}
              >
                Add benchmark
              </button>
            </div>
          </div>
        )}

        {expandSubgoals && (
          <ul className={$goal.listNames}>
            {subgoals?.map((subgoal) => (
              <li key={subgoal.subgoal_id}>
                <br />
                <Subgoals subgoal={subgoal} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <ArrowForwardIosIcon />
    </div>
  );
};

export default Goals;
