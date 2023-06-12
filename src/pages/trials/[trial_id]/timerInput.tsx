import React, { useState } from "react";
import styles from "../../../styles/Paraflow.module.css";

interface TimerInput {
  onStartTimer: (inputTimeInStandard) => void;
}

const TimerInput = ({ onStartTimer }: TimerInput) => {
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
  const displayTime = () => {
    const zerosToAdd = 6 - inputTime.length;

    const zeroTime = "0".repeat(zerosToAdd) + inputTime;
    const [hours, minutes, seconds] = zeroTime.match(/.{1,2}/g) || [];

    return (
      <div className={styles.timerContainer}>
        <span>{hours}</span> : <span>{minutes}</span> : <span>{seconds}</span>
      </div>
    );
  };
  return (
    <div>
      <>{displayTime()}</>
      <div className={styles.numberPad}>
        <button onClick={() => addNumber("1")}>1</button>
        <button onClick={() => addNumber("2")}>2</button>
        <button onClick={() => addNumber("3")}>3</button>
        <button onClick={() => addNumber("4")}>4</button>
        <button onClick={() => addNumber("5")}>5</button>
        <button onClick={() => addNumber("6")}>6</button>
        <button onClick={() => addNumber("7")}>7</button>
        <button onClick={() => addNumber("8")}>8</button>
        <button onClick={() => addNumber("9")}>9</button>
        <div></div>
        <button onClick={() => addNumber("0")}>0</button>
        <button onClick={() => delNumber()}>Del</button>
      </div>
      <button onClick={() => onStartTimer(inputTime)}>Start</button>
    </div>
  );
};

export default TimerInput;
