import React, { useState } from "react";
import styles from "../styles/Toast.module.css";
import Image from "next/image";

interface CustomToastProps {
  errorMessage: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ errorMessage }) => {
  const [showToast, setShowToast] = useState(true);

  const handleCloseToast = () => {
    setShowToast(false);
  };

  console.log("error is ", errorMessage);

  return (
    <>
      {showToast && (
        <div className={styles.customToastWrapper}>
          <div className={styles.customToast}>
            <Image
              src="/img/error.filled.svg"
              alt="Close Toast"
              width={24}
              height={24}
            ></Image>
            <div>{errorMessage ?? "hi"}</div>

            <Image
              src="/img/cross-outline.svg"
              alt="Close Toast"
              width={24}
              height={24}
              onClick={handleCloseToast}
              className={styles.imgPointer}
            ></Image>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomToast;
