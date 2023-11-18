import React, { useState } from "react";
import styles from "./components/design_system/toast/Toast.module.css";
import Image from "next/image";

interface CustomToastProps {
  errorMessage: string;
}

const CustomToast = ({ errorMessage }: CustomToastProps) => {
  const [showToast, setShowToast] = useState(true);

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <>
      {showToast && (
        <div className={styles.customToastWrapper}>
          <div className={styles.customToast}>
            <Image
              src="/img/error.filled.svg"
              alt="Error Img"
              width={24}
              height={24}
            ></Image>
            <div>{errorMessage ?? null}</div>

            <button className={styles.closeButton} onClick={handleCloseToast}>
              <Image
                src="/img/cross-outline.svg"
                alt="Close Toast"
                width={24}
                height={24}
              ></Image>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomToast;
