import React from "react";
import MyStudents from "../../components/case_manager/MyStudents";
import styles from "../../styles/Dashboard.module.css";

function Students() {
  return (
    <div className="dash__container">
      <nav style={{ padding: "2%" }}></nav>
      <main>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <MyStudents />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Students;
