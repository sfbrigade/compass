import React, { useState } from "react";
import styles from "./styles/Paratrials.module.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface TimerInputProps {
  onStartTimer: (inputTimeInSec: number) => void;
}

const TimerInput: React.FC<TimerInputProps> = ({ onStartTimer }) => {
  const [inputTime, setInputTime] = useState<string>("");

  const addNumber = (num: string) => {
    if (inputTime.length >= 6) {
      const newTime = inputTime.slice(1) + num;
      setInputTime(newTime);
    } else {
      setInputTime(inputTime + num);
    }
  };

  const delNumber = () => {
    const newTime = inputTime.slice(0, -1);
    setInputTime(newTime);
  };

  const convertToSeconds = (input: string) => {
    const zerosToAdd = 6 - input.length;

    const zeroTime = "0".repeat(zerosToAdd) + input;
    const [hours, minutes, seconds] =
      zeroTime.match(/.{1,2}/g)?.map((time) => Number(time)) || [];

    let totalTimeInSec = 0;

    totalTimeInSec += seconds;
    totalTimeInSec += minutes * 60;
    totalTimeInSec += hours * 60 * 60;

    return totalTimeInSec;
  };

  const displayTime = () => {
    const zerosToAdd = 6 - inputTime.length;

    const zeroTime = "0".repeat(zerosToAdd) + inputTime;
    const [hours, minutes, seconds] = zeroTime.match(/.{1,2}/g) || [];

    return (
      <div className={styles.timer}>
        <span>
          <div>{hours}</div>
          <p>H</p>
        </span>
        :
        <span>
          <div>{minutes}</div>
          <p>M</p>
        </span>
        :
        <span>
          <div>{seconds}</div>
          <p>S</p>
        </span>
      </div>
    );
  };

  return (
    <div className={styles.numPadContainer}>
      <h2>Timer</h2>
      <>{displayTime()}</>
      <div className={styles.numPad}>
        <button className={styles.numPadButton} onClick={() => addNumber("1")}>
          1
        </button>
        <button className={styles.numPadButton} onClick={() => addNumber("2")}>
          2
        </button>
        <button className={styles.numPadButton} onClick={() => addNumber("3")}>
          3
        </button>
        <button className={styles.numPadButton} onClick={() => addNumber("4")}>
          4
        </button>
        <button className={styles.numPadButton} onClick={() => addNumber("5")}>
          5
        </button>
        <button className={styles.numPadButton} onClick={() => addNumber("6")}>
          6
        </button>
        <button className={styles.numPadButton} onClick={() => addNumber("7")}>
          7
        </button>
        <button className={styles.numPadButton} onClick={() => addNumber("8")}>
          8
        </button>
        <button className={styles.numPadButton} onClick={() => addNumber("9")}>
          9
        </button>
        <div></div>
        <button className={styles.numPadButton} onClick={() => addNumber("0")}>
          0
        </button>
        <button className={styles.numPadButton} onClick={() => delNumber()}>
          Del
        </button>
      </div>
      <button
        className={styles.startButton}
        onClick={() => onStartTimer(convertToSeconds(inputTime))}
      >
        <PlayArrowIcon />
      </button>
    </div>
  );
};

export default TimerInput;
