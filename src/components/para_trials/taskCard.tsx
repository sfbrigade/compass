// import Image from "next/image";
import React, { useState } from "react";
import styles from "./styles/TaskCard.module.css";
import Link from "next/link";
import ProgressBar from "./progressBar";
import { ParaTaskCard } from "@/types/global";

interface TaskCardProps {
  task: ParaTaskCard;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  // TODO: calculate completion rate depending on trials
  const [completionRate, setCompletionRate] = useState(0);

  const getDateStyle = () => {
    //New or done should be green
    if (completionRate === 0 || completionRate === 100) {
      return styles.dateFloaterGreen;
    }
    //Not sure if this should be due soon, or past due?
    else if (task.due_date) {
      return styles.dateFloaterRed;
    } else {
      return styles.dateFloater;
    }
  };

  return (
    <div
      className={
        completionRate === 100 ? styles.containerDone : styles.container
      }
    >
      <div className={getDateStyle()}>
        {completionRate === 0
          ? "NEW"
          : completionRate === 100
          ? "DONE"
          : `DUE: ${task.due_date.toString()}`}
      </div>
      <div className={styles.profile}>
        {/* <Image src={task.profile_img} height={50} width={50} alt="Student's profile picture."/> */}
        <div
          className={completionRate === 100 ? styles.imageDone : styles.image}
        ></div>
        <div>
          {task.first_name} {task.last_name}
        </div>
      </div>
      <div>
        <p>
          <strong>{task.subgoal_type}</strong> - {task.description}
        </p>
      </div>

      <div className={styles.progressBar}>
        {completionRate}% complete
        <ProgressBar fillPercent={completionRate} />
      </div>

      <Link
        href={`/trials/${task.task_id}`}
        className={completionRate === 100 ? styles.buttonDone : styles.button}
      >
        Collect data
      </Link>
    </div>
  );
};

export default TaskCard;
