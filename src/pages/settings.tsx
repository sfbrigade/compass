import DS_Checkbox from "@/components/design_system/checkbox/Checkbox";
import React, { useState } from "react";

const Settings = () => {
  // TODO? make sure settings displayed reflect the specific logged-in user
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <p>🚧 Under Construction! 🚧</p>
      <DS_Checkbox
        onClickAction={() => setIsChecked(!isChecked)}
        text={`This is a Test Checkbox`}
        checked={isChecked}
      />
      <DS_Checkbox
        onClickAction={() => null}
        text={`This is a Disabled Checkbox`}
        checked={false}
        disabled
      />
    </div>
  );
};

export default Settings;
