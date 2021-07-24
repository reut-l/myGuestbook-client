import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AuthNav = () => {
  const pathname = useLocation().pathname;

  return (
    <div>
      <ul className="slide-nav with-indicator">
        <li
          className={`slide-nav-item ${
            pathname === '/register' ? 'is-active' : ''
          }`}
        >
          <Link to="/register">Register</Link>
        </li>
        <li
          className={`slide-nav-item ${
            pathname === '/login' ? 'is-active' : ''
          }`}
        >
          <Link to="/login">Log in</Link>
        </li>
      </ul>
    </div>
  );
};

export default AuthNav;
