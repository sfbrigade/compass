import React, { useState, useEffect, useRef, useCallback } from "react";
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

  const [constraints] = useState({ width: 300, height: 300 });
  const [capturedImage, setCapturedImage] = useState<string>("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const openUserMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = videoRef.current;
    if (video !== null) {
      video.srcObject = stream;
      await video.play();
    }
  };

  useEffect(() => {
    if (showTakePicture) {
      void openUserMedia();
    }
  }, [showTakePicture]);

  const onClickStartButton = () => {
    setShowStart(false);
    setShowTakePicture(true);
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (canvas !== null && video !== null) {
      canvas.width = constraints.width;
      canvas.height = constraints.height;

      const context = canvas.getContext("2d");
      if (context !== null) {
        context.drawImage(video, 0, 0, constraints.width, constraints.height);
      }

      const dataURL = canvas.toDataURL("image/png");
      setCapturedImage(dataURL);

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
    //<divclassName={styles.video-feed-container}>
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
          <video
            className={styles.video}
            autoPlay={true}
            ref={videoRef}
            id="video"
          ></video>
          <button className={styles.startButton} onClick={captureImage}>
            Capture
          </button>
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
            Cancel Image
          </button>
        </>
      )}
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        style={{ display: "none" }}
      ></canvas>
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
