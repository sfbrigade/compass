import Image from "next/image";
import React from "react";
import styles from "./styles/TaskCard.module.css";

interface TaskCardProps {
  task: {
    student_name: string;
    profile_img: string;
    // goal_id: number;
    goal_description: string;
    goal_type: string;
    due_date: string;
    completion_rate: number;
  };
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className={styles.container}>
      <div className={styles.dateFloater}>{task.due_date}</div>
      <div className={styles.profile}>
        {/* <Image src={task.profile_img} height={50} width={50} alt="Student's profile picture."/> */}
        <div className={styles.image}>pic</div>
        <div>{task.student_name}</div>
      </div>
      <div>
        <p>
          <strong>{task.goal_type}</strong> - {task.goal_description}
        </p>
      </div>

      {/* Will be a progress bar */}
      <div className={styles.progressBar}>{task.completion_rate}% complete</div>

      <button className={styles.button}>Collect data</button>
    </div>
  );
};

export default TaskCard;
