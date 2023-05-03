import React from "react";
import AllParasPage from "../components/case_manager/AllParas";
import AllStudentsPage from "../components/case_manager/AllStudents";
import styles from "../styles/Dashboard.module.css";
import Head from "next/head";
import Image from "next/image";

//this is a placeholder object for testing the archive flow
const cmUser: {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
} = {
  user_id: "d760acbf-c661-4806-a502-677d22652715",
  first_name: "John",
  last_name: "Doe",
  email: "john@example.com",
};

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
            <AllStudentsPage user_id={cmUser.user_id} />
            <AllParasPage />
          </div>
        </div>
      </main>
    </div>
  );
}

export default cmDashboard;
