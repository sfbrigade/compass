import React, { useState } from "react";
import Counter from "../../../components/para_trials/counter";
import Timer from "../../../components/para_trials/timer";
import TimerInput from "../../../components/para_trials/timerInput";

const TrialPage = () => {
  const [timerTimeInSec, setTimerTimeInSec] = useState(0);

  const handleStartTimer = (inputTimeInStandard: string) => {
    const zerosToAdd = 6 - inputTimeInStandard.length;

    const zeroTime = "0".repeat(zerosToAdd) + inputTimeInStandard;
    const [hours, minutes, seconds] =
      zeroTime.match(/.{1,2}/g)?.map((time) => Number(time)) || [];

    let totalTimeInSec = 0;

    totalTimeInSec += seconds;
    totalTimeInSec += minutes * 60;
    totalTimeInSec += hours * 60 * 60;

    setTimerTimeInSec(totalTimeInSec);
  };
  return (
    <div>
      <h1>Trial</h1>
      <Counter title="Attempts" maxCount={5} minCount={0} color="blue" />
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
      <Timer timeInSec={timerTimeInSec} />
      <TimerInput onStartTimer={handleStartTimer} />
    </div>
  );
};

export default TrialPage;
