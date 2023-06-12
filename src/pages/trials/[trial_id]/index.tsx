import React, { useState } from "react";
import Counter from "./counter";
import Timer from "./timer";
import TimerInput from "./timerInput";

const TrialPage = () => {
  const [timerTimeInSec, setTimerTimeInSec] = useState(0);

  const handleStartTimer = (inputTimeInStandard: string) => {
    console.log(inputTimeInStandard);
    const zerosToAdd = 6 - inputTimeInStandard.length;

    const zeroTime = "0".repeat(zerosToAdd) + inputTimeInStandard;
    const [hours, minutes, seconds] =
      zeroTime.match(/.{1,2}/g)?.map((time) => Number(time)) || [];
    console.log(hours, minutes, seconds);

    let totalTimeInMs = 0;

    totalTimeInMs += seconds;
    totalTimeInMs += minutes * 60;
    totalTimeInMs += hours * 60 * 60;
    console.log(totalTimeInMs);

    setTimerTimeInSec(totalTimeInMs);
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
