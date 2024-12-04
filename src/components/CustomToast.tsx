import React from "react";
import styles from "./styles/Toast.module.css";
import Image from "next/image";

interface CustomToastProps {
  errorMessage: string;
  onClose: () => void;
}

const CustomToast = ({ errorMessage, onClose }: CustomToastProps) => {
  const handleCloseToast = () => {
    onClose();
  };

  return (
    <div className={styles.customToastWrapper}>
      <div className={styles.customToast}>
        <Image
          src="/img/error.filled.svg"
          alt="Error Img"
          width={24}
          height={24}
        />
        <div>{errorMessage}</div>
        <button className={styles.closeButton} onClick={handleCloseToast}>
          <Image
            src="/img/cross-outline.svg"
            alt="Close Toast"
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
};

export default CustomToast;
