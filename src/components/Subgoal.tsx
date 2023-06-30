import React from "react";

interface SubgoalProps {
  subgoal: Subgoal;
}

interface Subgoal {
  subgoal_id: string;
  description: string | null;
}

const Subgoals: React.FC<SubgoalProps> = ({ subgoal }) => {
  return (
    <div>
      <h4>Subgoal</h4>
      <div>Subgoal ID: {subgoal.subgoal_id}</div>
      <p>{subgoal.description}</p>
    </div>
  );
};

export default Subgoals;
