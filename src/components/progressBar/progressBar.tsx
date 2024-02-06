import React from "react";

interface ProgressBarProps {
  fillPercent: number;
}

const ProgressBar = ({ fillPercent }: ProgressBarProps) => {
  return (
    <div
      style={{
        width: "100%",
        height: "5px",
        background:
          fillPercent === 100
            ? "var(--grey-40)"
            : `linear-gradient(to right, var(--primary-50) 0%, var(--primary-50) ${fillPercent}%, var(--primary-80) ${fillPercent}%, var(--primary-80) 100%`,
      }}
    ></div>
  );
};

export default ProgressBar;
