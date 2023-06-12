import React, { useEffect, useState } from "react";
import styles from "../../../styles/Paraflow.module.css";

interface CounterProps {
  title: string;
  maxCount: number;
  minCount: number;
  color: string;
}

const Counter = ({ title, maxCount, minCount, color }: CounterProps) => {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   return
  // }, []);

  const incrementCount = () => {
    if (count === maxCount) {
      return;
    }
    setCount(count + 1);
  };
  const decrementCount = () => {
    if (count === minCount) {
      return;
    }
    setCount(count - 1);
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
