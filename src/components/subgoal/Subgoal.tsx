import { trpc } from "@/client/lib/trpc";
import { Subgoal } from "@/types/global";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { useState, type ReactNode } from "react";
import { SubgoalAssignmentModal } from "./Subgoal-Assignment-Modal";
import $button from "@/components/design_system/button/Button.module.css";
import { format } from "date-fns";

interface SubgoalProps {
  subgoal: Subgoal;
  index?: number;
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
        justifyContent: "center",
        textAlign: "center",
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

const Subgoals = ({ subgoal, index }: SubgoalProps) => {
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  return (
    <Box
      sx={{
        marginBottom: "2rem",
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
        <Typography
          sx={{ color: "var(--primary-40)" }}
          variant="overline"
          display="block"
          gutterBottom
        >
          #{(index ?? 0) + 1} created on {format(subgoal.created_at, "P")}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <ContentPasteIcon
              sx={{
                color: "var(--grey-10)",
                fontSize: 12,
                margin: "1.25rem",
                marginLeft: "0.5rem",
                marginRight: "0.5rem",
              }}
            />

            <Box sx={{ margin: "1rem", marginLeft: ".5rem" }}>
              {subgoal.description}
            </Box>
          </Box>
          <Box sx={{ margin: "1rem" }}>Edit</Box>
        </Box>
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
          <Info description={"CURRENT LEVEL"}>
            {" "}
            {subgoal?.current_level || "N/A"}{" "}
          </Info>
          <Info description={"# OF TRIALS"}>
            {" "}
            {subgoal?.number_of_trials || "N/A"}
          </Info>
          <Info description="DATA">
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
              }}
            >
              <Box
                sx={{
                  marginRight: { xs: "0rem", lg: "0.5rem" },
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Collect Data
              </Box>
              <Box
                sx={{
                  marginLeft: { xs: "0rem", lg: "0.5rem" },
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                View Data
              </Box>
            </Box>
          </Info>
          <Info description={"STAFF"}>
            <Button
              className={$button.secondary}
              onClick={() => setIsAssignmentModalOpen(true)}
              sx={{
                paddingTop: ".4rem !important",
                paddingBottom: ".4rem !important",
                paddingLeft: ".4rem !important",
                paddingRight: ".4rem !important",
              }}
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
