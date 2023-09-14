import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./uploadImage.module.css";
import { trpc } from "@/client/lib/trpc";
import axios from "axios";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

interface UploadImageComponentProps {
  title: string;
  fileName: string;
  onUpload: (fileId: string) => void;
}

enum UploadStep {
  Start,
  TakePicture,
  UploadPicture,
}

const UploadImageComponent: React.FC<UploadImageComponentProps> = ({
  title,
  fileName,
  onUpload,
}) => {
  const [currentStep, setCurrentStep] = useState(UploadStep.Start);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [capturedImage, setCapturedImage] = useState<Blob | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onClickStartButton = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
      setCurrentStep(UploadStep.UploadPicture);
    }
  };

  const onCancelTakePicture = () => {
    setCurrentStep(UploadStep.Start);
    setCapturedImage(null);
  };

  const onClickUploadPicture = () => {
    setCurrentStep(UploadStep.Start);
    setCapturedImage(null);
    setUploadSuccess(true);
    setUploadSuccess(false);

    if (capturedImage) {
      void uploadImageToCloud();
    }
  };

  const getPresignedUrlForUpload =
    trpc.file.getPresignedUrlForFileUpload.useMutation();
  const finishFileUpload = trpc.file.finishFileUpload.useMutation();

  const isUploading =
    getPresignedUrlForUpload.isLoading || finishFileUpload.isLoading;

  const uploadImageToCloud = useCallback(async () => {
    if (!capturedImage) return;

    const { key, url } = await getPresignedUrlForUpload.mutateAsync({
      type: capturedImage.type || "application/octet-stream",
    });

    await axios.put(url, capturedImage);

    const { file_id } = await finishFileUpload.mutateAsync({
      key,
      filename: fileName,
    });

    setUploadSuccess(true);

    if (file_id) {
      onUpload(file_id);
    }
  }, [
    capturedImage,
    fileName,
    getPresignedUrlForUpload,
    finishFileUpload,
    onUpload,
  ]);

  useEffect(() => {
    if (uploadSuccess) {
      const timeout = setTimeout(() => {
        setUploadSuccess(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [uploadSuccess]);

  return (
    <div className={styles.uploadContainer}>
      {currentStep === UploadStep.Start && (
        <button className={styles.actionButton} onClick={onClickStartButton}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*;capture=camera"
            capture="environment"
            onChange={handleFile}
            style={{ display: "none" }}
          />
          <CameraIcon />
          {title}
        </button>
      )}
      {currentStep === UploadStep.TakePicture && (
        <button onClick={onCancelTakePicture} className={styles.actionButton}>
          Cancel
        </button>
      )}
      {currentStep === UploadStep.UploadPicture && (
        <div className={styles.uploadContainer}>
          {capturedImage && (
            <svg>
              <image href={URL.createObjectURL(capturedImage)} />
            </svg>
          )}
          <div>
            <button
              onClick={onClickUploadPicture}
              disabled={isUploading}
              className={styles.actionButton}
            >
              {isUploading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <CheckCircleIcon />
              )}
              {isUploading ? "Uploading..." : "Upload"}
            </button>
            <button
              id="cancel-button"
              onClick={onCancelTakePicture}
              disabled={isUploading}
              className={styles.actionButton}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isUploading && (
        <div className={styles.uploadingText}>
          <CircularProgress size={20} color="primary" />
        </div>
      )}

      {uploadSuccess && (
        <div>
          <CheckCircleIcon />
          <Typography variant="body2">Image uploaded successfully</Typography>
        </div>
      )}
    </div>
  );
};

export default UploadImageComponent;
