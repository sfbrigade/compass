import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import styles from "../../../styles/Paraflow.module.css";

interface TimerProps {
  timeInSec: number;
}

const Timer = ({ timeInSec }: TimerProps) => {
  const { seconds, minutes, hours, isRunning, start, pause, resume, restart } =
    useTimer({ expiryTimestamp: new Date(), autoStart: false });

  useEffect(() => {
    restartTimer(timeInSec);
  }, [timeInSec]);

  const restartTimer = (inputTime: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + inputTime);
    restart(time, false);
  };

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

  return (
    <div className={styles.timerContainer}>
      <button
        className={styles.resetButton}
        onClick={() => restartTimer(timeInSec)}
      >
        O
      </button>
      <div className={styles.timer}>
        <span>{addZerosToTime(hours)}</span>:
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
