import React from 'react';

const ShowError = ({ meta: { error, touched } }) =>
  touched && error ? <div className="error">{error}</div> : null;

export default ShowError;
