import React from "react";
import MyStudents from "../components/case_manager/MyStudents";
import styles from "../styles/Dashboard.module.css";
import Image from "next/image";
import UploadImageComponent from "@/components/uploadPicture/uploadImage";

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
      <UploadImageComponent
        title="Take a picture of student's work"
        fileName="newFile"
      />
    </div>
  );
}

export default cmDashboard;
