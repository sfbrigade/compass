import React, { useState, useEffect, useCallback } from "react";
import styles from "./uploadImage.module.css";
import { trpc } from "@/client/lib/trpc";
import axios from "axios";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface UploadImageComponentProps {
  title: string;
  fileName: string;
  onUpload: (fileId: string) => void;
}

const UploadImageComponent: React.FC<UploadImageComponentProps> = ({
  title,
  fileName,
  onUpload,
}) => {
  const [showStart, setShowStart] = useState(true);
  const [showTakePicture, setShowTakePicture] = useState(false);
  const [showUploadPicture, setShowUploadPicture] = useState(false);
  const [startButtonDisabled, setStartButtonDisabled] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [capturedImage, setCapturedImage] = useState<Blob | null>(null);

  const onClickStartButton = () => {
    setShowStart(false);
    setShowTakePicture(true);
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result;
        if (fileContent instanceof ArrayBuffer) {
          const fileBlob = new Blob([fileContent]);
          setCapturedImage(fileBlob);
        }
      };
      reader.readAsArrayBuffer(file);

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
    if (!capturedImage) return;

    const { key, url } = await getPresignedUrlForUpload.mutateAsync({
      type: capturedImage.type || "application/octet-stream",
    });

    await axios.put(url, capturedImage);

    await finishFileUpload.mutateAsync({
      key,
      filename: fileName,
    });

    setUploadSuccess(true);

    onUpload(key);

    setShowStart(true);
    setStartButtonDisabled(false);
    setUploading(false);
  }, [
    capturedImage,
    fileName,
    getPresignedUrlForUpload,
    finishFileUpload,
    onUpload,
  ]);

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
          onClick={onClickStartButton}
          disabled={startButtonDisabled}
        >
          <div className={styles.startButtonContent}>
            <CameraIcon />
            <span>{title}</span>
          </div>
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
          <button className={styles.startButton} onClick={onCancelTakePicture}>
            Cancel
          </button>
        </>
      )}
      {showUploadPicture && (
        <div className={styles.uploadedImageContainer}>
          {capturedImage && (
            <img
              src={URL.createObjectURL(capturedImage)}
              alt="Captured"
              className={styles.uploadedImage}
            />
          )}
          <div className={styles.buttonsContainer}>
            <button
              className={styles.startButton}
              onClick={onClickUploadPicture}
            >
              Upload
            </button>
            <button
              className={styles.startButton}
              id="cancel-button"
              onClick={onCancelCaptureImage}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {uploading && <p id="uploading">Uploading.......</p>}
      {uploadSuccess && (
        <div className={styles.uploadSuccessContainer}>
          <CheckCircleIcon className={styles.uploadSuccessIcon} />
          <p className={styles.uploadSuccessMessage}>
            Image uploaded successfully
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadImageComponent;
