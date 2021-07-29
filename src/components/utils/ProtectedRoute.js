import React from 'react';
import { Route } from 'react-router-dom';
import Welcome from '../Welcome';

const ProtectedRoute = ({ path, component: Component, isLoggedIn }) => {
  // Render protected routes only when a user is logged in. Otherwise render welcome page
  return (
    <Route
      path={path}
      exact
      render={(props) =>
        isLoggedIn === true ? (
          <Component {...props} />
        ) : path === '/' ? (
          <Welcome {...props} />
        ) : (
          <Welcome {...props} redirected={true} />
        )
      }
    />
  );
};

export default ProtectedRoute;
