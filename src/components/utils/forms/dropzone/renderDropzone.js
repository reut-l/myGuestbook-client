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
  meta: { error, touched },
}) => (
  <div className="preview-container">
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
            error={error}
            touched={touched}
            getInputProps={getInputProps}
            getRootProps={getRootProps}
          />
        )
      }
    </Dropzone>
    <ShowError error={error} touched={touched} />
  </div>
);

export default renderDropzone;
