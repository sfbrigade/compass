import { trpc } from "@/client/lib/trpc";
import { Subgoal } from "@/types/global";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { SubgoalAssignmentModal } from "./Subgoal-Assignment-Modal";

interface SubgoalProps {
  subgoal: Subgoal;
}

const Subgoals = ({ subgoal }: SubgoalProps) => {
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const task = trpc.iep.tempAddTaskToSelf.useMutation();

  const assignToPara = async () => {
    const result = await task.mutateAsync({
      subgoal_id: subgoal.subgoal_id,
      due_date: new Date(2023, 8, 20),
      trial_count: 5,
    });
    if (!result) {
      alert("Error: Benchmark already assigned to self.");
    } else {
      alert("Success! Benchmark assigned to self.");
    }
  };

  return (
    <>
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
          onClick={() => setIsAssignmentModalOpen(true)}
        >
          [Draft] Assign
        </Button>
      </Box>
      <SubgoalAssignmentModal
        isOpen={isAssignmentModalOpen}
        onClose={() => setIsAssignmentModalOpen(false)}
      />
    </>
  );
};

export default Subgoals;
