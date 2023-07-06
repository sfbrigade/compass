import React from "react";
import MyParas from "../components/case_manager/MyParas";
import MyStudentsPage from "../components/case_manager/MyStudents";
import styles from "../styles/Dashboard.module.css";
import Head from "next/head";
import Image from "next/image";
import UploadImageComponent from "@/components/uploadPicture/uploadImage";

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
            <MyStudentsPage />
            <MyParas />
          </div>
        </div>
      </main>
      <UploadImageComponent
        title="Take a picture of student's work"
        fileName="ImageName"
      />
    </div>
  );
}

export default cmDashboard;
