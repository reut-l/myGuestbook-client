import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { recognizeMe } from '../utils/utils';
const Webcam = lazy(() => import('../utils/Webcam/Webcam'));

const PostPicturesSelector = ({
  match: {
    params: { eventId },
  },
}) => {
  const [pictures, setPictures] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Set the pictures that were found in local storage so that they can be used in the post create (image editor) page
  useEffect(() => {
    localStorage.setItem('postPictures', JSON.stringify(pictures));
  }, [pictures]);

  const renderNoPicturesFound = () => (
    <div className="images-display-container">
      <h1>Nothing to show</h1>
      <p>
        Sorry, we were not able to find any pictures of you. Please try Again
      </p>
    </div>
  );

  const renderPictures = () => {
    return (
      <div className="images-display-container">
        <h1>We found you!</h1>
        <div className="ui grid">
          {pictures.map((picture, i) => (
            <div className="five wide column" key={i}>
              <img src={picture.location} alt={picture.filename} />
            </div>
          ))}
        </div>
        <div>
          <Link
            to={`/events/${eventId}/posts/new`}
            className="btn btn-action continue-btn"
          >
            Select Photos
          </Link>
        </div>
      </div>
    );
  };

  // Use AWS Rekognition API to find pictures that the user is in (after taking his own picture in the Webcam)
  const processImage = async (blob) => {
    setUploading(true);
    const { success, data, message } = await recognizeMe(blob, eventId);
    if (!success) {
      return setError(
        'Oops, something went wrong... \nplease try again later or skip'
      );
    }

    if (success && message === 'Empty event') {
      return setError(
        "This event doesn't have pictures yet. \nPlease try again later!"
      );
    }

    setPictures(data);
    setHasSearched(true);
    setUploading(false);
  };

  const renderError = () => {
    return <div className="error-form error-capture">{error}</div>;
  };

  return (
    <div className="middle-container">
      <div className="pictures-selector-container">
        <h1>Find your pictures</h1>
        <h3>Step 1:Take a picture of yourself</h3>
        <Suspense fallback={<div>Loading...</div>}>
          <Webcam
            onCapture={processImage}
            isUploading={uploading}
            error={error}
          />
        </Suspense>
        {hasSearched &&
          (pictures.length > 0 ? renderPictures() : renderNoPicturesFound())}
        {error && renderError()}
        <div>
          <Link to={`/events/${eventId}/posts/new`} className="btn skip-btn">
            Skip
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostPicturesSelector;
