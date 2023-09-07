import React from "react";
import { Subgoal } from "@/types/global";
import { Box, Button } from "@mui/material";

interface SubgoalProps {
  subgoal: Subgoal;
}

const Subgoals = ({ subgoal }: SubgoalProps) => {
  // const task = trpc.iep.tempAddTaskToSelf.useMutation();

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
    // task.mutate({
    //   subgoal_id: subgoal.subgoal_id,
    //   due_date: new Date(2023, 8, 20),
    //   trial_count: 5,
    // });
    alert("TODO: add form to assign to my para");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#f4d5d5",
        padding: "1rem",
      }}
    >
      <p>{subgoal.description}</p>
      <Button
        sx={{
          height: "24px",
          width: "auto",
          padding: "0px 20px",
          backgroundColor: "#5347d7",
          borderRadius: "5px",
          border: "none",
          color: "#ffffff",
          fontFamily: "Quicksand",
        }}
        variant="contained"
        onClick={assignToPara}
      >
        Assign
      </Button>
    </Box>
  );
};

export default Subgoals;
