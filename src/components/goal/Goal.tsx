import React from "react";
import { trpc } from "@/client/lib/trpc";
import { Goal } from "@/types/global";
import $goal from "./Goal.module.css";
import { useRouter } from "next/router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";

interface GoalProps {
  goal: Goal;
}

const Goals = ({ goal }: GoalProps) => {
  const router = useRouter();

  // per current design, subgoals not currently showing in this component.
  // trpc method, state for subgoals are here should that change, can be moved
  // to different page/component as needed
  const { data: subgoals, isLoading } = trpc.iep.getSubgoals.useQuery({
    goal_id: goal.goal_id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={$goal.goal}>
      <div className={$goal.textContainer}>
        <p className={$goal.description}>{goal?.description}</p>
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
            <Link
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
                color: "var(--primary-40)",
                border: "none",
              }}
              href={`${router.asPath}/goals/${goal.goal_id}/create`}
            >
              Add benchmark
            </Link>
          </div>
        </div>
      </div>
      <ArrowForwardIosIcon />
    </div>
  );
};

export default Goals;
