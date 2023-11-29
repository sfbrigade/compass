import React from "react";
import Subgoals from "../subgoal/Subgoal";
import { trpc } from "@/client/lib/trpc";
import { Goal } from "@/types/global";
import $goal from "./Goal.module.css";
import { useState } from "react";
import Link from "next/link";

type ControlCaratProps = {
  direction: "down" | "right" | "left" | "up";
  handleClick?: (e: React.MouseEvent) => void;
};

const handleNull = (e: React.MouseEvent) => {
  return;
};

const ControlCarat = ({ handleClick, direction }: ControlCaratProps) => {
  let rotation: string;

  switch (direction) {
    case "right":
      rotation = "0";
      break;
    case "down":
      rotation = "90";
      break;
    case "left":
      rotation = "180";
      break;
    case "up":
      rotation = "270";
      break;
    default:
      rotation = "0";
      break;
  }

  return (
    <div
      onClick={handleClick ? handleClick : handleNull}
      className={$goal.controlCarat}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <path
          d="M17.0359 13.0306L9.53593 20.5306C9.46624 20.6002 9.38352 20.6555 9.29247 20.6932C9.20143 20.7309 9.10385 20.7503 9.0053 20.7503C8.90675 20.7503 8.80917 20.7309 8.71813 20.6932C8.62708 20.6555 8.54436 20.6002 8.47467 20.5306C8.40499 20.4609 8.34972 20.3781 8.312 20.2871C8.27429 20.1961 8.25488 20.0985 8.25488 19.9999C8.25488 19.9014 8.27429 19.8038 8.312 19.7128C8.34972 19.6217 8.40499 19.539 8.47467 19.4693L15.445 12.4999L8.47467 5.53055C8.33394 5.38982 8.25488 5.19895 8.25488 4.99993C8.25488 4.80091 8.33394 4.61003 8.47467 4.4693C8.6154 4.32857 8.80628 4.24951 9.0053 4.24951C9.20432 4.24951 9.39519 4.32857 9.53593 4.4693L17.0359 11.9693C17.1057 12.039 17.161 12.1217 17.1987 12.2127C17.2365 12.3038 17.2559 12.4014 17.2559 12.4999C17.2559 12.5985 17.2365 12.6961 17.1987 12.7871C17.161 12.8782 17.1057 12.9609 17.0359 13.0306Z"
          fill="#A2ACB3"
        />
      </svg>
    </div>
  );
};

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
          <div style={{ marginTop: "8px", display: "flex", gap: "16px" }}>
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
              <Link
                href={`/goals/${goal.goal_id}/addSubgoal`}
                style={{
                  textAlign: "center",
                  color: "#20159E",
                  fontSize: "16px",
                  fontFamily: "Quicksand",
                  fontWeight: "600",
                  lineHeight: "24px",
                  wordWrap: "break-word",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                Add benchmark
              </Link>
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

      <ControlCarat direction="right" />
    </div>
  );
};

export default Goals;
