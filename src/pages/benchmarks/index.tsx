import React from "react";
import TaskCard from "@/components/taskCard/taskCard";
import { trpc } from "@/client/lib/trpc";
import { ParaTaskCard } from "@/types/global";
import $typo from "@/styles/Typography.module.css";

function Benchmarks() {
  const { data: tasks, isLoading } = trpc.para.getMyTasks.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {tasks?.map((task) => {
        return (
          <li key={task.task_id} className={$typo.noDecoration}>
            <TaskCard task={task as ParaTaskCard} />
          </li>
        );
      })}
    </ul>
  );
}

export default Benchmarks;
