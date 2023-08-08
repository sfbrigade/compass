import React, { useState } from "react";
import Counter from "@/components/para_trials/counter";
import Timer from "@/components/para_trials/timer";
import TimerInput from "@/components/para_trials/timerInputPad";
import $button from "@/styles/Button.module.css";

const TrialPage = () => {
  const [timerTimeInSec, setTimerTimeInSec] = useState(0);
  const [timerInputIsOn, setTimerInputIsOn] = useState(false);

  const handleStartTimer = (inputTimeInSec: number) => {
    setTimerTimeInSec(inputTimeInSec);
    setTimerInputIsOn(false);
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
        <button
          className={`${$button.default} ${$button.reversed} ${$button.pilled}`}
          onClick={handleSetTimer}
        >
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
