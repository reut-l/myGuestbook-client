import React from 'react';

const ImagePreview = ({ imagefile }) => {
  const { name, preview, size } = imagefile;
  return (
    <div className="dropbox-preview">
      <div className="image-container">
        <img src={preview} alt={name} />
      </div>
      <div className="details">
        {name} - {(size / 1024000).toFixed(2)}MB
      </div>
    </div>
  );
};
export default ImagePreview;
