import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactWebcam from 'react-webcam';
import { b64toBlob } from './utils';

const Webcam = ({ onCapture, isUploading, error }) => {
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setUploading(isUploading);
  }, [isUploading]);

  const webcamRef = useRef(null);

  const capture = useCallback(async () => {
    if (webcamRef && webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const split = imageSrc.split(',');
        const contentType = 'image/jpeg';
        const blob = b64toBlob(split[1], contentType);
        onCapture(blob);
      }
    }
  }, [webcamRef, onCapture]);

  const videoConstraints = {
    width: 300,
    height: 400,
    facingMode: 'user',
  };

  return (
    <>
      <ReactWebcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
        screenshotQuality={1}
      />
      <div>
        <button
          className={`btn btn-action btn-large ${uploading ? 'disabled' : ''}`}
          variant="contained"
          disabled={uploading}
          onClick={capture}
        >
          {uploading && !error ? 'Searching...' : 'Capture Photo'}
        </button>
      </div>
    </>
  );
};

export default Webcam;
