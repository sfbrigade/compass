import React from "react";
import styles from "./styles/Paratrials.module.css";

interface CounterProps {
  title: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  color: "blue" | "green" | "yellow";
}

const Counter = ({
  title,
  onIncrement,
  onDecrement,
  count,
  color,
}: CounterProps) => {
  return (
    <div className={styles.counterContainer}>
      <div className={styles.counterButtonContainer}>
        <button
          onClick={onDecrement}
          className={`${styles.counterButton} ${
            styles[`counterButton-${color}`]
          }`}
        >
          -
        </button>
        <p
          className={`${styles.counterNumberDisplay} ${
            styles[`counterNumberDisplay-${color}`]
          }`}
        >
          {count}
        </p>
        <button
          onClick={onIncrement}
          className={`${styles.counterButton} ${
            styles[`counterButton-${color}`]
          }`}
        >
          +
        </button>
      </div>
      <p className={styles.counterTitle}>{title}</p>
    </div>
  );
};

export default Counter;
