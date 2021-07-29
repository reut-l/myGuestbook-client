import React from 'react';

const RoutingError = ({ reactRouterRoutingError }) => {
  return (
    <div
      className={
        reactRouterRoutingError ? 'middle-container' : 'main-container'
      }
    >
      <div className="error-message">
        <p>Oops..</p>
        <p>We didn't find this page...</p>
      </div>
    </div>
  );
};

export default RoutingError;
