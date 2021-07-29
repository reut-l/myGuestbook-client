import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    <div className="error-message">
      <p>Oops...</p>
      <p> {error}</p>
    </div>
  );
};

export default ErrorMessage;
