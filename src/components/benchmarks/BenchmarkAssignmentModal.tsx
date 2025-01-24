import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  AssignmentDuration,
  DurationSelectionStep,
} from "@/components/benchmarks/Duration-Selection-Step";
import { ParaSelectionStep } from "@/components/benchmarks/ParaSelectionStep";

import $benchmark from "./BenchmarkAssignmentModal.module.css";
import $button from "../design_system/button/Button.module.css";
import { RouterOutputs } from "@/client/lib/trpc";
import { Step, STEPS } from "@/components/benchmarks/BenchmarkAssignment";
import { RefObject } from "react";

interface BenchmarkAssignmentModalProps {
  isOpen: boolean;
  handleClose: () => void;
  benchmark: RouterOutputs["iep"]["getBenchmark"] | undefined;
  myParas: RouterOutputs["case_manager"]["getMyParas"] | undefined;
  currentModalSelection: Step;
  errorMessage: string;
  selectedParaIds: string[];
  handleParaToggle: (paraId: string) => () => void;
  assignmentDuration: AssignmentDuration;
  setAssignmentDuration: (assignmentDuration: AssignmentDuration) => void;
  isAssignTaskToParaLoading: boolean;
  handleBack: () => void;
  handleNext: () => Promise<void>;
  nextButtonRef: RefObject<HTMLButtonElement>;
}

export const BenchmarkAssignmentModal = ({
  isOpen,
  handleClose,
  benchmark,
  myParas,
  currentModalSelection,
  errorMessage,
  selectedParaIds,
  handleParaToggle,
  assignmentDuration,
  setAssignmentDuration,
  isAssignTaskToParaLoading,
  handleBack,
  handleNext,
  nextButtonRef,
}: BenchmarkAssignmentModalProps) => {
  if (!benchmark) {
    return <div>Loading!</div>;
  }
  return (
    <Dialog
      open={isOpen}
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
          <p
            className={$benchmark.benchmarkDescription}
            key="thisBenchmark.description"
          >
            {benchmark.description}
          </p>
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
              disabled={isAssignTaskToParaLoading}
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
              disabled={isAssignTaskToParaLoading}
            >
              Back
            </Button>
          )}
          {/* we should have reusable variables/classNames for all of this sx:CSS once the global themes are resolved */}
          <Button
            className={$button.default}
            onClick={handleNext}
            ref={nextButtonRef}
            disabled={isAssignTaskToParaLoading || selectedParaIds.length === 0}
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
