import React from 'react';
import Dropzone from 'react-dropzone';
import ImagePreview from './ImagePreview';
import Placeholder from './Placeholder';
import ShowError from './ShowError';
require('./style.css');

const renderDropzone = ({
  handleOnDrop,
  input: { onChange },
  imagefile,
  meta,
}) => (
  <div className="dropzone-box">
    <Dropzone
      accept="image/jpeg, image/png, image/gif, image/bmp"
      className="upload-container"
      onDrop={(file) => handleOnDrop(file, onChange)}
    >
      {({ getRootProps, getInputProps }) =>
        imagefile ? (
          <ImagePreview imagefile={imagefile} />
        ) : (
          <Placeholder
            meta={meta}
            getInputProps={getInputProps}
            getRootProps={getRootProps}
          />
        )
      }
    </Dropzone>
    <ShowError meta={meta} />
  </div>
);

export default renderDropzone;
