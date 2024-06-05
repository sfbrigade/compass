import React from "react";
import ProgressBar from "@/components/design_system/progressBar/ProgressBar";

const Settings = () => {
  // TODO? make sure settings displayed reflect the specific logged-in user

  return (
    <div>
      <p>🚧 Under Construction! 🚧</p>
      <br />
      <p>Demonstration of Progress Bar at 50%</p>
      <p>{`(I will delete this from settings page when PR approved)`}</p>
      <br />
      <ProgressBar value={50} />
    </div>
  );
};

export default Settings;
