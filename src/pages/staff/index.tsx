import React from "react";
import styles from "../../styles/Dashboard.module.css";
import MyParas from "@/components/case_manager/MyParas";

function Staff() {
  return (
    <div className={styles.cmContainer}>
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
            <MyParas />
          </div>
        </div>
      </main>
    </div>
  );
}

export default staff;
