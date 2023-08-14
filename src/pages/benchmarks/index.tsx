import React from "react";
import TaskCard from "@/components/para_trials/taskCard";
import { trpc } from "@/client/lib/trpc";
import $typography from "@/styles/Typography.module.css";

function Benchmarks() {
  const { data: tasks, isLoading } = trpc.para.getMyTasks.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {tasks?.map((task) => {
        return (
          <li key={task.task_id} className={$typography.noDecoration}>
            <TaskCard task={task} />
          </li>
        );
      })}
    </ul>
  );
}

export default Benchmarks;
