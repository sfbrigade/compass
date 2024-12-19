import { trpc } from "@/client/lib/trpc";
import { useState, useRef } from "react";

import { AssignmentDuration } from "./Duration-Selection-Step";
import { BenchmarkAssignmentModal } from "@/components/benchmarks/BenchmarkAssignmentModal";

interface BenchmarkAssignmentProps {
  isOpen: boolean;
  onClose: () => void;
  benchmark_id: string;
}

export const STEPS = ["PARA_SELECTION", "DURATION_SELECTION"];
export type Step = (typeof STEPS)[number];

export const BenchmarkAssignment = (props: BenchmarkAssignmentProps) => {
  const [selectedParaIds, setSelectedParaIds] = useState<string[]>([]);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const [assignmentDuration, setAssignmentDuration] =
    useState<AssignmentDuration>({ type: "forever" });
  const [currentModalSelection, setCurrentModalSelection] =
    useState<Step>("PARA_SELECTION");
  const { data: myParas } = trpc.case_manager.getMyParas.useQuery();
  const { data: benchmark } = trpc.iep.getBenchmark.useQuery({
    benchmark_id: props.benchmark_id,
  }); // maybe it should include assignments, or have a flag to include assignments

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
    <BenchmarkAssignmentModal
      isOpen={props.isOpen}
      handleClose={handleClose}
      benchmark={benchmark}
      myParas={myParas}
      currentModalSelection={currentModalSelection}
      errorMessage={errorMessage}
      selectedParaIds={selectedParaIds}
      handleParaToggle={handleParaToggle}
      assignmentDuration={assignmentDuration}
      setAssignmentDuration={setAssignmentDuration}
      isAssignTaskToParaLoading={assignTaskToPara.isLoading}
      handleBack={handleBack}
      handleNext={handleNext}
      nextButtonRef={nextButtonRef}
    />
  );
};
