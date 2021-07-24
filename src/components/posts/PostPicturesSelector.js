import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { recognizeMe } from '../utils/utils';
const Webcam = lazy(() => import('../utils/Webcam'));

const PostPicturesSelector = (props) => {
  const [pictures, setPictures] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [uploading, setUploading] = useState(false);
  const eventId = props.match.params.eventId;

  useEffect(() => {
    localStorage.setItem('postPictures', JSON.stringify(pictures));
  }, [pictures]);

  const renderNoPicturesFound = () => (
    <div className="images-display-container">
      <h1>Nothing to show</h1>
      <p>
        Sorry, we were not able to find any pictures of you. Please try Again
      </p>
      <div>
        <Link
          to={`/events/${eventId}/posts/new`}
          className="btn btn-action continue-btn"
        >
          Skip
        </Link>
      </div>
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
            Continue
          </Link>
        </div>
      </div>
    );
  };

  const processImage = async (blob) => {
    setUploading(true);
    const { success, data } = await recognizeMe(blob, eventId);
    if (success) {
      setPictures(data);
    }
    setHasSearched(true);
    setUploading(false);
  };

  return (
    <div className="middle-container">
      <div className="pictures-selector-container">
        <h1>Find your pictures</h1>
        <h3>Step 1:Take a picture of yourself</h3>
        <Suspense fallback={<div>Loading...</div>}>
          <Webcam onCapture={processImage} isUploading={uploading} />
        </Suspense>
        {hasSearched &&
          (pictures.length > 0 ? renderPictures() : renderNoPicturesFound())}
      </div>
    </div>
  );
};

export default PostPicturesSelector;
