import React from "react";
import styles from "../paraTrials/Paratrials.module.css";

interface CounterProps {
  title: string;
  count: number | null;
  onIncrement: () => void;
  onDecrement: () => void;
  disableInc: boolean;
  disableDec: boolean;
  color: "blue" | "green" | "yellow";
}

const Counter = ({
  title,
  count,
  onIncrement,
  onDecrement,
  disableInc,
  disableDec,
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
          disabled={disableDec}
        >
          -
        </button>
        <p
          className={`${styles.counterNumberDisplay} ${
            styles[`counterNumberDisplay-${color}`]
          }`}
        >
          {count ?? "-"}
        </p>
        <button
          onClick={onIncrement}
          className={`${styles.counterButton} ${
            styles[`counterButton-${color}`]
          }`}
          disabled={disableInc}
        >
          +
        </button>
      </div>
      <p className={styles.counterTitle}>{title}</p>
    </div>
  );
};

export default Counter;
