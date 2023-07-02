import React, { useState, useEffect, useRef } from "react";
import styles from "./uploadPicture.module.css";

import { FaCamera } from "react-icons/fa6";

interface UploadPictureProps {
  title: string;
}

const UploadPicture: React.FC<UploadPictureProps> = ({ title }) => {
  const [constraints] = useState({ width: 300, height: 300 });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string>("");
  const [showCapture, setShowCapture] = useState(false);
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [pictureButtonClicked, setPictureButtonClicked] = useState(false);

  const openUserMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = videoRef.current;
    if (video !== null) {
      video.srcObject = stream;
      await video.play();
    }
  };

  useEffect(() => {
    if (pictureButtonClicked) {
      void openUserMedia();
    }
  }, [pictureButtonClicked, showCapture]);

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (canvas !== null && video !== null) {
      // Set the canvas dimensions to match the video stream
      canvas.width = constraints.width;
      canvas.height = constraints.height;

      // Draw the current frame of the video onto the canvas
      const context = canvas.getContext("2d");
      if (context !== null) {
        context.drawImage(video, 0, 0, constraints.width, constraints.height);
      }

      // Convert the canvas content to a data URL representing the captured image
      const dataURL = canvas.toDataURL("image/png");

      // Set the captured image and show the capture view
      setCapturedImage(dataURL);
      setShowCapture(true);
    }
  };

  const saveImage = () => {
    // Simulate upload procedure
    console.log("Image uploaded successfully");

    // Show the save message
    setShowSaveMessage(true);

    // Reset variables for a fresh start
    setPictureButtonClicked(false);

    // Remove the saved message after 1 second and reset to takePicture button
    setTimeout(() => {
      setShowSaveMessage(false);
      setCapturedImage("");
      setShowCapture(false);
    }, 2000);
  };

  const handleCloseVideoFeed = () => {
    setPictureButtonClicked(false);
  };

  const handleCancelImage = () => {
    setShowCapture(false);
  };

  return (
    <div className={styles["video-feed-container"]}>
      {!pictureButtonClicked && (
        <button
          className={styles["startButton"]}
          id="start-button"
          onClick={() => setPictureButtonClicked(true)}
        >
          <FaCamera /> {title}
        </button>
      )}

      {pictureButtonClicked && (
        <div>
          {showCapture ? (
            <>
              <img
                src={capturedImage}
                alt="Captured"
                className={styles["video"]}
              />
              <button className={styles.startButton} onClick={saveImage}>
                Save
              </button>
              <button
                className={styles.startButton}
                id="cancel-button"
                onClick={handleCancelImage}
              >
                Cancel Image
              </button>
            </>
          ) : (
            <>
              <video
                className={styles["video"]}
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
                onClick={handleCloseVideoFeed}
              >
                Cancel
              </button>
            </>
          )}

          <canvas
            ref={canvasRef}
            className={styles.canvas}
            style={{ display: "none" }}
          ></canvas>
        </div>
      )}

      {showSaveMessage && (
        <p style={{ color: "green" }}>Image uploaded successfully</p>
      )}
    </div>
  );
};

export default UploadPicture;
