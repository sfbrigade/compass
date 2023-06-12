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

  return (
    <div>
      <button onClick={() => restartTimer(timeInSec)}>O</button>
      <div className={styles.timerContainer}>
        <span>{hours}</span> : <span>{minutes}</span> : <span>{seconds}</span>
      </div>
      <button onClick={() => handleStartStop(isRunning)}>start/stop</button>
    </div>
  );
};

export default Timer;
