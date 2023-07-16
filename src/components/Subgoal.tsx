import { trpc } from "@/client/lib/trpc";
import React from "react";

interface SubgoalProps {
  subgoal: Subgoal;
}

interface Subgoal {
  subgoal_id: string;
  description: string | null;
}

const Subgoals: React.FC<SubgoalProps> = ({ subgoal }) => {
  const task = trpc.iep.addTask.useMutation();

  // const assignToPara = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);

  //   task.mutate({
  //     subgoal_id: subgoal.subgoal_id,
  //     assignee_id: data.get("assignee_id") as string,
  //     due_date: new Date(data.get("due_date")) as Date
  //   });
  // }
  const assignToPara = () => {
    task.mutate({
      subgoal_id: subgoal.subgoal_id,
      assignee_id: "5fc0b2ab-ccfd-4407-83a4-6a1d4c4cc716",
      due_date: new Date(),
    });
  };
  return (
    <div>
      <h4>Subgoal</h4>
      <div>Subgoal ID: {subgoal.subgoal_id}</div>
      <p>{subgoal.description}</p>
      <button onClick={assignToPara}>Assign</button>
    </div>
  );
};

export default Subgoals;
