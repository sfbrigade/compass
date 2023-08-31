import { trpc } from "@/client/lib/trpc";
import React from "react";
import { Subgoal } from "@/types/global";
import { Box, Button } from "@mui/material";

interface SubgoalProps {
  subgoal: Subgoal;
}

const Subgoals = ({ subgoal }: SubgoalProps) => {
  const task = trpc.iep.tempAddTaskToSelf.useMutation();
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
      due_date: new Date(2023, 8, 20),
      trial_count: 5,
    });
    alert("TODO: add form to assign to my para");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#f4d5d5",
      }}
    >
      {/* <h4>Subgoal</h4> */}
      {/* <div>Subgoal ID: {subgoal.subgoal_id}</div> */}
      <p>{subgoal.description}</p>
      {/* <p>Created at: {subgoal.created_at.toDateString()}</p> */}
      {/* <p>Instructions: {subgoal.instructions || "null"}</p>
      <p>Target max attempts: {subgoal.target_max_attempts || "null"}</p> */}
      <Button variant="outlined" onClick={assignToPara}>
        Assign
      </Button>
    </Box>
  );
};

export default Subgoals;
