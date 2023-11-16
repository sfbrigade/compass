import { trpc } from "@/client/lib/trpc";
import {
  Box,
  Dialog,
  DialogTitle,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import $subgoal from "./Subgoal-Assignment-Modal.module.css";
import $button from "@/styles/Button.module.css";

import {
  AssignmentDuration,
  DurationSelectionStep,
} from "./Duration-Selection-Step";

interface SubgoalAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  subgoal_id: string;
}

interface ParaProps {
  role: string;
  first_name: string;
  last_name: string;
  email: string;
  user_id: string;
  email_verified_at: Date | null;
  image_url: string | null;
}

const STEPS = ["PARA_SELECTION", "DURATION_SELECTION"];
type Step = (typeof STEPS)[number];

export const SubgoalAssignmentModal = (props: SubgoalAssignmentModalProps) => {
  const [selectedParaIds, setSelectedParaIds] = useState<string[]>([]);
  const [assignmentDuration, setAssignmentDuration] =
    useState<AssignmentDuration>({ type: "forever" });
  const [currentModalSelection, setCurrentModalSelection] =
    useState<Step>("PARA_SELECTION");
  const { data: myParas } = trpc.case_manager.getMyParas.useQuery();
  const { data: subgoal } = trpc.iep.getSubgoal.useQuery({
    subgoal_id: props.subgoal_id,
  });

  const assignTaskToPara = trpc.iep.assignTaskToParas.useMutation();

  const handleParaToggle = (paraId: string) => () => {
    setSelectedParaIds((prev) => {
      if (prev.includes(paraId)) {
        return prev.filter((id) => id !== paraId);
      } else {
        return [...prev, paraId];
      }
    });
  };

  const handleClose = () => {
    props.onClose();
    setSelectedParaIds([]);
    setCurrentModalSelection("PARA_SELECTION");
  };

  const handleBack = () => {
    const currentStepIndex = STEPS.indexOf(currentModalSelection);
    const previousStep = STEPS[currentStepIndex - 1];
    if (previousStep) {
      setCurrentModalSelection(previousStep);
    }
  };

  const handleNext = async () => {
    const currentStepIndex = STEPS.indexOf(currentModalSelection);
    const nextStep = STEPS[currentStepIndex + 1];
    if (nextStep) {
      setCurrentModalSelection(nextStep);
    } else {
      // Reached end, save
      await assignTaskToPara.mutateAsync({
        subgoal_id: props.subgoal_id,
        para_ids: selectedParaIds,
        due_date:
          assignmentDuration.type === "until_date"
            ? assignmentDuration.date
            : undefined,
        trial_count:
          assignmentDuration.type === "minimum_number_of_collections"
            ? assignmentDuration.minimumNumberOfCollections
            : undefined,
      });
      handleClose();
    }
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={handleClose}
      className={$subgoal.assignSubgoalModal}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle className={$subgoal.assignSubgoalModalTitle}>
        Assign to benchmark
      </DialogTitle>

      <DialogContent>
        <Box className={$subgoal.subgoalDescriptionBox}>
          <p className={$subgoal.subgoalTitle}>Benchmark</p>
          {subgoal?.map((thisSubgoal) => (
            <p
              className={$subgoal.subgoalDescription}
              key="thisSubgoal.description"
            >
              {thisSubgoal.description}
            </p>
          ))}
        </Box>
        {/* we could make this and the 2nd selection process with a reusable component, e.g. labels in the <p> below could be from rendering {selectionLabel} but this is one solution to start */}
        {currentModalSelection === "PARA_SELECTION" && (
          <Box>
            <p>Select one or more paras:</p>
            <Box
              sx={{
                my: 2,
                maxHeight: "10rem",
                overflow: "auto",
                border: "1px solid #d6dde1",
                borderRadius: 1,
              }}
            >
              <List sx={{ p: 0 }} className={$subgoal.staffListItemText}>
                {myParas
                  ?.filter((para): para is ParaProps => para !== undefined)
                  .map((para) => (
                    // CSS ask is to reorder the mapped staff so that the selected staff are moved to the top of the list
                    <ListItem key={para.user_id} sx={{ px: 0, py: 0 }}>
                      <ListItemButton
                        dense
                        onClick={handleParaToggle(para.user_id)}
                      >
                        <ListItemIcon sx={{ minWidth: "auto" }}>
                          <Checkbox
                            edge="start"
                            disableRipple
                            tabIndex={-1}
                            checked={selectedParaIds.includes(para.user_id)}
                          />
                        </ListItemIcon>
                        <ListItemText>
                          {para.first_name} {para.last_name}
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  ))}
              </List>
            </Box>
          </Box>
        )}
        {/* Enter 2nd selection process here, utilizing selected staff at the end of the process */}
        {currentModalSelection === "DURATION_SELECTION" && (
          <Box>
            <DurationSelectionStep
              selectedDuration={assignmentDuration}
              onDurationChange={setAssignmentDuration}
              disabled={assignTaskToPara.isLoading}
            />
          </Box>
        )}
        <DialogActions>
          {currentModalSelection !== STEPS[0] && (
            <Button
              variant="outlined"
              className={$subgoal.button}
              onClick={handleBack}
              sx={{
                mr: "auto",
                height: "24px",
                flex: "flex-end",
                width: "auto",
                padding: "20px 10px",
                backgroundColor: "#fff ",
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
              disabled={assignTaskToPara.isLoading}
            >
              Back
            </Button>
          )}

          <Button
            sx={{
              height: "24px",
              flex: "flex-end",
              width: "auto",
              padding: "20px 10px",
              backgroundColor: "#20159E ",
              borderRadius: "8px",
              color: "#FFFFFF",
              fontFamily: "Quicksand",
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#20159E ",
                boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, .30)",
              },
              "&:focus": {
                backgroundColor: "#5347D7",
              },
              "&:active": {
                backgroundColor: "#140B7A",
              },
            }}
            variant="contained"
            onClick={handleNext}
            disabled={assignTaskToPara.isLoading}
          >
            {/* need 2 things here: 1. to disable "Next" button unless a staff member has been selected and 2. to change out buttons entirely or reset active state since on clicking "Next", the "save" button reflect focused CSS*/}
            {currentModalSelection === STEPS[STEPS.length - 1]
              ? "Save"
              : "Next"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
