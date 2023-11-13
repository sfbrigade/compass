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
import {
  AssignmentDuration,
  DurationSelectionStep,
} from "./Duration-Selection-Step";

interface SubgoalAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  subgoal_id: string;
}

const STEPS = ["PARA_SELECTION", "DURATION_SELECTION"];
type Step = (typeof STEPS)[number];

export const SubgoalAssignmentModal = (props: SubgoalAssignmentModalProps) => {
  const [selectedParaIds, setSelectedParaIds] = useState<string[]>([]);
  const [assignmentDuration, setAssignmentDuration] =
    useState<AssignmentDuration>({ type: "forever" });
  const [currentModalSelection, setCurrentModalSelection] =
    useState<Step>("PARA_SELECTION");
  const myParasQuery = trpc.case_manager.getMyParas.useQuery();
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
                {myParasQuery.data?.map((para) => (
                  // CSS ask is to reorder the mapped staff so that the selected staff are moved to the top of the list
                  <ListItem key={para.para_id} sx={{ px: 0, py: 0 }}>
                    <ListItemButton
                      dense
                      onClick={handleParaToggle(para.para_id)}
                    >
                      <ListItemIcon sx={{ minWidth: "auto" }}>
                        <Checkbox
                          edge="start"
                          disableRipple
                          tabIndex={-1}
                          checked={selectedParaIds.includes(para.para_id)}
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
              variant="contained"
              className={$subgoal.button}
              onClick={handleBack}
              sx={{ mr: "auto" }}
              disabled={assignTaskToPara.isLoading}
            >
              Back
            </Button>
          )}

          <Button
            variant="contained"
            className={$subgoal.button}
            onClick={handleNext}
            disabled={assignTaskToPara.isLoading}
          >
            {currentModalSelection === STEPS[STEPS.length - 1]
              ? "Save"
              : "Next"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
