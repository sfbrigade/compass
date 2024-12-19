import { trpc } from "@/client/lib/trpc";
import {
  Box,
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState, useRef } from "react";

import {
  AssignmentDuration,
  DurationSelectionStep,
} from "./Duration-Selection-Step";
import $button from "@/components/design_system/button/Button.module.css";
import $benchmark from "./BenchmarkAssignmentModal.module.css";
import { ParaSelectionStep } from "@/components/benchmarks/ParaSelectionStep";

interface BenchmarkAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  benchmark_id: string;
}

const STEPS = ["PARA_SELECTION", "DURATION_SELECTION"];
type Step = (typeof STEPS)[number];

export const BenchmarkAssignmentModal = (
  props: BenchmarkAssignmentModalProps
) => {
  const [selectedParaIds, setSelectedParaIds] = useState<string[]>([]);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const [assignmentDuration, setAssignmentDuration] =
    useState<AssignmentDuration>({ type: "forever" });
  const [currentModalSelection, setCurrentModalSelection] =
    useState<Step>("PARA_SELECTION");
  const { data: myParas } = trpc.case_manager.getMyParas.useQuery();
  const { data: benchmark } = trpc.iep.getBenchmark.useQuery({
    benchmark_id: props.benchmark_id,
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const assignTaskToPara = trpc.iep.assignTaskToParas.useMutation();

  const handleParaToggle = (paraId: string) => () => {
    setErrorMessage("");
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
    setErrorMessage("");
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
      try {
        await assignTaskToPara.mutateAsync({
          benchmark_id: props.benchmark_id,
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
      } catch (err) {
        // TODO: issue #450
        console.log(err);
        if (err instanceof Error) {
          setErrorMessage(err.message);
        }
      }
    }
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={handleClose}
      className={$benchmark.assignBenchmarkModal}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle className={$benchmark.assignBenchmarkModalTitle}>
        Assign to benchmark
      </DialogTitle>

      <DialogContent>
        <Box className={$benchmark.benchmarkDescriptionBox}>
          <p className={$benchmark.benchmarkTitle}>Benchmark</p>
          {benchmark?.map((thisBenchmark) => (
            <p
              className={$benchmark.benchmarkDescription}
              key="thisBenchmark.description"
            >
              {thisBenchmark.description}
            </p>
          ))}
        </Box>
        {currentModalSelection === "PARA_SELECTION" && (
          <ParaSelectionStep
            myParas={myParas}
            selectedParaIds={selectedParaIds}
            handleParaToggle={handleParaToggle}
          />
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

        {errorMessage && (
          <Box className={$benchmark.benchmarkDescriptionBox}>
            {errorMessage}
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
