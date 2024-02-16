// import Image from "next/image";
import React, { useMemo } from "react";
import $taskCard from "./TaskCard.module.css";
import $button from "@/components/design_system/button/Button.module.css";
import $box from "@/styles/Box.module.css";
import Link from "next/link";
import ProgressBar from "../progressBar/progressBar";
import { differenceInWeeks, format } from "date-fns";

interface ParaTaskCard {
  task_id: string;
  first_name: string;
  last_name: string;
  category: string;
  description: string;
  instructions: string | null;
  target_max_attempts: number | null;
  due_date: Date | null;
  seen: boolean;
  trial_count: number | null;
  completed_trials: string | number | bigint | null;
}

interface TaskCardProps {
  task: ParaTaskCard;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const completionRate = useMemo(() => {
    const num = parseInt(task.completed_trials as string) || 0;
    const calculatedRate = Math.floor(
      (num / (task.target_max_attempts ?? 1)) * 100
    );
    return calculatedRate;
  }, [task.completed_trials, task.target_max_attempts]);

  const getDateStyle = () => {
    //New or done should be green
    if (!task.seen || completionRate >= 100) {
      return $taskCard.dateFloaterGreen;
    }
    //Temporary until time period is given
    //Checks if due date is less than a week away
    else if (
      task.due_date &&
      differenceInWeeks(task.due_date, new Date()) <= 0
    ) {
      return $taskCard.dateFloaterRed;
    } else {
      return $taskCard.dateFloater;
    }
  };

  return (
    <div className={completionRate >= 100 ? $box.inactive : $box.greyBg}>
      <div className={getDateStyle()}>
        {!task.seen
          ? "NEW"
          : completionRate >= 100
          ? "DONE"
          : `DUE: ${
              task.due_date ? format(task.due_date, "MM-dd-yyyy") : "N/A"
            }`}
      </div>
      <div className={$taskCard.profile}>
        {/* <Image src={task.profile_img} height={50} width={50} alt="Student's profile picture."/> */}
        <div
          className={
            completionRate >= 100 ? $taskCard.imageDone : $taskCard.image
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
          completionRate >= 100 ? $button.inactive : ""
        }`}
      >
        Collect data
      </Link>
    </div>
  );
};

export default TaskCard;
