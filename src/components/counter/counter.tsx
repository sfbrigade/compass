import React, { useState } from "react";
import styles from "../paraTrials/Paratrials.module.css";

interface CounterProps {
  title: string;
  maxCount: number;
  minCount: number;
  color: "blue" | "green" | "yellow";
}

const Counter = ({ title, maxCount, minCount, color }: CounterProps) => {
  // Count variable may need to become a prop, depending on how we implement
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(Math.min(count + 1, maxCount));
  };
  const decrementCount = () => {
    setCount(Math.max(count - 1, minCount));
  };

  return (
    <div className={styles.counterContainer}>
      <div className={styles.counterButtonContainer}>
        <button
          onClick={decrementCount}
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
          onClick={incrementCount}
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
