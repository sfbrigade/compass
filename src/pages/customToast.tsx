import React, { useState } from "react";
import styles from "../styles/Toast.module.css";

interface CustomToastProps {
  errorMessage: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ errorMessage }) => {
  const [showToast, setShowToast] = useState(true);

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <>
      {showToast && (
        <div className={styles.customToastWrapper}>
          <div className={styles.customToast} onClick={handleCloseToast}>
            {errorMessage}
          </div>
        </div>
      )}
    </>
  );
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
