import { trpc } from "@/client/lib/trpc";
import {
  Box,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState, useEffect, MouseEvent } from "react";
import $benchmark from "./BenchmarkAssignmentModal.module.css";

import Button from "@/components/design_system/button/Button";
import DS_Checkbox from "@/components/design_system/checkbox/Checkbox";
import { Benchmark } from "@/types/global";

import {
  AssignmentDuration,
  DurationSelectionStep,
} from "./Duration-Selection-Step";

interface BenchmarkAssignmentModalProps {
  isOpen: boolean;
  onClose: (benchmark?: Benchmark) => void;
  benchmark_id: string;
}

interface ParaProps {
  role: string;
  first_name: string;
  last_name: string;
  email: string;
  para_id: string;
  case_manager_id: string;
  user_id: string;
  email_verified_at: Date | null;
  image_url: string | null;
}

const STEPS = ["PARA_SELECTION", "DURATION_SELECTION"];
type Step = (typeof STEPS)[number];

export const BenchmarkAssignmentModal = (
  props: BenchmarkAssignmentModalProps
) => {
  const [selectedParaIds, setSelectedParaIds] = useState<string[]>([]);
  const [assignmentDuration, setAssignmentDuration] =
    useState<AssignmentDuration>({ type: "forever" });
  const [currentModalSelection, setCurrentModalSelection] =
    useState<Step>("PARA_SELECTION");
  const { data: myParas } = trpc.case_manager.getMyParas.useQuery();
  const { data: benchmark, isError: benchmarkFetchError } =
    trpc.iep.getBenchmark.useQuery({
      benchmark_id: props.benchmark_id,
    });

  useEffect(() => {
    const paraIds =
      benchmark?.assignees
        .map(({ assignee_id }) => assignee_id)
        .filter((ele) => ele !== null) ?? [];

    setSelectedParaIds(paraIds);
    if (benchmark?.trial_count !== null) {
      setAssignmentDuration({
        type: "minimum_number_of_collections",
        minimumNumberOfCollections: benchmark?.trial_count ?? 1,
      });
    } else if (benchmark?.due_date !== null) {
      setAssignmentDuration({
        type: "until_date",
        date: new Date(benchmark.due_date),
      });
    } else {
      setAssignmentDuration({ type: "forever" });
    }
  }, [benchmark]);

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

  const handleClose = (benchmark?: Benchmark) => {
    props.onClose(benchmark);
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

  const handleNext = async (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget?.blur();
    const currentStepIndex = STEPS.indexOf(currentModalSelection);
    const nextStep = STEPS[currentStepIndex + 1];
    if (nextStep) {
      setCurrentModalSelection(nextStep);
    } else {
      // Reached end, save
      try {
        const benchmark = await assignTaskToPara.mutateAsync({
          benchmark_id: props.benchmark_id,
          para_ids: selectedParaIds,
          due_date:
            assignmentDuration.type === "until_date"
              ? assignmentDuration.date
              : null,
          trial_count:
            assignmentDuration.type === "minimum_number_of_collections"
              ? assignmentDuration.minimumNumberOfCollections
              : null,
        });
        handleClose(benchmark);
      } catch (err) {
        // TODO: issue #450
        console.log(err);
        if (err instanceof Error) {
          setErrorMessage(err.message);
        }
      }
    }
  };

  // does this matter to prevent error typed values?
  if (benchmarkFetchError) {
    return <div>Oops! Error fetching benchmark</div>;
  }

  return (
    <Dialog
      open={props.isOpen}
      onClose={() => handleClose()}
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
          <p className={$benchmark.benchmarkDescription}>
            {benchmark?.description}
          </p>
        </Box>
        {currentModalSelection === "PARA_SELECTION" && (
          <Box>
            <p>Select one or more paras:</p>
            <Box
              sx={{
                my: 2,
                maxHeight: "10rem",
                overflow: "auto",
                border: "1px solid var(--grey-70)",
                borderRadius: 1,
              }}
            >
              <List sx={{ p: 0 }} className={$benchmark.staffListItemText}>
                {myParas
                  ?.filter((para): para is ParaProps => para !== undefined)
                  .map((para) => (
                    <ListItem
                      key={para.user_id}
                      sx={{
                        px: 0,
                        py: 0,
                      }}
                    >
                      <DS_Checkbox
                        onClickAction={handleParaToggle(para.user_id)}
                        text={`${para.first_name} ${para.last_name}`}
                        checked={selectedParaIds.includes(para.user_id)}
                      />
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

        {errorMessage && (
          <Box className={$benchmark.benchmarkDescriptionBox}>
            {errorMessage}
          </Box>
        )}
        <DialogActions>
          {currentModalSelection !== STEPS[0] && (
            <Button
              variant="secondary"
              onClick={handleBack}
              disabled={assignTaskToPara.isLoading}
            >
              Back
            </Button>
          )}
          {/* we should have reusable variables/classNames for all of this sx:CSS once the global themes are resolved */}
          <Button
            onClick={handleNext}
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
