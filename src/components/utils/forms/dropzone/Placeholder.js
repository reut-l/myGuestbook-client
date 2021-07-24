import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Placeholder = ({
  getInputProps,
  getRootProps,
  meta: { error, touched },
}) => (
  <div
    {...getRootProps()}
    className={`dropzone-placeholder ${error && touched ? 'error' : ''}`}
  >
    <input {...getInputProps()} />
    <FontAwesomeIcon icon="cloud-upload-alt" className="upload-icon" />
    <p>Click or drag image file to this area to upload.</p>
  </div>
);

export default Placeholder;
