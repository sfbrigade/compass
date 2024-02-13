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
import { useState, useRef } from "react";
import $subgoal from "./Subgoal-Assignment-Modal.module.css";
import $button from "@/components/design_system/button/Button.module.css";

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
  const nextButtonRef = useRef<HTMLButtonElement>(null);
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
    if (nextButtonRef.current) {
      nextButtonRef.current.blur();
    }
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
              {/* Design ask is to reorder the mapped staff so that the selected staff are moved to the top of the list */}
              <List sx={{ p: 0 }} className={$subgoal.staffListItemText}>
                {myParas
                  ?.filter((para): para is ParaProps => para !== undefined)
                  .map((para) => (
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
              className={$button.secondary}
              onClick={handleBack}
              disabled={assignTaskToPara.isLoading}
            >
              Back
            </Button>
          )}
          {/* we should have reusable variables/classNames for all of this sx:CSS once the global themes are resolved */}
          <Button
            className={$button.default}
            onClick={handleNext}
            ref={nextButtonRef}
            disabled={
              assignTaskToPara.isLoading || selectedParaIds.length === 0
            }
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
