import React from "react";
import Counter from "./counter";

const TrialPage = () => {
  return (
    <div>
      <h1>Trial</h1>
      <Counter title="Counter" maxCount={5} minCount={0} color="blue" />
    </div>
  );
};

export default TrialPage;
