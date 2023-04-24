import React from "react";
import AllParasPage from "../components/case_manager/AllParas";
import AllStudentsPage from "../components/case_manager/AllStudents";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";

function cmDashboard() {
  return (
    <div className={styles.cmContainer}>
      <Head>
        <title>Compass</title>
        <meta name="description" content="Make IEPs easier" />
        <link rel="icon" href="/img/favicon.png" />
      </Head>
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
