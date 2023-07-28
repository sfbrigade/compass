//this will be the mobile-first web view of the para data collection app
import React from "react";
import TaskCard from "@/components/para_trials/taskCard";
import { trpc } from "@/client/lib/trpc";
// import styles from "@/styles/Paraflow.module.css";

function paraDashboard() {
  const { data: tasks, isLoading } = trpc.para.getMyTasks.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {tasks?.map((task) => {
        return (
          <li key={task.task_id}>
            <TaskCard task={task} />
          </li>
        );
      })}
    </ul>
  );
}

export default paraDashboard;
