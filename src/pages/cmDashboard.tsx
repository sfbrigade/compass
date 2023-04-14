import React from "react";
import TestComponent from "../components/CaseManagerUI/TestCM";
import AllParasPage from "./paras";
import AllStudentsPage from "./students";

function cmDashboard() {
  return (
    <div>
      <p>Welcome to the CM Dashboard</p>
      <TestComponent />
      <div>
        <AllStudentsPage />
        <AllParasPage />
      </div>
    </div>
  );
}

export default cmDashboard;
