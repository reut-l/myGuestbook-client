import React from 'react';
import Dropzone from 'react-dropzone';
import ImagePreview from './ImagePreview';
import Placeholder from './Placeholder';
require('./style.css');

const renderDropzone = ({ handleOnDrop, imagefile, meta: { error } }) => (
  <div className="dropzone-box">
    <Dropzone
      accept="image/jpeg"
      className="upload-container"
      onDrop={(file) => handleOnDrop(file)}
    >
      {({ getRootProps, getInputProps }) =>
        imagefile && imagefile !== 'error' ? (
          <ImagePreview imagefile={imagefile} />
        ) : (
          <Placeholder
            error={error}
            getInputProps={getInputProps}
            getRootProps={getRootProps}
          />
        )
      }
    </Dropzone>
  </div>
);

export default renderDropzone;
