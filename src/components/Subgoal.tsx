import { trpc } from "@/client/lib/trpc";
import React from "react";
import { Subgoal } from "@/types/global";

interface SubgoalProps {
  subgoal: Subgoal;
}

const Subgoals = ({ subgoal }: SubgoalProps) => {
  const task = trpc.iep.addTask.useMutation();
  // TODO: add form to assign to my paras
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
      //Add in your own user_id for now, until real functionality is built
      assignee_id: "a972c177-4813-489f-8b2b-99cf61a70e03",
      due_date: new Date(2023, 8, 20),
    });
  };

  return (
    <div>
      <h4>Subgoal</h4>
      <div>Subgoal ID: {subgoal.subgoal_id}</div>
      <p>Description: {subgoal.description}</p>
      <p>Created at: {subgoal.created_at.toDateString()}</p>
      <p>Instructions: {subgoal.instructions || "null"}</p>
      <p>Target max attempts: {subgoal.target_max_attempts || "null"}</p>
      <button onClick={assignToPara}>Assign</button>
    </div>
  );
};

export default Subgoals;
