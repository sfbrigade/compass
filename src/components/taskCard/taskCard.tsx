import $button from "@/components/design_system/button/Button.module.css";
import $box from "@/styles/Box.module.css";
import { differenceInWeeks, format } from "date-fns";
import Link from "next/link";
import { useMemo } from "react";
import ProgressBar from "../progressBar/progressBar";
import $taskCard from "./TaskCard.module.css";

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
  isPara: boolean;
}

const TaskCard = ({ task, isPara }: TaskCardProps) => {
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
        {task.first_name} {task.last_name}
      </div>
      <div>
        <p>
          <strong>{task.category}</strong> - {task.description}
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className={$taskCard.progressBar}>
          {completionRate}% complete
          <ProgressBar fillPercent={completionRate} />
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          {/* Para smaller screen view may click on card instead */}
          {!isPara ? (
            <Link
              href={`/benchmarks/${task.task_id}`}
              className={`${$button.secondary}`}
            >
              View benchmark
            </Link>
          ) : null}

          <Link
            href={`/benchmarks/${task.task_id}`}
            className={`${$button.default} ${
              completionRate >= 100 ? $button.inactive : ""
            }`}
          >
            Collect data
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
