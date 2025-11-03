import {
  Stack,
  Typography,
  Container,
  TextareaAutosize,
  Chip,
  Box,
} from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import { AdjustOutlined, CalendarMonthOutlined } from "@mui/icons-material";

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
            <Chip icon={<AdjustOutlined />} label={name} variant="outlined" />
            <Chip
              icon={<CalendarMonthOutlined />}
              label={`Created on: ${format(new Date(createdAt), "MMM, dd, yyyy")}`}
              variant="outlined"
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
                <>
                  <Button
                    variant="tertiary"
                    onClick={showEditGoal}
                    sx={{ width: { xs: "100%", md: "auto" } }}
                  >
                    Edit goal
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => alert("to be implemented")}
                    sx={{ width: { xs: "100%", md: "auto" } }}
                  >
                    View all goals
                  </Button>
                </>
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
              padding: "12px",
              fontSize: "0.95rem",
              lineHeight: "1.6",
              borderRadius: "4px",
              border: "1px solid #e0e0e0",
              fontFamily: "inherit",
              minHeight: "100px",
            }}
          />
        ) : (
          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: "1.6",
              color: "#1a1a1a",
            }}
          >
            {description}
          </Typography>
        )}
      </Box>
    </Container>
  );
};
