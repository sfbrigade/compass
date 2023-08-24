import React, { useEffect, useState } from "react";
import Counter from "@/components/counter/counter";
import ParaNav from "@/components/paraNav/ParaNav";
import Link from "next/link";
import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import { useDebounce } from "react-use";
import $box from "@/styles/Box.module.css";
import $button from "@/styles/Button.module.css";
import $typo from "@/styles/Typography.module.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface DataUpdate {
  success?: number;
  unsuccess?: number;
  submitted?: boolean;
  notes?: string;
}

const BenchmarkPage = () => {
  const router = useRouter();
  const { benchmark_id } = router.query;
  const utils = trpc.useContext();
  const {
    data: task,
    isLoading: taskIsLoading,
    isError,
  } = trpc.iep.getSubgoalAndTrialData.useQuery(
    {
      task_id: benchmark_id as string,
    },
    {
      enabled: Boolean(benchmark_id),
    }
  );
  const seenMutation = trpc.iep.markAsSeen.useMutation({
    onSuccess: async () => await utils.iep.getSubgoalAndTrialData.invalidate(),
  });
  const addTrialMutation = trpc.iep.addTrialData.useMutation({
    onSuccess: async () => await utils.iep.getSubgoalAndTrialData.invalidate(),
  });
  const updateTrialMutation = trpc.iep.updateTrialData.useMutation({
    onSuccess: async () => await utils.iep.getSubgoalAndTrialData.invalidate(),
  });

  const [notesValue, setNotesValue] = useState("");
  const [currentTrialIdx, setCurrentTrialIdx] = useState(0);
  const currentTrial = task?.trials[currentTrialIdx] || null;
  useEffect(() => {
    if (task && task.trials.length > 0) {
      setCurrentTrialIdx(task.trials.length - 1);
    }
  }, [task]);

  useEffect(() => {
    if (task && currentTrial) {
      setNotesValue(currentTrial.notes || "");
    }
  }, [task, currentTrial]);

  useEffect(() => {
    if (!seenMutation.isLoading && !taskIsLoading && task && !task.seen) {
      seenMutation.mutate({ task_id: task.task_id });
    }
  }, [task, seenMutation, taskIsLoading]);

  useEffect(() => {
    if (
      !addTrialMutation.isLoading &&
      !taskIsLoading &&
      task &&
      (task.trials.length === 0 ||
        task.trials[task.trials.length - 1]?.submitted === true)
    ) {
      addTrialMutation.mutate({
        task_id: task.task_id,
        success: 0,
        unsuccess: 0,
        notes: "",
      });
    }
  }, [task, addTrialMutation, taskIsLoading]);

  const handleUpdate = (updates: DataUpdate) => {
    //Can only update if we're on the most recent trial
    if (task && currentTrial && currentTrialIdx === task.trials.length - 1) {
      updateTrialMutation.mutate({
        trial_data_id: currentTrial.trial_data_id,
        ...updates,
      });
    }
  };

  // BUG: Updating counters before the timer goes off results in changes being reverted.
  const onNoteChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNotesValue((e.target as HTMLInputElement).value);
  };
  useDebounce(
    () => {
      //Only update db after typing has stopped for 1 sec
      handleUpdate({
        notes: notesValue,
      });
    },
    1000,
    [notesValue]
  );
  if (taskIsLoading || !currentTrial) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Oops! Something went wrong.</div>;
  }

  return (
    <>
      <Link href="/benchmarks">
        <ArrowBackIcon />
      </Link>
      <ParaNav />
      <p className={$box.default}>
        <strong>Task:</strong> {task.description}
      </p>
      <div className={`${$box.topAndBottomBorder} ${$box.flex}`}>
        <button
          className={`${$button.default} ${$button.circular}`}
          onClick={() => setCurrentTrialIdx(currentTrialIdx - 1)}
          disabled={currentTrialIdx === 0}
        >
          <ChevronLeftIcon />
        </button>
        <p>Trial {currentTrialIdx + 1}</p>
        <button
          className={`${$button.default} ${$button.circular}`}
          onClick={() => setCurrentTrialIdx(currentTrialIdx + 1)}
          disabled={currentTrialIdx === task.trials.length - 1}
        >
          <ChevronRightIcon />
        </button>
      </div>

      <div className={$box.greyBg}>
        <Counter
          title={
            <>
              Successful <CheckIcon />
            </>
          }
          count={currentTrial.success}
          onIncrement={() =>
            handleUpdate({
              success: currentTrial.success + 1,
            })
          }
          onDecrement={() =>
            handleUpdate({
              success: currentTrial.success - 1,
            })
          }
          disableInc={currentTrialIdx !== task.trials.length - 1}
          disableDec={
            currentTrialIdx !== task.trials.length - 1 ||
            currentTrial.success <= 0
          }
          color="green"
        />
        <Counter
          title={
            <>
              Unsuccessful <ClearIcon />
            </>
          }
          count={currentTrial.unsuccess}
          onIncrement={() =>
            handleUpdate({
              unsuccess: currentTrial.unsuccess + 1,
            })
          }
          onDecrement={() =>
            handleUpdate({
              unsuccess: currentTrial.unsuccess - 1,
            })
          }
          disableInc={currentTrialIdx !== task.trials.length - 1}
          disableDec={
            currentTrialIdx !== task.trials.length - 1 ||
            currentTrial.unsuccess <= 0
          }
          color="red"
        />
        <p className={`${$typo.centeredText} ${$typo.bold}`}>
          {currentTrial.success + currentTrial.unsuccess} attempts out of{" "}
          {task.target_max_attempts}
        </p>
      </div>
      <input
        className={$box.default}
        type="text"
        placeholder="Type your observation notes here..."
        readOnly={currentTrialIdx !== task.trials.length - 1}
        value={notesValue}
        onChange={onNoteChange}
      ></input>

      <Link
        href={`${router.asPath}/review`}
        className={`${$button.default} ${$button.fixedToBottom} ${
          currentTrialIdx !== task.trials.length - 1 ? $button.inactive : ""
        }`}
      >
        Review
      </Link>
    </>
  );
};

export default BenchmarkPage;