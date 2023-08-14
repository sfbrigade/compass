// import Image from "next/image";
import React, { useEffect, useState } from "react";
import $taskCard from "./styles/TaskCard.module.css";
import $button from "@/styles/Button.module.css";
import $box from "@/styles/Box.module.css";
import Link from "next/link";
import ProgressBar from "./progressBar";
import { ParaTaskCard } from "@/types/global";
import { differenceInWeeks, format } from "date-fns";

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
    if (!task.seen || task.submitted) {
      return $taskCard.dateFloaterGreen;
    }
    //Temporary until time period is given
    //Checks if due date is less than a week away
    else if (differenceInWeeks(task.due_date, new Date()) <= 0) {
      return $taskCard.dateFloaterRed;
    } else {
      return $taskCard.dateFloater;
    }
  };

  return (
    <div className={task.submitted ? $box.inactive : $box.greyBg}>
      <div className={getDateStyle()}>
        {!task.seen
          ? "NEW"
          : task.submitted
          ? "DONE"
          : `DUE: ${format(task.due_date, "MM-dd-yyyy")}`}
      </div>
      <div className={$taskCard.profile}>
        {/* <Image src={task.profile_img} height={50} width={50} alt="Student's profile picture."/> */}
        <div
          className={task.submitted ? $taskCard.imageDone : $taskCard.image}
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
          task.submitted ? $button.inactive : ""
        }`}
      >
        Collect data
      </Link>
    </div>
  );
};

export default TaskCard;
