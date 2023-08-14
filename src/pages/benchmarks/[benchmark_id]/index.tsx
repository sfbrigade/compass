import React, { useEffect } from "react";
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

const BenchmarkPage = () => {
  const router = useRouter();
  const { benchmark_id } = router.query;
  const utils = trpc.useContext();
  const {
    data: task,
    isLoading,
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
    onSuccess: () => utils.iep.getTaskById.invalidate(),
  });

  // const [timerTimeInSec, setTimerTimeInSec] = useState(0);
  // const [timerInputIsOn, setTimerInputIsOn] = useState(false);
  // const [runningTotal, setRunningTotal] = useState(0);

  useEffect(() => {
    if (task && !task.seen) {
      seenMutation.mutate({ task_id: task.task_id });
    }
  }, [task, seenMutation]);

  // Timers removed from current MVP. May reintroduce them later.
  // const handleStartTimer = (inputTimeInSec: number) => {
  //   setTimerTimeInSec(inputTimeInSec);
  //   setTimerInputIsOn(false);
  // };

  // const handleSetTimer = () => {
  //   setTimerInputIsOn(!timerInputIsOn);
  // };

  if (isLoading) {
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
        <button className={`${$button.default} ${$button.circular}`}>
          <ChevronLeftIcon />
        </button>
        <p>Trial #</p>
        <button className={`${$button.default} ${$button.circular}`}>
          <ChevronRightIcon />
        </button>
      </div>

      <div className={$box.greyBg}>
        <Counter
          title="Successful without prompt"
          maxCount={5}
          minCount={0}
          color="green"
        />
        <Counter
          title="Successful with prompt"
          maxCount={5}
          minCount={0}
          color="yellow"
        />
        <Counter title="Attempts" maxCount={5} minCount={0} color="blue" />
      </div>
      <input
        className={$box.default}
        type="text"
        placeholder="Type your observation notes here..."
      ></input>

      <button className={`${$button.default} ${$box.fullWidth}`}>Review</button>
    </>
  );
};

export default BenchmarkPage;
