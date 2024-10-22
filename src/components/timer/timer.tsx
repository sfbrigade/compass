import React, { useCallback, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import styles from "../paraTrials/Paratrials.module.css";

interface TimerProps {
  timeInSec: number;
}

const Timer = ({ timeInSec }: TimerProps) => {
  const { seconds, minutes, hours, days, isRunning, pause, resume, restart } =
    useTimer({ expiryTimestamp: new Date(), autoStart: false });

  const restartTimer = useCallback(
    (inputTime: number) => {
      const dateTimeObject = new Date();
      dateTimeObject.setSeconds(dateTimeObject.getSeconds() + inputTime);
      restart(dateTimeObject, false);
    },
    [restart]
  );

  useEffect(() => {
    restartTimer(timeInSec);
  }, [timeInSec, restartTimer]);

  const handleStartStop = (timerIsRunning: boolean) => {
    if (timerIsRunning) {
      pause();
    } else {
      resume();
    }
  };

  const addZerosToTime = (num: number) => {
    let output = "";
    if (num < 10) {
      output += "0";
    }
    output += num;
    return output;
  };

  // Need to replace buttons with symbols
  return (
    <div className={styles.timerContainer}>
      <button
        className={styles.resetButton}
        onClick={() => restartTimer(timeInSec)}
      >
        O
      </button>
      <div className={styles.timer}>
        <span>{addZerosToTime(hours + days * 24)}</span>:
        <span>{addZerosToTime(minutes)}</span>:
        <span>{addZerosToTime(seconds)}</span>
      </div>
      <button
        className={styles.startStopButton}
        onClick={() => handleStartStop(isRunning)}
      >
        {isRunning ? "pause" : "play"}
      </button>
    </div>
  );
};

export default Timer;
