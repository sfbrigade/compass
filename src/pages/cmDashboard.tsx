import React from "react";
import AllParasPage from "../components/CaseManagerUI/paras";
import AllStudentsPage from "../components/CaseManagerUI/students";

function cmDashboard() {
  return (
    <div>
      <p>Welcome to the CM Dashboard</p>
      <div style={{ display: "flex" }}>
        <AllStudentsPage />
        <AllParasPage />
      </div>
    </div>
  );
}

export default cmDashboard;
