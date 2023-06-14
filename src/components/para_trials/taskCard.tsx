import React from "react";

interface TaskCardProps {
  student: {
    name: string;
    goal_id: number;
    due_date: string;
  };
}

const TaskCard: React.FC<TaskCardProps> = () => {
  return <div></div>;
};

export default TaskCard;
