import { trpc } from "@/client/lib/trpc";
import { Subgoal } from "@/types/global";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import { useState, type ReactNode } from "react";
import { SubgoalAssignmentModal } from "./Subgoal-Assignment-Modal";
import $button from "@/components/design_system/button/Button.module.css";
import { format } from "date-fns";

interface SubgoalProps {
  subgoal: Subgoal;
}

interface InfoProps {
  description: string;
  children: ReactNode;
}

const Info = ({ description, children }: InfoProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{ marginBottom: "0.5em" }}
        variant="overline"
        display="block"
        gutterBottom
      >
        {description}
      </Typography>
      {children}
    </Box>
  );
};

const Subgoals = ({ subgoal }: SubgoalProps) => {
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  return (
    <Box
      sx={{
        marginBottom: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex-col",
          justifyContent: "space-between",
          backgroundColor: "var(--grey-100)",
          padding: "1rem",
        }}
      >
        <Typography variant="overline" display="block" gutterBottom>
          #{subgoal.subgoal_id} created on {format(subgoal.created_at, "P")}
        </Typography>
        <p>{subgoal.description}</p>
        <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Info description={"BASELINE LEVEL"}>
            {" "}
            {subgoal?.baseline_level}%{" "}
          </Info>
          <Info description={"TARGET LEVEL"}> {subgoal?.target_level}% </Info>
          <Info description={"CURRENT LEVEL"}> X </Info>
          <Info description={"# OF TRIALS"}> X </Info>
          <Info description="DATA">
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Box mx={{ marginRight: "0.5rem" }}>Collect Data</Box>

              <Box mx={{ marginLeft: "0.5rem" }}>View Data</Box>
            </Box>
          </Info>
          <Info description={"STAFF"}>
            <Button
              className={$button.secondary}
              onClick={() => setIsAssignmentModalOpen(true)}
            >
              Assign
            </Button>
          </Info>
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
