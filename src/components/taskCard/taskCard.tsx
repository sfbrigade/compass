// import Image from "next/image";
import React, { useEffect, useState } from "react";
import $taskCard from "./styles/TaskCard.module.css";
import $button from "@/styles/Button.module.css";
import Link from "next/link";
import ProgressBar from "../progressBar/progressBar";
import { ParaTaskCard } from "@/types/global";

interface TaskCardProps {
  task: ParaTaskCard;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const [completionRate, setCompletionRate] = useState(0);
  useEffect(() => {
    //TODO: discuss how to deal with null target_max_attempts
    const calculatedRate =
      Math.floor(
        (task.success_with_prompt || 0 + (task.success_without_prompt || 0)) /
          (task.target_max_attempts || 100)
      ) * 100;
    setCompletionRate(calculatedRate);
  }, [task]);

  const getDateStyle = () => {
    //New or done should be green
    if (completionRate === 0 || completionRate === 100) {
      return $taskCard.dateFloaterGreen;
    }
    //Not sure if this should be due soon, or past due?
    else if (task.due_date) {
      return $taskCard.dateFloaterRed;
    } else {
      return $taskCard.dateFloater;
    }
  };

  return (
    <div
      className={
        completionRate === 100 ? $taskCard.containerDone : $taskCard.container
      }
    >
      <div className={getDateStyle()}>
        {completionRate === 0
          ? "NEW"
          : completionRate === 100
          ? "DONE"
          : `DUE: ${task.due_date.toString()}`}
      </div>
      <div className={$taskCard.profile}>
        {/* <Image src={task.profile_img} height={50} width={50} alt="Student's profile picture."/> */}
        <div
          className={
            completionRate === 100 ? $taskCard.imageDone : $taskCard.image
          }
        ></div>
        <div>
          {task.first_name} {task.last_name}
        </div>
      </div>
      <div>
        <p>
          <strong>{task.category}</strong> - {task.description}
        </p>
      </div>

      <div className={$taskCard.progressBar}>
        {completionRate}% complete
        <ProgressBar fillPercent={completionRate} />
      </div>

      <Link
        href={`/benchmarks/${task.task_id}`}
        className={`${$button.default} ${
          completionRate === 100 ? $button.inactive : ""
        }`}
      >
        Collect data
      </Link>
    </div>
  );
};

export default TaskCard;
