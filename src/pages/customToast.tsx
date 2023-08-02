import React, { useState } from "react";
import styles from "../styles/Toast.module.css";

const CustomToast = () => {
  return <div className={styles.customToast}>custom toast here</div>;
};

export default CustomToast;

{
  /* <Toaster
              position="bottom-right"
              // react-hot-toast does not directly support using custom classes for the toast content through toastOptions
              toastOptions={{
                style: {
                  background: "#F6F5FF",
                  borderRadius: "4px",
                  color: "#021426",
                },
                duration: Infinity,
              }}
            /> */
}
