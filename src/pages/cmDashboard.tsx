import React from "react";
import AllParasPage from "../components/case_manager/AllParas";
import AllStudentsPage from "../components/case_manager/AllStudents";
import styles from "../styles/Dashboard.module.css";
import Head from "next/head";
import Image from "next/image";
// import NavBar from "@/components/layout/NavBar";

function cmDashboard() {
  return (
    <div className={styles.cmContainer}>
      <Head>
        <title>Compass</title>
        <meta name="description" content="Make IEPs easier" />
        <link rel="icon" href="/img/favicon.png" />
      </Head>
      {/* <NavBar /> */}

      <main>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p
            style={{ marginBottom: "3%", fontWeight: "bold", fontSize: "2rem" }}
          >
            Welcome to the CM Dashboard
          </p>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <AllStudentsPage />
            <AllParasPage />
          </div>
        </div>
      </main>
    </div>
  );
}

export default cmDashboard;
