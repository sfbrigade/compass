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
            ? "#788591"
            : `linear-gradient(to right, #3023B8 0%, #3023B8 ${fillPercent}%, #9B93F1 ${fillPercent}%, #9B93F1 100%`,
      }}
    ></div>
  );
};

export default ProgressBar;
