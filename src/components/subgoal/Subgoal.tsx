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

  return (
    <Box sx={{ border: "1px solid var(--grey-60)" }}>
      <Box
        sx={{
          display: "flex-col",
          justifyContent: "space-between",
          backgroundColor: "var(--grey-100)",
          padding: "1rem",
        }}
      >
        <p>{subgoal.description}</p>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p> BASELINE</p>
          <p> CURRENT</p>
          <Box
            sx={{
              display: "flex-col",
            }}
          >
            <p>STAFF</p>
            <Button
              sx={{
                height: "24px",
                flex: "flex-end",
                width: "auto",
                padding: "20px 10px",
                backgroundColor: "var(--grey-100)",
                borderWidth: "1px",
                borderColor: "#20159E",
                borderRadius: "8px",
                color: "#20159E",
                fontFamily: "Quicksand",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#F6F5FF",
                },
              }}
              variant="outlined"
              onClick={() => setIsAssignmentModalOpen(true)}
            >
              Assign Staff
            </Button>
          </Box>
        </Box>
      </Box>
      <SubgoalAssignmentModal
        isOpen={isAssignmentModalOpen}
        onClose={() => setIsAssignmentModalOpen(false)}
        subgoal_id={subgoal.subgoal_id}
      />
    </Box>
  );
};

export default Subgoals;
