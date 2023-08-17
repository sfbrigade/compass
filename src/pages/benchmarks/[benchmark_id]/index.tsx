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
  const handleUpdate = (updates: dataUpdate) => {
    if (task && task.trials[task.trials.length - 1]) {
      updateTrialMutation.mutate({
        trial_id: task.trials[task.trials.length - 1].trial_id,
        ...updates,
      });
    }
  };
  const [notesValue, setNotesValue] = useState("");
  const [inputTimer, setInputTimer] = useState<NodeJS.Timer | null>(null);
  const [runningTotal, setRunningTotal] = useState(0);
  const [currentTrial, setCurrentTrial] = useState(0);
  useEffect(() => {
    if (task) {
      setCurrentTrial(task.trials.length - 1);
    }
  }, [task]);

  useEffect(() => {
    if (task) {
      setRunningTotal(
        task.trials[currentTrial].success_with_prompt +
          task.trials[currentTrial].success_without_prompt
      );
      setNotesValue(task.trials[currentTrial].notes || "");
    }
  }, [task, currentTrial]);

  // const [timerTimeInSec, setTimerTimeInSec] = useState(0);
  // const [timerInputIsOn, setTimerInputIsOn] = useState(false);
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

  // Timers removed from current MVP. May reintroduce them later.
  // const handleStartTimer = (inputTimeInSec: number) => {
  //   setTimerTimeInSec(inputTimeInSec);
  //   setTimerInputIsOn(false);
  // };

  // const handleSetTimer = () => {
  //   setTimerInputIsOn(!timerInputIsOn);
  // };
  // console.log('state: ', {
  //   currentTrial: currentTrial,
  //   runningTotal: runningTotal,
  //   notes: notesValue
  // })

  const handleIncrement = (updateObj: dataUpdate) => {
    //Can only update if we're on the most recent trial
    if (
      task &&
      currentTrial === task.trials.length - 1 &&
      runningTotal < task.trial_count
    ) {
      handleUpdate(updateObj);
    }
  };
  const handleDecrement = (updateObj: dataUpdate) => {
    if (task && currentTrial === task.trials.length - 1 && runningTotal > 0) {
      handleUpdate(updateObj);
    }
  };
  const onNoteChange = (e: React.FormEvent<HTMLInputElement>) => {
    //Only update db after typing has stopped for 1 sec
    setNotesValue((e.target as HTMLInputElement).value);
    if (inputTimer) {
      clearTimeout(inputTimer);
    }

    const newTimer = setTimeout(() => {
      handleUpdate({
        notes: (e.target as HTMLInputElement).value,
      });
    }, 1000);

    setInputTimer(newTimer);
  };

  if (taskIsLoading || task?.trials.length === 0) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Oops! Something went wrong.</div>;
  }

  return (
    <>
      <ParaNav />
      <p className={$box.default}>
        <strong>Task:</strong> {task.description}
      </p>
      <div className={`${$box.topAndBottomBorder} ${$box.flex}`}>
        <button
          className={`${$button.default} ${$button.circular}`}
          onClick={() => setCurrentTrial(currentTrial - 1)}
          disabled={currentTrial === 0}
        >
          <ChevronLeftIcon />
        </button>
        <p>Trial {currentTrial + 1}</p>
        <button
          className={`${$button.default} ${$button.circular}`}
          onClick={() => setCurrentTrial(currentTrial + 1)}
          disabled={currentTrial === task.trials.length - 1}
        >
          <ChevronRightIcon />
        </button>
      </div>

      <div className={$box.greyBg}>
        <Counter
          title="Successful without prompt"
          count={task.trials[currentTrial].success_without_prompt}
          onIncrement={() =>
            handleIncrement({
              success_without_prompt:
                task.trials[currentTrial].success_without_prompt + 1,
            })
          }
          onDecrement={() =>
            handleDecrement({
              success_without_prompt:
                task.trials[currentTrial].success_without_prompt - 1,
            })
          }
          color="green"
        />
        <Counter
          title="Successful with prompt"
          count={task.trials[currentTrial].success_with_prompt}
          onIncrement={() =>
            handleIncrement({
              success_with_prompt:
                task.trials[currentTrial].success_with_prompt + 1,
            })
          }
          onDecrement={() =>
            handleDecrement({
              success_with_prompt:
                task.trials[currentTrial].success_with_prompt - 1,
            })
          }
          color="yellow"
        />
        <Counter
          title="Attempts"
          count={task.trial_count}
          onIncrement={() => console.log("hi")}
          onDecrement={() => console.log("hi")}
          color="blue"
        />
      </div>
      <input
        className={$box.default}
        type="text"
        placeholder="Type your observation notes here..."
        value={notesValue}
        onChange={onNoteChange}
      ></input>

      <Link
        href={`${router.asPath}/review`}
        className={`${$button.default} ${$box.fullWidth}`}
      >
        Review
      </Link>
    </>
  );
};

export default BenchmarkPage;
