import React from "react";
import Dropdown from "../components/design_system/dropdown/Dropdown";
import $dropdown from "../components/design_system/dropdown/Dropdown.module.css";
import { useState, useEffect } from "react";

const Settings = () => {
  // TODO? make sure settings displayed reflect the specific logged-in user
  const [selectedOption, setSelectedOption] = useState("1");

  // useEffect(() => {
  //   console.log('selected Option ', selectedOption);
  // }, [selectedOption, setSelectedOption])

  return (
    <div>
      <p>🚧 Under Construction! 🚧</p>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Dropdown
        itemList={[
          { value: "1", label: "Until a target date has been reached" },
          {
            value: "2",
            label: "Until a number of instances have been recorded",
          },
          { value: "3", label: "Until the Para(s) is unassigned" },
        ]}
        label="Select option"
        className={$dropdown.myCustomClass}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <Dropdown
        itemList={[
          { value: "1", label: "All Tasks" },
          { value: "2", label: "My Tasks" },
          { value: "3", label: "Completed Tasks" },
        ]}
        label="Select option"
        className={$dropdown.myCustomClass}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    </div>
  );
};

export default Settings;
