import React, { useState, useEffect, useCallback } from "react";
import styles from "./uploadImage.module.css";
import { trpc } from "@/client/lib/trpc";
import axios from "axios";
import { FaCamera, FaCheckCircle } from "react-icons/fa";

interface UploadImageComponentProps {
  title: string;
  fileName: string;
}

const UploadImageComponent: React.FC<UploadImageComponentProps> = ({
  title,
  fileName,
}) => {
  const [showStart, setShowStart] = useState<boolean>(true);
  const [showTakePicture, setShowTakePicture] = useState<boolean>(false);
  const [showUploadPicture, setShowUploadPicture] = useState<boolean>(false);
  const [startButtonDisabled, setStartButtonDisabled] =
    useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const [capturedImage, setCapturedImage] = useState<string>("");

  const onClickStartButton = () => {
    setShowStart(false);
    setShowTakePicture(true);
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setCapturedImage(reader.result);
        }
      };
      reader.readAsDataURL(file);

      setShowTakePicture(false);
      setShowUploadPicture(true);
    }
  };

  const onCancelTakePicture = () => {
    setShowStart(true);
    setShowTakePicture(false);
  };

  const onCancelCaptureImage = () => {
    setShowTakePicture(true);
    setShowUploadPicture(false);
  };

  const onClickUploadPicture = () => {
    setShowUploadPicture(false);
    setShowStart(true);
    setStartButtonDisabled(true);
    setUploading(true);
  };

  const getPresignedUrlForUpload =
    trpc.file.getPresignedUrlForFileUpload.useMutation();
  const finishFileUpload = trpc.file.finishFileUpload.useMutation();

  const uploadImageToCloud = useCallback(async () => {
    const { key, url } = await getPresignedUrlForUpload.mutateAsync({
      type: "image/png",
    });

    const response = await fetch(capturedImage);
    const file = await response.blob();

    const formData = new FormData();
    formData.append("file", file, fileName);

    await axios.put(url, formData);

    await finishFileUpload.mutateAsync({
      key,
      filename: fileName,
    });

    setUploadSuccess(true);

    setShowStart(true);
    setStartButtonDisabled(false);
    setUploading(false);
  }, [capturedImage, fileName]);

  useEffect(() => {
    if (uploading) {
      void uploadImageToCloud();
    }
  }, [uploading, uploadImageToCloud]);

  useEffect(() => {
    if (uploadSuccess) {
      const timeout = setTimeout(() => {
        setUploadSuccess(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [uploadSuccess]);

  return (
    <div>
      {showStart && (
        <button
          className={
            startButtonDisabled
              ? styles.startButtonDisabled
              : styles.startButton
          }
          id="start-button"
          onClick={onClickStartButton}
          disabled={startButtonDisabled}
        >
          <FaCamera /> {title}
        </button>
      )}
      {showTakePicture && (
        <>
          <input
            type="file"
            accept="image/*;capture=camera"
            capture="environment"
            onChange={handleFile}
            className={styles.startButton}
          />
          <button
            className={styles.startButton}
            id="cancel-button"
            onClick={onCancelTakePicture}
          >
            Cancel
          </button>
        </>
      )}
      {showUploadPicture && (
        <>
          <img src={capturedImage} alt="Captured" className={styles.video} />
          <button className={styles.startButton} onClick={onClickUploadPicture}>
            Upload
          </button>
          <button
            className={styles.startButton}
            id="cancel-button"
            onClick={onCancelCaptureImage}
          >
            Cancel
          </button>
        </>
      )}

      {uploading && <p id="uploading">Uploading.......</p>}
      {uploadSuccess && (
        <div className={styles.uploadSuccessContainer}>
          <FaCheckCircle className={styles.uploadSuccessIcon} />
          <p className={styles.uploadSuccessMessage}>
            Image uploaded successfully
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadImageComponent;
