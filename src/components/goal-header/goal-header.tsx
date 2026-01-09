import {
  Stack,
  Typography,
  Container,
  TextareaAutosize,
  Box,
} from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";

import Chip from "@/components/design_system/chip/Chip";
import Button from "@/components/design_system/button/Button";
import { trpc } from "@/client/lib/trpc";
import $GoalPage from "@/styles/GoalPage.module.css";

type GoalHeaderProps = {
  goalId: string;
  name: string;
  description: string;
  createdAt: string | Date;
  editable?: boolean;
};

export const GoalHeader = ({
  goalId,
  name,
  description,
  createdAt,
  editable = true,
}: GoalHeaderProps) => {
  const [editGoal, setEditGoal] = useState(false);
  const [editGoalInput, setEditGoalInput] = useState("");
  const utils = trpc.useContext();

  const showEditGoal = () => {
    setEditGoal(true);
    setEditGoalInput(description || "");
  };

  // TODO: modify callbacks for toast notification
  const editMutation = trpc.iep.editGoal.useMutation({
    onSuccess: () => utils.iep.getGoal.invalidate(),
    onError: (err) => console.log({ err }),
  });

  const submitEditGoal = () => {
    editMutation.mutate({
      goal_id: goalId,
      description: editGoalInput,
    });
    setEditGoal(false);
    setEditGoalInput("");
  };

  const cancelEditGoal = () => {
    setEditGoal(false);
    setEditGoalInput("");
  };

  return (
    <Container className={$GoalPage.goalDescriptionContainer}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 2,
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1.5}
            alignItems="flex-start"
            sx={{ flexShrink: 0 }}
          >
            <Chip label={name} variant="target" />
            <Chip
              label={`Created on: ${format(new Date(createdAt), "MMM, dd, yyyy")}`}
              variant="calendar"
            />
          </Stack>
          {editable && (
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 1,
                width: { xs: "100%", md: "auto" },
              }}
            >
              {!editGoal && (
                <Box sx={{ display: "flex", justifyContent: "right" }}>
                  <Button
                    variant="tertiary"
                    onClick={showEditGoal}
                    sx={{ width: { md: "auto" } }}
                  >
                    Edit goal
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => alert("to be implemented")}
                    sx={{ width: { md: "auto" } }}
                  >
                    View all goals
                  </Button>
                </Box>
              )}
              {editGoal && (
                <>
                  <Button
                    variant="tertiary"
                    onClick={cancelEditGoal}
                    sx={{ width: { xs: "100%", md: "auto" } }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={submitEditGoal}
                    sx={{ width: { xs: "100%", md: "auto" } }}
                  >
                    Save
                  </Button>
                </>
              )}
            </Box>
          )}
        </Box>
        {editGoal && editable ? (
          <TextareaAutosize
            className={$GoalPage.editGoalFormTextArea}
            value={editGoalInput}
            name="description"
            onChange={(e) => {
              setEditGoalInput(e.target.value);
            }}
            style={{
              width: "100%",
              padding: "24px",
              fontSize: "0.95rem",
              lineHeight: "1.6",
              borderRadius: "8px",
              border: "1px solid var(--outline)",
              fontFamily: "inherit",
              minHeight: "100px",
              backgroundColor: "var(--on-primary)",
            }}
          />
        ) : (
          <Typography
            variant="body1"
            sx={{
              fontSize: "16px",
              lineHeight: "150%",
              color: "var(--on-background)",
              fontFamily: "var(--inter)",
              fontWeight: 400,
              letterSpacing: "0%",
            }}
          >
            {description}
          </Typography>
        )}
      </Box>
    </Container>
  );
};
