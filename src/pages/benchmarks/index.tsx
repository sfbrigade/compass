import React from "react";
import TaskCard from "@/components/para_trials/taskCard";
import { trpc } from "@/client/lib/trpc";
import { ParaTaskCard } from "@/types/global";
// import styles from "@/styles/Paraflow.module.css";

function Benchmarks() {
  const { data: tasks, isLoading } = trpc.para.getMyTasks.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {tasks?.map((task) => {
        return (
          <li key={task.task_id}>
            <TaskCard task={task as ParaTaskCard} />
          </li>
        );
      })}
    </ul>
  );
}

export default Benchmarks;
