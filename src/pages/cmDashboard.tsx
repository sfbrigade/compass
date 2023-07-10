import React from "react";
import MyStudents from "../components/case_manager/MyStudents";
import styles from "../styles/Dashboard.module.css";
import Image from "next/image";

function cmDashboard() {
  return (
    <div className={styles.cmContainer}>
      <nav style={{ padding: "2%" }}>
        <Image
          src="/img/compass-logo.svg"
          alt="logo"
          width={50}
          height={50}
          priority
        />
      </nav>
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

export default cmDashboard;
