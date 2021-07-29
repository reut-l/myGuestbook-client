import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Placeholder = ({ getInputProps, getRootProps, error }) => (
  <div
    {...getRootProps()}
    className={`dropzone-placeholder ${error ? 'error' : ''}`}
  >
    <input {...getInputProps()} />
    <FontAwesomeIcon icon="cloud-upload-alt" className="upload-icon" />
    {!error && <p>Click or drag picture file to this area to upload.</p>}
    {error && <p>{error}</p>}
  </div>
);

export default Placeholder;
