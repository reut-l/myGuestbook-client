import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactWebcam from 'react-webcam';
import Spinner from './Spinner';

// const getVideoConstraints = () => {
//   const padding = 16;
//   const aspectRatio = 1.777777777777778;
//   const width =
//     window.innerWidth > 640 + padding ? 640 : window.innerWidth - padding;

//   return {
//     width,
//     height: width / aspectRatio,
//     facingMode: 'user',
//   };
// };

const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};

const Webcam = ({ onCapture, isUploading }) => {
  const [state, setState] = useState({
    loaded: false,
    uploading: false,
    pictures: [],
  });

  useEffect(() => {
    setState({ ...state, uploading: isUploading });
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
  }, [webcamRef]);

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
          className="btn btn-action"
          variant="contained"
          disabled={state.uploading}
          onClick={capture}
        >
          {state.uploading && <Spinner />}
          Capture Photo
        </button>
      </div>
    </>
  );
};

export default Webcam;
