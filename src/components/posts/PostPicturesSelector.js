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
    <div>
      <h1>Nothing to show</h1>
      <p>
        Sorry, we were not able to find any pictures of you. Please try Again
      </p>
      <div>
        <Link to={`/events/${eventId}/posts/new`} className="ui button primary">
          Skip
        </Link>
      </div>
    </div>
  );

  const renderPictures = () => {
    return (
      <div>
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
            className="ui button primary"
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
    <div className="ui container">
      <h3>Find your pictures</h3>
      <h5>Upload a picture of yourself</h5>
      <Suspense fallback={<div>Loading...</div>}>
        <Webcam onCapture={processImage} isUploading={uploading} />
      </Suspense>
      {hasSearched &&
        (pictures.length > 0 ? renderPictures() : renderNoPicturesFound())}
    </div>
  );
};

export default PostPicturesSelector;
