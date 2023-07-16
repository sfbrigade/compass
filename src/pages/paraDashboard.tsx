//this will be the mobile-first web view of the para data collection app
import React from "react";
import TaskCard from "@/components/para_trials/taskCard";
import { trpc } from "@/client/lib/trpc";
// import styles from "@/styles/Paraflow.module.css";

function paraDashboard() {
  // const utils = trpc.useContext();
  const { data: subgoals, isLoading } = trpc.iep.getMySubgoals.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {subgoals?.map((subgoal, i) => {
        return (
          <div key={i}>
            <TaskCard task={subgoal} />
          </div>
        );
      })}
    </div>
  );
}

export default paraDashboard;
