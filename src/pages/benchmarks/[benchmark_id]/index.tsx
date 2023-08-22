import React, { useEffect, useState } from "react";
import Counter from "@/components/para_trials/counter";
// import Timer from "@/components/para_trials/timer";
// import TimerInput from "@/components/para_trials/timerInputPad";
import $box from "@/styles/Box.module.css";
import $button from "@/styles/Button.module.css";
import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ParaNav from "@/components/ParaNav";
import Link from "next/link";

interface dataUpdate {
  success_with_prompt?: number;
  success_without_prompt?: number;
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
  } = trpc.iep.getTaskById.useQuery(
    {
      task_id: benchmark_id as string,
    },
    {
      enabled: Boolean(benchmark_id),
    }
  );
  const seenMutation = trpc.iep.setSeen.useMutation({
    onSuccess: async () => await utils.iep.getTaskById.invalidate(),
  });
  const addTrialMutation = trpc.iep.addTrialData.useMutation({
    onSuccess: async () => await utils.iep.getTaskById.invalidate(),
  });
  const updateTrialMutation = trpc.iep.updateTrialData.useMutation({
    onSuccess: async () => await utils.iep.getTaskById.invalidate(),
  });

  const [notesValue, setNotesValue] = useState("");
  const [inputTimer, setInputTimer] = useState<NodeJS.Timer | null>(null);
  // const [runningTotal, setRunningTotal] = useState(0);
  const [currentTrialIdx, setCurrentTrialIdx] = useState(0);
  const currentTrial = task?.trials[currentTrialIdx] || null;
  useEffect(() => {
    if (task && task.trials.length > 0) {
      setCurrentTrialIdx(task.trials.length - 1);
    }
  }, [task]);

  useEffect(() => {
    if (task && currentTrial) {
      // setRunningTotal(
      //   currentTrial.success_with_prompt + currentTrial.success_without_prompt
      // );
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
        success_with_prompt: 0,
        success_without_prompt: 0,
        notes: "",
      });
    }
  }, [task, addTrialMutation, taskIsLoading]);

  const handleUpdate = (updates: dataUpdate) => {
    //Can only update if we're on the most recent trial
    if (task && currentTrial && currentTrialIdx === task.trials.length - 1) {
      updateTrialMutation.mutate({
        trial_id: currentTrial.trial_id,
        ...updates,
      });
    }
  };

  // BUG: Updating counters before the timer goes off results in changes being reverted.
  const onNoteChange = (e: React.FormEvent<HTMLInputElement>) => {
    //Only update db after typing has stopped for 0.5 sec
    setNotesValue((e.target as HTMLInputElement).value);
    if (inputTimer) {
      clearTimeout(inputTimer);
    }

    const newTimer = setTimeout(() => {
      handleUpdate({
        notes: (e.target as HTMLInputElement).value,
      });
    }, 500);

    setInputTimer(newTimer);
  };

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
          title="Successful without prompt"
          count={currentTrial.success_without_prompt}
          onIncrement={() =>
            handleUpdate({
              success_without_prompt: currentTrial.success_without_prompt + 1,
            })
          }
          onDecrement={() =>
            handleUpdate({
              success_without_prompt: currentTrial.success_without_prompt - 1,
            })
          }
          disableInc={currentTrialIdx !== task.trials.length - 1}
          disableDec={
            currentTrialIdx !== task.trials.length - 1 ||
            currentTrial.success_without_prompt <= 0
          }
          color="green"
        />
        <Counter
          title="Successful with prompt"
          count={currentTrial.success_with_prompt}
          onIncrement={() =>
            handleUpdate({
              success_with_prompt: currentTrial.success_with_prompt + 1,
            })
          }
          onDecrement={() =>
            handleUpdate({
              success_with_prompt: currentTrial.success_with_prompt - 1,
            })
          }
          disableInc={currentTrialIdx !== task.trials.length - 1}
          disableDec={
            currentTrialIdx !== task.trials.length - 1 ||
            currentTrial.success_with_prompt <= 0
          }
          color="yellow"
        />
        <Counter
          title="Attempts"
          count={task.target_max_attempts}
          onIncrement={() => console.log("hi")}
          onDecrement={() => console.log("hi")}
          disableInc={true}
          disableDec={true}
          color="blue"
        />
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
