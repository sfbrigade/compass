//this will be the mobile-first web view of the para data collection app
import React from "react";
import TaskCard from "@/components/para_trials/taskCard";
import styles from "@/styles/Paraflow.module.css";

const tempGoals = [
  {
    student_name: "John Doe",
    profile_img: "img",
    goal_description:
      "Annie will write 5 sentences with 80% accuracy in 4 out of 5 trials.",
    goal_type: "Writing goal",
    due_date: "01-08-2023",
    completion_rate: 80,
    goal_id: 1,
  },
  {
    student_name: "New Name",
    profile_img: "img",
    goal_description:
      "Annie will write 5 sentences with 80% accuracy in 4 out of 5 trials.",
    goal_type: "Writing goal",
    due_date: "10-15-2023",
    completion_rate: 0,
    goal_id: 2,
  },
  {
    student_name: "Kate Doe",
    profile_img: "img",
    goal_description:
      "Annie will write 5 sentences with 80% accuracy in 4 out of 5 trials.",
    goal_type: "Writing goal",
    due_date: "05-20-2023",
    completion_rate: 100,
    goal_id: 3,
  },
];

function paraDashboard() {
  return (
    <div>
      {tempGoals.map((tempgoal, i) => {
        return (
          <div key={i}>
            <TaskCard task={tempgoal} />
          </div>
        );
      })}
    </div>
  );
}

export default paraDashboard;
