import React, { useState } from "react";
import Counter from "../../../components/para_trials/counter";
import Timer from "../../../components/para_trials/timer";
import TimerInput from "../../../components/para_trials/timerInput";
import styles from "../../../styles/Paraflow.module.css";

const TrialPage = () => {
  const [timerTimeInSec, setTimerTimeInSec] = useState(0);
  const [timerInputIsOn, setTimerInputIsOn] = useState(false);

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
  const handleSetTimer = () => {
    setTimerInputIsOn(!timerInputIsOn);
  };

  return (
    <div>
      <h1>Trial</h1>
      <div>
        <p>
          <strong>Task:</strong> Given sentence starters and spelling support
          Annie will write 5 sentences of their own thoughts and opinions with
          80% accuracy in 4 out of 5 trials.
        </p>
      </div>
      <div>
        <button className={styles.setTimerButton} onClick={handleSetTimer}>
          Set timer
        </button>
      </div>
      {timerInputIsOn ? (
        <TimerInput onStartTimer={handleStartTimer} />
      ) : (
        <div>
          <Timer timeInSec={timerTimeInSec} />
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
        </div>
      )}
    </div>
  );
};

export default TrialPage;
