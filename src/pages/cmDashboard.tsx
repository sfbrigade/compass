import React from "react";
import AllParasPage from "../components/case_manager/AllParas";
// import MyStudentsPage from "../components/case_manager/MyStudents";
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
          {/* <p
            style={{ marginBottom: "3%", fontWeight: "bold", fontSize: "2rem" }}
          >
            Welcome to the CM Dashboard
          </p> */}
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            {/* <MyStudentsPage /> */}
            <AllParasPage />
          </div>
        </div>
      </main>
    </div>
  );
}

export default cmDashboard;
