// import Image from "next/image";
import React from "react";
import styles from "./styles/TaskCard.module.css";
import Link from "next/link";
import ProgressBar from "./progressBar";

interface TaskCardProps {
  task: {
    student_name: string;
    profile_img: string;
    goal_id: number;
    goal_description: string;
    goal_type: string;
    due_date: string;
    completion_rate: number;
  };
}

const TaskCard = ({ task }: TaskCardProps) => {
  const getDateStyle = () => {
    //New or done should be green
    if (task.completion_rate === 0 || task.completion_rate === 100) {
      return styles.dateFloaterGreen;
    }
    //Not sure if this should be due soon, or past due?
    else if (task.due_date < "") {
      return styles.dateFloaterRed;
    } else {
      return styles.dateFloater;
    }
  };

  return (
    <div
      className={
        task.completion_rate === 100 ? styles.containerDone : styles.container
      }
    >
      <div className={getDateStyle()}>
        {task.completion_rate === 0
          ? "NEW"
          : task.completion_rate === 100
          ? "DONE"
          : `DUE: ${task.due_date}`}
      </div>
      <div className={styles.profile}>
        {/* <Image src={task.profile_img} height={50} width={50} alt="Student's profile picture."/> */}
        <div
          className={
            task.completion_rate === 100 ? styles.imageDone : styles.image
          }
        ></div>
        <div>{task.student_name}</div>
      </div>
      <div>
        <p>
          <strong>{task.goal_type}</strong> - {task.goal_description}
        </p>
      </div>

      {/* Will be a progress bar */}
      <div className={styles.progressBar}>
        {task.completion_rate}% complete
        <ProgressBar fillPercent={task.completion_rate} />
      </div>

      <Link
        href={`/trials/${task.goal_id}`}
        className={
          task.completion_rate === 100 ? styles.buttonDone : styles.button
        }
      >
        Collect data
      </Link>
    </div>
  );
};

export default TaskCard;
